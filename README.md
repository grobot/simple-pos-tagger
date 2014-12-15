Function word tagger
==============
Tags function words.
Usage:

```
var Tagger = require("./lib/FunctionWordTagger");

new Tagger(function(tagger){
  var sentence = ["I", "see", "the", "man", "with", "the", "telescope"];
  var tagged_sentence = tagger.tag_sentence(sentence);
  console.log(tagged_sentence);
});
```
