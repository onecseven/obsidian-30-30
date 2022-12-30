import { MarkdownView } from "obsidian"
import { Parser } from "../src/parser"
import { describe, expect, test } from "@jest/globals"

let test_text = `#+ Research
25 Readings
ss
Longbreak 25
5 Break
25 Synthetize
15 Snack
25 Reading
x1
-#


Data Structures: 25

Break: 5
Algorithm: 25

#+Pollo

lol
-#`

let bad_text = `#+ Research
25 Readings
ss
Longbreak 25
5 Break
25 Synthetize
15 Snack
25 Reading
x1


Data Structures: 25

Break: 5
Algorithm: 25

#+Pollo

lol
`

describe("testing to see if parser works", () => {
  test("string should be parsed as a block", () => {
    expect(
      Parser.contains_tasklist_block({ data: test_text } as MarkdownView)
    ).toBe(true)
  }),
  test("string should not be parsed as a block", () => {
    expect(
      Parser.contains_tasklist_block({ data: bad_text } as MarkdownView)
    ).toBe(false)
  })
})

export {}
