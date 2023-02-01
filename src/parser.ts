import { MarkdownView } from "obsidian"
import { Task, TaskList } from "./primitives"

const doTimes = (iteratee: Function, n: number): boolean => {
  if (n < 1 || n > 9007199254740991) {
    return false
  }
  while (n > 0) {
    iteratee()
    n--
  }
  return true
}

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
      get_string: (str: string) => string | number
      get_task: (str: string | number) => CommandTask
      constructor(
        regex: RegExp,
        getstr: (str: string) => string | number,
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

    let title = new RegExp(/\#\+\s*(?!.+)/g)
    let title_with_label = new RegExp(/\#\+\s*.+/g)
    let just_strings = new RegExp(/^[a-zA-Z]+\b/g)
    let multiplier_command = new RegExp(/(?<=^x)\d(?!.)/g)

    let cTaskMemo = (name: CommandTask["type"]) => (data: string | number) =>
      new CTask(name, data)
    let get_title_string = (str: string) =>
      str.match(title_with_label)![0].split(" ")[1]
    let get_title_null = (str: string) => ""
    let get_solo_string = (str: string) => str.match(just_strings)![0]
    let get_multiplier = (str: string) =>
      Number(str.match(multiplier_command)![0])

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

  export const contains_tasklist = (view: string): boolean =>
    full_block.test(view)

  export const get_tasklist_blocks = (view: string) =>
    view.match(full_block)

  export const parse_tasklist = (match: string) => {
    let compromise = match.split("\n")
    let taskList: Task[] = []
    let task_title: string = ""
    for (let statement of compromise) {
      let task_attempt = Tasks.test(statement)
      if (task_attempt) {
        taskList.push(task_attempt)
        continue
      }
      let command_attempt = Commands.test(statement)
      if (command_attempt) {
        switch (command_attempt.type) {
          case "TITLE":
            task_title = command_attempt.data as string
            break
          case "MULT":
            let result: Task[] = []
            doTimes(() => {
              result.push(...taskList.slice())
            }, command_attempt.data as number)
            taskList = result
            break
          case "REF":
            let referenced = command_attempt.data as string
            let task_index = taskList
              .map((t) => t.name)
              .findIndex((t) => t === referenced)
            if (task_index === -1) break
            taskList.push(
              new Task(taskList[task_index].name, taskList[task_index].length)
            )
            break
        }
      }
    }
    return new TaskList(task_title, taskList)
  }
  export const get_tasklists = (view: string): TaskList[] => {
    if (!contains_tasklist(view)) return []
    let matches = get_tasklist_blocks(view)!
    let result = []
    for (let match of matches) {
      result.push(parse_tasklist(match))
    }
    return result
  }
}

export default Parser.get_tasklists