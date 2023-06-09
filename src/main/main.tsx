import React, { useEffect, useState } from "react";
import * as Phys from "react-dom-box2d";
import styled from "styled-components";
import {
  IoAddOutline,
  IoRemoveOutline,
  IoRefreshOutline,
} from "react-icons/io5";

import Nameball from "../components/Nameball";
import NameHeader from "../components/NameHeader";
import { Member, popMember } from "../app/memberSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { IoPencilOutline } from "react-icons/io5";

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

  .world-box-display {
    position: fixed;
    z-index: -5;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 7px 0px rgba(0, 0, 0, 0.6);
    transform: translateX(0); // hack
  }

  .world-box-controls {
    position: fixed;
    left: calc(50% + 300px);
    top: calc(50% - 200px);
    transform: translateX(-100%) translateY(-100%);
    font-size: 0.8em;

    * {
      margin-right: 2px;
      z-index: 999;
      cursor: pointer;
    }
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

    .highlight {
      color: #bbb;
    }
  }
`;

const Main = () => {
  const unpoppedMembers = useAppSelector(
    (state) => state.member.unpoppedMembers
  );
  const storedPoppedMembers = useAppSelector(
    (state) => state.member.poppedMembers
  );
  const dispatch = useAppDispatch();

  // Nasty, nasty code to make localStoraged balls appear one by one on page load
  const [poppedMembers, setPoppedMembers] = useState<Member[]>([]);
  useEffect(() => {
    let i = 0;
    const oldPoppedMembers = [...poppedMembers];
    for (const member of storedPoppedMembers) {
      if (!!poppedMembers.find((m) => m.id === member.id)) continue;
      i += 1;
      setTimeout(() => {
        oldPoppedMembers.push(member);
        setPoppedMembers([...oldPoppedMembers]);
      }, i * 120);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedPoppedMembers]);

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

    // Required so the spawn delay isn't applied to freshly popped balls
    poppedMembers.push(member);

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
                x: Math.sign(Math.random() - 0.5) * 600,
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

      {/* Mock box for rendering box style, so it can be rendered underneath balls */}
      <div
        className="world-box-display"
        style={{ width: 600, height: 400 }}
      ></div>
      <div className="world-box-controls">
        <IoAddOutline color="lime" />
        <IoRemoveOutline color="red" />
        <IoPencilOutline color="gray" />
        <IoRefreshOutline color="gray" />
      </div>

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
