import React from "react"
import { useTaskStor } from "./../store/store"

// a is to b as x is to {y} (solves for y)
const solve_for_y = (a: number, b: number, x: number) => {
  return (x * b) / a
}

export const Triangle = () => (
  <g>
    <path
      fill="#e10915"
      // d="M270.707 175.778v128.567l128.328-64.403z"
      d="M250.707 160.778v160.567l160.328-80.403z"
    ></path>
  </g>
)

const TimerText = () => (
  <text letterSpacing="-10" x="206" y="455" class="timerText" fill="#e10915">
    00:00
  </text>
)
const BGCircle = () => (
  <circle
    fill="none"
    stroke="#ef5e66"
    className="circle"
    r="250"
    cx="325"
    cy="325"
    strokeWidth="90"
    onClick={() => console.log("here")}
  ></circle>
)

const MAX = 1600

export const Icon = () => {
  let { length, remaining_seconds } = useTaskStor((state) => state)
  let fLen = MAX - solve_for_y(length, remaining_seconds, MAX)
  console.log(fLen)
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="650" height="650" className="timerCircle">
      <BGCircle />

      <Triangle />

      <TimerText />

      <circle
        fill="none"
        stroke="#e10915"
        /* incrementing left argument will continuously fill the circle */
        strokeDasharray={`${fLen}, ${MAX}`}
        // strokeDasharray="2000, "
        // strokeLinecap="round"
        className="circle"
        r="250"
        cx="325"
        cy="325"
        strokeWidth="90"
        onClick={() => console.log("here")}
      ></circle>
      
    </svg>
  )
}
