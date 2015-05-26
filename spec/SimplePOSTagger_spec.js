/*
    Unit test for SimplePOSTagger
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

var FWT = require('../lib/SimplePOSTagger');

// Path to the lexicon files
var path_to_lexicon = "/home/hugo/Workspace/simple-pos-tagger/data/";
//var path_to_lexicon = "/Eclipse Workspace/function-word-tagger/data/";

var config_files = [path_to_lexicon + "Dutch/lexicon_files.json", 
                    path_to_lexicon + "English/lexicon_files.json"];

var sentences = [["ik", "zie", "de", "man", "met", "de", "verrekijker"],
                 ["I", "see", "the", "man", "with", "the", "telescope"],
                 ["in", "accordance", "with"]];

describe("The function word tagger", function() {

  it("Reads a Dutch lexicon and tags sentences", function() {
    // Create tagger
    var tagger = new FWT(config_files[0]);
    var tagged_sentence = tagger.tag_sentence(sentences[0]);
    expect(tagged_sentence).toEqual([ [ 'ik', [ 'persoonlijk_voornaamwoord' ] ],
                                      [ 'zie', undefined ],
                                      [ 'de', [ 'lidwoord' ] ],
                                      [ 'man', undefined ],
                                      [ 'met', [ 'voorzetsel' ] ],
                                      [ 'de', [ 'lidwoord' ] ],
                                      [ 'verrekijker', undefined ] ]);
  });
  
  it("Reads an English lexicon and tags sentences", function() {
    // Create tagger
    var tagger = new FWT(config_files[1]);
    var tagged_sentence = tagger.tag_sentence(sentences[1]);
    expect(tagged_sentence).toEqual([ [ 'I', [ 'personal_pronoun' ] ],
                                      [ 'see', undefined ],
                                      [ 'the', [ 'determiner' ] ],
                                      [ 'man', undefined ],
                                      [ 'with', [ 'preposition' ] ],
                                      [ 'the', [ 'determiner' ] ],
                                      [ 'telescope', undefined ] ]);
    var chart = tagger.tag_sentence_chart(sentences[2]);
    expect(chart.outgoing_edges).toEqual(
    [
      {
        "CYK(preposition, 0, 1)": [
          {
            "id": "CYK(preposition, 0, 1)",
            "name": "preposition",
            "children": [],
            "data": {
              "from": 0,
              "to": 1,
              "rule": {
                "lhs": "preposition",
                "rhs": "in"
              }
            }
          }
        ],
        "CYK(preposition, 0, 3)": [
          {
            "id": "CYK(preposition, 0, 3)",
            "name": "preposition",
            "children": [],
            "data": {
              "from": 0,
              "to": 3,
              "rule": {
                "lhs": "preposition",
                "rhs": "in accordance with"
              }
            }
          }
        ]
      },
      {},
      {
        "CYK(preposition, 2, 3)": [
          {
            "id": "CYK(preposition, 2, 3)",
            "name": "preposition",
            "children": [],
            "data": {
              "from": 2,
              "to": 3,
              "rule": {
                "lhs": "preposition",
                "rhs": "with"
              }
            }
          }
        ]
      },
      {}
    ]);
  });
});