/*

Draws text around a circle (the object).

Text is centered at the top of the circle.

Depends on styled-components, but can be adapted for other frameworks.

<CurvedText
  text="I'm curved"
  objectSize={100} // diameter of the circle to wrap the text around
  spacing={12} // padding between the circle and text
  offset={30} // ammount of space for text, make this bigger to stop larger text from being cropped
  overlap={true} // sets the bottom margin to negative so that the text is centered around the object
/>

*/

import React from "react";
import styled from "styled-components";

type CurvedTextProps = {
  text: string;
  objectSize: number;
  spacing?: number;
  offset?: number;
  overlap?: boolean;
};

const CurvedTextStyle = styled.div<{
  overlap: boolean;
  r: number;
  d: number;
  offset: number;
}>`
  margin-bottom: ${(props) => (props.overlap ? `-${props.r}px` : "0")};
  width: ${(props) => props.d + props.offset * 2}px;
  height: ${(props) => props.r + props.offset}px;
  z-index: 500;

  path {
    fill: transparent;
  }

  text {
    fill: currentColor;
    text-anchor: middle;
  }
`;

const CurvedText = ({
  text,
  objectSize,
  spacing = -15,
  offset = 15,
  overlap = false,
}: CurvedTextProps) => {
  const diameter = objectSize + spacing * 2;
  const radius = diameter / 2;

  return (
    <CurvedTextStyle
      className="curved-text"
      overlap={overlap}
      r={radius}
      d={diameter}
      offset={offset}
    >
      <svg viewBox={`0 0 ${diameter + offset * 2} ${diameter + offset * 2}`}>
        <path
          id="curve"
          d={`
            M${offset},${radius + offset}
            A${radius},${radius} 0 0,1 ${diameter + offset},${radius + offset}`}
        />
        <path
          id="curve-bottom"
          d={`
            M${offset},${radius + offset}
            A${radius},${radius} 0 0,1 ${-(diameter + offset)},${
            radius + offset
          }`}
        />
        <text width="500">
          <textPath xlinkHref="#curve" startOffset="50%">
            {text}
          </textPath>
          <textPath xlinkHref="#curve-bottom" startOffset="50%">
            swag ball
          </textPath>
        </text>
      </svg>
    </CurvedTextStyle>
  );
};

export default CurvedText;
