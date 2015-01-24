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

var fs = require('fs');
var path = require('path');

var log4js = require('log4js');
var logger = log4js.getLogger();

var Item = require('./POS_Item');
var Chart = require('./Chart');

logger.setLevel('ERROR');

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

// Returns a chart filled with recognised items
FunctionWordTagger.prototype.tag_sentence_chart = function(sentence) {
  var that = this;
  
  this.chart = new Chart(sentence.length);
  for (var i = 0; i < sentence.length; i++) {
    // Check for multiword lexical entries
    for (var j = 1; j <= this.max_words; j++) {
      if (i < (sentence.length - j + 1)) {
        // Construct the word consisting of j multiple words in the sentence
        var multiword = "";
        for (var k = 0; k < j; k++) {
          multiword += sentence[i + k] + " ";
        }
        // Strip the last space
        multiword = multiword.substring(0, multiword.length - 1);
        logger.debug("tag_sentence_chart: multiword: " + multiword);
        var categories = that.lexicon[multiword];
        if (categories) {
          categories.forEach(function(c) {
            var rule = {"lhs": c, "rhs": multiword};
            var item = new Item(rule, i, i + j);
            that.chart.add_item(item);
          });
        }
      }
    }
  }
  return(this.chart);
};

// Parses the list of words; first line is the lexical category
FunctionWordTagger.prototype.read_words = function(text) {
  var words = text.split('\n');
  var category = words.shift();
  var that = this;
  
  logger.debug("Enter FunctionWordTagger.read_words");
  words.forEach(function(word) {
    nr_words = word.split(' ').length;
    if (nr_words > that.max_words) {
      that.max_words = nr_words;
      logger.debug("read_words: increased max_words" + that.max_words);
    }
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
function FunctionWordTagger(config_file, callback) {
  var that = this;

  this.lexicon = {};
  this.max_words = 0;
  this.config_file = path.basename(config_file);
  this.path_to_lexicon = path.dirname(config_file);
  fs.readFile(config_file, 'utf8', function (error, text) {
    if (error) {
      logger.error(error);
    }
    else {
      var files_with_function_words = JSON.parse(text);
      var nr_files = files_with_function_words.length;
      files_with_function_words.forEach(function(filename){
        fs.readFile(that.path_to_lexicon + '/' + filename, 'utf8', function (error, text) {
          if (error) {
            logger.error("File could not be read: " + that.path_to_lexicon + '/' + filename);
          }
          else {
            that.read_words(text);
            nr_files--;
            if (nr_files === 0) {
              callback(that);
            }
          }
        });
      });
    }
  });
}

module.exports = FunctionWordTagger;