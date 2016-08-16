# Rich Text Visual Difference

>_Now with Markdown™®!_ (Always with Markdown?)

## Getting Started

### Installation

```bash
npm i --save rich-text-diff
```

### Usage

```js
const diff = require('rich-text-diff')

const str1 = `
# Some crazy markdown.

It's the best.

- List Item 1
- List Item 2
- List Item 3
`
const str2 = `
# Some completely sane markdown.

It's ok I guess.

- List Item 1
- List Item 3
`

diff(str1, str2)
 /*
  * RETURNS:
  * # Some <del>crazy</del><ins>completely</ins> <ins>sane </ins>markdown.
  *
  * It's <del>the</del><ins>ok</ins> <del>best</del><ins>I guess</ins>.
  *
  * - List Item 1
  * - <del>List Item 2</del>
  * - List Item 3
  */
```

Just add your favorite Markdown parser and WHAMO! You have yourself a
spicy rich text diffing sandwich.


