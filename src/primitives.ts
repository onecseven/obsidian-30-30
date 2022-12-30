export class StopTask implements StopTask {
  name = "BREAK"
  length = 0
  remaining_length = 0
  done() {
    return null
  }
}

export class Task implements Task {
  name: string
  length: number
  remaining_length: number
  constructor(_name: string, _length: number) {
    this.name = _name
    this.length = _length
    this.remaining_length = _length
  }
}

export class TaskList implements TaskList {
  looping = false // ignore StopTask or not
  name: string
  tasks: Task[]
  constructor(_name: string, _tasks: Task[]) {
    this.name = _name
    this.tasks = _tasks
  }

  send_task_to_bottom(name: string) {
    //move the task with name to the end of this.tasks
  }

  start() {}
  stop() {}

  toggle_loop() {
    this.looping = !this.looping
  }

  update(tasks: Task[]) {
    //when the tasklist file changes, lets try to keep the remaining lengths if possible
  }
}
