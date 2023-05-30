import React from "react";
import "./App.css";
import { Main } from "./main";

function App() {
  return (
    <div className="App">
      <Main />
      <footer>
        Made with <span className="highlight">♡</span> for{" "}
        <span className="highlight">Tesla</span>
      </footer>
    </div>
  );
}

export default App;
