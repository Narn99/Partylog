import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Grid from "@mui/material/Grid";
import { Modal, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import FollowTabs from "../components/FollowTabs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import  {firework2}  from "../components/firework2"

const Box1 = styled(Box)(({ theme }) => ({
  backgroundColor: "#fbb3c2",
  borderRadius: "30px",
  padding: theme.spacing(2),
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    height: "500px",
    width: "100%",
  },
  [theme.breakpoints.between("sm", "md")]: {
    height: "500px",
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    height: "500px",
    width: "100%",
  },
}));

function MyFriend(props) {
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = localStorage.getItem("access-token");
  const MyuserNum = useSelector((state) => {
    return state.auth.userData.userNo;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const { userNum } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  const [userNickname, setUserNickname] = useState("");
  const [profileImg, setProfileImg] = useState("");
 
  const [followings, setFollowings] = useState([]); // 팔로잉 목록을 저장할 상태 추가
  const [modalMessage, setModalMessage] = useState("");
  const [hoveringFollowButton, setHoveringFollowButton] = useState(false); // 팔로우 버튼에 마우스를 올렸는지 여부를 저장할 상태

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          `${SERVER_API_URL}/user/board/${userNum}`,
          {},
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        if (response.data && response.data.data) {
          setUserNickname(response.data.data.userNickname);
          setProfileImg(response.data.data.userProfile);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    fetchFollowers();
  }, [userNum]);

  const fetchFollowers = () => {
    const followersRequestBody = {
      followerNo: MyuserNum,
      limit: 30,
      offset: 0,
    };
    axios
      .post(`${SERVER_API_URL}/user/searchFolloweeList`, followersRequestBody, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then((response) => {
        const isUserFollowed = response.data.data.some(
          (follower) => follower.user_no === userNum
        );
        setIsFollowing(isUserFollowed);
      })
      .catch((error) => {
        console.error("팔로워 목록을 가져오는 중 오류 발생:", error);
      });
  };

  const handleFollow = async () => {
    try {
      await axios.post(
        `${SERVER_API_URL}/user/addFollow/${userNum}`,
        { followeeNo: userNum },
        { headers: { Authorization: `${accessToken}` } }
      );
      setIsFollowing(true);
      setModalMessage("팔로우 감사합니다!");
      setModalOpen(true);  // 팔로우 성공 시 모달을 보여줍니다.
      firework2(); //  firework 함수를 호출
      setTimeout(() => {
        setModalOpen(false);
        window.location.reload();
      }, 1500);  // 1.5초 후에 모달을 닫고 페이지를 새로고침합니다.
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = (followeeNo) => {
    axios.delete(`${SERVER_API_URL}/user/removeFollow/${followeeNo}`, 
    {
      headers: {
        'Authorization': `${accessToken}`
      }
    })
    .then(() => {
      setIsFollowing(false);
      setFollowings(followings.filter(following => following.user_no !== followeeNo));
      setModalMessage("슬퍼요, 다음에 다시 만나요!");  
      setModalOpen(true);
      setTimeout(() => {
          setModalOpen(false);
          window.location.reload();
      }, 1000);
    })
    .catch(error => {
      console.error("팔로우 해제 중 오류 발생:", error);
    });
  };

  return (
    <div>
      <NavBar />
      <div>
        <Grid container spacing={2}>
          <Grid item sm={12} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
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

              {parseInt(userNum) !== MyuserNum && (
                <button
                  onMouseEnter={() => setHoveringFollowButton(true)}
                  onMouseLeave={() => setHoveringFollowButton(false)}
                  onClick={() => {
                   if (isFollowing) {
                    handleUnfollow(userNum);
                      } else {
                    handleFollow();
                      }
                    }}
                 className="ProfileSetting-button" >
               {isFollowing ? (hoveringFollowButton ? "팔로우 해제" : "팔로우됨") : "팔로우"}
                </button>
                 )}
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

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" align="center">
              {modalMessage}
            </Typography>
          </Box>
        </Modal>

      </div>
    </div>
  );
}

export default MyFriend;
