import React, { FunctionComponent } from "react";
import * as Phys from "react-dom-box2d";
import { Shake } from "reshake";

import "./style.css";
import CurvedText from "./CurvedText";

interface NameballProps {
  name: string;
  role: string;
  left?: number;
  top?: number;
  fillColor?: string;
  textColor?: string;
}

const Nameball: FunctionComponent<NameballProps> = (props: NameballProps) => {
  const diameter = 100;

  return (
    <Shake h={2} v={2} r={0}>
      <Phys.Item
        shape="circle"
        left={props.left}
        top={props.top}
        restitution={0.65}
        width={diameter}
        height={diameter}
      >
        <div
          className="circle1"
          style={{ backgroundColor: props.fillColor, color: "white" }}
        >
          <CurvedText
            upperText={props.name}
            lowerText={props.role}
            objectSize={diameter}
          ></CurvedText>
        </div>
      </Phys.Item>
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
