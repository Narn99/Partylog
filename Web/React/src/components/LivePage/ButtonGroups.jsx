import React from "react";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import VideocamOffRoundedIcon from "@mui/icons-material/VideocamOffRounded";

function ButtonGroup() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#FFD9DF",
        border: "10px solid #9A4058",
        borderRadius: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MicRoundedIcon sx={{ fontSize: 50 }} />
      <MicOffRoundedIcon sx={{ fontSize: 50 }} />
      <CelebrationRoundedIcon sx={{ fontSize: 50 }} />
      <EmojiEmotionsRoundedIcon sx={{ fontSize: 50 }} />
      <VideocamRoundedIcon sx={{ fontSize: 50 }} />
      <VideocamOffRoundedIcon sx={{ fontSize: 50 }} />
    </div>
  );
}

export default ButtonGroup;
