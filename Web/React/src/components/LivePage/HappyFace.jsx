import React, { useState, useEffect } from "react";
import "../../css/ClapEmoji.css";

const HappyFace = ({ id, left }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 900); // 해피 이모지가 화면에 보여지는 시간 (밀리초 단위)

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
        🥰
      </span>
    )
  );
};

export default HappyFace;
