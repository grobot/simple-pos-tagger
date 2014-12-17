#Function word tagger
A part of speech tagger that tags function words. 

#Functionality
The tagger can be used to complement a tagger like Wordnet which covers nouns, verbs, adjectives and adverbs. The principle of the tagger is simple: per lexical category a list (in a file) can be supplied that is used to tag words. First line of the file defines the category. Words may occur in multiple lists.
The tagger accepts an array of words as input and assigns to each word of the input a list of possible categories. See below for an example.

#Usage
```
var Tagger = require("FunctionWordTagger");

new Tagger(function(tagger){
  var sentence = ["I", "see", "the", "man", "with", "the", "telescope"];
  var tagged_sentence = tagger.tag_sentence(sentence);
  console.log(tagged_sentence);
});
```
Output is:
```
[ [ 'I', [ 'personal_pronoun' ] ],
  [ 'see', undefined ],
  [ 'the', [ 'determiner' ] ],
  [ 'man', undefined ],
  [ 'with', [ 'preposition' ] ],
  [ 'the', [ 'determiner' ] ],
  [ 'telescope', undefined ] ]
```
#Configuration
The lexicon files are configured in <code>data/lexicon_files.json</code>