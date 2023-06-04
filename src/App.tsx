import React, { useState } from "react";
import { Shake } from "reshake";
import "./App.css";
import { ScreenShakeContextProvider } from "./ScreenShakeContext";
import { Main } from "./main";

function App() {
  const [screenShake, setScreenShake] = useState(false);

  return (
    <ScreenShakeContextProvider
      screenShake={screenShake}
      setScreenShake={setScreenShake}
    >
      <Shake
        active={screenShake}
        int={screenShake ? 1 : 999}
        h={16}
        v={16}
        r={0}
        dur={80}
        q={1}
      >
        <div className="App">
          <Main />
        </div>
      </Shake>
    </ScreenShakeContextProvider>
  );
}

export default App;
