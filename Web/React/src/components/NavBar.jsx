import React from "react";
import SearchFriend from "../components/SearchFriend";
import molru from "../assets/molru.webp";
import Grid from "@mui/material/Grid";

// NavBar도 반응형으로 크기 줄이면 바뀌도록 해야합니다.
// 여기서 is 크기 Screen들 선언해서 바뀌도록 설정하던가 혹은 props로 받아서 해야합니다.

function NavBar() {
  return (
    <div
      className="nav-bar"
      style={{ paddingBottom: "10px", borderBottom: "1px solid lightgrey" }}
    >
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item container xs={3}>
          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <h1 className="nav-bar-logo">Partylog</h1>
          </Grid>
        </Grid>
        <Grid container item xs={7} justifyContent={"flex-end"}>
          <Grid item xs={4}>
            <SearchFriend />
          </Grid>
        </Grid>
        <Grid container item xs={2} justifyContent={"flex-end"}>
          <Grid container item xs={10} justifyContent={"flex-end"}>
            <img
              src={molru}
              alt="settingimg"
              className="nav-bar-settingimg"
              style={{
                borderRadius: "30%",
                maxWidth: "80px",
                maxHeight: "80px",
              }}
            />
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default NavBar;
