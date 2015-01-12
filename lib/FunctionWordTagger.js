/*
    A part-of-speech tagger for English function words
    Copyright (C) 2014 Hugo W.L. ter Doest

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

var fs = require('fs');

var log4js = require('log4js');
var logger = log4js.getLogger();
logger.setLevel('ERROR');

// Path to the lexicon files
path_to_lexicon = "/media/hugo/data/Workspace/function-word-tagger/data/English/";

config_file = path_to_lexicon + "lexicon_files.json";

// Returns an array of lexical categories for word
FunctionWordTagger.prototype.tag_word = function(word) {
  return(this.lexicon[word]);
};

// Returns a sentence in which function words are tagged
FunctionWordTagger.prototype.tag_sentence = function(sentence) {
  var that = this;
  var tagged_sentence = [];
  
  sentence.forEach(function(word) {
    tagged_sentence.push([word, that.lexicon[word]]);
  });
  return(tagged_sentence);
};

// Parses the list of words; first line is the lexical category
FunctionWordTagger.prototype.read_words = function(text) {
  var words = text.split('\n');
  var category = words.shift();
  var that = this;
  
  logger.debug("Enter FunctionWordTagger.read_words");
  words.forEach(function(word) {
    if (!that.lexicon[word]) {
      that.lexicon[word] = [category];
    }
    else {
      that.lexicon[word].push(category);
    }
    logger.debug("FunctionWordTagger.read_words: lexicon entry " + word + " -> " + that.lexicon[word]);
  });
  logger.debug("Exit FunctionWordTagger.read_words");
};

// Constructor: reads files with function words and calls the callback with itself 
function FunctionWordTagger(callback) {
  var that = this;

  this.lexicon = {};
  fs.readFile(config_file, 'utf8', function (error, text) {
    var files_with_function_words = JSON.parse(text);
    var nr_files = files_with_function_words.length;
    files_with_function_words.forEach(function(filename){
      fs.readFile(path_to_lexicon + filename, 'utf8', function (error, text) {
        that.read_words(text);
        nr_files--;
        if (nr_files === 0) {
          callback(that);
        }
      });
    });
  });
}

module.exports = FunctionWordTagger;