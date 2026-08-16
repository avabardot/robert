# Robert — client

Robert's front end: React, A-Frame for the VR world, Tone.js for the synths,
RiTa for the lyrics, and a lot of hand-written CSS for Robert himself.

Originally built with Create React App, now built with [Vite](https://vite.dev).

## Scripts

Run these from this directory, or from the repository root with
`npm run <script> --prefix client`.

| Script | What it does |
| --- | --- |
| `npm start` | Dev server on http://localhost:3000, proxying `/api` to the Express server on :5000 |
| `npm run build` | Production build into `client/build`, which the Express server serves |
| `npm run preview` | Serve the production build locally |

The API needs to be running for Robert to have anything on his mind — see the
root [README](../README.md).

## Notes

- Components live in `.jsx` files. CRA allowed JSX inside `.js`; Vite expects
  the extension to match, which is why the tree was renamed.
- A-Frame and its community components load from CDNs in `index.html`, pinned
  to A-Frame 1.0.4 because `aframe-text-geometry-component`,
  `aframe-particle-system-component` and `aframe-extras.ocean` were written for
  that generation and have not been updated since.
- Textures the VR world used to hotlink through `cors-anywhere` now live in
  `public/assets`.
