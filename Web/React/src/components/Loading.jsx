import { CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress color="primary" />
    </div>
  );
}

export default Loading;
