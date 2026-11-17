// Things that move: the dust in the air, the fish, and the strawberries when
// they are looked at or switched on.
import AFRAME from 'aframe';

const THREE = AFRAME.THREE;

// ----------------------------------------------------------------- dust ----
// Robert's red and green dust. Each mote is one point that wanders round its
// own spot on the graphics card; nothing is moved from JavaScript.
AFRAME.registerComponent('dust', {
    schema: {
        count: { default: 180 },
        box: { type: 'vec3', default: { x: 30, y: 9, z: 30 } },
    },

    init() {
        const { count, box } = this.data;
        const position = new Float32Array(count * 3);
        const colour = new Float32Array(count * 3);
        const seed = new Float32Array(count * 3);
        const red = [0.94, 0.0, 0.0];
        const green = [0.27, 0.8, 0.0];

        for (let i = 0; i < count; i++) {
            position.set([(Math.random() - 0.5) * box.x, Math.random() * box.y, (Math.random() - 0.5) * box.z], i * 3);
            colour.set(Math.random() < 0.5 ? red : green, i * 3);
            seed.set([Math.random() * 6.28, 0.15 + Math.random() * 0.35, 0.6 + Math.random() * 1.6], i * 3);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
        geometry.setAttribute('colour', new THREE.BufferAttribute(colour, 3));
        geometry.setAttribute('seed', new THREE.BufferAttribute(seed, 3)); // phase, speed, size

        this.material = new THREE.ShaderMaterial({
            uniforms: { time: { value: 0 }, pixels: { value: 1 }, level: { value: 0 } },
            vertexShader: `
                attribute vec3 colour;
                attribute vec3 seed;
                uniform float time;
                uniform float pixels;
                uniform float level;
                varying vec3 vColour;
                varying float vFade;
                void main() {
                    float t = time * seed.y + seed.x;
                    vec3 p = position + vec3(sin(t) * 1.4, sin(t * 0.7 + seed.x) * 0.9, cos(t * 0.8) * 1.4);
                    vec4 view = modelViewMatrix * vec4(p, 1.0);
                    vColour = colour;
                    vFade = 0.45 + 0.35 * sin(t * 1.9) + level * 0.5;
                    gl_PointSize = seed.z * pixels * (1.0 + level) * 60.0 / max(-view.z, 1.0);
                    gl_Position = projectionMatrix * view;
                }
            `,
            fragmentShader: `
                varying vec3 vColour;
                varying float vFade;
                void main() {
                    float d = length(gl_PointCoord - 0.5);
                    float soft = smoothstep(0.5, 0.0, d);
                    gl_FragColor = vec4(vColour, soft * soft * vFade);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        this.points = new THREE.Points(geometry, this.material);
        this.points.frustumCulled = false;
        this.el.setObject3D('dust', this.points);
    },

    tick(time) {
        const uniforms = this.material.uniforms;
        uniforms.time.value = time / 1000;
        uniforms.pixels.value = this.el.sceneEl.renderer.getPixelRatio();
        uniforms.level.value = this.el.sceneEl.systems['music-level'].value;
    },

    remove() {
        this.points.geometry.dispose();
        this.material.dispose();
        this.el.removeObject3D('dust');
    },
});

// ----------------------------------------------------------------- swim ----
// Carries whatever it is on round a wide circle, rising and falling a
// little, always nose-first. The fish are built with their noses along +z,
// which is the way lookAt() points things.
AFRAME.registerComponent('swim', {
    schema: {
        centre: { type: 'vec3', default: { x: 0, y: 0, z: -60 } },
        radius: { default: 150 },
        height: { default: 50 },
        lap: { default: 160 },      // seconds for one circuit; negative swims the other way
        start: { default: 0 },      // where on the circle to begin, in degrees
        bob: { default: 5 },
    },

    init() {
        this.ahead = new THREE.Vector3();
    },

    place(angle, t, into) {
        const { centre, radius, height, bob } = this.data;
        into.set(
            centre.x + Math.cos(angle) * radius,
            centre.y + height + Math.sin(t * 0.35 + this.data.start) * bob,
            centre.z + Math.sin(angle) * radius
        );
    },

    tick(time) {
        const t = time / 1000;
        const turn = (Math.PI * 2) / this.data.lap;
        const angle = THREE.MathUtils.degToRad(this.data.start) + t * turn;

        this.place(angle, t, this.el.object3D.position);
        this.place(angle + Math.sign(turn) * 0.02, t + 0.3, this.ahead);
        this.el.object3D.lookAt(this.ahead);
    },
});

// ---------------------------------------------------------------- throb ----
// A strawberry that is switched on beats gently, and harder with the music.
AFRAME.registerComponent('throb', {
    schema: { on: { default: false } },
    init() {
        this.size = 1;
    },
    tick(time) {
        const level = this.el.sceneEl.systems['music-level'].value;
        const target = this.data.on ? 1.08 + 0.06 * Math.sin(time / 260) + level * 0.14 : 1;
        this.size += (target - this.size) * 0.2;
        this.el.object3D.scale.setScalar(this.size);
    },
});

// ------------------------------------------------------- strawberry skin ----
// Painted once and shared by all four: red, darker towards the tip, with
// rows of pale seeds.
let strawberrySkin;

function paintStrawberry() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, '#ff3b30');
    g.addColorStop(0.55, '#e50b0b');
    g.addColorStop(1, '#8b0c14');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 256);

    ctx.fillStyle = '#ffe9a8';
    for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 16; col++) {
            const x = col * 32 + (row % 2 ? 16 : 0);
            const y = 28 + row * 32;
            ctx.beginPath();
            ctx.ellipse(x, y, 3, 5, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

AFRAME.registerComponent('strawberry-skin', {
    init() {
        strawberrySkin = strawberrySkin || paintStrawberry();
        const apply = () => {
            const mesh = this.el.getObject3D('mesh');
            if (!mesh) return;
            mesh.material.map = strawberrySkin;
            mesh.material.needsUpdate = true;
        };
        apply();
        this.el.addEventListener('object3dset', apply);
    },
});
