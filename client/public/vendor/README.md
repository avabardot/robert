# Vendored A-Frame

These files used to load from CDNs. They are served from this site now because
a single one of them failing takes the whole VR world down with it, and this
project has already been broken twice by CDNs that stopped existing —
rawgit.com (shut down 2019) and cors-anywhere.herokuapp.com (public access
ended 2021).

| File | Package | Version | Was |
| --- | --- | --- | --- |
| `aframe.min.js` | `aframe` | 1.0.4 | `https://aframe.io/releases/1.0.4/aframe.min.js` |
| `aframe-text-geometry-component.min.js` | `aframe-text-geometry-component` | 0.5.2 | `https://unpkg.com/aframe-text-geometry-component@^0.5.0/...` |
| `aframe-particle-system-component.min.js` | `aframe-particle-system-component` | 1.0.9 | `https://unpkg.com/aframe-particle-system-component@1.0.x/...` |
| `aframe-extras.ocean.min.js` | `aframe-extras.ocean` | 3.13.1 | `https://unpkg.com/aframe-extras.ocean@^3.5.x/...` |
| `fonts/optimer_bold.typeface.json` | `three` | 0.150.1 | `examples/fonts/` in the three.js repo |
| `particles/smokeparticle.png` | `aframe-particle-system-component` | 1.0.9 | `https://cdn.rawgit.com/IdeaSpaceVR/...` |

Two of these replace dead URLs that are hardcoded *inside* the components
themselves, which is why the scene references them explicitly:

- `aframe-text-geometry-component` defaults its font to a `rawgit.com` URL, so
  the NO EXIT sign passes `font: /vendor/fonts/optimer_bold.typeface.json`.
- `aframe-particle-system-component` defaults its preset textures to
  `cdn.rawgit.com`, so the dust passes
  `texture: /vendor/particles/smokeparticle.png`.

To refresh any of them:

```bash
npm pack aframe@1.0.4          # or the package from the table
tar -xzf aframe-1.0.4.tgz
cp package/dist/aframe.min.js client/public/vendor/
```

Keep the versions in step with the table above — A-Frame 1.0.4 is pinned
deliberately and the three components are unmaintained, so newer A-Frame
releases need those replaced first.
