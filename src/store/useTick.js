import { useEffect } from "react"
import { solve_for_y } from "./solve_for_y"
import { useTaskStor } from "./store"
import { colorStrings } from "./colorStrings"

export const MAX = 1600

export const useTick = () => {
  let { length, remaining_seconds,color } = useTaskStor((state) => state)
  let fLen = MAX - solve_for_y(length, remaining_seconds, MAX)
  useEffect(() => {
    //@ts-expect-error
    document.getElementById(
      "innerCircle"
    ).style = `stroke-dasharray: ${fLen}, ${MAX};stroke:${colorStrings[color].dark}`
    return () => {}
  }, [remaining_seconds])

  return [fLen, MAX]
}
