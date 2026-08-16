// Load data/seed.js into MongoDB: `npm run seed`.
//
// Each collection is only filled if it is empty, so this is safe to re-run and
// will not trample records you have added yourself.
require("dotenv").config({ quiet: true });

const mongoose = require("mongoose");
const { connect, isConnected, MONGODB_URI } = require("../db");
const seed = require("../data/seed");

require("../models/SchemaData");

const collections = [
  ["moods", seed.moods],
  ["projects", seed.projects],
  ["buttons", seed.buttons],
  ["users", seed.users],
];

async function main() {
  await connect();

  if (!isConnected()) {
    console.error(`Could not reach MongoDB at ${MONGODB_URI}. Nothing was seeded.`);
    process.exitCode = 1;
    return;
  }

  for (const [name, records] of collections) {
    if (!records.length) continue;

    const Model = mongoose.model(name);
    const existing = await Model.countDocuments();

    if (existing > 0) {
      console.log(`${name}: ${existing} record(s) already there, left alone`);
      continue;
    }

    await Model.insertMany(records);
    console.log(`${name}: inserted ${records.length} record(s)`);
  }

  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error(err);
  process.exitCode = 1;
  await mongoose.disconnect().catch(() => {});
});
