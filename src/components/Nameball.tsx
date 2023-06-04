import React, { FunctionComponent, useMemo } from "react";
import * as Phys from "react-dom-box2d";
import { Shake } from "reshake";

import "./style.css";
import CurvedText from "./CurvedText";
import { useScreenShakeContext } from "../ScreenShakeContext";
import styled from "styled-components";

interface NameballProps {
  name: string;
  role: string;
  popped: boolean;

  left?: number;
  top?: number;
  initialForce?: { x: number; y: number };

  fillColor?: string;
  textColor?: string;

  onPop?: () => void;
}

const Style = styled.div`
  .circle {
    // background-color: #bb0000;
    // background: radial-gradient(#d00, #900);
    // background: radial-gradient(#22222a, #1a1a1f) !important;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.6);
    text-align: center;
    height: 120px;
    width: 120px;
    border: 1px solid black;
    user-select: none;

    font-family: monospace;
    font-size: 1rem;
    color: white;
    text-transform: uppercase;
  }

  .unpopped:hover {
    background-color: #fff !important;
    color: black !important;
    cursor: pointer;
  }
`;

// Util function to calculate what text color should be used
// to contrast with background
// https://24ways.org/2010/calculating-color-contrast
function getContrastYIQ(hexcolor: string): string {
  var r = parseInt(hexcolor.substring(1, 3), 16);
  var g = parseInt(hexcolor.substring(3, 5), 16);
  var b = parseInt(hexcolor.substring(5, 7), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

function getDarkColor() {
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  return color;
}

// TODO: Use Container pattern to separate to NameballContainer and Nameball
const Nameball: FunctionComponent<NameballProps> = (props: NameballProps) => {
  const { setScreenShake } = useScreenShakeContext();
  const diameter = 100;

  const fillColor = useMemo(
    () => (props.popped ? getDarkColor() : props.fillColor),
    [props.fillColor, props.popped]
  );

  // const textColor = getContrastYIQ(fillColor ?? "");
  const textColor = "white";

  return (
    <Shake
      h={2}
      v={2}
      r={0}
      int={1}
      q={props.popped ? 0 : 300}
      freez={!props.popped} // idk why but this fixes the ball shifting over when hovered
      active={!props.popped}
    >
      <Style>
        <Phys.Item
          shape="circle"
          left={props.left}
          top={props.top}
          restitution={0.65}
          width={diameter}
          height={diameter}
          initialForce={
            !!props.initialForce
              ? [props.initialForce.x, props.initialForce.y]
              : undefined
          }
        >
          <div
            className={`circle ${!props.popped ? "unpopped" : ""}`}
            style={{ backgroundColor: fillColor, color: textColor }}
            onClick={() => {
              if (!props.popped) {
                setScreenShake(true);
                setTimeout(() => setScreenShake(false), 100);
                props.onPop?.();
              }
            }}
          >
            <CurvedText
              upperText={props.name}
              lowerText={props.role}
              objectSize={diameter}
            ></CurvedText>
          </div>
        </Phys.Item>
      </Style>
    </Shake>
  );
};

// https://stackoverflow.com/questions/37819128/random-data-in-defaultprops
Nameball.defaultProps = Object.create(
  {},
  {
    left: {
      enumerable: true,
      get: () => Math.random() * 100,
    },
    top: {
      enumerable: true,
      get: () => Math.random() * 100,
    },
    fillColor: {
      enumerable: true,
      // get: () => "hsl(" + Math.random() * 360 + ", 100%, 75%)",
      // get: () => ["#f00", "#0f0", "#00f"][Math.round(Math.random() * 2)],
      get: () => "#22222a",
    },
  }
);

export default Nameball;
