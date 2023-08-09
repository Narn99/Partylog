import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import FollowTabs from '../components/FollowTabs';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import axios from "axios";

const Box1 = styled(Box)(({ theme }) => ({
  backgroundColor: '#fbb3c2',
  borderRadius: '30px',
  padding: theme.spacing(2),
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    height: '500px',
    width: '100%',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    height: '500px',
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    height: '500px',
    width: '100%',
  },
}));


function MyFriend(props) {
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = localStorage.getItem("access-token");
  const  MyuserNum  = useSelector((state) => {
    return state.auth.userData.userNo;
  });
  
  const { userNum } = useParams(); // 접속한 사람의 번호, 위에 뜨는 번호
  const [isFollowing, setIsFollowing] = useState(false); // 팔로우 상태를 나타내는 state
 
  const [userNickname, setUserNickname] = useState("");
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          `${SERVER_API_URL}/user/board/${userNum}`, 
          {}, 
          { 
            headers: {
              'Authorization': `${accessToken}`
            }
          }
        );
        if (response.data && response.data.data) {
          // 응답에서 userNickname과 userProfile을 로컬 상태에 설정
          setUserNickname(response.data.data.userNickname);
          setProfileImg(response.data.data.userProfile);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // 함수를 호출하여 데이터를 불러옵니다.
    
    const checkFollowingStatus = async () => {
      try {
        // 팔로우 상태 확인 API (이 API 경로는 실제 서버 API에 따라 변경해야 합니다.)
        const response = await axios.get(
          `${SERVER_API_URL}/user/isFollowing/${userNum}`, 
          { headers: { 'Authorization': `${accessToken}` } }
        );
        setIsFollowing(response.data.isFollowing);  // 팔로우 상태 설정
      } catch (error) {
        console.error("Error checking following status:", error);
      }
    };

    checkFollowingStatus();
  }, [userNum]);

  const handleFollow = async () => {
    try {
      await axios.post(
        `${SERVER_API_URL}/user/addFollow/${userNum}`, 
        { followeeNo: userNum }, 
        { headers: { 'Authorization': `${accessToken}` } }
      );
      setIsFollowing(true);  // 팔로우 상태 갱신
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div>
      <Grid container spacing={2}>
        <Grid item sm={12} md={3}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <img
              src={profileImg}
              alt="profileimg"
              className="UserPage-profileimg"
              style={{
                  Width: "260px",
                  Height: "260px",
                    }}
                    />
           
            <p className="UserPage-nickname">
                <span>{userNickname}</span>{" "}
                <span style={{ fontSize: "20px" }}>#{userNum}</span>
            </p>

            { 
              !isFollowing ? 
                <button onClick={handleFollow} className="ProfileSetting-button">팔로우</button> : 
                <button disabled className="ProfileSetting-button">팔로우됨</button> 
            }

          </Grid>
        </Grid>
   
    
        <Grid item sm={12} md={8}>
          <Box1>
            <div className="follow-tabs-background">
            <FollowTabs userNum={userNum} MyuserNum={MyuserNum} />
            </div>
          </Box1>
        </Grid>
        
      </Grid>
      </div>
    </div>
  );
}

export default MyFriend;
