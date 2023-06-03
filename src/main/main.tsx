import React, { useEffect, useState } from "react";
import * as Phys from "react-dom-box2d";

import Nameball from "../components/Nameball";
import NameHeader from "../components/NameHeader";

import "./main.css";

const Main = () => {
  // TODO: Store in a backend instead of locally
  const [memberList, setMemberList] = useState(
    (localStorage.getItem("memberlist") ?? "").split(",")
  );

  useEffect(() => {
    localStorage.setItem("memberlist", memberList.join(","));
  }, [memberList]);

  return (
    <>
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
        style={{ backgroundColor: "#111214" }}
      >
        {memberList.map((member) => (
          <Nameball name={member} role="ui designer"></Nameball>
        ))}
      </Phys.World>
    </>
  );
};

export default Main;
