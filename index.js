'use strict'

const diffWordsWithSpace = require('diff').diffWordsWithSpace

const formatLists = require('./lib/list/format')
const parseLists = require('./lib/list/parse')
const wrapChange = require('./lib/util').wrapChange

module.exports = function richDiff (str1, str2) {
  const parsed1 = parseLists(str1)
  const parsed2 = parseLists(str2)

  return diffWordsWithSpace(parsed1.text, parsed1.text)
    .map(function (change) {
      const hasList = change.value.includes('{{{ LIST }}}')
      const hasChange = change.added ^ change.removed ? !!change.added : null
      if (hasList) {
        return formatLists(change.value, parsed1.list, parsed2.list, hasChange)
      }
      return wrapChange(hasChange, change.value)
    })
    .join('')
}

