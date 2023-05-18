import { useEffect, useState } from "react";

import * as Phys from "react-dom-box2d";

function Main() {
  // TODO: Store in a backend instead of locally
  // const [memberList, setMemberList] = useState(
  //   localStorage.getItem("memberlist") ?? ""
  // );

  // useEffect(() => {
  //   localStorage.setItem("memberlist", memberList);
  // }, [memberList]);

  return (
    <>
      <Phys.World width={400} height={400} gravity={[0, 9.8]} className="world">
        <Phys.Item left={5} top={100} restitution={0.8}></Phys.Item>
      </Phys.World>
    </>
  );
}

export default Main;
