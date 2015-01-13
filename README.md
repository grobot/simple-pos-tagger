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
var config_file = basedir + "data/English/lexicon.json";

new Tagger(config_file, function(tagger) {
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
The lexicon files are configured in <code>data/LANGUAGE/lexicon_files.json</code>. Example of a configuration file for English:
```
[ "adverb.txt",
  "indefinite_pronoun.txt",
  "possessive_pronoun.txt",
  "relative_pronoun.txt",
  "conjunction.txt",
  "interrogative_pronoun.txt",
  "preposition.txt",
  "demonstrative_pronoun.txt",
  "particle.txt",
  "reciprocal_pronoun.txt",
  "determiner.txt",
  "personal_pronoun.txt",
  "reflexive_pronoun.txt"
]
```
A set of files with function words for the English and Dutch language are provided with the module.

#Development
I am working on an variant of the tagger that returns a chart instead of a tagged sentence (array) as shown above. This enables the tagger to recognise lexical items that cover more than one word. The chart can then be fed to a chart parser.