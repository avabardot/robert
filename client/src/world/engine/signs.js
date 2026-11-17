// Words inside the world, and the way out of it.
import AFRAME from 'aframe';

const THREE = AFRAME.THREE;

// ---------------------------------------------------------------- label ----
// A-Frame's own text needs a font file fetched from aframe.io. This writes
// the words onto a canvas with whatever font the page already has (Questrial)
// and hangs that canvas in the world, so the words cannot go missing. They
// are lettered like Robert's neon: near-white with a red glow.
//
// `turns: true` keeps the label facing whoever is looking at it.
const FACE = '"Questrial", system-ui, sans-serif';

AFRAME.registerComponent('label', {
    schema: {
        value: { default: '' },
        height: { default: 0.5 },       // of one line, in metres
        wrap: { default: 0 },           // characters per line; 0 keeps it on one
        colour: { default: '#fff7f7' },
        glow: { default: '#e50b0b' },
        turns: { default: false },
    },

    init() {
        this.canvas = document.createElement('canvas');
        this.texture = new THREE.CanvasTexture(this.canvas);
        this.texture.colorSpace = THREE.SRGBColorSpace;
        this.material = new THREE.MeshBasicMaterial({
            map: this.texture,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
        });
        this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.material);
        this.el.setObject3D('label', this.mesh);
        this.eye = new THREE.Vector3();

        // Draw again once the web font has arrived.
        if (document.fonts && document.fonts.load) {
            document.fonts.load(`64px ${FACE}`).then(() => this.draw(), () => {});
        }
    },

    update() {
        this.draw();
    },

    lines() {
        const { value, wrap } = this.data;
        if (!wrap) return [value];
        const lines = [];
        let line = '';
        for (const word of value.split(/\s+/)) {
            if (line && (line + ' ' + word).length > wrap) {
                lines.push(line);
                line = word;
            } else {
                line = line ? line + ' ' + word : word;
            }
        }
        if (line) lines.push(line);
        return lines.length ? lines : [''];
    },

    draw() {
        if (!this.canvas) return;
        const { colour, glow, height } = this.data;
        const lines = this.lines();
        const size = 96;
        const leading = size * 1.3;
        const ctx = this.canvas.getContext('2d');

        ctx.font = `${size}px ${FACE}`;
        const widest = Math.max(1, ...lines.map((l) => ctx.measureText(l).width));
        this.canvas.width = Math.ceil(widest + size * 1.2);
        this.canvas.height = Math.ceil(lines.length * leading + size * 0.7);

        // Resizing a canvas wipes its settings, so set them again.
        ctx.font = `${size}px ${FACE}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = colour;
        ctx.shadowColor = glow;
        lines.forEach((line, i) => {
            const y = size * 0.35 + leading * (i + 0.5);
            // Twice: a wide soft glow, then a tight bright one.
            ctx.shadowBlur = size * 0.35;
            ctx.fillText(line, this.canvas.width / 2, y);
            ctx.shadowBlur = size * 0.1;
            ctx.fillText(line, this.canvas.width / 2, y);
        });

        // A canvas that changes size needs a fresh texture on the card.
        this.texture.dispose();
        this.texture.needsUpdate = true;

        const tall = height * (this.canvas.height / leading);
        this.mesh.scale.set(tall * (this.canvas.width / this.canvas.height), tall, 1);
    },

    tick() {
        if (!this.data.turns) return;
        const camera = this.el.sceneEl.camera;
        if (!camera) return;
        // lookAt() wants a place in the world, and allows for whatever the
        // label's parents are doing itself.
        camera.getWorldPosition(this.eye);
        this.mesh.lookAt(this.eye);
    },

    remove() {
        this.texture.dispose();
        this.material.dispose();
        this.mesh.geometry.dispose();
        this.el.removeObject3D('label');
        this.canvas = null;
    },
});

// --------------------------------------------------------------- portal ----
// The way home is the same portal that brought you here: three rings of
// glass wedges turning against each other round a dark middle. On the home
// page it is made of CSS conic-gradients; here the same picture is drawn by
// a shader on a flat disc.
AFRAME.registerShader('glass-portal', {
    schema: {
        time: { type: 'time', is: 'uniform' },
        wake: { type: 'number', is: 'uniform', default: 0.6 },
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform float wake;
        varying vec2 vUv;

        const float TURN = 6.2831853;
        const vec3 LEAD = vec3(0.11, 0.04, 0.047);

        // One ring: so many wedges, turning at some speed, in two or three tints.
        vec3 ring(float angle, float wedges, float speed, vec3 a, vec3 b, vec3 c, float leadWidth) {
            float around = fract(angle / TURN + time * 0.001 * speed) * wedges;
            float which = mod(floor(around), 3.0);
            float edge = min(fract(around), 1.0 - fract(around));
            vec3 tint = which < 0.5 ? a : (which < 1.5 ? b : c);
            return mix(LEAD, tint, smoothstep(leadWidth, leadWidth * 1.6, edge));
        }

        void main() {
            vec2 p = vUv * 2.0 - 1.0;
            float r = length(p);
            if (r > 1.0) discard;
            float angle = atan(p.y, p.x) + 3.14159265;

            vec3 teal = vec3(0.05, 0.55, 0.52), cyan = vec3(0.04, 0.9, 0.9);
            vec3 pale = vec3(0.78, 0.96, 0.96), aqua = vec3(0.45, 0.91, 0.91);
            vec3 red = vec3(0.9, 0.04, 0.04), ruby = vec3(0.55, 0.05, 0.08), green = vec3(0.4, 1.0, 0.4);

            vec3 colour;
            if (r > 0.68) {
                colour = ring(angle, 12.0, 0.0625, teal, cyan, teal, 0.03);
            } else if (r > 0.38) {
                colour = ring(angle, 8.0, -0.111, pale, aqua, pale, 0.03);
            } else if (r > 0.16) {
                colour = ring(angle, 6.0, 0.222, red, ruby, green, 0.045);
            } else {
                colour = mix(vec3(0.004, 0.0, 0.0), vec3(0.02, 0.24, 0.23), smoothstep(0.06, 0.16, r));
            }

            // Lead between the rings, and round the rim.
            float joint = min(min(abs(r - 0.68), abs(r - 0.38)), abs(r - 0.16));
            colour = mix(LEAD, colour, smoothstep(0.012, 0.024, joint));
            colour = mix(colour, LEAD, smoothstep(0.955, 0.975, r));

            // Darker towards the middle, like looking down a well.
            colour *= 0.55 + 0.45 * smoothstep(0.1, 0.9, r);

            gl_FragColor = vec4(colour * wake, 1.0);
        }
    `,
});
