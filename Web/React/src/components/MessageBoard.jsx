import React, { useState } from 'react';
import board from "../assets/board.jpg"
import message from "../assets/message.jpg"
import "../css/MemoBoard.css";

const MemoBoard = () => {
  // 메모 이미지들의 정보를 배열로 정의합니다.
  const [memoImages, setMemoImages] = useState([
    // 기존에 저장되어 있는 메모 이미지 정보들을 배열로 초기화합니다.
    { top: '100px', left: '50px', imageSrc: '../assets/message.jpg', altText: 'Memo 1' },
    { top: '200px', left: '200px', imageSrc: '../assets/message.jpg', altText: 'Memo 2' },
    // 추가적인 메모 이미지들을 원하는 만큼 배열에 추가합니다.
  ]);

  // 새로운 메모 이미지를 추가하는 함수입니다.
  const addMemo = () => {
    // 랜덤한 위치를 계산하여 새로운 메모를 추가합니다.
    const newTop = Math.floor(Math.random() * 400) + 'px'; // 0 ~ 400px 사이의 랜덤한 값
    const newLeft = Math.floor(Math.random() * 600) + 'px'; // 0 ~ 600px 사이의 랜덤한 값

    const newMemo = {
      top: newTop,
      left: newLeft,
      imageSrc: '../assets/message.jpg', // 새로운 메모 이미지의 경로
      altText: 'New Memo', // 새로운 메모 이미지의 대체 텍스트
    };

    // 새로운 메모를 기존의 메모 이미지 배열에 추가합니다.
    setMemoImages((prevMemoImages) => [...prevMemoImages, newMemo]);
  };

  return (
    <div className="memo-board" style={{ backgroundImage: `url(${board})` }}>
      {/* 메모 보드 이미지 */}
      {/* <img src={board} alt="Memo Board" /> */}

      {/* 메모 이미지들을 배열로 매핑하여 렌더링합니다. */}
      {memoImages.map((memo, index) => (
        <div
          key={index}
          className="memo"
          style={{ top: memo.top, left: memo.left }}
        >
          <img src={message} alt={"message"} />
        </div>
      ))}

      {/* 추가 버튼을 만들고 버튼을 누르면 새로운 메모를 추가합니다. */}
      <button onClick={addMemo}>새로운 메모 추가</button>
    </div>
  );
};

export default MemoBoard;
