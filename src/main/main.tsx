import React, { useEffect, useState } from "react";

import * as Phys from "react-dom-box2d";

const Main = () => {
  // TODO: Store in a backend instead of locally
  const [memberList, setMemberList] = useState(
    localStorage.getItem("memberlist") ?? ""
  );

  useEffect(() => {
    localStorage.setItem("memberlist", memberList);
  }, [memberList]);

  return (
    <Phys.World width={400} height={400} gravity={[0, 9.8]} className="world">
      <Phys.Item left={5} top={100} restitution={0.8}>
        <div className="box1">
          Some text3 with <button>button</button> or any
          <input type="text" placeholder="other html elements" />
        </div>
      </Phys.Item>

      <Phys.Item shape="box" left={240} top={3} restitution={0.85}>
        <div className="circle1">Box too</div>
      </Phys.Item>
      <Phys.Item shape="circle" left={240} top={3} restitution={0.85}>
        <div className="circle1">circle too</div>
      </Phys.Item>
    </Phys.World>
  );
};

export default Main;
