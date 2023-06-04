import React, { FunctionComponent } from "react";
import * as Phys from "react-dom-box2d";
import { Shake } from "reshake";

import "./style.css";
import CurvedText from "./CurvedText";
import { useScreenShakeContext } from "../ScreenShakeContext";
import styled from "styled-components";

interface NameballProps {
  name: string;
  role: string;
  left?: number;
  top?: number;
  fillColor?: string;
  textColor?: string;
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

  .circle:hover {
    background-color: #fff !important;
    color: black !important;
    cursor: pointer;
  }
`;

const Nameball: FunctionComponent<NameballProps> = (props: NameballProps) => {
  const { setScreenShake } = useScreenShakeContext();
  const diameter = 100;

  return (
    <Shake h={2} v={2} r={0} int={1}>
      <Style>
        <Phys.Item
          shape="circle"
          left={props.left}
          top={props.top}
          restitution={0.65}
          width={diameter}
          height={diameter}
        >
          <div
            className="circle"
            style={{ backgroundColor: props.fillColor, color: "white" }}
            onClick={() => {
              setScreenShake(true);
              setTimeout(() => setScreenShake(false), 100);
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
