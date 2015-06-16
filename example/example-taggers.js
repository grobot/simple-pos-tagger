var Tagger = require("../");
var util = require("util");
var inspectOptions = {
  depth: null,
  colors: true
};

var path_to_lexicon = __dirname + "/../data";

var config_files = {
  dutch: path_to_lexicon + "/Dutch/lexicon_files.json",
  english: path_to_lexicon + "/English/lexicon_files.json"
};

var sentences = {
  dutch: [
    ["ik", "zie", "de", "man", "met", "de", "verrekijker"]
  ],
  english: [
    ["I", "see", "the", "man", "with", "the", "telescope"],
    ["in", "accordance", "with"]
  ]
};

var dutchTagger = new Tagger(config_files.dutch, true);
console.log(dutchTagger.tag_sentence(sentences.dutch[0]));
console.log(util.inspect(dutchTagger.tag_sentence_chart(sentences.dutch[0]), inspectOptions));

var englishTagger = new Tagger(config_files.english, true);
console.log(englishTagger.tag_sentence(sentences.english[0]));
console.log(util.inspect(englishTagger.tag_sentence_chart(sentences.english[0]), inspectOptions));
console.log(englishTagger.tag_sentence(sentences.english[1]));
console.log(util.inspect(englishTagger.tag_sentence_chart(sentences.english[1]), inspectOptions));
