# Simple POS tagger
A simple part of speech tagger.

### Installation
The POS tagger can be installed using npm as follows:
```
npm install simple-pos-tagger
```

### Functionality
The tagger can be used to complement a tagger like Wordnet which covers nouns, verbs, adjectives and adverbs. The principle of the tagger is simple: per lexical category a list (in a file) can be supplied that is used to tag words. First line of the file defines the category. Words may occur in multiple lists.
The tagger accepts an array of words as input and assigns to each word of the input a list of possible categories. See below for an example.

### Usage
```
var Tagger = require("simple-pos-tagger");
var config_file = __dirname + "./node_modules/simple-pos-tagger/data/English/lexicon_files.json";

var tagger = new Tagger(config_file, true);
var sentence = ["I", "see", "the", "man", "with", "the", "telescope"];
var tagged_sentence = tagger.tag_sentence(sentence);
console.log(tagged_sentence);
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
Note that the value of untagged words is `undefined`.


A variant of the tagger returns a chart instead of a tagged sentence (array) as shown above. This enables the tagger to recognise lexical items that cover more than one word.
The chart is initialised with CYK items of the form `(A, i, j)`.
```
var util = require('util');
var sentence = ["I", "see", "the", "man", "with", "the", "telescope"];
var chart = tagger.tag_sentence_chart(sentence);
console.log(util.inspect(chart, {depth: null}));
```
Output of the chart is:
```
{ N: 7,
  outgoing_edges:
   [ { 'CYK(personal_pronoun, 0, 1)':
        [ { id: 'CYK(personal_pronoun, 0, 1)',
            name: 'personal_pronoun',
            children: [],
            data:
             { from: 0,
               to: 1,
               rule: { lhs: 'personal_pronoun', rhs: 'I' } } } ] },
     {},
     { 'CYK(determiner, 2, 3)':
        [ { id: 'CYK(determiner, 2, 3)',
            name: 'determiner',
            children: [],
            data:
             { from: 2,
               to: 3,
               rule: { lhs: 'determiner', rhs: 'the' } } } ] },
     {},
     { 'CYK(preposition, 4, 5)':
        [ { id: 'CYK(preposition, 4, 5)',
            name: 'preposition',
            children: [],
            data:
             { from: 4,
               to: 5,
               rule: { lhs: 'preposition', rhs: 'with' } } } ] },
     { 'CYK(determiner, 5, 6)':
        [ { id: 'CYK(determiner, 5, 6)',
            name: 'determiner',
            children: [],
            data:
             { from: 5,
               to: 6,
               rule: { lhs: 'determiner', rhs: 'the' } } } ] },
     {},
     {} ],
  incoming_edges:
   [ {},
     { 'CYK(personal_pronoun, 0, 1)':
        [ { id: 'CYK(personal_pronoun, 0, 1)',
            name: 'personal_pronoun',
            children: [],
            data:
             { from: 0,
               to: 1,
               rule: { lhs: 'personal_pronoun', rhs: 'I' } } } ] },
     {},
     { 'CYK(determiner, 2, 3)':
        [ { id: 'CYK(determiner, 2, 3)',
            name: 'determiner',
            children: [],
            data:
             { from: 2,
               to: 3,
               rule: { lhs: 'determiner', rhs: 'the' } } } ] },
     {},
     { 'CYK(preposition, 4, 5)':
        [ { id: 'CYK(preposition, 4, 5)',
            name: 'preposition',
            children: [],
            data:
             { from: 4,
               to: 5,
               rule: { lhs: 'preposition', rhs: 'with' } } } ] },
     { 'CYK(determiner, 5, 6)':
        [ { id: 'CYK(determiner, 5, 6)',
            name: 'determiner',
            children: [],
            data:
             { from: 5,
               to: 6,
               rule: { lhs: 'determiner', rhs: 'the' } } } ] },
     {} ] }
```

### Configuration

The lexicon files are configured in `data/LANGUAGE/lexicon_files.json`. Example of a configuration file for English:
```
[
  "adverb.txt",
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
