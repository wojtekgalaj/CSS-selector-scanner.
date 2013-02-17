var fs = require('fs');
var _ = require('underscore');
var $ = require('jquery');

var matchInMarkup = function (row, markup) {
  var $markup = $(markup),
    rowLength = row.length - 1;

  while (rowLength) {
    $markup.find(row[rowLength]);
    // 1. Find selector in the markup
    // 2. See if parent selector match aswell
    // 3. Do nothing if selectors match
    // 4. Log to a report file if selectors do not match
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

findCssSelectors(styles, markup);
