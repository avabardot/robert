// The night over Robert's world: the dome itself, the stars, and the moon.
// Nothing here is downloaded. The old world borrowed its moon and cloud
// pictures from aframe.io; these are painted by the graphics card instead.
import AFRAME from 'aframe';

const THREE = AFRAME.THREE;

// ---------------------------------------------------------------- dome ----
// One big sphere seen from the inside. Teal at the horizon, black overhead,
// thin green cloud drifting across, and a wash of light round the moon.
AFRAME.registerShader('night-sky', {
    schema: {
        time: { type: 'time', is: 'uniform' },
        moon: { type: 'vec3', is: 'uniform', default: { x: -0.39, y: 0.35, z: -0.84 } },
    },
    vertexShader: `
        varying vec3 vDir;
        void main() {
            vDir = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform vec3 moon;
        varying vec3 vDir;

        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p) {
            vec2 i = floor(p), f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                       mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
        }
        float fbm(vec2 p) {
            float v = 0.0, a = 0.5;
            for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
            return v;
        }

        void main() {
            vec3 d = normalize(vDir);
            float up = clamp(d.y, -1.0, 1.0);

            vec3 zenith = vec3(0.004, 0.012, 0.024);
            vec3 horizon = vec3(0.016, 0.105, 0.112);
            vec3 colour = mix(horizon, zenith, pow(smoothstep(-0.08, 0.75, up), 0.6));

            // Cloud: noise on a flat sheet overhead, sliding very slowly.
            vec2 sheet = d.xz / (abs(d.y) + 0.25);
            float drift = time * 0.00001;
            float cloud = fbm(sheet * 1.6 + vec2(drift * 6.0, drift * 2.0));
            cloud = smoothstep(0.5, 0.85, cloud) * smoothstep(0.02, 0.35, up);
            colour += vec3(0.25, 0.72, 0.6) * cloud * 0.1;

            float toMoon = max(dot(d, normalize(moon)), 0.0);
            colour += vec3(0.55, 0.85, 0.82) * (pow(toMoon, 40.0) * 0.2 + pow(toMoon, 6.0) * 0.05);

            gl_FragColor = vec4(colour, 1.0);
        }
    `,
});

// --------------------------------------------------------------- stars ----
// A few hundred points scattered over the dome. Each has its own size, its
// own colour, and its own slow rhythm, so they never pulse together: the
// twinkle is a sine wave six to sixteen seconds long, and only ever dims a
// star by about a third.
AFRAME.registerComponent('star-field', {
    schema: {
        count: { default: 900 },
        radius: { default: 800 },
    },

    init() {
        const { count, radius } = this.data;
        const position = new Float32Array(count * 3);
        const colour = new Float32Array(count * 3);
        const size = new Float32Array(count);
        const rhythm = new Float32Array(count * 2); // speed, phase

        const tints = [
            [1.0, 0.97, 0.97], [1.0, 0.97, 0.97], [1.0, 0.97, 0.97], // the white of Robert's tubes
            [0.78, 0.96, 0.96],                                      // pale glass
            [1.0, 0.8, 0.8],                                         // a blush of his red
        ];

        for (let i = 0; i < count; i++) {
            // Even over the upper dome, thinning out just below the horizon.
            const y = Math.random() * 1.04 - 0.04;
            const ring = Math.sqrt(1 - y * y);
            const turn = Math.random() * Math.PI * 2;
            position.set([Math.cos(turn) * ring * radius, y * radius, Math.sin(turn) * ring * radius], i * 3);

            colour.set(tints[Math.floor(Math.random() * tints.length)], i * 3);

            // Mostly small, with the odd bright one.
            const bright = Math.random();
            size[i] = bright > 0.96 ? 6.5 : bright > 0.8 ? 4.2 : 2.1 + Math.random() * 1.4;

            rhythm[i * 2] = 0.4 + Math.random() * 0.65;
            rhythm[i * 2 + 1] = Math.random() * Math.PI * 2;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
        geometry.setAttribute('colour', new THREE.BufferAttribute(colour, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(size, 1));
        geometry.setAttribute('rhythm', new THREE.BufferAttribute(rhythm, 2));

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                pixels: { value: 1 },
            },
            vertexShader: `
                attribute vec3 colour;
                attribute float size;
                attribute vec2 rhythm;
                uniform float time;
                uniform float pixels;
                varying vec3 vColour;
                varying float vGlow;
                void main() {
                    float twinkle = 0.5 + 0.5 * sin(time * rhythm.x + rhythm.y);
                    vGlow = 0.66 + 0.34 * twinkle;
                    vColour = colour;
                    gl_PointSize = size * pixels * (0.9 + 0.2 * twinkle);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vColour;
                varying float vGlow;
                void main() {
                    float d = length(gl_PointCoord - 0.5);
                    float core = smoothstep(0.5, 0.0, d);
                    gl_FragColor = vec4(vColour * vGlow, core * core * vGlow);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        this.points = new THREE.Points(geometry, this.material);
        this.points.frustumCulled = false;
        this.el.setObject3D('stars', this.points);
    },

    tick(time) {
        this.material.uniforms.time.value = time / 1000;
        this.material.uniforms.pixels.value = this.el.sceneEl.renderer.getPixelRatio();
    },

    remove() {
        this.points.geometry.dispose();
        this.material.dispose();
        this.el.removeObject3D('stars');
    },
});

// ---------------------------------------------------------------- moon ----
// The moon's face is drawn once onto a canvas: a pale disc, a few grey seas,
// and a scatter of craters, each a dark ring with a bright lip.
function paintMoon() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#e4efec';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const blot = (x, y, r, colour) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, colour);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    };

    // The texture wraps round the sphere, so anything near the left or right
    // edge is drawn a second time on the other side to hide the seam.
    const wrapped = (x, y, r, draw) => {
        draw(x, y, r);
        if (x < r) draw(x + canvas.width, y, r);
        if (x > canvas.width - r) draw(x - canvas.width, y, r);
    };

    for (let i = 0; i < 26; i++) {
        wrapped(Math.random() * canvas.width, 60 + Math.random() * 390, 40 + Math.random() * 110,
            (x, y, r) => blot(x, y, r, 'rgba(120, 150, 150, 0.26)'));
    }
    for (let i = 0; i < 90; i++) {
        wrapped(Math.random() * canvas.width, 30 + Math.random() * 450, 4 + Math.random() * 20, (x, y, r) => {
            blot(x, y, r, 'rgba(70, 100, 104, 0.5)');
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
            ctx.lineWidth = Math.max(1, r * 0.14);
            ctx.beginPath();
            ctx.arc(x, y, r * 0.8, Math.PI * 1.1, Math.PI * 1.9);
            ctx.stroke();
        });
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

AFRAME.registerComponent('moon-face', {
    init() {
        this.texture = paintMoon();
        const apply = () => {
            const mesh = this.el.getObject3D('mesh');
            if (!mesh) return;
            mesh.material.map = this.texture;
            mesh.material.needsUpdate = true;
        };
        apply();
        this.el.addEventListener('object3dset', apply);
        this.el.addEventListener('materialtextureloaded', apply);
    },
    remove() {
        this.texture.dispose();
    },
});

// A soft round glow that always faces whoever is looking. The moon wears a
// big one; it swells a little with the music (see level.js).
function paintGlow(colour) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, colour);
    g.addColorStop(0.25, colour.replace(/[\d.]+\)$/, '0.35)'));
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
}

AFRAME.registerComponent('halo', {
    schema: {
        colour: { default: 'rgba(190, 240, 235, 0.9)' },
        size: { default: 4 },
        swell: { default: 0 },
    },
    init() {
        this.texture = paintGlow(this.data.colour);
        this.material = new THREE.SpriteMaterial({
            map: this.texture,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
        this.sprite = new THREE.Sprite(this.material);
        this.sprite.scale.setScalar(this.data.size);
        this.el.setObject3D('halo', this.sprite);
    },
    tick() {
        if (!this.data.swell) return;
        const level = this.el.sceneEl.systems['music-level'].value;
        this.sprite.scale.setScalar(this.data.size * (1 + level * this.data.swell));
    },
    remove() {
        this.texture.dispose();
        this.material.dispose();
        this.el.removeObject3D('halo');
    },
});
