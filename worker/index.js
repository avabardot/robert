// The API for the Cloudflare Workers deployment.
//
// Workers have no long-running process, so the Express app in server.js does
// not run here. These are the read-only endpoints Robert's front end actually
// calls, answered from the same data/seed.js the local server falls back to
// when no database is reachable — so `npm run dev` and the deployed site agree.
//
// Editing Robert's moods or projects means editing data/seed.js and
// redeploying. If they ever need to change without a deploy, this is the file
// to point at D1 or KV.
//
// wrangler.toml sends /api/* here first; everything else is served straight
// from client/build, with unmatched paths falling back to index.html.
import seed from "../data/seed.js";

const COLLECTIONS = {
  project: "projects",
  mood: "moods",
  user: "users",
  button: "buttons",
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const match = pathname.match(/^\/api\/([^/]+)\/?/);

    // Anything that is not an API call belongs to the static assets.
    if (!match) return env.ASSETS.fetch(request);

    const collection = COLLECTIONS[match[1]];

    if (!collection) {
      return json(
        { error: true, message: `Robert keeps no '${match[1]}' records.` },
        404
      );
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return json(
        {
          error: true,
          message:
            "This deployment reads from data/seed.js and cannot be written to. " +
            "Run the Express server with a database for that.",
        },
        405
      );
    }

    return json(seed[collection]);
  },
};
