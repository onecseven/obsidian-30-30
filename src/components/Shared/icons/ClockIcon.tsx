import React from "react";
import { IconProps } from "../Icons";

export const ClockIcon = ({ x, y }: IconProps) => {
  return (
    <svg
      viewBox="0 0 100 412"
      x={x}
      y={y}
      width="80"
      height="80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="scale(12), translate(-105, -104)">
        <circle
          className="stubbornClock medium-stroke sT"
          cx="109.21608"
          cy="121.23831"
          r="8.6356897" />
        <rect
          className="clock medium-fill fillT"
          id="rect2461"
          width="8.4906425"
          height="2.225534"
          x="104.97075"
          y="110.21989" />
        <rect
          className="clock medium-fill fillT"
          id="rect2461-7"
          width="8.4906425"
          height="2.225534"
          x="104.97076"
          y="129.77719" />
        <path
          className="stubbornClock medium-stroke sT "
          d="m 108.39248,115.50054 v 6.50945"
          id="path2667" />
        <path
          className="stubbornClock medium-stroke sT"
          d="m 108.44257,121.94957 4.75003,3.32155"
          id="path2673" />
      </g>
    </svg>
  );
};
