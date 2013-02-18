var fs = require('fs');
var _ = require('underscore');
var $ = require('jquery');

var logNotFound = function (row) {
  var logText = row.join().replace(/,/g, ' ');
  console.log('Logged missed selector: ', logText);
}

var matchInMarkup = function (row, markup) {
  var $markup = $(markup),
    selectorPosition = row.length - 1,
    $matched,
    selector = '',
    firstRun;

  console.log('New Row!')
  while (selectorPosition >= 0) {
    console.log('Looking for ', row[selectorPosition] + selector);
    $matched = $markup.find(row[selectorPosition] + selector);
    console.log('matched: ', $matched.length)
    if (!$matched.length) {
      console.log('Havent found it, returning');
      logNotFound(row);
      return;
    }
    selector = ' ' + row[selectorPosition] + ' ' + selector;
    console.log('New selector: ', selector);
    console.log('Decresing selectorPosition');
    selectorPosition --;
  }
};

var findCssSelectors = function (styles, markup) {
  var selectorRows = styles.replace(/\{/g, ' {').match(/.+\{/gim);

  _.each(selectorRows, function (row, index) {
    row = row.replace(/ +/g, ' ' ).split(' ');
    row = _.without(row, '{');
    matchInMarkup(row, markup);
  })
};

var markup = fs.readFileSync('testProject/index.html', 'utf-8');
var styles = fs.readFileSync('testProject/css/styles.css', 'utf-8');

findCssSelectors(styles, markup);
