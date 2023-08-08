import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import ButtonGroups from "../components/LivePage/ButtonGroups";
import Button from "@mui/material/Button";
import ChatBox from "../components/LivePage/ChatBox";
import ViewersCarousel from "../components/LivePage/ViewersCarousel";
// import Openvidu from "./Openvidu";

import '../css/Openvidu.css';
import UserVideoComponent from '../components/openvidu/UserVideoComponent';
import { useSelector } from "react-redux";
import { OpenVidu } from 'openvidu-browser';


// 나중에 CSS로 화면 + 버튼그룹 / 채팅창 + 나가기 버튼으로 세로열 맞추기

const APPLICATION_SERVER_URL = `${process.env.REACT_APP_API_SERVER_URL}/`;

function LivePage() {

  var userInfo = useSelector(state => state.auth.userData);
  var OV = new OpenVidu();;
  var [mySessionId, setMysessionId] = useState(`Session${userInfo.userNo}`);
  var [myUserName, setMyUserName] = useState(userInfo.userNickname);
  var [session, setSession] = useState(OV.initSession());
  var [mainStreamManager, setMainStreamManager] = useState(undefined);
  var [publisher, setPublisher] = useState(undefined);
  var [subscribers, setSubscribers] = useState([]);
  var [currentVideoDevice, setCurrentVideoDevice] = useState({}); // eslint-disable-line no-unused-vars

  const theme = useTheme();
  // const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const changeHeightSize = isMediumScreen ? "" : "75vh";
  const changeChatBoxSize = isMediumScreen ? "95%" : "90%";
  const changeChatBoxMarginTop = isMediumScreen ? "10px" : "0";

  useEffect(() => {
    joinSession();
    document.body.classList.add("live-page");

    return () => {
      document.body.classList.remove("live-page");
    };
  }, []);

  const viewers = [
    "강아지",
    "레서판다",
    "닭",
    "펭귄",
    "익룡",
    "호모사피엔스",
    "감자",
    "고구마",
    "개미핥기",
    "호모에렉투스",
    "고대초전도체",
    "터미네이터",
    "구글",
    "구글",
    "구글",
    "구글",
    "구글",
    "구글",
    "쿼카",
    "연세우유생크림빵",
    "국뽕치사량흡입",
  ];

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
    }
}

const deleteSubscriber = (streamManager) => {
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
        subscribers.splice(index, 1);
        setSubscribers(subscribers);
    }
}

const joinSession = () => {
    // --- 1) Get an OpenVidu object ---

    // OV = new OpenVidu();

    // --- 2) Init a session ---
    // setSession(OV.initSession())
    
    var mySession = session;

    // --- 3) Specify the actions when events take place in the session ---

    // On every new Stream received...
    mySession.on('streamCreated', (event) => {
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own
        var subscriber = mySession.subscribe(event.stream, undefined);
        subscribers.push(subscriber);

        // Update the state with the new subscribers
        setSubscribers(subscribers);
    });

    // On every Stream destroyed...
    mySession.on('streamDestroyed', (event) => {

        // Remove the stream from 'subscribers' array
        deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    mySession.on('exception', (exception) => {
        console.warn(exception);
    });

    // --- 4) Connect to the session with a valid user token ---

    // Get a token from the OpenVidu deployment
    getToken().then((token) => {
        // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
        // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
        mySession.connect(token, { clientData: myUserName })
            .then(async () => {

                // --- 5) Get your own camera stream ---

                // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                // element: we will manage it on our own) and with the desired properties
                let publisher = await OV.initPublisherAsync(undefined, {
                    audioSource: undefined, // The source of audio. If undefined default microphone
                    videoSource: undefined, // The source of video. If undefined default webcam
                    publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                    publishVideo: true, // Whether you want to start publishing with your video enabled or not
                    resolution: '640x480', // The resolution of your video
                    frameRate: 30, // The frame rate of your video
                    insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                    mirror: false, // Whether to mirror your local video or not
                });

                // --- 6) Publish your stream ---

                mySession.publish(publisher);

                // Obtain the current video device in use
                var devices = await OV.getDevices();
                var videoDevices = devices.filter(device => device.kind === 'videoinput');
                var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

                // Set the main video in the page to display our webcam and store our Publisher
                setCurrentVideoDevice(currentVideoDevice);
                setMainStreamManager(publisher);
                setPublisher(publisher);
            })
            .catch((error) => {
                console.log('There was an error connecting to the session:', error.code, error.message);
            });
    });
   
}

const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = session;

    if (mySession) {
        mySession.disconnect();
    }

    // Empty all properties...
    OV = null;
    setSession(undefined);
    setSubscribers([]);
    setMysessionId('');
    setMyUserName('');
    setMainStreamManager(undefined);
    setPublisher(undefined);

    // 종료 API 호출
    axios.put(`${APPLICATION_SERVER_URL}api/end/${mySessionId}`, {},
    {
        headers: { 
            'Authorization': localStorage.getItem("access-token"),
            'Content-Type': 'application/json', 
        },
    }
    ).then(res => {
        console.log(res);
    })

    window.close();
}

       /**
     * --------------------------------------------
     * GETTING A TOKEN FROM YOUR APPLICATION SERVER
     * --------------------------------------------
     * The methods below request the creation of a Session and a Token to
     * your application server. This keeps your OpenVidu deployment secure.
     *
     * In this sample code, there is no user control at all. Anybody could
     * access your application server endpoints! In a real production
     * environment, your application server must identify the user to allow
     * access to the endpoints.
     *
     * Visit https://docs.openvidu.io/en/stable/application-server to learn
     * more about the integration of OpenVidu in your application server.
     */
const getToken = async () => {
   const sessionId = await createSession(mySessionId);
   return await createToken(sessionId);
}

const createSession = async (sessionId) => {
   const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
       headers: { 
           'Authorization': localStorage.getItem("access-token"),
           'Content-Type': 'application/json', 
       },
   });
   return response.data; // The sessionId
}

const createToken = async (sessionId) => {
   var liveInfo = {
       "live_id" : sessionId,
       "live_title" : null,
       "live_desc" : userInfo.userNickname + " 님의 생일 축하방입니다.",
       "live_host" : userInfo.userNo,
   };
   const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', liveInfo, {
       headers: { 
           'Authorization': localStorage.getItem("access-token"),
           'Content-Type': 'application/json', 
       },
   });
   return response.data; // The token
}

  return (
    <div>
      <Grid
        container
        justifyContent={"space-evenly"}
        alignItems={"center"}
        // spacing={4}
        style={{ height: `${changeHeightSize}` }}
      >
        <Grid
          item
          container
          justifyContent={"center"}
          alignItems={"center"}
          xs={12}
          md={8}
          style={{ height: "100%" }}
          className="broadcast-grid"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#FFD9DF",
              border: "20px solid #9A4058",
              borderRadius: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              container
              style={{
                width: "95%",
                height: "95%",
                // flexDirection: "column",
              }}
            >
              <Grid
                item
                container
                // xs={12}
                justifyContent={"center"}
                alignItems={"center"}
                style={{ height: "70%" }}
              >
                <Grid
                  item
                  xs={10}
                  style={{
                    height: "100%",
                    minHeight: "200px",
                    minWidth: "300px",
                    // height: "300px",
                    backgroundColor: "green",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "20px",
                  }}
                  className="live-display"
                >
                    <div className="container" style={{height:"100%"}}>
            {session === undefined ? (
                <p>종료된 라이브 입니다.</p>
            ) : (
                <div id="session" style={{height:"100%"}}>
                    {/* <div id="session-header">
                        <h1 id="session-title">{mySessionId}</h1>
                        <input
                            className="btn btn-large btn-danger"
                            type="button"
                            id="buttonLeaveSession"
                            onClick={leaveSession}
                            value="나가기"
                        />
                        <input
                            className="btn btn-large btn-success"
                            type="button"
                            id="buttonSwitchCamera"
                            onClick={switchCamera}
                            value="Switch Camera"
                        />
                    </div> */}

                    {/* {mainStreamManager !== undefined ? (
                        <div id="main-video" className="col-md-6">
                            <UserVideoComponent streamManager={mainStreamManager} />

                        </div>
                    ) : null} */}
                    <div id="video-container" className="col-md-6" style={{height:"100%"}}>
                        {publisher !== undefined ? (
                            <div className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(publisher)} style={{height:"100%"}}>
                                <UserVideoComponent
                                    streamManager={publisher} style={{height:"100%"}}/>
                            </div>
                        ) : null}
                        {/* {subscribers.map((sub, i) => (
                            <div key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(sub)}>
                                <span>{sub.id}</span>
                                <UserVideoComponent streamManager={sub} />
                            </div>
                        ))} */}
                    </div>
                </div>
            )}
        </div>
                </Grid>
              </Grid>
              <Grid
                container
                item
                // xs={12}
                justifyContent={"space-evenly"}
                alignItems={"center"}
                // style={{ height: "30%" }}
              >
                <ViewersCarousel viewers={viewers} />
              </Grid>
            </Grid>
          </div>
        </Grid>
        {isMediumScreen && (
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            style={{ marginTop: "10px", height: "" }}
            className="button-grid"
          >
            <Grid
              item
              md={5}
              xs={10}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <ButtonGroups />
            </Grid>
          </Grid>
        )}
        <Grid
          item
          container
          justifyContent={"center"}
          alignItems={"center"}
          xs={12}
          md={3}
          style={{ height: "100%" }}
          className="chat-grid"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#FFD9DF",
              border: "20px solid #9A4058",
              borderRadius: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: `${changeChatBoxMarginTop}`,
            }}
          >
            <div
              style={{
                width: `${changeChatBoxSize}`,
                height: "95%",
                backgroundColor: "white",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "95%",
                  height: "75%",
                }}
                className="chat-display"
              >
                <p>닭 : 꼬</p>
                <p>강아지 : 야옹</p>
                <p>구글 : 저도 아이폰 씁니다.</p>
              </div>
              <div
                style={{
                  justifyContent: "start",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                채팅 입력창
              </div>
              <div
                style={{
                  width: "95%",
                  height: "15%",
                }}
              >
                <ChatBox />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>

      {!isMediumScreen && (
        <Grid
          container
          justifyContent={"space-evenly"}
          alignItems={"center"}
          style={{ marginTop: "60px", height: "10vh" }}
          className="button-grid"
        >
          <Grid
            item
            md={5}
            xs={10}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <ButtonGroups />
          </Grid>

          <Grid
            container
            item
            xs={2}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Button
              className="exit-live-button"
              variant="contained"
              style={{
                fontFamily: "MaplestoryOTFBold",
                width: "100%",
                height: "100%",
                fontSize: "25px",
                color: "white",
                borderRadius: "20px",
                texShadow: "0.1px 0.1px 4px #e892a4",
                boxSizing: "border-box",
              }}
              onClick={leaveSession}
            >
              나가기
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default LivePage;
