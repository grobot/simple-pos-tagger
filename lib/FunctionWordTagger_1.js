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
var path = require('path');

var log4js = require('log4js');
var logger = log4js.getLogger();
logger.setLevel('ERROR');

var Item = require('CYK_Item');
var Chart = require('Chart');

// Returns a chart filled with recognised items
FunctionWordTagger.prototype.tag_sentence = function(sentence) {
  var that = this;
  
  this.chart = new Chart(sentence.length);
  for (var i = 0; i < sentence.length; i++) {
    var word = sentence[i];
    var categories = that.lexicon[word];
    categories.forEach(function(c){
      var rule = {"lhs": c, "rhs": word};
      var item = new Item(rule, i, i+1);
      that.chart.add_item(item);
    });
    if (i < sentence.length - 1) {
      var word2 = sentence[i] + ' ' + sentence[i+1];
      var categories = that.lexicon[word2];
      categories.forEach(function(c){
        var rule = {"lhs": c, "rhs": word};
        var item = new Item(rule, i, i+2);
        that.chart.add_item(item);
      });
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
  this.config_file = path.basename(config_file);
  this.path_to_lexicon = path.dirname(config_file);
  fs.readFile(config_file, 'utf8', function (error, text) {
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
  });
}

module.exports = FunctionWordTagger;