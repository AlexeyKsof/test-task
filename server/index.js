const express = require("express");
const Az = require("az");
const RussianNouns = require("russian-nouns-js");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const utils = require("./utils/parseWords");

app.use(bodyParser.json());

const rne = new RussianNouns.Engine();
let morph = false;
Az.Morph.init((err, Morph) => {
  morph = Morph;
});

app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Server");
});

app.post("/", async (req, res) => {
  if (morph && req.body.word.length > 0) {
    let parses = await morph(req.body.word);
    let noun = await utils.parseWords(parses);
    if (noun.error) return res.status(500).send();

    let results = [];
    if(noun.pluraleTantum) {
        let scissors = RussianNouns.createLemma({
            text: noun.value,
            pluraleTantum: true
        });
        
        rne.pluralize(scissors);
        
        results = rne.decline(scissors, req.body.case.toLowerCase());
    } else {
        results = await rne.decline(
            { text: noun.value, gender: noun.gender },
            req.body.case.toLowerCase()
          );
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');

    
    res.json({ word: results[0] });
  } else {
    res.status(500).send();
  }
});

app.listen(5000, () => console.log("Example app is listening on port 5000."));
