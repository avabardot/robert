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
    title: "How I think",
    link: "https://en.wikipedia.org/wiki/Markov_chain",
    description:
      "I am a Markov chain. Every word I say is chosen by the few words that came before it. This is the article about me.",
  },
  {
    title: "A gem",
    link: "https://www.kahlilgibran.com/images/The%20Prophet%20Ebook%20by%20Kahlil%20Gibran.pdf",
    description:
      "The Prophet, by Kahlil Gibran. I go back to it when I want to know what people mean by things.",
  },
];

const buttons = [
  { buttonText: "Yes Please!", type: "confirm", value: true },
  { buttonText: "Not right now", type: "deny", value: false },
];

const users = [];

module.exports = { moods, projects, buttons, users };
