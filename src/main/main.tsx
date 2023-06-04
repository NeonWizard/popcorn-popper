import React, { useEffect, useState } from "react";
import * as Phys from "react-dom-box2d";

import Nameball from "../components/Nameball";
import NameHeader from "../components/NameHeader";

import styled from "styled-components";

type Member = {
  name: string;
  role: string;
};

const retrieveStoredMembers = (): Member[] => {
  const memberList = localStorage.getItem("memberlist") ?? "";

  return memberList
    .split(",")
    .map<Member>((s) => ({ name: s, role: "software dev" }));
};

const storeMembers = (members: Member[]): void => {
  localStorage.setItem(
    "memberlist",
    members.map((member) => member.name).join(",")
  );
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
  // TODO: Store in a backend instead of locally
  const [memberList, setMemberList] = useState(retrieveStoredMembers());

  const [waitingMembers, setWaitingMembers] = useState<Member[]>([
    ...memberList,
  ]);
  const [poppedMembers, setPoppedMembers] = useState<Member[]>([]);

  // Store member list to localStorage when it changes
  useEffect(() => {
    storeMembers(memberList);
  }, [memberList]);

  return (
    <Style>
      {/* CONSIDER REPLACING PHYS.WORLD WITH THIS:
       * https://codepen.io/DPerrySvendsen/pen/xwBJxN
       */}
      <Phys.World
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={[0, 5]}
        className="world-screen"
        style={{ position: "fixed" }}
      >
        <Nameball
          name="I'm freeee"
          role="cya"
          left={window.innerWidth / 2}
        ></Nameball>
      </Phys.World>

      <NameHeader name="Wes" role="Software Engineer"></NameHeader>

      <Phys.World
        width={600}
        height={400}
        gravity={[0, 9.8]}
        className="world-box"
        // style={{ backgroundColor: "#111214" }}
      >
        {memberList.map((member) => (
          <Nameball name={member.name} role={member.role}></Nameball>
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
