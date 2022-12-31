function getUniqueID() {
  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
}

export class StopTask implements StopTask {
  id = getUniqueID()
  name = "BREAK"
  length = 0
  remaining_length = 0
  tick() {
    return null
  }
}

export class Task implements Task {
  id: string = getUniqueID()
  name: string
  length: number
  remaining_length: number
  
  constructor(_name: string, _length: number) {
    this.name = _name
    this.length = _length
    // this.remaining_length = _length * 60
    this.remaining_length = _length * 6000 //dev
     
    this.id 
  }
  
  tick(onEnd: () => void) {
    this.remaining_length ? 
    this.remaining_length-- :
    (this.remaining_length = this.length) && (onEnd())
  }
}

export class TaskList implements TaskList {
  name: string
  tasks: Task[] = [new StopTask()]
  id: string = getUniqueID()
  private looping = false // ignore StopTask or not
  private timer: ReturnType<typeof setTimeout> | null = null

  constructor(_name: string, _tasks: Task[]) {
    
    this.name = _name
    this.tasks = _tasks
  }
  
  private get current_task(): Task {
    return this.tasks[0]
  }

  get isPlaying() {
    return this.timer !== null
  }

  send_task_to_bottom() {
    let wasPlaying = this.isPlaying
    if (this.isPlaying) this.stop()
    let result = this.tasks.slice()
    result.push(result.shift()!)
    this.tasks = result
    if( wasPlaying ) this.start()
  }

  start() {
    if (this.isPlaying) this.stop()
    this.timer = setInterval(() => this.current_task.tick(() => this.send_task_to_bottom()), 1000)
  }

  stop() {
    if (!this.isPlaying) return
    clearInterval(this.timer!)
    this.timer = null
  }

  toggle_loop() {
    this.looping = !this.looping
  }

  update(tasks: Task[]) {
    //when the tasklist file changes, lets try to keep the remaining lengths if possible
  }
}
