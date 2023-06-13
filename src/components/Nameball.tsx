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

  onPop?: (coords: { x: number; y: number }) => void;
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

function getRainbowColor() {
  const colors = [
    "#980000", // red
    "#984500", // orange
    "#a77f03", // yellow
    "#0c8900", // green
    "#004093", // blue
    "#8b24c7", // purble
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

// TODO: Use Container pattern to separate to NameballContainer and Nameball
const Nameball: FunctionComponent<NameballProps> = (props: NameballProps) => {
  const { setScreenShake } = useScreenShakeContext();
  const diameter = 100;

  const fillColor = useMemo(
    () => (props.popped ? getRainbowColor() : props.fillColor),
    [props.fillColor, props.popped]
  );

  // const textColor = getContrastYIQ(fillColor ?? "");
  const textColor = "white";

  return (
    <Shake
      h={3}
      v={3}
      r={0}
      int={5}
      q={props.popped ? 0 : 300}
      freez={!props.popped} // idk why but this fixes the ball shifting over when hovered
      active={!props.popped}
    >
      <Style>
        <Phys.Item
          shape="circle"
          left={props.left ? props.left - diameter / 2 : undefined}
          top={props.top ? props.top - diameter / 2 : undefined}
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
            onClick={(event) => {
              if (!props.popped) {
                setScreenShake(true);
                setTimeout(() => setScreenShake(false), 100);
                props.onPop?.({ x: event.clientX, y: event.clientY });
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
      get: () => Math.random() * 100 + 20,
    },
    top: {
      enumerable: true,
      get: () => Math.random() * 100 + 20,
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
