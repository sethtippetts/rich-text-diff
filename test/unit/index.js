const { assert } = require('chai')

const richDiff = require('../../src/index')

describe('RichDiff', () => {
  describe('Simple Diffs', () => {
    it('should be able to do word by word diffing on sentences', () => {
      const left = 'Simple sentence should totally not work.'
      const right = 'Simple sentence should totally work.'
      const diff = richDiff(left, right)
      assert.equal(diff, 'Simple sentence should totally <del>not </del>work.')
    })
    it('should be able to do word by word diffing on multiple paragraphs', () => {
      const left = `
This test should totally work, in every way.

I really hope, that it does. If it doesn't I might lose my friend.
      `
      const right = `
This test should totally work.

I really hope that it does. If it does, I will be really happy.
      `
      const target = `
This test should totally work<del>, in every way</del>.

I really hope, that it does. If it <del>doesn\'t</del><ins>does,</ins> I <del>might</del><ins>will</ins> <del>lose</del><ins>be</ins> <del>my</del><ins>really</ins> <del>friend</del><ins>happy</ins>.
      `
      const diff = richDiff(left, right)
      assert.equal(diff, target)
    })
    it('should handle basic lists', () => {
      const left = `
- List Item 1
- List Item 2
- Unchanging List Item 3
      `
      const right = `
- List Item Uno
- Second Item
- Unchanging List Item 3
      `
      const target = `
- <del>List Item 1</del>
- <del>List Item 2</del>
- <ins>List Item Uno</ins>
- <ins>Second Item</ins>
- Unchanging List Item 3
      `
      const diff = richDiff(left, right)
      assert.equal(diff, target)
    })
  })

  describe('Edge Cases', () => {
    it('should handle a paragraph becoming a list', () => {
      let left, right, target, diff
      left = `
1. This is a paragraph that will become a list. 2. Don't you know? 3. I hope it works!
      `
      right = `
1. This is a paragraph that will become a list.
2. Don't you know?
3. I hope it works!
      `
      target = `
<del>1. This is a paragraph that will become a list. 2. Don't you know? 3. I hope it works!</del>
<ins>1. This is a paragraph that will become a list.</ins>
<ins>2. Don't you know?</ins>
<ins>3. I hope it works!</ins>
      `
      diff = richDiff(left, right)
      assert.equal(diff, target, 'fails when paragraph starts with a list delimiter')
      left = `
This is a paragraph - item 1 - item 2
      `
      right = `
This is a paragraph
- item 1
- item 2
      `
      target = `
This is a paragraph<del> - item 1 - item 2</del>
- <ins>item 1</ins>
- <ins>item 2</ins>
      `
      diff = richDiff(left, right)
      console.log(diff)
      assert.equal(diff, target, 'fails when paragraph starts with normal text')

    })
  })
})
