import React, { useState } from "react";
import * as Phys from "react-dom-box2d";
import styled from "styled-components";

import Nameball from "../components/Nameball";
import NameHeader from "../components/NameHeader";
import { Member, popMember } from "../app/memberSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

type PopTrajectory = {
  x: number;
  y: number;
  force: {
    x: number;
    y: number;
  };
};

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .world-screen {
  }

  .world-box {
    box-sizing: border-box;
    box-shadow: inset 0px 0px 7px 0px rgba(0, 0, 0, 0.6);
  }

  footer {
    position: absolute;
    bottom: -22px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -3;

    color: #333;
    font-family: monospace;
    font-size: 0.5em;
  }

  footer .highlight {
    color: #bbb;
  }
`;

const Main = () => {
  const unpoppedMembers = useAppSelector(
    (state) => state.member.unpoppedMembers
  );
  const poppedMembers = useAppSelector((state) => state.member.poppedMembers);

  const dispatch = useAppDispatch();

  // Keeps track of initial trajectories for newly popped balls
  const [popTrajectories, setPopTrajectories] = useState<{
    [id: number]: PopTrajectory;
  }>({});

  const [lastPopped, setLastPopped] = useState<Member>({
    id: 0,
    name: "---",
    role: "---",
  });

  const handlePop = (member: Member, coords: { x: number; y: number }) => {
    // Update header
    setLastPopped(member);

    // Dispatch popMember, causing member to move from unpopped to popped store array
    dispatch(popMember(member.id));

    // Create inital trajectory for popped ball
    setPopTrajectories({
      ...popTrajectories,
      [member.id]: {
        x: coords.x,
        y: coords.y,
        force: {
          x: (Math.random() - 0.5) * 2000,
          y: -1200 - Math.random() * 200,
        },
      },
    });
  };

  return (
    <Style>
      {/* CONSIDER REPLACING PHYS.WORLD WITH THIS:
       * https://codepen.io/DPerrySvendsen/pen/xwBJxN
       */}
      <Phys.World
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={[0, 6.5]}
        className="world-screen"
        style={{ position: "fixed" }}
      >
        {poppedMembers.map((member) => {
          // Find associated PopTrajectory
          let popTrajectory = popTrajectories[member.id];
          if (popTrajectory === undefined) {
            popTrajectory = {
              x: window.innerWidth / 2,
              y: window.innerHeight / 1.2,
              force: {
                x: 600,
                y: 800,
              },
            };
          }
          return (
            <Nameball
              key={member.id}
              name={member.name}
              role={member.role}
              popped={true}
              initialForce={popTrajectory.force}
              left={popTrajectory.x}
              top={popTrajectory.y}
            ></Nameball>
          );
        })}
      </Phys.World>

      <NameHeader name={lastPopped.name} role={lastPopped.role}></NameHeader>

      <Phys.World
        width={600}
        height={400}
        gravity={[0, 9.8]}
        className="world-box"
      >
        {unpoppedMembers.map((member) => (
          <Nameball
            key={member.id}
            name={member.name}
            role={member.role}
            popped={false}
            onPop={(coords) => handlePop(member, coords)}
          ></Nameball>
        ))}
        <footer>
          Made with <span className="highlight">♡</span> for{" "}
          <span className="highlight">Tesla</span>
        </footer>
      </Phys.World>
    </Style>
  );
};

export default Main;
