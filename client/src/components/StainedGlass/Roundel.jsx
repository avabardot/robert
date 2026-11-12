import React from 'react';
import { useStoreContext } from '../../services/GlobalState';
import './StainedGlass.css';
import './Roundel.css';

// A roundel is a small round window of its own, hung outside Robert's: one
// thing from his life, drawn the way he is drawn. Empty divs, a border-radius
// for the outline, and the same panes and lead as his window for the glass.
//
// Like the big window it is dark while he sleeps and lit once he wakes.
// Hide them all with ?roundels=off.

function roundelsWanted() {
    return new URLSearchParams(window.location.search).get('roundels') !== 'off';
}

const pane = (tone, key) => <div key={key} className={`glass-pane glass-tone-${tone}`} />;

// The strawberries are what you activate in Robert's world to make him sing.
function Strawberry() {
    return (
        <>
            {/* Sky: nine pieces, cut into a circle by the roundel itself. */}
            <div className="roundel-field">
                {['teal', 'aqua', 'teal', 'aqua', 'pale', 'aqua', 'teal', 'cyan', 'teal'].map(pane)}
            </div>

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
    strawberry: Strawberry,
};

export default function Roundel({ name }) {
    const [state] = useStoreContext();
    const Picture = PICTURES[name];

    if (!Picture || !roundelsWanted()) return null;

    const lit = state.awake === true ? 'glass--awake' : 'glass--asleep';

    return (
        <div className={`roundel roundel--${name} ${lit}`} aria-hidden="true">
            <div className="glass-light roundel-glass">
                <Picture />
            </div>
        </div>
    );
}
