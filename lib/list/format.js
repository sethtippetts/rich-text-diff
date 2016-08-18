'use strict'

var arrayDiff = require('./array-diff')
var getNextItem = require('../util').getNextItem
var wrapChange = require('../util').wrapChange
var get = require('lodash.get')
var isBoolean = require('lodash.isboolean')

var LIST_TOKEN = /\{\{\{ LIST \}\}\}/

module.exports = function formatLists (str, list1, list2, isAdded) {
  return LIST_TOKEN
    .exec(str)
    .reduce(function (memo) {
      var item1 = getNextItem(list1, isAdded, true)
      var item2 = getNextItem(list2, isAdded)
      return memo.replace(LIST_TOKEN,
        formatList(
          get(item1, 'items', []),
          get(item2, 'items', []),
          isAdded,
          get(item2, 'isOrdered', false)
        )
      )
    }, str)
}

function formatList (list, list2, isAdd, isOrdered) {
  return arrayDiff(list, list2).map(function (item, idx) {
    var sep = isOrdered ? `${idx}.` : '-'
    var delta = isBoolean(item.delta) ? item.delta : isAdd
    return `${sep} ${wrapChange(delta, item.value)}`
  }).join('\n')
}
