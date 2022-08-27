import React, { useEffect, useRef } from "react";
import { runGame } from "./megamen";
import "./game.scss";
import { useNavigate } from "react-router-dom";

export default function Game() {
  const canvas = useRef<any>();
  const navigate = useNavigate();
  const menu: any = document.getElementById("menu");

  function startGame() {
    menu.style.display = "none";
    runGame(canvas.current);
  }

  function handleToHome() {
    navigate("/home");
  }

  return (
    <div className="center h-min-max game-container">
      <div className="lose">
        <div className="flex flex-col">
          <h3>You lose sir ? </h3>
          <div className="second-button" onClick={handleToHome}>
            Back to Menu
          </div>
        </div>
      </div>
      <div className="game">
        <audio src="/megamen/laser.mp3" id="laser"></audio>
        <audio src="/megamen/music.mp3" id="music"></audio>
        <audio src="/megamen/iceman.mp3" id="kid"></audio>
        <audio src="/megamen/victory.mp3" id="victory"></audio>

        <div className="screen silkscreen none" id="exit">
          <div className="center-2">
            <div className="flex flex-col">
              <h1 className="color-first" id="win-text">
                Player One Win
              </h1>
              <div onClick={handleToHome} className="second-button">
                Back to Home
              </div>
            </div>
          </div>
        </div>

        <div className="screen bg-menu silkscreen" id="menu">
          <div className="center one">
            <h1 id="start-game" onClick={startGame}>
              Start Game
            </h1>
          </div>
        </div>
        <canvas
          ref={canvas}
          width={800}
          height={500}
          className="relative"
        ></canvas>
      </div>
    </div>
  );
}
