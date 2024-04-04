import React, { useState, useEffect, useRef } from "react";

function Memo({ characterPosition }) {
  const [memoList, setMemoList] = useState([]);
  const [newMemo, setNewMemo] = useState("");
  const memoContainerRef = useRef(null);

  useEffect(() => {
    const savedMemoList = JSON.parse(localStorage.getItem("memoList"));
    if (savedMemoList) {
      setMemoList(savedMemoList);
    }
  }, []);

  useEffect(() => {
    memoContainerRef.current.scrollTop = memoContainerRef.current.scrollHeight;
  }, [memoList]);

  const handleNewMemoChange = (event) => {
    setNewMemo(event.target.value);
  };

  const handleAddMemo = () => {
    if (newMemo.trim() !== "") {
      const updatedMemoList = [...memoList, { content: newMemo }];
      setMemoList(updatedMemoList);
      localStorage.setItem("memoList", JSON.stringify(updatedMemoList));
      setNewMemo("");
    }
  };

  const handleFindTreasure = () => {
    const treasurePosition = JSON.parse(
      localStorage.getItem("treasurePosition")
    );
    if (
      treasurePosition &&
      treasurePosition.x === characterPosition.x &&
      treasurePosition.y === characterPosition.y
    ) {
      const message = `보물을 찾았습니다! I found the treasure! X: ${treasurePosition.x}, Y: ${treasurePosition.y}`;
      const updatedMemoList = [...memoList, { content: message }];
      setMemoList(updatedMemoList);
      localStorage.setItem("memoList", JSON.stringify(updatedMemoList));
    } else {
      const message = `보물이 없습니다. There is no treasure.`;
      const updatedMemoList = [...memoList, { content: message }];
      setMemoList(updatedMemoList);
      localStorage.setItem("memoList", JSON.stringify(updatedMemoList));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddMemo();
    }
  };

  return (
    <div className="memo-container" ref={memoContainerRef}>
      <div className="memo-header"></div>
      <div className="memo-content">
        <ul>
          {memoList.map((memo, index) => (
            <li key={index}>{memo.content}</li>
          ))}
        </ul>
      </div>
      <div className="memo-input">
        <input
          type="text"
          value={newMemo}
          onChange={handleNewMemoChange}
          onKeyPress={handleKeyPress}
          placeholder="Text"
        />
        <button onClick={handleAddMemo}>Submit</button>
        <button onClick={handleFindTreasure}>Find Treasure</button>
      </div>
    </div>
  );
}

export default Memo;
