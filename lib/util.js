'use strict'

const isBoolean = require('lodash.isboolean')

function getNextItem (list, isAdded, isFirst) {
  if (!isBoolean(isAdded) || isAdded ^ isFirst) return list.shift()
  return {}
}

function isListItem (line) {
  return /\s*(-\s|\d+\.\s)/.test(line)
}

function wrapChange (isAdd, val) {
  if (/\n/.test(val)) {
    return val
      .split('\n')
      .map(wrapChange.bind(this, isAdd))
      .join('\n')
  }
  if (!/\w+/.test(val) || !isBoolean(isAdd)) return val

  const tag = isAdd ? 'ins' : 'del'
  return `<${tag}>${val}</${tag}>`
}

module.exports = {
  getNextItem,
  isListItem,
  wrapChange
}
