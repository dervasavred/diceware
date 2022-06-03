
const express = require("express");
const app = express();

const PORT = 53124;
const ROOT_DIR = __dirname;

console.log(__dirname);
app.get("/", (req, res) => {
  res.sendFile(ROOT_DIR + "/index.html");
});

// SERVE CSS
app.get("/css/styles.css", (req, res) => {
  res.sendFile(ROOT_DIR + "/css/styles.css");
});

// SERVE JS
app.get("/js/script.js", (req, res) => {
  res.sendFile(ROOT_DIR + "/js/script.js");
});

// SERVE WORDLIST
app.get("/assets/wordList.js", (req, res) => {
  res.sendFile(ROOT_DIR + "/assets/wordList.js");
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`)
});

app.get("/api/:phrasesWanted:wordsPerPhrase", (req, res) => {
  // const query =
  const phraseCount = req.params.phrasesWanted;
  console.log(phraseCount);
  const wordsPerPhrase = req.params.wordsPerPhrase;
  console.log(wordsPerPhrase);

  res.sendFile(ROOT_DIR + "/index.html");

  // res.json
});