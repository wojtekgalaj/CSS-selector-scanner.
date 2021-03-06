var fs = require('fs');
var _ = require('underscore');
var $ = require('jquery');

var logNotFound = function (log) {
  console.log('Logged missed selector: ', log);
}

var matchInMarkup = function (row, markup) {
  var $markup = $(markup),
    selectorPosition = row.length - 1,
    $matched,
    selector = '',
    firstRun;

  if (!$markup.find(row).length) {
    logNotFound(row);
  }
};

var findCssSelectors = function (styles, markup) {
  var selectorRows = styles.replace(/\{/g, ' {').match(/.+\{/gim),
    $markup = $(markup);
  
  console.log('selectorRows: ', selectorRows);
  
  _.each(selectorRows, function (row, index) {
    row = row.replace(/ +/g, ' ' ).split(' ');
    row = _.without(row, '{').join().replace(/,/g, ' ');
    matchInMarkup(row, markup);
  })
};

var markup = fs.readFileSync('testProject/index.html', 'utf-8');
var styles = fs.readFileSync('testProject/css/styles.css', 'utf-8');

// findCssSelectors(styles, markup);



/*
TODO:

Grab all the xsl files and consrtruct a pseudoDOMtree to check css rules against.
Grab all the css files and contrast them against the pseudoDOMtree.

*/

//var xslFolder = fs.readFileSync('/')
