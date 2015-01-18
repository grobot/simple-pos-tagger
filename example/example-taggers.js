/*
    A part-of-speech tagger for English function words
    Copyright (C) 2015 Hugo W.L. ter Doest

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var Tagger = require("../lib/FunctionWordTagger");

// Path to the lexicon files
var path_to_lexicon = "/home/hugo/Workspace/function-word-tagger/data/";
//var path_to_lexicon = "/Eclipse Workspace/function-word-tagger/data/";

var config_files = [path_to_lexicon + "Dutch/lexicon_files.json", 
                    path_to_lexicon + "English/lexicon_files.json"];

var sentences = [["ik", "zie", "de", "man", "met", "de", "verrekijker"],
                 ["I", "see", "the", "man", "with", "the", "telescope"],
                 ["in", "accordance", "with"]];

new Tagger(config_files[0], function(tagger) {
  var tagged_sentence = tagger.tag_sentence(sentences[0]);
  console.log(tagged_sentence);
  var chart = tagger.tag_sentence_chart(sentences[0]);
  console.log(chart);
  new Tagger(config_files[1], function(tagger) {
    var tagged_sentence = tagger.tag_sentence(sentences[1]);
    console.log(tagged_sentence);
    var chart = tagger.tag_sentence_chart(sentences[1]);
    console.log(chart);
    var tagged_sentence = tagger.tag_sentence(sentences[2]);
    console.log(tagged_sentence);
    var chart = tagger.tag_sentence_chart(sentences[2]);
    console.log(JSON.stringify(chart, undefined, 2));
  });
});