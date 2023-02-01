import React from "react";
import { useColor } from "../../../store/useColor";
import { IconProps, Icon } from "../Icons";


export const OpenLockIcon = ({ x, y }: IconProps) => {
  useColor();
  return (
    <Icon x={x} y={y} width="70" height="70">
      <path d="M360 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z" />
    </Icon>
  );
};
