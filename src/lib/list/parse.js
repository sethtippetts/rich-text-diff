'use strict'

var { isListItem } = require('../util')

module.exports = function parseLists (str) {
  var results = str
    .split(/\n/)
    .reduce(function (memo, line, idx, arr) {
      if (isListItem(line)) {
        memo.list[memo.count] = memo.list[memo.count] || { items: [], isOrdered: false }
        var isOrdered = /^\d+\.\s/.test(line)
        line = line.replace(/^(\d+\.|-)\s/, '')
        memo.list[memo.count].isOrdered = isOrdered
        memo.list[memo.count].items.push(line)
        if (!isListItem(arr[idx + 1])) {
          memo.lines.push('{{{ LIST }}}')
          memo.count++
        }
        return memo
      }
      memo.lines.push(line)
      return memo
    }, { lines: [], list: [], count: 0 })

  results.text = results.lines.join('\n')
  return results
}
