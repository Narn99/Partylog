import React, { useState, useEffect } from "react";
import "../../css/ClapEmoji.css";
// import clap2 from "../../assets/clap/clap2.wav";

const ClapEmoji = ({ id, left }) => {
  const [visible, setVisible] = useState(true);

  // 오디오 자꾸 터져서 주석처리

  // const [audio] = useState(new Audio(clap2));

  // useEffect(() => {
  //   if (visible) {
  //     audio.play();
  //   }

  //   return () => {
  //     audio.pause();
  //     audio.currentTime = 0;
  //   };
  // }, [visible, audio]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 900); // 클랩 이모지가 화면에 보여지는 시간 (밀리초 단위)

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    visible && (
      <span
        className="clap-shadow"
        style={{
          fontSize: "40px",
          left: `${left}%`,
        }}
      >
        👏
      </span>
    )
  );
};

export default ClapEmoji;
