import { MarkdownView } from "obsidian"
import { Parser } from "../src/parser"
import { Task } from "../src/primitives"
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
let title_with_label = new RegExp(/\#\+\s*.+/g)
Parser.Commands.test("#+ apolo")
let title = new RegExp(/\#\+\s*/g)
title.test("#+")
Parser.Commands.test("#+")

describe("Tasklist Block Parser", () => {
  test("string should be parsed as a block", () => {
    expect(Parser.contains_tasklist({ data: test_text } as MarkdownView)).toBe(
      true
    )
  }),
    test("string should not be parsed as a block", () => {
      expect(Parser.contains_tasklist({ data: bad_text } as MarkdownView)).toBe(
        false
      )
    })
})

describe("Task Parser", () => {
test(" Describe Test", ()=> {
expect().toBe()
})

})

export {}
