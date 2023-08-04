import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import FollowTabsStyles from "../css/FollowTabsStyles.css";
import Box from '@mui/material/Box';
import axios from 'axios';

function FollowTabs() {
  const [tabValue, setTabValue] = useState(0);
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);

  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = localStorage.getItem("access-token");

  // 팔로잉 목록을 불러오는 로직을 별도의 함수로 분리
  const fetchFollowings = () => {
    axios.get(`${SERVER_API_URL}/user/searchFolloweeList/10/0`, { 
      headers: {
        'Authorization': `${accessToken}`
      }
    })
    .then(response => {

    setFollowings(response.data.data.map(following => 
      ({ userNo: following.user_no, nickname: following.user_nickname })));
    })
    
    .catch(error => {
      console.error("팔로잉 목록을 가져오는 중 오류 발생:", error);
    });
  };

  const fetchFollowers = () => { // 팔로워 목록을 불러오는 함수
    axios.get(`${SERVER_API_URL}/user/searchFollowerList/10/0`, { 
      headers: {
        'Authorization': `${accessToken}`
      }
    })
    .then(response => {
      setFollowers(response.data.data.map(follower => 
        ({ userNo: follower.user_no, nickname: follower.user_nickname })));
    })
    .catch(error => {
      console.error("팔로워 목록을 가져오는 중 오류 발생:", error);
    });
  };

  useEffect(() => {
    fetchFollowings(); // 컴포넌트가 마운트될 때 팔로잉 목록을 불러옵니다.
    fetchFollowers(); // 팔로워 목록 불러오기
  }, [] ); 

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFollow = (follower) => {
    // userNo가 이미 팔로잉 목록에 있는지 확인
    if (!followings.some(following => following.userNo === follower.userNo)) {
      setFollowings([...followings, { userNo: follower.userNo, nickname: follower.nickname }]);
    }
  };
  
  const handleUnfollow = (followeeNo) => {
    axios.delete(`${SERVER_API_URL}/user/removeFollow/${followeeNo}`, {
      headers: {
        'Authorization': `${accessToken}`
      }
    })
    .then(() => {
      // 팔로우가 성공적으로 해제되었다면 팔로잉 목록에서 제거
      setFollowings(followings.filter(following => following.userNo !== followeeNo));
    })
    .catch(error => {
      console.error("팔로우 해제 중 오류 발생:", error);
    });
  };

  return (
    <div className='tab'>
      <Tabs value={tabValue} onChange={handleChange} aria-label="follower-following tabs">
        <Tab label="팔로잉" style={FollowTabsStyles.tab}/>
        <Tab label="팔로워" style={FollowTabsStyles.tab}/>
      </Tabs>

      <Box style={{ maxHeight: '450px', overflow: 'auto' }}>
      {tabValue === 0 && (
        followings.length > 0 ? (
          <List className='tabs'>
            {followings.map((following) => (
              <ListItem key={following.userNo}>
                <ListItemText primary={`${following.nickname} (# ${following.userNo})`} />
                  <Button onClick={() => handleUnfollow(following.userNo)}>
                    팔로우 해제
                  </Button>
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
              <ListItem key={follower.userNo}>
                <ListItemText primary={`${follower.nickname} (# ${follower.userNo})`} />
                <Button onClick={() => handleFollow(follower)}
                  variant={followings.some(following => following.userNo === follower.userNo) ? 'text' : 'outlined'}>
                  {followings.some(following => following.userNo === follower.userNo) ? '팔로우됨' : '팔로우'}
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
