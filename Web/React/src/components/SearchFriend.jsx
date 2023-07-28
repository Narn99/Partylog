import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchFriend() {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        borderRadius: "20px",
        width: "100%",
        minWidth: "150px",
        backgroundColor: "#F2E5E6",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="친구 검색"
        inputProps={{ "aria-label": "search your friend" }}
        style={{ fontFamily: "MaplestoryOTFLight" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
