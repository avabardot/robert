import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../services/GlobalState';
import './StainedGlass.css';
import './Roundel.css';

// A roundel is a small round window of its own, hung outside Robert's: one
// thing from his life, drawn the way he is drawn. Empty divs, a border-radius
// for the outline, and the same panes and lead as his window for the glass.
//
// Like the big window it is dark while he sleeps and lit once he wakes.
// Once lit, a roundel is also a way in: point at it and the picture is
// pulled down a spinning portal that leads somewhere (the strawberry leads to
// Robert's world). Hide them all with ?roundels=off.

export function roundelsWanted() {
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

const PICTURES = {
    strawberry: { Picture: Strawberry, to: '/world', label: "Enter Robert's world" },
};

// How long the portal spins before a tap carries you through it.
const TAP_DELAY = 1300;

export default function Roundel({ name }) {
    const [state] = useStoreContext();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const leaving = useRef(null);

    useEffect(() => () => clearTimeout(leaving.current), []);

    const roundel = PICTURES[name];
    if (!roundel || !roundelsWanted()) return null;

    const { Picture, to, label } = roundel;
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
        leaving.current = setTimeout(() => navigate(to), TAP_DELAY);
    }

    const className = [
        'roundel',
        `roundel--${name}`,
        awake ? 'glass--awake roundel--live' : 'glass--asleep',
        open ? 'roundel--open' : '',
    ].join(' ');

    return (
        <Link
            to={to}
            className={className}
            onClick={enter}
            aria-label={label}
            aria-disabled={!awake}
            tabIndex={awake ? 0 : -1}
        >
            <div className="glass-light roundel-glass">
                {/* Sky: nine pieces, cut into a circle by the roundel itself. */}
                <div className="roundel-field">
                    {['teal', 'aqua', 'teal', 'aqua', 'pale', 'aqua', 'teal', 'cyan', 'teal'].map(pane)}
                </div>

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
