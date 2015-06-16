/*
    A simple part-of-speech tagger
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
log4js.replaceConsole();
var logger = log4js.getLogger();

var Item = require('./POS_Item');
var Chart = require('./Chart');

logger.setLevel('DEBUG');

// Returns an array of lexical categories for word
SimplePOSTagger.prototype.tag_word = function(word) {
  return(this.lexicon[word]);
};

// Returns a sentence in which function words are tagged
SimplePOSTagger.prototype.tag_sentence = function(sentence) {
  var that = this;
  var tagged_sentence = [];
  
  sentence.forEach(function(word) {
    tagged_sentence.push([word, that.lexicon[word]]);
  });
  return(tagged_sentence);
};

// Returns a chart filled with recognised items
SimplePOSTagger.prototype.tag_sentence_chart = function(sentence) {
  var that = this;
  
  var chart = new Chart(sentence.length);
  for (var i = 0; i < sentence.length; i++) {
    // Check for multiword lexical entries
    for (var j = 1; j <= this.maxLemmaLength; j++) {
      if (i < (sentence.length - j + 1)) {
        // Construct the word consisting of j multiple words in the sentence
        var multiword = "";
        for (var k = 0; k < j; k++) {
          multiword += sentence[i + k] + " ";
        }
        // Strip the last space
        multiword = multiword.trim();
        logger.debug("tag_sentence_chart: multiword: " + multiword);
        var categories = that.lexicon[multiword];
        logger.debug("tag_sentence_chart: look up in lexicon " + that.lexicon[multiword]);
        if (categories) {
          categories.forEach(function(c) {
            var rule = {"lhs": c, "rhs": multiword};
            var item = new Item(rule, i, i + j);
            chart.add_item(item);
          });
        }
      }
    }
  }
  return(chart);
};

SimplePOSTagger.prototype.exportLexiconToJSONFile = function(outputFile) {
  // Output lexicon to a JSON file
  fs.writeFileSync(outputFile, JSON.stringify(tagger.lexicon, null, 2));
};

// Parses the list of words; first line is the lexical category
SimplePOSTagger.prototype.read_words = function(text) {
  var words = text.split('\n');
  var category = words.shift();
  var that = this;

  logger.debug("Enter FunctionWordTagger.read_words");
  words.forEach(function(word) {
    nr_words = word.split(' ').length;
    if (nr_words > that.maxLemmaLength) {
      that.maxLemmaLength = nr_words;
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
// Is replaced by an synchronous version
SimplePOSTagger.prototype.readLexiconFromConfigFile = function(config_file) {
  var that = this;

  this.lexicon = {};
  this.maxLemmaLength = 0;
  this.config_file = path.basename(config_file);
  this.path_to_lexicon = path.dirname(config_file);
  var files = JSON.parse(fs.readFileSync(config_file, 'utf8'));
  files.forEach(function(filename) {
    var text = fs.readFileSync(that.path_to_lexicon + '/' + filename, 'utf8');
    that.read_words(text);
  });
};

function SimplePOSTagger(lexiconFile, configFile) {
  logger.debug('SimplePOSTagger: lexicon file' + lexiconFile);
  if (configFile) {
    this.readLexiconFromConfigFile(lexiconFile);
  }
  else {
    this.lexiconFile = lexiconFile;
    this.lexicon = JSON.parse(fs.readFileSync(lexiconFile));
    // Determine the max length of a lemma
    var maxLemmaLength = 0;
    var that = this;
    Object.keys(this.lexicon).forEach(function (key) {
      if (that.lexicon[key].length > maxLemmaLength) {
        maxLemmaLength = that.lexicon[key].length;
      }
    });
    this.maxLemmaLength = maxLemmaLength;
  }
  logger.debug('SimplePOSTagger: lexicon file' + JSON.stringify(this.lexicon, null, 2));
}

module.exports = SimplePOSTagger;
