'use strict'

const arrayDiff = require('./array-diff')
const getNextItem = require('../util').getNextItem
const wrapChange = require('../util').wrapChange
const get = require('lodash.get')
const isBoolean = require('lodash.isboolean')

const LIST_TOKEN = /\{\{\{ LIST \}\}\}/

module.exports = function formatLists (str, list1, list2, isAdded) {
  return LIST_TOKEN
    .exec(str)
    .reduce((memo) => {
      let item1 = getNextItem(list1, isAdded, true)
      let item2 = getNextItem(list2, isAdded)
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
  return arrayDiff(list, list2).map((item, idx) => {
    const sep = isOrdered ? `${idx}.` : '-'
    const delta = isBoolean(item.delta) ? item.delta : isAdd
    return `${sep} ${wrapChange(item.value, delta)}`
  }).join('\n')
}
