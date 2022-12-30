import { MarkdownView } from "obsidian"

export namespace Parser {
  let full_block = new RegExp(/\#\+(.)*?\-\#/gs)
  let title = new RegExp(/\#\+\s.*/g)
  let task = new RegExp(/(?<!.+)\d+\s+.+/g)
  let backward_task = new RegExp(/(?<!.+)[a-zA-Z]+\s+\d+(?!.)/g)
  let task_with_colon = new RegExp(/.*\:\s+\d+/g)
  let multiplier_command = new RegExp(/(x)\d/g)
  let just_strings = new RegExp(/(?<!.+)[a-zA-Z]+\b\n/g)

  export const contains_tasklist_block = (view: MarkdownView): boolean => view.data.match(full_block) !== null

  export const get_tasklist_blocks = (view: MarkdownView) => view.data.match(full_block)

  export const parse_tasklist = (matches: RegExpMatchArray) => {
    // #todo
    // create task array
    // check for title
    // check if str is task
      //if it is, Task(str)
    // if not, check if str is backward task, task_with_colon
      // if it is, Task(str)
    // elif check if its multiplier command
      // if it is, copy the last task multiple times
    // elif check if its just a string
      // if it is, then check if there is already a task with that name
        // if there is, copy that task
      // if it is, check if its break,
        // if its break, add StopTask
    // if there's not StopTask
      // add StopTask
    // return TaskList
  }
}
