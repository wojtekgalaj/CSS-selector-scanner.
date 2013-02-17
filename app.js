var fs = require('fs');
var _ = require('underscore');
var $ = require('jquery');

var matchInMarkup = function (row, markup) {
  var $markup = $(markup),
    rowLength = row.length - 1,
    $matched;

  while (rowLength >= 0) {
    // 1. Find selector in the markup
    console.log('Looking for ', row[rowLength]);
    $matched = $markup.find(row[rowLength]);
    console.log('matched: ', $matched.length)
    if (!$matched.length) {
      console.log('Havent found it, returning');
      return;
    }
    // 2. See if parent selector match aswell
    // 3. Do nothing if selectors match
    // 4. Log to a report file if selectors do not match
    console.log('Decresing rowLength');
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
