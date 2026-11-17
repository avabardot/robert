# Robert

*The Heroku demo is gone — free dynos were retired in November 2022 — so Robert
now lives wherever you run him. See [Running Robert](#running-robert) below.*

#### Robert was designed to be a virtual assistant.  Robert just wants to make art.  Step inside Robert's world, one large existential crisis and watch him attempt to find meaning. Relax, breath along with Robert.  Maybe wake him up and stare into his one, large, blinking eye.  Let Robert share with you what's on his mind (probably Danny DeVito) or enter his VR world and listen to him generate music just for you!


![Robert VR](https://user-images.githubusercontent.com/63066634/109834491-18e91880-7bf7-11eb-9214-de95ad048bf0.jpg)
![Robert CSS](https://user-images.githubusercontent.com/63066634/109834663-4afa7a80-7bf7-11eb-9311-7c8e9a9829a0.jpg)

## Running Robert

Robert needs **Node 20.19 or newer** (there is an `.nvmrc` if you use nvm).

```bash
npm run setup   # installs both the server and the client
npm run dev     # Express API on :5000, Vite dev server on :3000
```

Then open **http://localhost:3000**. The dev server proxies `/api` to Express,
so both halves need to be running — `npm run dev` starts them together.

To run the way it deploys — one server, one port:

```bash
npm run build   # builds the client into client/build
npm start       # Express serves the API and the built client on :5000
```

### The database is optional

Robert's moods and projects come from MongoDB. Point `MONGODB_URI` at one
(copy `.env.example` to `.env`), and `npm run seed` will fill an empty database
with the sample records in `data/seed.js`.

With no database reachable, Robert still wakes up: the API serves that same
sample data so he has something on his mind. Writes return `503` until a
database is connected.

### Scripts

| Script | What it does |
| --- | --- |
| `npm run setup` | Installs server and client dependencies |
| `npm run dev` | Runs the API and the client dev server together |
| `npm run server` | API only, with nodemon |
| `npm run client` | Client dev server only |
| `npm run build` | Builds the client into `client/build` |
| `npm start` | Serves the API and the built client on one port |
| `npm run seed` | Loads `data/seed.js` into MongoDB |
| `npm run cf:dev` | Serves the built client and the Worker API locally |

## Deploying to Cloudflare

Cloudflare has no long-running process, so `npm start` is not what runs there.
The Worker serves `client/build` as static assets, and `worker/index.js`
answers the four read-only endpoints the front end calls from the same
`data/seed.js` the local server falls back to. There is no database in that
deployment: writes return `405`, and changing Robert's moods or projects means
editing `data/seed.js` and redeploying.

`wrangler.toml` holds the routing: `/api/*` reaches the Worker first, and
anything else that is not a real file falls back to `index.html` so `/world`
and `/aboutrobert` survive a refresh.

Settings for the Workers project:

| Setting | Value |
| --- | --- |
| Build command | `npm run setup && npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

Node version comes from `.nvmrc`.

To check the whole thing locally the way Cloudflare will run it:

```bash
npm run build
npm run cf:dev
```

## USE

### Home

* Press **WAKE ROBERT**. His window lights up and he says hello.
* The four small round windows beside him are doors. Point at one and it opens into a spinning portal; click it (or tap it on a phone) to step into his world.

### Robert's World

#### Getting in

* Wait for the portal to finish turning, then press **BEGIN**. Turn your sound on first: that press is also what lets the browser play Robert's music.

#### Looking around

* **Desktop:** hold the mouse button and drag to look. `W` `A` `S` `D` to move.
* **Phone:** drag to look, or just turn the phone.
* **Headset:** press **BEGIN**, then the VR button in the bottom corner. Point a controller at things and pull the trigger. In a phone viewer with no controller, look at something and wait.

#### The strawberries

Click a strawberry (they are labelled).

| Strawberry | What it does |
| --- | --- |
| **PLAY** | Robert composes a new piece and plays it. It carries on until stopped. |
| **STOP** | Stops the music. |
| **SING** | Robert makes up a song and sings it. The words appear as he sings them. He stops by himself at the end. |
| **HUSH** | Stops him singing. |

#### Getting out

* **HOME**, top left.
* Or turn right round: the portal you came through is behind you, under a sign reading NO EXIT. Click it.

## About Robert & Build

A-Frame, React, Node, Markov Chain for predictive speech, RiTa fed potential lyrics, Tonejs for synths, web speech API for Robert's voice, animations and Robert built from scratch with CSS.

More info lives on Robert's own `/aboutrobert` page once he is running.

## License

 ![Apache 2.0](/LICENSE)
