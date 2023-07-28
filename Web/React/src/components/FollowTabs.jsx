import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import FollowTabsStyles from "../css/FollowTabsStyles.css";

function FollowTabs() {
  const [tabValue, setTabValue] = useState(0);
  let [followings, setFollowings] = useState(['following1', 'following2', 'following3']);
  const followers = ['follower1', 'follower2', 'follower3'];

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFollow = (follower) => {
    if (!followings.includes(follower)) {
      setFollowings([...followings, follower]);
    }
  };

  return (
    <div className='tab'>
      <Tabs value={tabValue} onChange={handleChange} aria-label="follower-following tabs">
        <Tab label="팔로잉" style={FollowTabsStyles.tab}/>
        <Tab label="팔로워" style={FollowTabsStyles.tab}/>
      </Tabs>

      {tabValue === 0 && (
        followings.length > 0 ? (
          <List className='tabs'>
            {followings.map((following) => (
              <ListItem key={following}>
                <ListItemText primary={following} />
              </ListItem>
            ))}
          </List>
        ) : (
          <p>아직 팔로잉이 없습니다.</p>
        )
      )}

      {tabValue === 1 && (
        followers.length > 0 ? (
          <List className='tabs'>
            {followers.map((follower) => (
              <ListItem key={follower}>
                <ListItemText primary={follower} />
                <Button onClick={() => handleFollow(follower)} color="primary">
                  팔로잉
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <p>아직 팔로워가 없습니다.</p>
        )
      )}

    </div>
  );
}

export default FollowTabs;
