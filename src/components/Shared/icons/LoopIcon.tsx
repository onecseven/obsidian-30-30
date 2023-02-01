import React from "react";
import { colorStrings } from "src/store/colorStrings";
import { useColor} from "../../../store/useColor";
import { IconProps } from "../Icons";

export const LoopIcon = ({ x, y }: IconProps) => {
  useColor();
  return (
    <svg
      fill={colorStrings.gray.light}
      className="fadeIn icon light-fill fillT"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      x={x}
      y={y}
      width="70"
      height="70"
    >
      <path d="M0 241.1C0 161 65 96 145.1 96c38.5 0 75.4 15.3 102.6 42.5L320 210.7l72.2-72.2C419.5 111.3 456.4 96 494.9 96C575 96 640 161 640 241.1v29.7C640 351 575 416 494.9 416c-38.5 0-75.4-15.3-102.6-42.5L320 301.3l-72.2 72.2C220.5 400.7 183.6 416 145.1 416C65 416 0 351 0 270.9V241.1zM274.7 256l-72.2-72.2c-15.2-15.2-35.9-23.8-57.4-23.8C100.3 160 64 196.3 64 241.1v29.7c0 44.8 36.3 81.1 81.1 81.1c21.5 0 42.2-8.5 57.4-23.8L274.7 256zm90.5 0l72.2 72.2c15.2 15.2 35.9 23.8 57.4 23.8c44.8 0 81.1-36.3 81.1-81.1V241.1c0-44.8-36.3-81.1-81.1-81.1c-21.5 0-42.2 8.5-57.4 23.8L365.3 256z" />
    </svg>
  );
};

export const NoLoopIcon = ({ x, y }: IconProps) => {
  useColor();
  return (
    <svg
      fill={colorStrings.gray.light}
      className="icon  light-stroke  circle"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      x={x}
      y={y}
      width="70"
      height="70"
    >
      <line
        x1="100"
        y1="0"
        x2="540"
        y2="540"
        style={{ strokeWidth: "80", strokeLinecap: "round" }} />
      <line
        x2="100"
        y1="0"
        x1="540"
        y2="540"
        style={{ strokeWidth: "80", strokeLinecap: "round" }} />
      <path
        className="light-fill fillT"
        d="M0 241.1C0 161 65 96 145.1 96c38.5 0 75.4 15.3 102.6 42.5L320 210.7l72.2-72.2C419.5 111.3 456.4 96 494.9 96C575 96 640 161 640 241.1v29.7C640 351 575 416 494.9 416c-38.5 0-75.4-15.3-102.6-42.5L320 301.3l-72.2 72.2C220.5 400.7 183.6 416 145.1 416C65 416 0 351 0 270.9V241.1zM274.7 256l-72.2-72.2c-15.2-15.2-35.9-23.8-57.4-23.8C100.3 160 64 196.3 64 241.1v29.7c0 44.8 36.3 81.1 81.1 81.1c21.5 0 42.2-8.5 57.4-23.8L274.7 256zm90.5 0l72.2 72.2c15.2 15.2 35.9 23.8 57.4 23.8c44.8 0 81.1-36.3 81.1-81.1V241.1c0-44.8-36.3-81.1-81.1-81.1c-21.5 0-42.2 8.5-57.4 23.8L365.3 256" />
    </svg>
  );
};
