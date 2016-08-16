'use strict'

const diffArray = require('./diff-array')
const { getNextItem, wrapChange } = require('../util')
const { get, isBoolean } = require('lodash')

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
  return diffArray(list, list2).map((item, idx) => {
    const sep = isOrdered ? `${idx}.` : '-'
    const delta = isBoolean(item.delta) ? item.delta : isAdd
    return `${sep} ${wrapChange(item.value, delta)}`
  }).join('\n')
}
