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

  while (selectorPosition >= 0) {
    $matched = $markup.find(row[selectorPosition] + selector);
    if (!$matched.length) {
      logNotFound(row);
      return;
    }
    selector = ' ' + row[selectorPosition] + ' ' + selector;
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
