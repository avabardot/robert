// The API for the Cloudflare Pages deployment.
//
// Pages serves static files, so the Express app in server.js does not run
// there. These are the read-only endpoints Robert's front end actually calls,
// answered from the same data/seed.js the local server falls back to when no
// database is reachable — so `npm run dev` and the deployed site agree.
//
// Editing Robert's moods or projects here means editing data/seed.js and
// redeploying. If they ever need to change without a deploy, this is the file
// to point at D1 or KV.
import seed from "../../data/seed.js";

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

export const onRequest = ({ request, params }) => {
  const collection = COLLECTIONS[params.resource];

  if (!collection) {
    return json(
      { error: true, message: `Robert keeps no '${params.resource}' records.` },
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
};
