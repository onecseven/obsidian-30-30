import { MarkdownView } from "obsidian"
import { Task } from "./primitives"

export namespace Parser {
  interface validator {
    validator: RegExp
  }

  interface CommandTask {
    type: "MULT" | "REF" | "TITLE"
    data: string | number
  }
  export namespace Tasks {
    class TaskValidator implements validator {
      validator: RegExp
      get_string: (str: string) => string[]
      get_task: (result: string[]) => Task

      constructor(
        regex: RegExp,
        getstr: (str: string) => string[],
        gettask: (result: string[]) => Task
      ) {
        this.validator = regex
        this.get_string = getstr
        this.get_task = gettask
      }
    }
    let forward_validator = new RegExp(/(?<!.+)[a-zA-Z]+\s+\d+\s*(?!.)/g)
    let backward_validator = new RegExp(/(?<!.+)\d+\s+.+/g)
    let task_with_colon = new RegExp(/.*\:\s*\d+/g)

    let get_forward_string = (str: string) =>
      str.match(forward_validator)![0].split(" ")
    let get_backward_string = (str: string) =>
      str.match(backward_validator)![0].split(" ")
    let get_colon_string = (str: string) =>
      str.match(task_with_colon)![0].split(":")

    let forward_task = ([name, length]: [string, string]) =>
      new Task(name, Number(length))
    let backward_task = ([length, name]: [string, string]) =>
      new Task(name, Number(length))

    export const ForwardTaskValidator = new TaskValidator(
      forward_validator,
      get_forward_string,
      forward_task
    )

    export const BackwardsTaskValidator = new TaskValidator(
      backward_validator,
      get_backward_string,
      backward_task
    )

    export const ColonTaskValidator = new TaskValidator(
      task_with_colon,
      get_colon_string,
      forward_task
    )

    const validators = [
      ForwardTaskValidator,
      BackwardsTaskValidator,
      ColonTaskValidator,
    ]

    export const test = (str: string) => {
      for (let current of validators) {
        if (current.validator.test(str))
          return current.get_task(current.get_string(str))
      }
      return null
    }
  }

  export namespace Commands {
    class CommandValidator {
      validator: RegExp
      get_string: (str: string) => string
      get_task: (str: string) => CommandTask
      constructor(
        regex: RegExp,
        getstr: (str: string) => string,
        gettask: (str: string) => CommandTask
      ) {
        this.validator = regex
        this.get_string = getstr
        this.get_task = gettask
      }
    }

    export class CTask implements CommandTask {
      type: CommandTask["type"]
      data: string | number
      constructor(name: CommandTask["type"], data: string | number) {
        this.type = name
        this.data = data
      }
    }

    let title = new RegExp(/\#\+\s*/g)
    let title_with_label = new RegExp(/\#\+\s*.+/g)
    let just_strings = new RegExp(/(?<!.+)[a-zA-Z]+\b\n/g)
    let multiplier_command = new RegExp(/(?<=^x)\d(?!.)/g)

    let cTaskMemo = (name: CommandTask["type"]) => (data: string | number) =>
      new CTask(name, data)
    let get_title_string = (str: string) =>
      str.match(title_with_label)![0].split(" ")[1]
    let get_title_null = (str: string) => ""
    let get_solo_string = (str: string) => str.match(just_strings)![0]
    let get_multiplier = (str: string) => str.match(multiplier_command)![0]

    const validators = [
      new CommandValidator(title, get_title_null, cTaskMemo("TITLE")),
      new CommandValidator(
        title_with_label,
        get_title_string,
        cTaskMemo("TITLE")
      ),
      new CommandValidator(just_strings, get_solo_string, cTaskMemo("REF")),
      new CommandValidator(
        multiplier_command,
        get_multiplier,
        cTaskMemo("MULT")
      ),
    ]

    export const test = (str: string) => {
      for (let current of validators) {
        if (current.validator.test(str))
          return current.get_task(current.get_string(str))
      }
      return null
    }
  }
  let full_block = new RegExp(/\#\+(.)*?\-\#/gs)

  export const contains_tasklist = (view: MarkdownView): boolean =>
    full_block.test(view.data)

  export const get_tasklist_blocks = (view: MarkdownView) =>
    view.data.match(full_block)!

  export const parse_tasklist = (matches: RegExpMatchArray) => {
    // #todo
    let task_array: Task[] = []
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
