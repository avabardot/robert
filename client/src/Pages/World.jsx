import React, { Component, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WorldScene from '../world/WorldScene';
import WorldVeil from '../world/WorldVeil';
import { createMusic, unlockSound } from '../world/sound/music';
import { createVoice } from '../world/sound/voice';
import '../world/World.css';

// Robert's world.
//
// This page, A-Frame, Tone and RiTa are all fetched only when someone comes
// here (see App.jsx), so the home page does not carry them. The page keeps
// track of what Robert is doing; world/WorldScene.jsx draws it.

// A-Frame 1.8 draws with WebGL 2. Nearly everything has it, but a browser
// that does not should be told so, not shown a black page.
function canDraw() {
    try {
        return Boolean(document.createElement('canvas').getContext('webgl2'));
    } catch (err) {
        return false;
    }
}

function Stuck({ why }) {
    return (
        <WorldVeil note="Robert's world could not open">
            <p style={{ maxWidth: '26em', margin: 0, textAlign: 'center', lineHeight: 1.45 }}>{why}</p>
            <a href="/">Back to Robert</a>
        </WorldVeil>
    );
}

// If anything inside the world throws while it is being built, show that
// rather than leaving a blank page.
class Guard extends Component {
    state = { broke: false };
    static getDerivedStateFromError() {
        return { broke: true };
    }
    componentDidCatch(error) {
        console.error("Robert's world fell over", error);
    }
    render() {
        if (this.state.broke) return <Stuck why="Something in it broke while it was being built. Reloading the page usually brings it back." />;
        return this.props.children;
    }
}

const touchOnly = () => window.matchMedia('(hover: none)').matches;

export default function World() {
    const navigate = useNavigate();
    const [able] = useState(canDraw);
    const [ready, setReady] = useState(false);     // the world has been built
    const [begun, setBegun] = useState(false);     // the visitor has pressed Begin
    const [inVR, setInVR] = useState(false);
    const [music, setMusic] = useState(false);
    const [singing, setSinging] = useState(false);
    const [caption, setCaption] = useState('');

    const song = useRef(null);
    const voice = useRef(null);

    useEffect(() => {
        voice.current = createVoice({ onLine: setCaption, onEnd: () => setSinging(false) });

        // Leaving: stop him talking, take the synths down, and undo what
        // A-Frame did to the page so the home page can scroll again.
        return () => {
            voice.current.hush();
            if (song.current) song.current.dispose();
            song.current = null;
            document.documentElement.classList.remove('a-fullscreen');
        };
    }, []);

    const begin = () => {
        unlockSound();
        // iOS will not speak later unless it has spoken once from a tap.
        try {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(''));
        } catch (err) { /* no speech here; captions will do */ }
        setBegun(true);
    };

    // The synths are built the first time they are wanted, not before.
    const play = useCallback(async () => {
        song.current = song.current || createMusic();
        try {
            await song.current.play();
            setMusic(true);
        } catch (err) {
            console.warn('Robert could not start the music', err);
        }
    }, []);
    const stop = useCallback(() => {
        if (song.current) song.current.stop();
        setMusic(false);
    }, []);
    const sing = useCallback(() => {
        voice.current.sing();
        setSinging(true);
    }, []);
    const hush = useCallback(() => voice.current.hush(), []);
    const leave = useCallback(() => navigate('/'), [navigate]);
    const level = useCallback(() => (song.current ? song.current.level() : 0), []);

    if (!able) {
        return <Stuck why="It is drawn with WebGL 2, which this browser does not have switched on. A recent Chrome, Firefox, Edge or Safari will show it." />;
    }

    const how = touchOnly()
        ? 'Drag to look around. Tap a strawberry.'
        : 'Drag to look around, W A S D to move. Click a strawberry.';

    return (
        <Guard>
            <WorldScene
                music={music}
                singing={singing}
                caption={caption}
                inVR={inVR}
                level={level}
                onReady={() => setReady(true)}
                onEnterVR={() => setInVR(true)}
                onExitVR={() => setInVR(false)}
                onPlay={play}
                onStop={stop}
                onSing={sing}
                onHush={hush}
                onLeave={leave}
            />

            {!ready && <WorldVeil />}

            <div className="world-ui">
                {ready && !begun && (
                    <div className="world-begin">
                        <div className="world-card">
                            <h1>Robert&rsquo;s World</h1>
                            <p>Turn your sound on. Robert may sing for you, if you ask the strawberries.</p>
                            <p className="world-how">{how}</p>
                            <p className="world-how">Wearing a headset? Begin, then press the VR button in the corner.</p>
                            <button className="world-button" onClick={begin} autoFocus>Begin</button>
                        </div>
                    </div>
                )}

                {begun && !inVR && (
                    <>
                        <Link className="world-home" to="/">&larr; Home</Link>
                        {caption && <p className="world-caption" aria-live="polite">{caption}</p>}
                        <p className="world-how world-how--floating">{how}</p>
                    </>
                )}
            </div>
        </Guard>
    );
}
