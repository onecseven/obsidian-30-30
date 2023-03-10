import { MarkdownView } from "obsidian"
import { Parser } from "../src/parser"
import { Task, TaskList } from "../src/primitives"
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

#Pollo

lol
-#`

let golden = `#+ Research
3 A
3 B
3 C
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

let fucked_up_text = `#+ Research
puddles 25
#+ Pollo
skyying 10
-#`


describe("Tasklist Block Parser", () => {
  test("string should be parsed as a block", () => {
    expect(Parser.contains_tasklist(test_text)).toBe(
      true
    )
  }),
    test("string should not be parsed as a block", () => {
      expect(Parser.contains_tasklist(bad_text)).toBe(
        false
      )
    })
})

describe("Testing Task Parser", () => {
  test("Should Parse Forward Task Syntax", () => {
    expect(Parser.Tasks.test("test 30")).toBeInstanceOf(Task)
  })
  test("Should Parse Backwards Task Syntax", () => {
    expect(Parser.Tasks.test("30 test")).toBeInstanceOf(Task)
  })
  test("Should Parse Colon Task Syntax", () => {
    expect(Parser.Tasks.test("test: 30")).toBeInstanceOf(Task)
  })
  test("Should Not Parse Colon Task as Forward Task", () => {
    expect(Parser.Tasks.ForwardTaskValidator.validator.test("test:30")).toBe(
      false
    )
  })
  test("Should Not Parse Forward Task as Backwards Task", () => {
    expect(Parser.Tasks.BackwardsTaskValidator.validator.test("test 30")).toBe(
      false
    )
  })
  test("Should Not Parse Malformed Colon Task as Colon Task", () => {
    expect(Parser.Tasks.ColonTaskValidator.validator.test("tes:t 30")).toBe(
      false
    )
  })
})

describe("Testing Command Parser", () => {
  test("Should Parse Title Syntax", () => {
    expect(Parser.Commands.test("#+")).toBeInstanceOf(Parser.Commands.CTask)
  })
  test("Should Parse Mult Syntax", () => {
    expect(Parser.Commands.test("x2")).toBeInstanceOf(Parser.Commands.CTask)
  })
  test("Should Parse Ref Syntax", () => {
    expect(Parser.Commands.test("study")).toBeInstanceOf(Parser.Commands.CTask)
  })
  test("Should Parse Title with Label Syntax", () => {
    expect(Parser.Commands.test("#+ My Test Tasklist")).toBeInstanceOf(
      Parser.Commands.CTask
    )
  })
  test("Should Not Parse Malformed Title Syntax", () => {
    expect(Parser.Commands.test("#-  ")).toBe(null)
  })
  test("Should Not Parse Malformed Mult Syntax", () => {
    expect(Parser.Commands.test("xx2 ")).toBe(null)
  })
  test("Should Not Parse Malformed Ref Syntax", () => {
    expect(Parser.Commands.test("x1study")).toBe(null)
  })
  test("Should Not Parse Malformed Title with Label Syntax", () => {
    expect(Parser.Commands.test("#- My Test Tasklist ")).toBe(
      null
    )
  })
})

describe("Testing Markdown-to-Tasklist", () => {
  
})

export {}
