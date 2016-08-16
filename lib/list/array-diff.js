'use strict'

const uniq = require('lodash.uniq')

module.exports = function arrayDiff (arr1, arr2, reversed) {
  arr1 = uniq(arr1)
  arr2 = uniq(arr2)
  if (arr1.length > arr2.length) return arrayDiff(arr2, arr1, true)
  let idx2 = 0
  const ADD = !reversed
  const add = toValue.bind(this, ADD)
  const remove = toValue.bind(this, !ADD)
  return arr1.reduce((memo, value, idx) => {
    const foundIdx = arr2.indexOf(value)
    if (!~foundIdx) {
      memo.push(remove(value))
      return memo
    }

    if (foundIdx > idx2) {
      memo = memo
        .concat(
          arr2
            .slice(idx2, foundIdx)
            .map(add)
        )
      idx2 = foundIdx
    }
    memo.push({ value })
    idx2++
    return memo
  }, [])
  .concat(
    arr2
      .slice(idx2, arr2.length)
      .map(add)
  )
}

function toValue (delta, value) {
  return { delta, value }
}
