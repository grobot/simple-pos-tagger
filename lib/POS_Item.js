/*
    POS item class for POS tagger
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

// NB: CYK items are completely recognised items of the form [X, i, j] meaning ai...aj can be generated from X

var typeOf = require('typeof');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.setLevel('ERROR');


function POS_Item(rule, i, j) {
  logger.debug("POS_Item: " + rule + ", " + i + ", " + j);
  this.id = "POS(" + rule.lhs + ", " + i + ", " + j + ")";
  this.name = rule.lhs;
  this.children = [];
  this.data = {};
  this.data.from = i;
  this.data.to = j;
  this.data.rule = rule;
}

module.exports = POS_Item;