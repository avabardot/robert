import React, { useEffect, useRef } from 'react';
import AFRAME from 'aframe';
import './engine/sky';
import './engine/sea';
import './engine/life';
import './engine/signs';

// Robert's world, laid out. The things in it are Robert's originals - the
// island of flowers, the four cones with strawberries on, the dust, the moon
// over the ocean, the giant button in the sky, the exit that says NO EXIT -
// rebuilt on A-Frame 1.8 so that nothing is fetched from anyone else's
// server. New arrivals: stars, fish, an hourglass, and reeds in the sea that
// dance when there is music.

const FLOWERS = '/assets/flowers-1024.jpg';

// Only these can be pointed at. The old world tested the pointer against
// every object in the scene on every frame.
const POINTABLE = 'objects: .clickable; far: 500';

// A strawberry on its cone. Hovering lifts it; while it is on, it throbs.
function Strawberry({ position, rotation, label, on, onPick }) {
    return (
        <a-entity
            position={position}
            rotation={rotation}
            onClick={onPick}
            animation__lift="property: scale; to: 1.12 1.12 1.12; dur: 160; easing: easeOutQuad; startEvents: mouseenter"
            animation__settle="property: scale; to: 1 1 1; dur: 240; easing: easeOutQuad; startEvents: mouseleave"
        >
            <a-entity
                class="clickable"
                geometry="primitive: cone; height: 2; radiusBottom: 0.1; radiusTop: 1"
                material={`src: ${FLOWERS}; transparent: true; color: #a3d1ab`}
            ></a-entity>
            <a-entity
                class="clickable"
                position="0 1 0"
                geometry="primitive: sphere; radius: 0.6"
                material="color: #ffffff; emissive: #4a060a; emissiveIntensity: 0.6; roughness: 0.55"
                strawberry-skin=""
                throb={`on: ${on}`}
            ></a-entity>
            <a-entity position="0 2.2 0" label={`value: ${label}; height: 0.3; turns: true`}></a-entity>
        </a-entity>
    );
}

// A fish, out of the same cones and spheres as everything else here, with a
// big round eye each side like Robert's. Nose along +z.
function Fish({ swim, size = 1, body = '#e50b0b', fin = '#8b0c14', wag = 900 }) {
    const skin = (colour) => `color: ${colour}; emissive: ${colour}; emissiveIntensity: 0.35; roughness: 0.7; flatShading: true`;
    return (
        <a-entity swim={swim}>
            <a-entity scale={`${size} ${size} ${size}`}>
                <a-entity geometry="primitive: sphere; radius: 1; segmentsWidth: 14; segmentsHeight: 10" scale="0.55 0.85 1.6" material={skin(body)}></a-entity>
                {/* tail: a flattened cone on a hinge that swings from side to side */}
                <a-entity
                    position="0 0 -1.35"
                    animation={`property: rotation; from: 0 -24 0; to: 0 24 0; dir: alternate; loop: true; dur: ${wag}; easing: easeInOutSine`}
                >
                    <a-entity position="0 0 -0.75" rotation="90 0 0" scale="0.14 1 1" geometry="primitive: cone; height: 1.5; radiusBottom: 1.05; radiusTop: 0.05; segmentsRadial: 10" material={skin(fin)}></a-entity>
                </a-entity>
                {/* back fin */}
                <a-entity position="0 0.85 -0.1" rotation="-25 0 0" scale="0.1 1 1" geometry="primitive: cone; height: 0.9; radiusBottom: 0.7; radiusTop: 0.02; segmentsRadial: 8" material={skin(fin)}></a-entity>
                {[1, -1].map((side) => (
                    <a-entity key={side} position={`${0.4 * side} 0.22 0.9`}>
                        <a-entity geometry="primitive: sphere; radius: 0.27; segmentsWidth: 10; segmentsHeight: 8" material="shader: flat; color: #fff7f7"></a-entity>
                        <a-entity position={`${0.17 * side} 0 0.08`} geometry="primitive: sphere; radius: 0.13; segmentsWidth: 8; segmentsHeight: 6" material="shader: flat; color: #010000"></a-entity>
                    </a-entity>
                ))}
            </a-entity>
        </a-entity>
    );
}

export default function WorldScene({ music, singing, caption, inVR, level, onReady, onEnterVR, onExitVR, onPlay, onStop, onSing, onHush, onLeave }) {
    const scene = useRef(null);
    const rig = useRef(null);
    const camera = useRef(null);
    const subtitle = useRef(null);

    useEffect(() => {
        const el = scene.current;
        const ready = () => {
            // Start out looking a little up and to the left, at the moon,
            // which is how Robert framed it.
            // Let the world hear the music (see 'music-level' in engine/sea.js).
            el.systems['music-level'].source = level;

            const look = camera.current && camera.current.components['look-controls'];
            if (look) {
                const narrow = window.innerWidth < window.innerHeight;
                look.pitchObject.rotation.x = AFRAME.THREE.MathUtils.degToRad(7);
                look.yawObject.rotation.y = AFRAME.THREE.MathUtils.degToRad(narrow ? 2 : 9.4);
            }
            onReady();
        };
        if (el.hasLoaded) ready();
        else el.addEventListener('loaded', ready, { once: true });

        // All four strawberries should be in view to begin with. On a tall,
        // narrow screen that means standing further back.
        const standBack = () => {
            const shape = window.innerWidth / window.innerHeight;
            const z = shape < 0.75 ? 11.5 : shape < 1.15 ? 8 : 5;
            if (rig.current && !el.is('vr-mode')) rig.current.object3D.position.z = z;
        };
        standBack();
        window.addEventListener('resize', standBack);

        el.addEventListener('enter-vr', onEnterVR);
        el.addEventListener('exit-vr', onExitVR);
        return () => {
            window.removeEventListener('resize', standBack);
            el.removeEventListener('loaded', ready);
            el.removeEventListener('enter-vr', onEnterVR);
            el.removeEventListener('exit-vr', onExitVR);
        };
        // The handlers never change; this is set up once.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // In a headset the web page cannot be seen, so the caption is hung in the
    // air in front of you instead. (Set as an object, not a string: lyrics
    // have punctuation in them that A-Frame would read as its own.)
    useEffect(() => {
        if (!subtitle.current) return;
        subtitle.current.setAttribute('label', { value: caption, height: 0.11, wrap: 30 });
        subtitle.current.setAttribute('visible', Boolean(inVR && caption));
    }, [caption, inVR]);

    // A phone in a cardboard viewer has no controller: look at something and
    // wait. Headsets with controllers get lasers instead.
    const gaze = inVR && AFRAME.utils.device.isMobile() && !AFRAME.utils.device.isMobileVR();

    return (
        <a-scene
            ref={scene}
            renderer="antialias: auto; maxCanvasWidth: 2560; maxCanvasHeight: 1600; highRefreshRate: true"
            loading-screen="enabled: false"
            cursor="rayOrigin: mouse; fuse: false"
            raycaster={POINTABLE}
            xr-mode-ui="XRMode: vr"
        >
            {/* ------------------------------------------------ you ---- */}
            <a-entity ref={rig} position="0 0 5">
                <a-camera ref={camera} position="0 3 0" wasd-controls="acceleration: 28">
                    <a-entity ref={subtitle} position="0 -0.42 -1.6" visible="false"></a-entity>
                    {gaze && (
                        <a-entity
                            position="0 0 -1"
                            geometry="primitive: ring; radiusInner: 0.012; radiusOuter: 0.02"
                            material="shader: flat; color: #fff7f7"
                            cursor="fuse: true; fuseTimeout: 1400"
                            raycaster={POINTABLE}
                        ></a-entity>
                    )}
                </a-camera>
                {inVR && !gaze && (
                    <>
                        <a-entity laser-controls="hand: left" raycaster={POINTABLE}></a-entity>
                        <a-entity laser-controls="hand: right" raycaster={POINTABLE}></a-entity>
                    </>
                )}
            </a-entity>

            {/* ---------------------------------------------- light ---- */}
            <a-entity light="type: ambient; color: #6fb9b4; intensity: 0.7"></a-entity>
            <a-entity light="type: directional; color: #dff5f2; intensity: 2.4" position="-100 88 -215"></a-entity>
            <a-entity light="type: directional; color: #fdfdfc; intensity: 1.5" position="0 88 215"></a-entity>

            {/* ------------------------------------------------ sky ---- */}
            <a-entity geometry="primitive: sphere; radius: 900; segmentsWidth: 32; segmentsHeight: 16" material="shader: night-sky; side: back"></a-entity>
            <a-entity star-field=""></a-entity>
            <a-entity
                position="-100.78426 89.84657 -215.78403"
                geometry="primitive: sphere; radius: 15; segmentsWidth: 48; segmentsHeight: 32"
                material="shader: flat; color: #ffffff"
                moon-face=""
                animation="property: rotation; to: 0 360 0; dur: 900000; loop: true; easing: linear"
            >
                <a-entity halo="size: 120; swell: 0.35"></a-entity>
            </a-entity>

            {/* The giant button in the sky, exactly as Robert left it. */}
            <a-entity position="30 40 -100" geometry="primitive: torus; radiusTubular: 0.1" material="color: #a93232" scale="5 5 5" rotation="30 -10 -25">
                <a-entity geometry="primitive: sphere; phiLength: 180" material="color: #6d1212" position="0 0 -0.4"></a-entity>
                <a-entity position="-0.3 -0.2 0.6" geometry="primitive: cone; height: 0.2; radiusBottom: 0.15" rotation="-95 190 180" material="blending: subtractive; opacity: 0"></a-entity>
                <a-entity position="0.3 -0.2 0.6" geometry="primitive: cone; height: 0.2; radiusBottom: 0.15" rotation="-95 190 180" material="blending: subtractive; opacity: 0"></a-entity>
                <a-entity position="-0.3 0.2 0.61" geometry="primitive: cone; height: 0.2; radiusBottom: 0.15" rotation="-95 190 180" material="blending: subtractive; opacity: 0"></a-entity>
                <a-entity position="0.3 0.2 0.6" geometry="primitive: cone; height: 0.2; radiusBottom: 0.15" rotation="-95 190 180" material="blending: subtractive; opacity: 0"></a-entity>
            </a-entity>

            {/* An hourglass, turning. "I do not fear Death only Time." Two
                cones tip to tip, with a smaller red pair inside for the sand. */}
            <a-entity position="92 46 -150" scale="7 7 7" rotation="0 0 12" animation="property: rotation; from: 0 0 12; to: 0 360 12; dur: 120000; loop: true; easing: linear">
                <a-entity position="0 0.75 0" rotation="180 0 0" geometry="primitive: cone; height: 1.5; radiusBottom: 0.95; radiusTop: 0.06; segmentsRadial: 20" material="color: #72e9e9; transparent: true; opacity: 0.28; emissive: #0c8b83; emissiveIntensity: 0.5; side: double"></a-entity>
                <a-entity position="0 -0.75 0" geometry="primitive: cone; height: 1.5; radiusBottom: 0.95; radiusTop: 0.06; segmentsRadial: 20" material="color: #72e9e9; transparent: true; opacity: 0.28; emissive: #0c8b83; emissiveIntensity: 0.5; side: double"></a-entity>
                <a-entity position="0 0.42 0" rotation="180 0 0" geometry="primitive: cone; height: 0.8; radiusBottom: 0.5; radiusTop: 0.03; segmentsRadial: 16" material="shader: flat; color: #e50b0b"></a-entity>
                <a-entity position="0 -1.12 0" geometry="primitive: cone; height: 0.7; radiusBottom: 0.72; radiusTop: 0.03; segmentsRadial: 16" material="shader: flat; color: #e50b0b"></a-entity>
                <a-entity position="0 1.56 0" geometry="primitive: cylinder; height: 0.14; radius: 1.1; segmentsRadial: 20" material="color: #8b0c14; emissive: #8b0c14; emissiveIntensity: 0.4"></a-entity>
                <a-entity position="0 -1.56 0" geometry="primitive: cylinder; height: 0.14; radius: 1.1; segmentsRadial: 20" material="color: #8b0c14; emissive: #8b0c14; emissiveIntensity: 0.4"></a-entity>
            </a-entity>

            {/* ----------------------------------------------- fish ---- */}
            {/* One swimming slowly across the sky in front of the moon... */}
            <Fish size={7} swim="radius: 170; height: 62; lap: 170; start: 205; bob: 7" />
            {/* ...and three small ones a long way off, going the other way. */}
            <Fish size={3.2} body="#0be5e5" fin="#0c8b83" wag={700} swim="radius: 330; height: 30; lap: -260; start: 300; bob: 4" />
            <Fish size={2.6} body="#72e9e9" fin="#0c8b83" wag={640} swim="radius: 342; height: 37; lap: -260; start: 306; bob: 5" />
            <Fish size={2.9} body="#66ff66" fin="#0c8b83" wag={760} swim="radius: 322; height: 24; lap: -260; start: 311; bob: 3" />

            {/* ---------------------------------------------- water ---- */}
            <a-entity
                position="0 -2 -25"
                rotation="-90 0 0"
                geometry="primitive: plane; width: 1000; height: 1000; segmentsWidth: 160; segmentsHeight: 160"
                material="shader: night-sea"
                sea-listens=""
            ></a-entity>
            <a-entity position="0 -2.6 -48" sea-reeds=""></a-entity>

            {/* ---------------------------------------------- island ---- */}
            <a-entity
                position="0 -0.84073 0"
                rotation="180 160 0"
                geometry="primitive: cone; height: 2; radiusBottom: 5"
                material={`src: ${FLOWERS}; flatShading: true; roughness: 1; emissive: #010000`}
            ></a-entity>
            <a-entity position="0 2.25 -6" dust=""></a-entity>

            <Strawberry position="-3.4 0.859 0" label="HUSH" on={false} onPick={onHush} />
            <Strawberry position="-1.2 0.859 -0.5" label="SING" on={singing} onPick={onSing} />
            <Strawberry position="1.2 0.859 -0.5" rotation="0 180 0" label="PLAY" on={music} onPick={onPlay} />
            <Strawberry position="3.4 0.859 0" rotation="0 180 0" label="STOP" on={false} onPick={onStop} />

            {/* ------------------------------------------- the way out ---- */}
            {/* Behind you, where Robert put it, and still claiming otherwise. */}
            <a-entity position="0 10 44" rotation="0 180 0">
                <a-entity id="way-home" class="clickable" onClick={onLeave} geometry="primitive: circle; radius: 9; segments: 64" material="shader: glass-portal; side: double"></a-entity>
                <a-entity position="0 11.6 0" label="value: NO EXIT; height: 2.6"></a-entity>
                <a-entity position="0 -10.6 0" label="value: the way home; height: 1.3; colour: #72e9e9; glow: #0c8b83"></a-entity>
            </a-entity>
        </a-scene>
    );
}
