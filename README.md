#Function word tagger
A part of speech tagger that tags function words. It can be used to complement a tagger like Wordnet which covers nouns, verbs, adjectives and adverbs. The principle of the tagger is simple: per lexical category a list (in a file) can be supplied that is used to tag words. First line of the file defines the category. Words may occur in multiple lists.

#Usage
```
var Tagger = require("FunctionWordTagger");

new Tagger(function(tagger){
  var sentence = ["I", "see", "the", "man", "with", "the", "telescope"];
  var tagged_sentence = tagger.tag_sentence(sentence);
  console.log(tagged_sentence);
});
```
#Configuration
The lexicon files are configured in <code>data/lexicon_files.json</code>