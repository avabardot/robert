// The ocean, and how loud the world currently is.
import AFRAME from 'aframe';

// ---------------------------------------------------------- music level ----
// One number between 0 and 1 that anything in the world can read to move
// with Robert's song. music.js hands this system a function that measures
// the sound; when there is no music the level settles back to nothing.
AFRAME.registerSystem('music-level', {
    init() {
        this.value = 0;
        this.source = null;
    },
    tick() {
        const heard = this.source ? this.source() : 0;
        // Rise quickly, fall slowly, so things swell rather than flicker.
        this.value += (heard - this.value) * (heard > this.value ? 0.35 : 0.06);
    },
});

// ----------------------------------------------------------------- sea ----
// The old ocean moved 2,600 points one at a time in JavaScript on every
// frame. This one is a flat sheet that the graphics card bends itself: four
// trains of sine waves crossing at different angles and speeds. The same sums
// give the slope of the water at each point, which is what lets the moon
// leave a path of light across it.
AFRAME.registerShader('night-sea', {
    schema: {
        time: { type: 'time', is: 'uniform' },
        level: { type: 'number', is: 'uniform', default: 0 },
        moon: { type: 'vec3', is: 'uniform', default: { x: -0.39, y: 0.35, z: -0.84 } },
    },
    vertexShader: `
        uniform float time;
        uniform float level;
        varying vec3 vWorld;
        varying vec3 vNormal;

        // height, and how fast the height changes along x and along z
        vec3 swell(vec2 p, vec2 heading, float tightness, float height, float speed, float t) {
            float phase = dot(p, heading) * tightness + t * speed;
            return vec3(height * sin(phase), height * tightness * heading * cos(phase));
        }

        void main() {
            float t = time * 0.001;
            vec4 world = modelMatrix * vec4(position, 1.0);
            vec2 p = world.xz;
            float lift = 1.0 + level * 1.6;

            vec3 w = swell(p, normalize(vec2(1.0, 0.3)), 0.045, 0.55 * lift, 0.6, t)
                   + swell(p, normalize(vec2(-0.4, 1.0)), 0.08, 0.32 * lift, 0.9, t)
                   + swell(p, normalize(vec2(0.7, -0.6)), 0.17, 0.14 * lift, 1.4, t)
                   + swell(p, normalize(vec2(-0.9, -0.2)), 0.33, 0.06 * lift, 2.0, t);

            world.y += w.x;
            vWorld = world.xyz;
            vNormal = normalize(vec3(-w.y, 1.0, -w.z));
            gl_Position = projectionMatrix * viewMatrix * world;
        }
    `,
    fragmentShader: `
        uniform float level;
        uniform vec3 moon;
        varying vec3 vWorld;
        varying vec3 vNormal;

        void main() {
            vec3 normal = normalize(vNormal);
            vec3 toEye = normalize(cameraPosition - vWorld);

            // Water is darkest looked straight down into, palest at a glance.
            float glance = pow(1.0 - max(dot(normal, toEye), 0.0), 3.0);
            vec3 colour = mix(vec3(0.004, 0.03, 0.036), vec3(0.02, 0.16, 0.17), glance * 0.9 + 0.08);

            // The moon's path.
            vec3 halfway = normalize(normalize(moon) + toEye);
            float glint = pow(max(dot(normal, halfway), 0.0), 180.0);
            colour += vec3(0.75, 0.95, 0.92) * glint * (0.9 + level);

            // Slopes that lean towards the moon catch a little of it, and the
            // ones that lean away lose it, which is what shows the swell.
            float lean = dot(normal, normalize(vec3(moon.x, 0.0, moon.z)));
            colour += vec3(0.012, 0.085, 0.09) * lean * 2.2;

            // Far away the sea melts into the colour of the sky's horizon, so
            // the edge of the sheet is never seen.
            float away = length(vWorld.xz - cameraPosition.xz);
            colour = mix(colour, vec3(0.016, 0.105, 0.112), smoothstep(120.0, 430.0, away));

            gl_FragColor = vec4(colour, 1.0);
        }
    `,
});

// Feeds the music level to the sea's shader.
AFRAME.registerComponent('sea-listens', {
    tick() {
        const mesh = this.el.getObject3D('mesh');
        const uniforms = mesh && mesh.material && mesh.material.uniforms;
        if (uniforms && uniforms.level) {
            uniforms.level.value = this.el.sceneEl.systems['music-level'].value;
        }
    },
});

// ---------------------------------------------------------------- reeds ----
// The sound wave from the roundel, standing in the sea: a row of glowing
// bars that sway a little on their own and leap when there is music.
AFRAME.registerComponent('sea-reeds', {
    schema: {
        count: { default: 9 },
        spread: { default: 52 },
    },
    init() {
        const THREE = AFRAME.THREE;
        const shape = [0.35, 0.6, 0.85, 1, 0.75, 1, 0.85, 0.6, 0.35];
        const tints = ['#72e9e9', '#0be5e5', '#66ff66'];

        this.bars = [];
        this.geometry = new THREE.CylinderGeometry(0.7, 0.7, 1, 12);
        this.geometry.translate(0, 0.5, 0); // grow upwards from the water

        for (let i = 0; i < this.data.count; i++) {
            const colour = new THREE.Color(tints[i % tints.length]);
            const material = new THREE.MeshBasicMaterial({ color: colour, transparent: true, opacity: 0.55 });
            const bar = new THREE.Mesh(this.geometry, material);
            bar.position.x = (i / (this.data.count - 1) - 0.5) * this.data.spread;
            bar.userData.shape = shape[i % shape.length];
            bar.userData.phase = i * 1.7;
            this.bars.push(bar);
            this.el.object3D.add(bar);
        }
    },
    tick(time) {
        const level = this.el.sceneEl.systems['music-level'].value;
        const t = time / 1000;
        for (const bar of this.bars) {
            const idle = 2 + 3.2 * bar.userData.shape + 0.8 * Math.sin(t * 0.6 + bar.userData.phase);
            const dance = level * 16 * bar.userData.shape * (0.65 + 0.35 * Math.sin(t * 5 + bar.userData.phase));
            bar.scale.y = idle + dance;
            bar.material.opacity = 0.3 + Math.min(level, 1) * 0.55;
        }
    },
    remove() {
        for (const bar of this.bars) {
            bar.material.dispose();
            this.el.object3D.remove(bar);
        }
        this.geometry.dispose();
    },
});
