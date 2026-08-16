require("dotenv").config({ quiet: true });

const fs = require("fs");
const path = require("path");
const express = require("express");
const { connect } = require("./db");

require("./models/SchemaData");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_BUILD = path.resolve(__dirname, "client", "build");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/robertRoutes")(app);

app.use(express.static(CLIENT_BUILD));

// Everything that is not an API call belongs to the React router. In
// development the client is served by Vite on :3000 and proxies /api here, so
// this only matters once the client has been built.
app.use((req, res) => {
  const index = path.join(CLIENT_BUILD, "index.html");

  if (!fs.existsSync(index)) {
    return res
      .status(503)
      .send(
        "Robert has no body yet. Run `npm run build` to build the client, " +
          "or `npm run dev` and open http://localhost:3000 instead."
      );
  }

  return res.sendFile(index);
});

connect().finally(() => {
  app.listen(PORT, () => {
    console.log(`🌎 ==> Robert is awake on http://localhost:${PORT}`);
  });
});
