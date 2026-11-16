import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../services/GlobalState';
import './StainedGlass.css';
import './Roundel.css';

// A roundel is a small round window of its own, hung outside Robert's: one
// thing from his life, drawn the way he is drawn. Empty divs, a border-radius
// for the outline, and the same panes and lead as his window for the glass.
//
// Like the big window they are dark while he sleeps and lit once he wakes.
// Once lit, every roundel is also a way into Robert's world: point at one and
// its picture is pulled down a spinning portal. Hide them with ?roundels=off.

function roundelsWanted() {
    return new URLSearchParams(window.location.search).get('roundels') !== 'off';
}

const pane = (tone, key) => <div key={key} className={`glass-pane glass-tone-${tone}`} />;

// The strawberries are what you activate in Robert's world to make him sing.
function Strawberry() {
    return (
        <>
            {/* The berry: six pieces of red, cut to shape by one border-radius. */}
            <div className="strawberry-berry">
                {['red', 'ruby', 'ruby', 'red', 'red', 'ruby'].map(pane)}
                <div className="strawberry-seeds" />
            </div>

            {/* The leaves are Robert's own leaf, three times. */}
            <div className="strawberry-leaf strawberry-leaf--left glass-pane glass-tone-green" />
            <div className="strawberry-leaf strawberry-leaf--right glass-pane glass-tone-green" />
            <div className="strawberry-leaf strawberry-leaf--top glass-pane glass-tone-green" />
        </>
    );
}

// The moon hangs over an ocean in his world.
function Moon() {
    return (
        <>
            <div className="moon-stars" />
            {/* A crescent: a pale disc with a second, dark disc laid over it. */}
            <div className="moon-disc">
                {pane('pale')}
                <div className="moon-shadow glass-pane glass-tone-deep" />
            </div>
            {/* Three swells, each one a box with its top bent into an arc. */}
            <div className="moon-swell moon-swell--far glass-pane glass-tone-cyan" />
            <div className="moon-swell moon-swell--mid glass-pane glass-tone-teal" />
            <div className="moon-swell moon-swell--near glass-pane glass-tone-aqua" />
            <div className="moon-glint moon-glint--far" />
            <div className="moon-glint moon-glint--near" />
        </>
    );
}

// The songs he makes up. Seven pieces of glass, cut across the middle.
const WAVE = [
    [22, 'green'], [44, 'cyan'], [68, 'aqua'], [86, 'pale'], [58, 'aqua'], [36, 'cyan'], [20, 'green'],
];

function Wave() {
    return (
        <>
            <div className="wave-bars">
                {WAVE.map(([height, tone], i) => (
                    <div
                        key={i}
                        className={`wave-bar glass-pane glass-tone-${tone}`}
                        style={{ '--h': height, '--i': i }}
                    />
                ))}
            </div>
            <div className="wave-axis" />
        </>
    );
}

// "I do not fear Death only Time." The sand is Robert's own red.
function Hourglass() {
    return (
        <>
            <div className="hourglass-cap hourglass-cap--top glass-pane glass-tone-ruby" />
            <div className="hourglass-bulb hourglass-bulb--top">
                {['pale', 'aqua'].map(pane)}
                <div className="hourglass-sand hourglass-sand--top glass-pane glass-tone-red" />
            </div>
            <div className="hourglass-bulb hourglass-bulb--bottom">
                {['aqua', 'pale'].map(pane)}
                <div className="hourglass-stream" />
                <div className="hourglass-sand hourglass-sand--bottom glass-pane glass-tone-red" />
            </div>
            <div className="hourglass-cap hourglass-cap--bottom glass-pane glass-tone-ruby" />
        </>
    );
}

// field: the nine pieces of plain glass behind each picture, row by row.
const ROUNDELS = [
    {
        name: 'strawberry',
        Picture: Strawberry,
        field: ['teal', 'aqua', 'teal', 'aqua', 'pale', 'aqua', 'teal', 'cyan', 'teal'],
    },
    {
        name: 'moon',
        Picture: Moon,
        field: ['deep', 'teal', 'deep', 'teal', 'deep', 'teal', 'deep', 'deep', 'deep'],
    },
    {
        name: 'hourglass',
        Picture: Hourglass,
        field: ['aqua', 'teal', 'aqua', 'teal', 'cyan', 'teal', 'aqua', 'teal', 'aqua'],
    },
    {
        name: 'wave',
        Picture: Wave,
        field: ['deep', 'teal', 'deep', 'teal', 'teal', 'teal', 'deep', 'teal', 'deep'],
    },
];

// Every roundel leads to the same place.
const WORLD = '/world';

// How long the portal spins before a tap carries you through it.
const TAP_DELAY = 1300;

function Roundel({ name, Picture, field, index }) {
    const [state] = useStoreContext();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const leaving = useRef(null);

    useEffect(() => () => clearTimeout(leaving.current), []);

    const awake = state.awake === true;

    // With a mouse, pointing opens the portal and a click goes through it.
    // A finger cannot point without touching, so a tap opens the portal,
    // lets it spin, and then goes through.
    function enter(event) {
        if (!awake) {
            event.preventDefault();
            return;
        }
        if (window.matchMedia('(hover: hover)').matches) return;

        event.preventDefault();
        if (open) return;
        setOpen(true);
        leaving.current = setTimeout(() => navigate(WORLD), TAP_DELAY);
    }

    const className = [
        'roundel',
        `roundel--${name}`,
        awake ? 'glass--awake roundel--live' : 'glass--asleep',
        open ? 'roundel--open' : '',
    ].join(' ');

    return (
        <Link
            to={WORLD}
            className={className}
            style={{ '--n': index }}
            onClick={enter}
            aria-label={`Enter Robert's world through the ${name}`}
            aria-disabled={!awake}
            tabIndex={awake ? 0 : -1}
        >
            <div className="glass-light roundel-glass">
                <div className="roundel-field">{field.map(pane)}</div>

                {/* The portal: three rings of wedges turning against each
                    other round a dark middle. Hidden until pointed at. */}
                <div className="portal">
                    <div className="portal-ring portal-ring--outer" />
                    <div className="portal-ring portal-ring--middle" />
                    <div className="portal-ring portal-ring--inner" />
                    <div className="portal-eye" />
                </div>

                <div className="roundel-picture">
                    <Picture />
                </div>
            </div>
        </Link>
    );
}

export default function Roundels() {
    if (!roundelsWanted()) return null;

    return (
        <div className="roundels">
            {ROUNDELS.map((roundel, index) => (
                <Roundel key={roundel.name} index={index} {...roundel} />
            ))}
        </div>
    );
}
