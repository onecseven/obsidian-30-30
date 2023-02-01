import React from "react";
import { useColor } from "../../store/useColor";


export const Triangle = ({ cb }: {cb: () =>  void}) => {
  useColor()
  return (
  <g onClick={cb}>
    <path
      className="dark-fill fillT"
      // d="M270.707 175.778v128.567l128.328-64.403z"
      d="M250.707 160.778v160.567l160.328-80.403z"
    ></path>
  </g>
)};
