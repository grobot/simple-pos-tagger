Function word tagger
==============
A tagger that tags function words. It can be used to complement a tagger like Wordnet which covers nouns, verbs, adjectives and adverbs. The principle of the tagger is simple: per lexical category a list can be supplied that is used to tag words. Words may occur in multiple lists.

#Usage
```
var Tagger = require("./lib/FunctionWordTagger");

new Tagger(function(tagger){
  var sentence = ["I", "see", "the", "man", "with", "the", "telescope"];
  var tagged_sentence = tagger.tag_sentence(sentence);
  console.log(tagged_sentence);
});
```