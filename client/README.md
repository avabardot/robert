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
- Robert's world lives in `src/world`: the scene (`WorldScene.jsx`), the
  A-Frame components and shaders it is made of (`engine/`), and his music and
  voice (`sound/`). It runs on A-Frame 1.8 from npm and is only downloaded when
  someone goes to `/world`; the home page does not carry it.
- Nothing in the world is fetched from anyone else's server. The sky, stars,
  moon, sea and dust are drawn by shaders, the words by a canvas, and the one
  image it uses (`public/assets/flowers-1024.jpg`) is served from here.
