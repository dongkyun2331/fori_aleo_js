// Canvas.js
import React, { useState, useEffect } from "react";
import "./App.css";
import Memo from "./Memo";

function Canvas() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState({
    x: 0,
    y: 0,
  });
  const [treasureMemo, setTreasureMemo] = useState("");

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 576;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = "./img/Pellet Town.png";
    const playerImage = new Image();
    playerImage.src = "./img/playerDown.png";
    image.onload = () => {
      ctx.drawImage(image, -750, -550);
      setImageLoaded(true);
      playerImage.onload = () => {
        ctx.drawImage(
          playerImage,
          0,
          0,
          playerImage.width / 4,
          playerImage.height,
          canvas.width / 2 - playerImage.width / 8 + backgroundPosition.x,
          canvas.height / 2 - playerImage.height / 2 + backgroundPosition.y,
          playerImage.width / 4,
          playerImage.height
        );
      };
    };

    // 키보드 이벤트 처리
    const keys = {
      ArrowUp: { pressed: false },
      ArrowLeft: { pressed: false },
      ArrowDown: { pressed: false },
      ArrowRight: { pressed: false },
    };

    let lastKey = "";

    // 애니메이션 함수
    function animate() {
      window.requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        image,
        -750 + backgroundPosition.x,
        -550 + backgroundPosition.y
      );
      ctx.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - playerImage.width / 8,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
      );

      if (keys.ArrowUp.pressed && lastKey === "ArrowUp")
        backgroundPosition.y += 3;
      else if (keys.ArrowLeft.pressed && lastKey === "ArrowLeft")
        backgroundPosition.x += 3;
      else if (keys.ArrowDown.pressed && lastKey === "ArrowDown")
        backgroundPosition.y -= 3;
      else if (keys.ArrowRight.pressed && lastKey === "ArrowRight")
        backgroundPosition.x -= 3;

      const deltaX = backgroundPosition.x - characterPosition.x;
      const deltaY = backgroundPosition.y - characterPosition.y;
      setCharacterPosition({
        x: characterPosition.x - deltaX,
        y: characterPosition.y + deltaY,
      });
    }

    animate();

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          keys.ArrowUp.pressed = true;
          lastKey = "ArrowUp";
          break;
        case "ArrowLeft":
          keys.ArrowLeft.pressed = true;
          lastKey = "ArrowLeft";
          break;
        case "ArrowDown":
          keys.ArrowDown.pressed = true;
          lastKey = "ArrowDown";
          break;
        case "ArrowRight":
          keys.ArrowRight.pressed = true;
          lastKey = "ArrowRight";
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowUp":
          keys.ArrowUp.pressed = false;
          break;
        case "ArrowLeft":
          keys.ArrowLeft.pressed = false;
          break;
        case "ArrowDown":
          keys.ArrowDown.pressed = false;
          break;
        case "ArrowRight":
          keys.ArrowRight.pressed = false;
          break;
      }
    });
  }, []);

  const handleTreasureMemoChange = (event) => {
    setTreasureMemo(event.target.value);
  };

  const handleHideTreasure = () => {
    localStorage.setItem("treasurePosition", JSON.stringify(characterPosition));
    localStorage.setItem("treasureMemo", JSON.stringify(treasureMemo));
    alert(`보물을 숨겼습니다! hidden treasure! ${treasureMemo}`);
    setTreasureMemo("");
  };

  return (
    <div className="App">
      <div>
        X {characterPosition.x}, Y {characterPosition.y}
      </div>
      <canvas></canvas>
      <div>
        <input
          type="text"
          value={treasureMemo}
          onChange={handleTreasureMemoChange}
          placeholder="Text"
        />
        <button onClick={handleHideTreasure}>Hide Treasure</button>
      </div>
      <Memo characterPosition={characterPosition} treasureMemo={treasureMemo} />
    </div>
  );
}

export default Canvas;
