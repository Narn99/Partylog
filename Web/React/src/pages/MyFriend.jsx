import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import FollowTabs from '../components/FollowTabs';
// import { useSelector } from "react-redux";
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
 // useSelector를 사용하여 리듀서에서 정보 받아오는 곳
  // const profileImg = useSelector((state) => {
  //   return state.auth.userData.userProfile;
  // });
  const { userNum } = useParams(); // 접속한 사람의 번호, 위에 뜨는 번호
  // const userNickname = useSelector((state) => {
  //   return state.auth.userData.userNickname;
  // });
  console.log(userNum);
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
  }, [userNum]);



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
                  maxWidth: "280px",
                  maxHeight: "280px",
                    }}
                    />
           
            <p className="UserPage-nickname">
                <span>{userNickname}</span>{" "}
                <span style={{ fontSize: "20px" }}>#{userNum}</span>
            </p>
          </Grid>
        </Grid>
   
    
        <Grid item sm={12} md={8}>
          <Box1>
            <div className="follow-tabs-background">
            <FollowTabs userNum={userNum} />
            </div>
          </Box1>
        </Grid>
        
      </Grid>
      </div>
    </div>
  );
}

export default MyFriend;
