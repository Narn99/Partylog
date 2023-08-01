import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import FollowTabsStyles from "../css/FollowTabsStyles.css";
import { useFollow } from '../context/FollowContext'
import Box from '@mui/material/Box';


function FollowTabs() {
  const [tabValue, setTabValue] = useState(0);
  
  const { followings, setFollowings } = useFollow(); // 팔로잉 목록을 컨텍스트에서 가져옵니다.
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

      <Box style={{ maxHeight: '450px', overflow: 'auto' }}> {/* 스크롤이 가능한 부분을 Box로 감쌉니다. */}
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
                <Button onClick={() => handleFollow(follower)} 
                 variant={followings.includes(follower) ? 'text' : 'outlined'}>
                  {followings.includes(follower) ? '팔로우됨' : '팔로우'}
                 </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <p>아직 팔로워가 없습니다.</p>
        )
      )}
 
      </Box>
    </div>
  );
}

export default FollowTabs;