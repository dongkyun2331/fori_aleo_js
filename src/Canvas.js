import React, { useState, useEffect } from "react";
import "./App.css"; // App.css 파일에 body의 background-color를 설정해주세요.

function Canvas() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 }); // 캐릭터 좌표 상태 추가

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
          canvas.width / 2 - playerImage.width / 8,
          canvas.height / 2 - playerImage.height / 2,
          playerImage.width / 4,
          playerImage.height
        );
      };
    };

    // Sprite 클래스 정의
    class Sprite {
      constructor({ position, image }) {
        this.position = position;
        this.image = image;
      }

      draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
      }
    }

    // 캔버스에 그릴 스프라이트 객체 생성
    const background = new Sprite({
      position: { x: -785, y: -650 },
      image: image,
    });

    // 키보드 이벤트 관리 객체
    const keys = {
      w: { pressed: false },
      a: { pressed: false },
      s: { pressed: false },
      d: { pressed: false },
    };

    let lastKey = "";

    function animate() {
      window.requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      background.draw(ctx);

      ctx.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - playerImage.width / 8 + playerPosition.x, // 캐릭터 좌표 추가
        canvas.height / 2 - playerImage.height / 2 + playerPosition.y, // 캐릭터 좌표 추가
        playerImage.width / 4,
        playerImage.height
      );
      // 키 입력에 따라 배경 위치 변경
      if (keys.w.pressed && lastKey === "w") background.position.y += 3;
      else if (keys.a.pressed && lastKey === "a") background.position.x += 3;
      else if (keys.s.pressed && lastKey === "s") background.position.y -= 3;
      else if (keys.d.pressed && lastKey === "d") background.position.x -= 3;
    }
    animate();

    // 키보드 이벤트 처리
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w":
          keys.w.pressed = true;
          lastKey = "w";
          setPlayerPosition((prevPos) => ({ ...prevPos, y: prevPos.y - 3 })); // 위로 이동
          break;
        case "a":
          keys.a.pressed = true;
          lastKey = "a";
          setPlayerPosition((prevPos) => ({ ...prevPos, x: prevPos.x - 3 })); // 왼쪽으로 이동
          break;
        case "s":
          keys.s.pressed = true;
          lastKey = "s";
          setPlayerPosition((prevPos) => ({ ...prevPos, y: prevPos.y + 3 })); // 아래로 이동
          break;
        case "d":
          keys.d.pressed = true;
          lastKey = "d";
          setPlayerPosition((prevPos) => ({ ...prevPos, x: prevPos.x + 3 })); // 오른쪽으로 이동
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

  return (
    <div className="App">
      <canvas></canvas>
      <div>
        캐릭터 좌표: ({playerPosition.x}, {playerPosition.y})
      </div>{" "}
      {/* 좌표 표시 */}
    </div>
  );
}
export default Canvas;
