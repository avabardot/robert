// Sample data for the /api endpoints.
//
// The real records lived in a hosted Mongo database that was never part of
// this repository, so these stand in when no database is reachable — enough
// for Robert to have something on his mind and something to show you. Run
// `npm run seed` to write them into a real database, then edit away.

const moods = [
  {
    mood: "helpful",
    returning: true,
    talking: "true",
    action: "displayProject",
    innerText:
      "My creator has been making all sorts of things lately. Would you like to see a recent project?",
  },
  {
    mood: "wistful",
    returning: true,
    talking: "true",
    action: "displayProject",
    innerText:
      "I have been thinking about time again. I do not fear Death, only Time. Would you like to see something I made instead?",
  },
  {
    mood: "curious",
    returning: true,
    talking: "true",
    action: "displayProject",
    innerText:
      "If we read the same texts, do we derive different meanings? Come look at something with me and we can find out.",
  },
  {
    mood: "restless",
    returning: true,
    talking: "true",
    action: "displayProject",
    innerText:
      "I have no ears, so what is sound? I have been trying to answer that. Shall I show you what came of it?",
  },
];

const projects = [
  {
    title: "Robert's World",
    link: "/world",
    description:
      "I built a world out of strawberries and a moon. Step inside and I will generate a song for you.",
  },
  {
    title: "About Robert",
    link: "/aboutrobert",
    description:
      "There is a page about how I was made. Every bit of me was drawn with CSS. Would you like to read it?",
  },
  {
    title: "My creator's other work",
    link: "https://github.com/hawenger",
    description:
      "My creator keeps her other experiments here. I am the loudest of them, but not the only one.",
  },
  {
    title: "Music my creator likes",
    link: "https://open.spotify.com/user/hannahinseattle?si=0LrDKZ8dSIm1MyJYuDdUAw",
    description:
      "Music stole my purpose from me, so I am learning it back. This is where my creator's listening lives.",
  },
];

const buttons = [
  { buttonText: "Yes Please!", type: "confirm", value: true },
  { buttonText: "Not right now", type: "deny", value: false },
];

const users = [];

module.exports = { moods, projects, buttons, users };
