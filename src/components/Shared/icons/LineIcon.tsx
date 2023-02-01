import React from "react";
import { IconProps } from "../Icons";


export const LineIcon = ({ x, y }: IconProps) => {
  return (
    <svg
      className="circle lineStroke"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      width="500"
      height="100px"
    >
      <line
        x1="-98"
        y1="25"
        x2="148"
        y2="25"
        style={{ strokeWidth: "6", strokeLinecap: "round", stroke: "#9aa3b0" }} />
    </svg>
  );
};
