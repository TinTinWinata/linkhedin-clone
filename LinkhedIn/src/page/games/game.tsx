import React, { useEffect, useRef } from "react";
import { runGame } from "./engine";
import "./game.scss";

export default function Game() {
  const canvas = useRef<any>();

  useEffect(() => {
    console.log("canvas : ", canvas);
    runGame(canvas.current);
  }, []);

  return (
    <div className="center h-min-max">
      <canvas ref={canvas} width={800} height={600}></canvas>
    </div>
  );
}
