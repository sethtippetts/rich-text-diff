'use strict'

var diffWordsWithSpace = require('diff').diffWordsWithSpace

var formatLists = require('./lib/list/format')
var parseLists = require('./lib/list/parse')
var wrapChange = require('./lib/util').wrapChange

module.exports = function richDiff (str1, str2) {
  var parsed1 = parseLists(str1)
  var parsed2 = parseLists(str2)

  return diffWordsWithSpace(parsed1.text, parsed1.text)
    .map(function (change) {
      var hasList = change.value.includes('{{{ LIST }}}')
      var hasChange = change.added ^ change.removed ? !!change.added : null
      if (hasList) {
        return formatLists(change.value, parsed1.list, parsed2.list, hasChange)
      }
      return wrapChange(hasChange, change.value)
    })
    .join('')
}

