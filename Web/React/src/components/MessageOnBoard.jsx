import React, { useState } from "react";
import StickyNoteY from "../components/StickyNote/StickyNoteY";
import StickyNoteG from "../components/StickyNote/StickyNoteG";
import StickyNoteO from "../components/StickyNote/StickyNoteO";
import StickyNotePink from "../components/StickyNote/StickyNotePink";
import StickyNotePurple from "../components/StickyNote/StickyNotePurple";

const stickyNotes = [
  StickyNoteY,
  StickyNoteG,
  StickyNoteO,
  StickyNotePink,
  StickyNotePurple,
];

const getRandomStickyNote = () => {
  const randomIndex = Math.floor(Math.random() * stickyNotes.length);
  return stickyNotes[randomIndex];
};

// 메시지 남긴 사람 프로필 이미지, 이름과 메시지 제목 필요
// 메시지 보드 안에 배치되는 메시지
// 랜덤 StickyNote를 불러오고, 그 위에 다른 정보가 뜨도록

function MessageOnBoard() {
  const [randomStickyNote, setRandomStickyNote] = useState(
    getRandomStickyNote()
  );

  return <div>{randomStickyNote}</div>;
}

export default MessageOnBoard;
