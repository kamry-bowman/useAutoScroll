import React, { useEffect, useState, useRef } from "react";
import upArrow from "./up-arrow.svg";
import downArrow from "./down-arrow.svg";
import useAutoScroll from "../src";

import "./styles.css";
const data = [0, 1, 2, 3, 4, 5];

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const rootNode = useRef(null);

  // this effect recreates the effect of images loading and triggering a reflow,
  // which is an issue autoscroll implementations need to account for
  useEffect(function simulateReflowOnImageLoad() {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const { scrollNext, scrollBack, position } = useAutoScroll(
    rootNode.current,
    ".card"
  );

  return (
    <div className="App" ref={rootNode}>
      <h1>useAutoScroll Example</h1>
      <div className="controls">
        <button onClick={scrollBack}>
          <img className="arrow" src={upArrow} />
        </button>
        <button onClick={scrollNext}>
          <img src={downArrow} className="arrow" />
        </button>
      </div>
      {data.map(datum => (
        <div className={`card${loaded ? " loaded" : ""}`} key={datum}>
          {datum}
        </div>
      ))}
    </div>
  );
}
