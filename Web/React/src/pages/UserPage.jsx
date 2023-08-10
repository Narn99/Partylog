import React, {
  useState,
  // memo,
  useEffect,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import "../css/UserPage.css";
import CountdownTimer from "../components/Timmer";
// import molru from "../assets/molru.webp";
import MessageModal from "../components/MessageModal";
import NavBar from "../components/NavBar";
import StickyNoteY from "../components/StickyNote/StickyNoteY";
import StickyNoteG from "../components/StickyNote/StickyNoteG";
import StickyNoteO from "../components/StickyNote/StickyNoteO";
import StickyNotePink from "../components/StickyNote/StickyNotePink";
import StickyNotePurple from "../components/StickyNote/StickyNotePurple";
import MessageBoard from "../components/MessageBoard";
import axios from "axios";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  setModalData,
  addMyMessageData,
  getInitailMessagesList,
  saveUserData,
} from "../actions/actions";
import { logoutUser } from "../actions/actions";

// serializableStateInvariantMiddleware.ts:234 A non-serializable value was detected in an action, in the path: `register`.
// 브라우저에서 오류 발생하는데, 리덕스로 dispatch하는 데이터가 직렬화 안 되는 데이터를 보냈다고 그러는 듯 함?
// 일단 현재는 굴러가니까 추후 찾아보고 수정할 것 (GPT가 하라는대로 고치니까 터짐)

// 모달창을 열 때마다 StickyNote가 바뀌게 설정

const stickyNotes = [
  StickyNoteY,
  StickyNoteG,
  StickyNoteO,
  StickyNotePink,
  StickyNotePurple,
];

const getRandomStickyNote = () => {
  const randomIndex = Math.floor(Math.random() * stickyNotes.length);
  return stickyNotes[randomIndex];
};

function UserPage() {
  const navigate = useNavigate();

  // API 연동하면 아래 주석 해제하고 수정해서 사용할 것

  const [pageOwner, setPageOwner] = useState(false);

  const [loading, setloading] = useState(true);
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const [userData, setUserData] = useState({});
  const myMessage = useSelector((state) => {
    return state.messagesData.myMessage;
  });
  const [followerCount, setFollowerCount] = useState("");
  const [followeeCount, setFolloweeCount] = useState("");
  const todayFormatted = format(new Date(), "MM-dd");
  const dispatch = useDispatch();
  const { userNo } = useParams();
  const myUserNo = useSelector((state) => {
    return state.auth.userNo;
  });

  //  추후 로컬스토리지에서 쿠키로 변경
  const accessToken = localStorage.getItem("access-token");
  const refreshToken = localStorage.getItem("refresh-token");
  
  // 액세스 토큰 넣어서 인증받는 식으로 수정할 것.
  // 메시지 데이터는 일단 24개 받아와서 캐러셀에서 표시하게 할 것.
  // 인덱스 페이지가 다다음꺼가 없다면 다다음꺼 받아오고, 다 받아와서 못 받아오면 버튼 disabled로 바뀌게
  // 캐러셀은 infinite를 꺼버리고, 메시지 목록을 받으면 리덕스에 저장하게..
  // 이거 자꾸 메시지 작성 버튼을 누르면 메시지보드가 리렌더링 됨.

  // 연동 추가 수정할 것.

  useEffect(() => {
    axios({
      method: "post",
      url: `${SERVER_API_URL}/user/board/${userNo}`,
      headers: {
        Authorization: `${accessToken}`,
      }})
      .then((res) => {
        console.log(res)
        // console.log(res.status);
        const data = res.data.data;
        // console.log(data);
        setUserData({
          userNo: data.userNo,
          userNickname: data.userNickname,
          userBirthday: data.userBirthday,
          userProfile: data.userProfile,
        });
        // setRecivedMessages(data.letterResponseBody);
        setFolloweeCount(data.followeeSum);
        setFollowerCount(data.followerSum);

        const lettersData = data.letterResponseBody;
        dispatch(getInitailMessagesList(lettersData));

        const helloMyMessage = lettersData.filter(
          (message) => parseInt(message.letter_writer) === parseInt(myUserNo)
        );
        if (helloMyMessage) {
          dispatch(addMyMessageData(helloMyMessage[0]));
        }

        // console.log(userData);

        // 본인 페이지면 받아온 데이터 저장
        if (parseInt(myUserNo) === parseInt(userNo)) {
          setPageOwner(true);
          dispatch(
            saveUserData(
              data.userNo,
              data.userNickname,
              data.userBirthday,
              data.userProfile
            )
          );
        }
        setloading(false);
      })
      .catch((err) => {
        var response = err.response.data;
        if(response.code === "J001") {
          console.log("액세스 토큰 재발급 필요");
          axios.get(`${SERVER_API_URL}/user/recreateAccessToken`,
          {
            headers: { 
              'Authorization': refreshToken,
             }
          })
          .then(res => {
            console.log("액세스 토큰 재발급 성공");
            localStorage.setItem("access-token", res.headers.get("authorization"));
            setloading(false);
          })
          .catch((err) => {
            console.log(err)
            var response = err.response.data;
            if(response.code === "J001") {
              console.log("리프레시 토큰 만료");
              dispatch(logoutUser());
              localStorage.setItem("access-token", null);
              localStorage.setItem("refresh-token", null);
              alert("다시 로그인 해주세요");
              navigate("/");
            } else {
              alert(response.message);
              dispatch(logoutUser());
              localStorage.setItem("access-token", null);
              localStorage.setItem("refresh-token", null);
              navigate("/");
            }
          })
        } else {
          alert("문제가 발생했습니다.");
          navigate("/");
        }
      });
  } // eslint-disable-next-line react-hooks/exhaustive-deps
  , []);

  useEffect(() => {
    if (myMessage && myMessage.length >= 1) {
      dispatch(
        setModalData(myMessage[0].letter_title, myMessage[0].letter_content)
      );
    } else {
      dispatch(setModalData("", ""));
    }
  }, [myMessage, dispatch]);

  // console.log(userData);
  // console.log(userData.userBirthday);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //
  // props로 위의 화면 크기에 대한 값을 하위 컴포넌트에 전달해서 크기 바뀌게 하기 가능
  // 해당 크기를 경곗값으로 하여 삼항연산으로 작성하면 breaking point 기준으로 바뀌게 할 수 있음

  const [randomStickyNote, setRandomStickyNote] = useState(
    getRandomStickyNote()
  );

  // const MemoizedMessageBoard = memo(MessageBoard);

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    if (myMessage) {
      dispatch(setModalData(myMessage.letter_title, myMessage.letter_content));
    }
    setModalOpen(true);
    setRandomStickyNote(getRandomStickyNote());
  };
  const handleModalClose = () => setModalOpen(false);

  // 생일자 라이브 스타트
  const handleLiveStartButton = (event) => {
    window.open(`/live/${userNo}`, "_blank");
  };

  // 참가자 라이브 참가
  const handleLiveAttendButton = (event) => {
    window.open(`/live/${userNo}`, "_blank");
  };

  const handleToProfileSetting = (event) => {
    if (pageOwner) {
      navigate("/profile-setting");
    }
  };

  const changeProfileImgSize = isSmallScreen ? "200px" : "250px";
  const changeLiveButtonFontSize = isSmallScreen ? "18px" : "25px";
  const changeLiveButtonHeight = isSmallScreen ? "50px" : "70px";
  const changeLiveButtonWidth = isSmallScreen ? "150px" : "180px";
  const changeMessageButtonFontSize = isSmallScreen ? "15px" : "20px";
  const addMarginAboveBoard = isMediumScreen ? "20px" : "";

  // console.log("유저페이지의 마이메시지");
  // console.log(myMessage);

  // 로딩 중일 시 띄우는 컴포넌트
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="UserPageBody">
        <NavBar />
        <Grid container spacing={1} className="UserPage">
          <Grid
            container
            item
            xs={12}
            md={4}
            justifyContent={"center"}
            style={{ height: "100%" }}
          >
            <div>
              <Grid
                container
                direction="column"
                className="UserPage-profile"
                alignItems={"center"}
                justifyContent={"space-evenly"}
              >
                <Grid item container justifyContent={"center"}>
                  <Grid
                    container
                    item
                    justifyContent={"center"}
                    alignItems={"center"}
                    sm={11}
                  >
                    <img
                      // src={molru}
                      // API 연동 시 아래 주석 해제
                      src={userData.userProfile}
                      alt="profileimg"
                      className="UserPage-profileimg"
                      style={{
                        width: changeProfileImgSize,
                        maxWidth: "250px",
                        height: changeProfileImgSize,
                        maxHeight: "250px",
                        objectFit: "fill",
                        cursor: pageOwner ? "pointer" : "default",
                      }}
                      onClick={handleToProfileSetting}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  {/* <p className="UserPage-nickname" style={{ fontSize: "30px" }}>
                  몰?루 #{userNo}
                </p> */}
                  {/* API 연동 시 아래 주석 해제 */}
                  <p className="UserPage-nickname">
                    <span>{userData.userNickname}</span>{" "}
                    <span style={{ fontSize: "20px" }}>#{userData.userNo}</span>
                  </p>
                </Grid>
                <Grid item>
                  <Link to={`/myfriend/${userNo}`} className="myLink">
                    <p className="UserPage-follow" style={{ fontSize: "15px" }}>
                      팔로잉
                      {followeeCount}
                      &nbsp;|&nbsp; 팔로워
                      {followerCount}
                    </p>
                  </Link>
                </Grid>
                <Grid item>
                  <CountdownTimer
                    // API 연동 시 아래 주석 해제
                    userBirthday={userData.userBirthday}
                    myUserNo={myUserNo}
                    userNo={userNo}
                  />
                </Grid>
                {/* 해당 유저 생일일 때만 버튼 보이기 */}
                {/* {userData.userBirthday === todayFormatted && ( */}
                <Grid item>
                  {pageOwner ? (
                    <Button
                      className="live-button"
                      onClick={handleLiveStartButton}
                      variant="contained"
                      style={{
                        fontFamily: "MaplestoryOTFBold",
                        fontSize: changeLiveButtonFontSize,
                        color: "white",
                        width: changeLiveButtonWidth,
                        height: changeLiveButtonHeight,
                        lineHeight: "30px",
                        borderRadius: "40px",
                        texShadow: "0.1px 0.1px 4px #e892a4",
                        marginTop: "20px",
                      }}
                      // disabled={userData.userBirthday !== todayFormatted}
                    >
                      {userData.userBirthday !== todayFormatted ? (
                        <>
                          아직 생일이
                          <br />
                          아니예요!
                        </>
                      ) : (
                        <>
                          라이브
                          <br />
                          시작
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      className="live-button"
                      onClick={handleLiveAttendButton}
                      variant="contained"
                      style={{
                        fontFamily: "MaplestoryOTFBold",
                        fontSize: changeLiveButtonFontSize,
                        color: "white",
                        width: changeLiveButtonWidth,
                        height: changeLiveButtonHeight,
                        lineHeight: "30px",
                        borderRadius: "40px",
                        texShadow: "0.1px 0.1px 4px #e892a4",
                        marginTop: "20px",
                      }}
                      disabled={userData.userBirthday !== todayFormatted}
                    >
                      {userData.userBirthday !== todayFormatted ? (
                        <>
                          아직 생일이
                          <br />
                          아니예요!
                        </>
                      ) : (
                        <>
                          라이브
                          <br />
                          참가
                        </>
                      )}
                    </Button>
                  )}
                </Grid>
                {/* )} */}
              </Grid>
            </div>
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={7}
            style={{ marginTop: addMarginAboveBoard }}
          >
            <Grid item xs={12}>
              <MessageBoard
                userNo={userNo}
                myUserNo={myUserNo}
                myMessage={myMessage}
                handleModalOpen={handleModalOpen}
                changeMessageButtonFontSize={changeMessageButtonFontSize}
              />
            </Grid>
          </Grid>
          <Grid item lg={1}>
            <div></div>
          </Grid>
        </Grid>
        <MessageModal
          myMessage={myMessage ? myMessage : null}
          userNo={userNo}
          pageOwner={pageOwner}
          myUserNo={myUserNo}
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
          randomStickyNote={randomStickyNote}
          isMediumScreen={isMediumScreen}
          isLargeScreen={isLargeScreen}
          // onSubmitText={handleSubmitModalText}
        />
      </div>
    );
  }
}

export default UserPage;
