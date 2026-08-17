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
| `npm run pages:dev` | Serves the built client and the Pages Functions locally |

## Deploying to Cloudflare Pages

Cloudflare has no long-running process, so `npm start` is not what runs there.
Pages serves the built client, and the API is four read-only endpoints in
`functions/api/`, answered from the same `data/seed.js` the local server falls
back to. There is no database in that deployment: writes return `405`, and
changing Robert's moods or projects means editing `data/seed.js` and
redeploying.

Build settings for the Pages project:

| Setting | Value |
| --- | --- |
| Build command | `npm run setup && npm run build` |
| Build output directory | `client/build` (also in `wrangler.toml`) |
| Root directory | `/` |

Node version comes from `.nvmrc`. `client/public/_redirects` sends unmatched
paths to `index.html` so `/world` and `/aboutrobert` survive a refresh.

To check the whole thing locally the way Cloudflare will run it:

```bash
npm run build
npm run pages:dev
```

## USE

### VR World
*After waking Robert*

#### Enter World

* Three buttons appear below Robert after he is woken. 
* Click on the middle button depicted as a sign.  
* You are now entering Robert's world.

#### Navigate World

##### **Understanding Your Cursor**
* The white circle in the middle of the screen is now your cursor.

##### **Mobile Vs. Desktop**
* MOBILE: The cursor will move as you move your phone
* DESKTOP: Click the screen as you would a link, hold and move your mouse. This action will move the cursor.

##### **Clicking**
* Wait for the cursor to shrink in size.  
* When the cursor returns to normal size, you have successfully clicked on the object.

#### Activate Music

##### **Activating Instrumental Music**
* Center the white circle (your cursor) over the right **CENTER** strawberry.
* After cursor signifies click (shrinks then grows), music should begin playing.

*Music will play indefinitely until stopped by user*

##### **Activating Vocals**
* Center the white circle (your cursor) over the left **CENTER** strawberry.
* After cursor signifies click (shrinks then grows), Robert should begin singing.

*Robert will stop singing after finishing his "song"*

#### Stop Music

##### **Stop Instrumental Music**
* Center the white circle (your cursor) over the right **OUTER** strawberry.
* After cursor signifies click (shrinks then grows), music should stop playing.

*Music will play indefinitely until stopped by user*

##### **Stop Vocals**
* Center the white circle (your cursor) over the left **OUTER** strawberry.
* After cursor signifies click (shrinks then grows), Robert should stop singing.

*Robert will stop singing after finishing his "song"*

#### Exit World
* Face the back of the world (opposite of strawberries).
* Place cursor over door below "No Exit Sign" and allow cursor to perform click.
* On success, user will be returned to home screen.

### What's on Robert's Mind

#### Smiley Face Button
*After Click*
* User will see a theme listed below the Robert animation such as "Touch" or "Mother."
* A link will show at bottom of page reading, "SURPRISE".
* The "Surprise" link will navigate user to associated web page.


#### Frowny Face Button
*After Click*
* Robert will ask user if they would like to see something else.

## About Robert & Build

A-Frame, React, Node, Markov Chain for predictive speech, RiTa fed potential lyrics, Tonejs for synths, web speech API for Robert's voice, animations and Robert built from scratch with CSS.

More info lives on Robert's own `/aboutrobert` page once he is running.

## License

 ![Apache 2.0](/LICENSE)

## Credit & Contact

**Hannah Wenger**

[Github](https://github.com/hawenger "Hannah Github")

[Spotify](https://open.spotify.com/user/hannahinseattle?si=0LrDKZ8dSIm1MyJYuDdUAw "Hannah Spotify")

**Email:** *hamecow@gmail.com*

***Please feel free to reach out or connect on Spotify! Always looking for collaborators, conversation, learning opportunities and new music***

