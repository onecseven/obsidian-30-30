
const colors = [
  "gray",
  "orange",
  "red",
  "green",
  "blue",
  "forest",
  "yellow",
  "violet",
  "purple",
  "pink",
  "aqua",
] as const 

export type Color = typeof colors[number]

let shuffleArray = <T>(arr: T[]): T[] => {
  let array = arr.slice()
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

let setup_color_generator = () => {
  const colors_default: Color[] = [
    "gray",
    "orange",
    "red",
    "green",
    "blue",
    "forest",
    "yellow",
    "violet",
    "purple",
    "pink",
    "aqua",
  ]
  let current_colors = shuffleArray(colors_default)
  return (): Color => {
    if (!current_colors.length) current_colors = shuffleArray(colors_default)
    return current_colors.pop()!
  }
}

let get_color = setup_color_generator()

function getUniqueID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + "-" + s4()
}

export class StopTask {
  color: Color = "gray"
  id = getUniqueID()
  status = "OVER"
  name = "_BREAK"
  length = 0
  remaining_seconds = 0
}

export class Task implements Task {
  id: string = getUniqueID()
  name: string
  length: number
  remaining_seconds: number
  color: Color

  constructor(_name: string, _length: number) {
    this.color = get_color()
    this.name = _name
    this.length = _length * 60
    this.remaining_seconds = _length * 60
    // this.remaining_seconds = _length //dev
    this.id
  }
}

export class TaskList implements TaskList {
  id = getUniqueID()
  name: string
  tasks: Task[] = [new StopTask()]
  looping = false // ignore StopTask or not
  timer: ReturnType<typeof setTimeout> | null = null

  constructor(_name: string, _tasks: Task[]) {
    this.name = _name
    this.tasks = [..._tasks.slice(), new StopTask()]
  }
}
