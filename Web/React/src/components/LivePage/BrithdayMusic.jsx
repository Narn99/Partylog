import React, { useState } from "react";
import birthday1 from "../../assets/music/birthday1.mp3";
import birthday2 from "../../assets/music/birthday2.mp3";
import birthday3 from "../../assets/music/birthday3.mp3";
import birthday4 from "../../assets/music/birthday4.mp3";

function BrithdayMusic() {
  const [audio] = useState(new Audio("/path/to/your/audio.mp3"));

  const handlePlay = () => {
    audio.play();
  };

  return (
    <div>
      <button onClick={handlePlay}>Play Audio</button>
    </div>
  );
}

export default BrithdayMusic;
