import React from 'react';
import { useStoreContext } from '../../services/GlobalState';
import './StainedGlass.css';

// Stained glass for Robert's window: the six empty cells either side of him
// and, behind him, the three he stands in.
//
// Three ways of making glass out of CSS, so they can be compared on the real
// page. Pick one with ?glass=panes | gels | shards | off (default: panes).
// Two more switches, for comparing against how it used to look:
//   ?behind=off - leave the centre column, where Robert stands, unglazed
//   ?bg=pale    - the old pale blue page (handled in Pages/Home.jsx)
//   ?halo=clear - nothing inside the oval round his head (default: one pane)
//
//   panes  - Robert's own technique. A CSS grid of empty divs, a hairline
//            box-shadow for the lead, and his neon box-shadow recipe turned
//            inside out so the light pools *inside* each piece.
//   gels   - no extra elements at all. Hard-stop linear gradients stacked with
//            background-blend-mode: multiply, like overlapping sheets of
//            coloured film. Every line is a lead line.
//   shards - clip-path polygons on a jittered lattice. The lead is simply the
//            dark backing showing through the gaps.

const VARIANTS = ['panes', 'gels', 'shards', 'off'];

function chosenVariant() {
    const asked = new URLSearchParams(window.location.search).get('glass');
    return VARIANTS.includes(asked) ? asked : 'panes';
}

function glassBehindRobert() {
    return new URLSearchParams(window.location.search).get('behind') !== 'off';
}

function haloIsGlass() {
    return new URLSearchParams(window.location.search).get('halo') !== 'clear';
}

// Which third of the lancet each of Robert's outer cells is.
const CELLS = {
    1: { side: 'left', row: 'top' },
    4: { side: 'left', row: 'middle' },
    7: { side: 'left', row: 'bottom' },
    3: { side: 'right', row: 'top' },
    6: { side: 'right', row: 'middle' },
    9: { side: 'right', row: 'bottom' },
    // The column Robert stands in.
    2: { side: 'centre', row: 'top' },
    5: { side: 'centre', row: 'middle' },
    8: { side: 'centre', row: 'bottom' },
};

// ---------------------------------------------------------------- panes ----
// Each piece is "column-start / column-end / row-start / row-end tone" on a
// 6 x 10 grid. Column 1 is the outside edge of the window; the right-hand
// lancet is the same drawing mirrored. Tones are defined in the stylesheet.
const BORDER = [
    '1/2/1/4 deep', '1/2/4/5 ruby', '1/2/5/8 deep', '1/2/8/9 ruby', '1/2/9/11 deep',
];

const PANES = {
    top: [
        ...BORDER,
        '2/7/1/2 teal',
        '2/4/2/5 aqua', '4/7/2/4 pale',
        '4/6/4/7 aqua', '6/7/4/7 teal',
        '2/3/5/11 teal', '3/4/5/8 pale',
        '4/7/7/8 aqua',
        '3/5/8/11 cyan', '5/7/8/10 pale', '5/7/10/11 green',
    ],
    middle: [
        ...BORDER,
        '2/3/1/7 teal', '3/7/1/2 aqua',
        '3/5/2/6 pale', '5/7/2/4 cyan',
        '5/6/4/8 teal', '6/7/4/8 aqua',
        '3/5/6/7 green',
        '2/5/7/8 teal',
        '2/4/8/11 pale', '4/5/8/11 teal', '5/7/8/11 aqua',
    ],
    bottom: [
        ...BORDER,
        '2/4/1/4 cyan', '4/7/1/3 pale',
        '4/5/3/7 teal', '5/7/3/5 aqua',
        '2/4/4/7 pale', '5/7/5/7 teal',
        '2/3/7/10 teal', '3/6/7/9 aqua', '6/7/7/10 teal',
        '3/6/9/10 green',
        '2/7/10/11 teal',
    ],
};

// The centre column is twice as wide (12 x 10) and symmetrical about Robert's
// stem, so only its left half is written down: column 6 runs down the middle
// of him. Pale glass sits closest to him and the green gathers at the bottom,
// where the ground would be.
const HALF_BEHIND = {
    top: [
        '1/3/1/3 teal', '3/7/1/2 aqua',
        '3/5/2/5 aqua', '5/7/2/5 pale',
        '1/2/3/8 teal', '2/3/3/6 aqua', '2/3/6/8 cyan',
        '3/4/5/9 teal', '4/7/5/9 pale',
        '1/3/8/11 teal', '3/5/9/11 aqua', '5/7/9/11 pale',
    ],
    middle: [
        '1/2/1/6 teal', '2/4/1/4 pale', '4/7/1/3 aqua',
        '4/6/3/7 pale', '6/7/3/11 aqua',
        '2/4/4/6 cyan',
        '1/3/6/9 aqua', '3/4/6/11 teal',
        '4/6/7/8 green', '4/6/8/11 pale',
        '1/3/9/11 teal',
    ],
    bottom: [
        '1/3/1/4 pale', '3/7/1/3 aqua',
        '1/2/4/8 teal', '2/3/4/7 cyan',
        '3/5/3/7 aqua', '5/7/3/7 pale',
        '2/3/7/9 aqua',
        '3/5/7/10 teal', '5/7/7/10 aqua',
        '1/2/8/11 teal', '2/3/9/11 green',
        '3/7/10/11 green',
    ],
};

// Unfold a half into the whole. A piece that reaches the middle carries on
// across it as one piece of glass; every other piece gets a twin.
function unfold(half) {
    return half.flatMap((piece) => {
        const [area, tone] = piece.split(' ');
        const [c1, c2, r1, r2] = area.split('/').map(Number);
        if (c2 === 7) return [`${c1}/${14 - c1}/${r1}/${r2} ${tone}`];
        return [piece, `${14 - c2}/${14 - c1}/${r1}/${r2} ${tone}`];
    });
}

const PANES_BEHIND = {
    top: unfold(HALF_BEHIND.top),
    middle: unfold(HALF_BEHIND.middle),
    bottom: unfold(HALF_BEHIND.bottom),
};

function Panes({ row, behind }) {
    return (behind ? PANES_BEHIND : PANES)[row].map((piece, i) => {
        const [area, tone] = piece.split(' ');
        const [c1, c2, r1, r2] = area.split('/');
        return (
            <div
                key={i}
                className={`glass-pane glass-tone-${tone}`}
                style={{ gridArea: `${r1} / ${c1} / ${r2} / ${c2}` }}
            />
        );
    });
}

// --------------------------------------------------------------- shards ----
// A tiny seeded random number generator, so each cell always cuts the same
// way. (Robert could own the seed one day and cut a new window per visit.)
function rng(seed) {
    let s = seed;
    return () => {
        s = (s * 1664525 + 1013904223) % 4294967296;
        return s / 4294967296;
    };
}

const SHARD_TONES = ['teal', 'cyan', 'aqua', 'pale', 'teal', 'deep', 'cyan', 'green', 'aqua', 'ruby'];

function shardsFor(seed) {
    const random = rng(seed);
    const cols = 3;
    const rows = 5;

    // Lattice corners, nudged about. The outside edge stays put so the cell
    // keeps its rectangle.
    const corner = [];
    for (let y = 0; y <= rows; y++) {
        corner.push([]);
        for (let x = 0; x <= cols; x++) {
            const edgeX = x === 0 || x === cols;
            const edgeY = y === 0 || y === rows;
            corner[y].push([
                (x / cols) * 100 + (edgeX ? 0 : (random() - 0.5) * 22),
                (y / rows) * 100 + (edgeY ? 0 : (random() - 0.5) * 13),
            ]);
        }
    }

    const shards = [];
    const add = (points) => {
        const cx = points.reduce((sum, p) => sum + p[0], 0) / points.length;
        const cy = points.reduce((sum, p) => sum + p[1], 0) / points.length;
        shards.push({
            polygon: points.map(([px, py]) => `${px.toFixed(1)}% ${py.toFixed(1)}%`).join(', '),
            origin: `${cx.toFixed(1)}% ${cy.toFixed(1)}%`,
            tone: SHARD_TONES[Math.floor(random() * SHARD_TONES.length)],
        });
    };

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const a = corner[y][x];
            const b = corner[y][x + 1];
            const c = corner[y + 1][x + 1];
            const d = corner[y + 1][x];
            const cut = random();

            // Most pieces stay whole; some are cut corner to corner.
            if (cut < 0.3) { add([a, b, c]); add([a, c, d]); }
            else if (cut < 0.6) { add([a, b, d]); add([b, c, d]); }
            else add([a, b, c, d]);
        }
    }
    return shards;
}

function Shards({ cell }) {
    return shardsFor(cell * 7919).map((shard, i) => (
        <div
            key={i}
            className={`glass-shard glass-tone-${shard.tone}`}
            style={{
                clipPath: `polygon(${shard.polygon})`,
                transformOrigin: shard.origin,
            }}
        />
    ));
}

// ------------------------------------------------------------------------

export default function StainedGlass({ cell }) {
    const [state] = useStoreContext();
    const variant = chosenVariant();
    const { side, row } = CELLS[cell];
    const behind = side === 'centre';

    if (variant === 'off') return null;
    if (behind && !glassBehindRobert()) return null;

    const light = (
        <div className="glass-light">
            {variant === 'panes' && <Panes row={row} behind={behind} />}
            {variant === 'shards' && <Shards cell={cell} />}
        </div>
    );

    const classes = (where) => [
        'glass',
        `glass--${variant}`,
        `glass--${where}`,
        `glass--${row}`,
        state.awake === true ? 'glass--awake' : 'glass--asleep',
    ].join(' ');

    if (behind) {
        const lit = state.awake === true ? 'glass--awake' : 'glass--asleep';
        return (
            <>
                <div className={classes('centre')} aria-hidden="true">{light}</div>
                {/* The oval round Robert's head is one piece of glass. */}
                {row === 'top' && variant === 'panes' && haloIsGlass() && (
                    <div className={`glass-halo ${lit}`} aria-hidden="true" />
                )}
            </>
        );
    }

    return (
        <div className={classes(side)} aria-hidden="true">
            {light}
        </div>
    );
}
