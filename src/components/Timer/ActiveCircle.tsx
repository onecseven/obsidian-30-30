import React from "react";
import { useTick } from "../../store/useTick";

export const ActiveCircle = () => {
  useTick()
  return (
  <circle
    fill="none"
    transform="rotate(-90 325 325)"
    /* incrementing left argument will continuously fill the circle */
    // strokeDasharray={`${fLen}, ${MAX}`}
    // strokeLinecap="round"
    className="innerCircle circle"
    id="innerCircle"
    r="250"
    cx="325"
    cy="325"
    strokeWidth="90"
  ></circle>
)
}