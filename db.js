const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/robert";

// Robert is a portfolio piece as much as an app, so a missing database should
// not stop him waking up: the API falls back to the sample data in data/seed.js
// when nothing is listening on MONGODB_URI.
async function connect() {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);
  } catch (err) {
    console.warn(
      `No MongoDB at ${MONGODB_URI} (${err.message}).\n` +
        `Robert is serving the sample data in data/seed.js instead. ` +
        `Reads work, writes return 503.`
    );
  }
  return isConnected();
}

const isConnected = () => mongoose.connection.readyState === 1;

module.exports = { connect, isConnected, MONGODB_URI };
