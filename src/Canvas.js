import React, { useState, useEffect } from "react";
import "./App.css"; // App.css 파일에 body의 background-color를 설정해주세요.
import Memo from "./Memo";

function Canvas() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState({
    x: 0,
    y: 0,
  });

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
      setImageLoaded(true); // 이미지 로드 완료 상태 업데이트
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
      w: { pressed: false },
      a: { pressed: false },
      s: { pressed: false },
      d: { pressed: false },
    };

    let lastKey = "";

    // 애니메이션 함수
    function animate() {
      window.requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 지움
      ctx.drawImage(
        image,
        -750 + backgroundPosition.x,
        -550 + backgroundPosition.y
      ); // 배경 이미지 그리기
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
      ); // 플레이어 이미지 그리기

      // 키 입력에 따라 배경 위치 변경
      if (keys.w.pressed && lastKey === "w") backgroundPosition.y += 3;
      else if (keys.a.pressed && lastKey === "a") backgroundPosition.x += 3;
      else if (keys.s.pressed && lastKey === "s") backgroundPosition.y -= 3;
      else if (keys.d.pressed && lastKey === "d") backgroundPosition.x -= 3;

      // 캐릭터의 초기 위치
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
        case "w":
          keys.w.pressed = true;
          lastKey = "w";
          break;
        case "a":
          keys.a.pressed = true;
          lastKey = "a";
          break;
        case "s":
          keys.s.pressed = true;
          lastKey = "s";
          break;
        case "d":
          keys.d.pressed = true;
          lastKey = "d";
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "w":
          keys.w.pressed = false;
          break;
        case "a":
          keys.a.pressed = false;
          break;
        case "s":
          keys.s.pressed = false;
          break;
        case "d":
          keys.d.pressed = false;
          break;
      }
    });
  }, []);

  const handleHideTreasure = () => {
    localStorage.setItem("treasurePosition", JSON.stringify(characterPosition));
    alert("보물을 숨겼습니다! hidden treasure!");
  };

  return (
    <div className="App">
      <div>
        X {characterPosition.x}, Y {characterPosition.y}
      </div>
      <canvas></canvas>
      <button onClick={handleHideTreasure}>Hide Treasure</button>
      <Memo characterPosition={characterPosition} />
    </div>
  );
}

export default Canvas;
