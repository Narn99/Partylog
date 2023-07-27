import React, { useState } from "react";
import SearchFriend from "../components/SearchFriend";
import molru from "../assets/molru.webp";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function MyFriend(props) {
  const [tabValue, setTabValue] = useState(0);
  const followers = ['follower1', 'follower2', 'follower3'];
  const followings = ['following1', 'following2', 'following3'];

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <div className="MyPage-header">
        <h1 className="loginpage-h1">Partylog</h1>
        <SearchFriend />
        <img src={molru} alt="settingimg" className="MyPage-settingimg" />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <img src={molru} alt="profileimg" className="MyPage-profileimg" />
          <br></br>
          <p className="MyPage-nickname">몰?루</p>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Tabs value={tabValue} onChange={handleChange} aria-label="follower-following tabs">
            <Tab label="Followers" />
            <Tab label="Followings" />
          </Tabs>
          
          {tabValue === 0 && (
            <List>
              {followers.map((follower) => (
                <ListItem key={follower}>
                  <ListItemText primary={follower} />
                </ListItem>
              ))}
            </List>
          )}

          {tabValue === 1 && (
            <List>
              {followings.map((following) => (
                <ListItem key={following}>
                  <ListItemText primary={following} />
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default MyFriend;
