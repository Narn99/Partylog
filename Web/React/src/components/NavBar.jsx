import React from "react";
import SearchFriend from "../components/SearchFriend";
import molru from "../assets/molru.webp";
import Grid from "@mui/material/Grid";

function NavBar() {
  return (
    <div
      className="nav-bar"
      style={{ paddingBottom: "10px", borderBottom: "1px solid lightgrey" }}
    >
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item xs={3}>
          <h1 className="nav-bar-logo">Partylog</h1>
        </Grid>
        <Grid container item xs={7} justifyContent={"flex-end"}>
          <Grid item xs={4}>
            <SearchFriend />
          </Grid>
        </Grid>
        <Grid container item xs={2} justifyContent={"flex-end"}>
          <img
            src={molru}
            alt="settingimg"
            className="nav-bar-settingimg"
            style={{ borderRadius: "30%", maxWidth: "80px", maxHeight: "80px" }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default NavBar;
