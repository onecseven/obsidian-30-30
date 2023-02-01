import React from "react";
import { colorStrings } from "../../store/colorStrings";
export const BGCircle = () => {
  return (
  <circle
    fill="none"
    stroke={colorStrings.gray.light}
    className="circle medium-stroke"
    r="250"
    cx="325"
    cy="325"
    strokeWidth="90"
    
  ></circle>
)};
