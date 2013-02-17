var fs = require('fs');
var _ = require('underscore');
var $ = require('jquery');

var domElements = ['html', 'body', 'nav', 'h1', 'p']


var matchInMarkup = function (row, markup) {
  var $markup = $(markup),
    rowLength = row.length - 1;

  while (rowLength) {
    debugger;
    $markup.find(row[rowLength]);
    rowLength --;
  }
}

var findCssSelectors = function (styles, markup) {
  var selectorRows = styles.match(/.+\{/gim);

  _.each(selectorRows, function (row, index) {
    row = row.replace(/ +/g, ' ' ).split(' ');
    row = _.without(row, '{');

    matchInMarkup(row, markup);
  })
}

var markup = fs.readFileSync('testProject/index.html', 'utf-8');
var styles = fs.readFileSync('testProject/css/styles.css', 'utf-8');

var cssSelectors = findCssSelectors(styles, markup);
