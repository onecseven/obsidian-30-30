interface StopTask {
  //added automatically if not present
  name: "BREAK"
  length: 0
  remaining_length: 0
  done: () => null
}

interface Task {
  name: string
  length: number // in minutes
  remaining_length: number
  done: () => void //resets remaining_length
  // there should be add5 and take5 or a computed length of the total but we dont need that right now
}
