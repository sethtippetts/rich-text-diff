'use strict'

const { diffWordsWithSpace } = require('diff')

const { formatLists, parseLists } = require('./lib/list')
const { wrapChange } = require('./lib/util')

module.exports = function richDiff (str1, str2) {
  const { text: text1, list: list1 } = parseLists(str1)
  const { text: text2, list: list2 } = parseLists(str2)

  return diffWordsWithSpace(text1, text2)
    .map(({ value, added, removed }) => {
      const hasList = value.includes('{{{LIST}}}')
      const hasChange = added ^ removed ? !!added : null
      if (hasList) {
        return formatLists(value, list1, list2, hasChange)
      }
      return wrapChange(value, hasChange)
    })
    .join('')
}

