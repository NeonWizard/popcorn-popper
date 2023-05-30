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
  upperText: string;
  lowerText: string;
  objectSize: number;
};

const CurvedTextStyle = styled.div`
  path {
    fill: transparent;
  }

  text {
    fill: currentColor;
    text-anchor: middle;
  }
`;

const CurvedText = ({ upperText, lowerText, objectSize }: CurvedTextProps) => {
  const d = objectSize;
  const r = d / 2;
  const cx = objectSize / 2;
  const cy = objectSize / 2;

  const upperOffset = 19;
  const lowerOffset = 6;

  return (
    <CurvedTextStyle className="curved-text">
      <svg viewBox={`0 0 ${d} ${d}`}>
        <path
          id="curve"
          d={`
            M ${cx - r + upperOffset},${cy}
            A ${cx - upperOffset},${cy - upperOffset} 0 0,1 ${
            d - upperOffset
          },${cy}
          `}
          fill="lime"
        />
        <path
          id="curve-bottom"
          d={`
            M ${cx - r + lowerOffset},${cy - lowerOffset}
            A ${cx - lowerOffset},${cy} 0 0,0 ${d - lowerOffset},${
            cy - lowerOffset
          }
          `}
          fill="pink"
        />
        <text width="500">
          <textPath
            xlinkHref="#curve"
            startOffset="50%"
            style={{ fontSize: "1.1rem" }}
          >
            {upperText}
          </textPath>
          <textPath
            xlinkHref="#curve-bottom"
            startOffset="50%"
            style={{ color: "#bbb", fontSize: "0.8rem" }}
            letterSpacing="1.5"
          >
            {lowerText}
          </textPath>
        </text>
      </svg>
    </CurvedTextStyle>
  );
};

export default CurvedText;
