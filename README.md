#Function word tagger
A part of speech tagger that tags function words. 

#Installation
Function word tagger can be installed using npm as follows:
```
npm install function-word-tagger
```

#Functionality
The tagger can be used to complement a tagger like Wordnet which covers nouns, verbs, adjectives and adverbs. The principle of the tagger is simple: per lexical category a list (in a file) can be supplied that is used to tag words. First line of the file defines the category. Words may occur in multiple lists.
The tagger accepts an array of words as input and assigns to each word of the input a list of possible categories. See below for an example.

#Usage
```
var Tagger = require("FunctionWordTagger");

new Tagger(function(tagger) {
  var sentence = ["I", "see", "the", "man", "with", "the", "telescope"];
  var tagged_sentence = tagger.tag_sentence(sentence);
  console.log(tagged_sentence);
});
```
Output of the tagger is:
```
[ [ 'I', [ 'personal_pronoun' ] ],
  [ 'see', undefined ],
  [ 'the', [ 'determiner' ] ],
  [ 'man', undefined ],
  [ 'with', [ 'preposition' ] ],
  [ 'the', [ 'determiner' ] ],
  [ 'telescope', undefined ] ]
```
Note that the value of untagged words is <code>undefined</code>

#Configuration
The lexicon files are configured in <code>data/lexicon_files.json</code>. Example of a configuration file:
```
[ "function_words_adverb.txt",
  "function_words_indefinite_pronoun.txt",
  "function_words_possessive_pronoun.txt",
  "function_words_relative_pronoun.txt",
  "function_words_conjunction.txt",
  "function_words_interrogative_pronoun.txt",
  "function_words_preposition.txt",
  "function_words_demonstrative_pronoun.txt",
  "function_words_particle.txt",
  "function_words_reciprocal_pronoun.txt",
  "function_words_determiner.txt",
  "function_words_personal_pronoun.txt",
  "function_words_reflexive_pronoun.txt"
]
```
A set of files with function words for the English language is provided with the module.