const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

let categories = ["funnyJoke", "lameJoke"];
let funnyJoke = [
  {
    joke: "Why did the student eat his homework?",
    response: "Because the teacher told him it was a piece of cake!",
  },
  {
    joke: "What kind of tree fits in your hand?",
    response: "A palm tree",
  },
  {
    joke: "What is worse than raining cats and dogs?",
    response: "Hailing taxis",
  },
];
let lameJoke = [
  {
    joke: "Which bear is the most condescending?",
    response: "Pan-DUH",
  },
  {
    joke: "What would the Terminator be called in his retirement?",
    response: "The Exterminator",
  },
];

// GET endpoint for jokebook cat
app.get("/jokebook/categories", (req, res) => {
  res.json(categories);
});

// Get ENDPOINT FOR JOKES IN Category with an optional query parameter 'limit'
app.get("/jokebook/joke/:category", (req, res) => {
  const { category } = req.params;
  const { limit } = req.query;

  let jokesList;

  if (category === "funnyJoke") {
    jokesList = funnyJoke;
  } else if (category === "lameJoke") {
    jokesList = lameJoke;
  } else {
    return res
      .status(404)
      .json({ error: `no category listed for ${category}` });
  }

  res.json(limit ? jokesList.slice(0, Number(limit)) : jokesList);
});

// Endpoint to add a new joke
app.post("/jokebook/joke/new", (req, res) => {
  const { category, joke, response } = req.body;

  if (!category || !joke || !response || !categories.includes(category)) {
    return res
      .status(400)
      .json({ error: "invalid or insufficient user input" });
  }

  const newJoke = { joke, response };

  if (category === "funnyJoke") {
    funnyJoke.push(newJoke);
  } else if (category === "lameJoke") {
    lameJoke.push(newJoke);
  }

  if (category === "funnyJoke") {
    res.json(funnyJoke);
  } else if (category === "lameJoke") {
    res.json(lameJoke);
  }
});

app.get("/jokebook/random-joke", (req, res) => {
  const randomCategoryName =
    categories[Math.floor(Math.random() * categories.length)];
  let jokesList = randomCategoryName === "funnyJoke" ? funnyJoke : lameJoke;
  const randomJoke = jokesList[Math.floor(Math.random() * jokesList.length)];
  res.json(randomJoke);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
