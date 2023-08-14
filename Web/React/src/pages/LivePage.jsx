import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ButtonGroups from "../components/LivePage/ButtonGroups";
import Button from "@mui/material/Button";
import ChatBox from "../components/LivePage/ChatBox";
// import ViewersCarousel from "../components/LivePage/ViewersCarousel";

/* Openvidu 관련 컴포넌트 */
import "../css/Openvidu.css";
import UserVideoComponent from "../components/openvidu/UserVideoComponent";
import { useSelector } from "react-redux";
import { OpenVidu } from "openvidu-browser";
import { useParams } from "react-router-dom";
import RecordRTC from 'recordrtc';

// 나중에 CSS로 화면 + 버튼그룹 / 채팅창 + 나가기 버튼으로 세로열 맞추기

const APPLICATION_SERVER_URL = `${process.env.REACT_APP_API_SERVER_URL}/`;

function LivePage() {
  var userInfo = useSelector((state) => state.auth.userData);
  const { userNo } = useParams();
  var OV = new OpenVidu();
  var [mySessionId, setMysessionId] = useState(`Session${userNo}`);
  var [myUserName, setMyUserName] = useState(userInfo.userNickname);
  var [session, setSession] = useState(OV.initSession());
  var [mainStreamManager, setMainStreamManager] = useState(undefined);
  var [publisher, setPublisher] = useState(undefined); 
  var [subscribers, setSubscribers] = useState([]);
  var [currentVideoDevice, setCurrentVideoDevice] = useState({}); // eslint-disable-line no-unused-vars

  const [isJoinCheck, setIsJoinCheck] = useState(false);
  
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const videoRef = useRef(null);

  const theme = useTheme();
  // const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const changeHeightSize = isMediumScreen ? "" : "75vh";
  const changeChatBoxSize = isMediumScreen ? "95%" : "90%";
  const changeChatBoxMarginTop = isMediumScreen ? "10px" : "0";

  useEffect(() => {
    console.log("작동");
    joinSession();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {

  }, [recordedChunks])

  // const viewers = [
  //   "강아지",
  //   "레서판다",
  //   "닭",
  //   "펭귄",
  //   "익룡",
  //   "호모사피엔스",
  //   "감자",
  //   "고구마",
  //   "개미핥기",
  //   "호모에렉투스",
  //   "고대초전도체",
  //   "터미네이터",
  //   "구글",
  //   "구글",
  //   "구글",
  //   "구글",
  //   "구글",
  //   "구글",
  //   "쿼카",
  //   "연세우유생크림빵",
  //   "국뽕치사량흡입",
  // ];

  const handleMainVideoStream = (stream) => {
    console.log(stream);
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager) => {
    setSubscribers((prevSubscribers) => {

        return prevSubscribers.filter(sub => sub !== streamManager);
    });
 };

  const joinSession = () => {
    // --- 1) Get an OpenVidu object ---

    // OV = new OpenVidu();

    // --- 2) Init a session ---
    // setSession(OV.initSession())
    
    var mySession = session;
    // --- 3) Specify the actions when events take place in the session ---

    // On every new Stream received...
    mySession.on('streamCreated', (event) => {
        console.log("새로운 스트림 생성")
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own
        var subscriber = mySession.subscribe(event.stream, undefined);
        // Update the state with the new subscribers
        setSubscribers(prev => [
          ...prev,
          subscriber
        ]);
    });

    // On every Stream destroyed...
    mySession.on("streamDestroyed", (event) => {
      console.log("스트림 삭제");
      console.log(subscribers)
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    // --- 4) Connect to the session with a valid user token ---

    // Get a token from the OpenVidu deployment
    getToken().then((token) => {
      // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          let publisher = await OV.initPublisherAsync(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "640x480", // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          // --- 6) Publish your stream ---

          mySession.publish(publisher);

          // Obtain the current video device in use
          var devices = await OV.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          var currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          var currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          // Set the main video in the page to display our webcam and store our Publisher
          setCurrentVideoDevice(currentVideoDevice);
          setMainStreamManager(publisher);
          setPublisher(publisher);
        })
        .catch((error) => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });
  };

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    console.log("세션 종료");
    console.log(subscribers)
    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    OV = null;
    setSession(undefined);
    // setSubscribers([]);
    setMysessionId("");
    setMyUserName("");
    setMainStreamManager(undefined);
    setPublisher(undefined);

    // 종료 API 호출
    axios
      .put(
        `${APPLICATION_SERVER_URL}api/end/${mySessionId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("access-token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
      console.log(subscribers)
    // window.close();
  };

  // //녹화 시작 요청
  // const startRecording = () =>{
  //   var stringId = String(userNo);
  //   const response = axios.post(APPLICATION_SERVER_URL + 'api/record/start/' + stringId, {}, {
  //     headers: { 
  //         'Authorization': localStorage.getItem("access-token"),
  //         'Content-Type': 'application/json', 
  //     },
  // })
  // return response.data;
  // }
  
  // //녹화 종료 요청 
  // const stopRecording = () =>{
  //   var stringId = String(userNo);
  //   const response = axios.post(APPLICATION_SERVER_URL + 'api/record/stop/' + stringId, {}, {
  //     headers: { 
  //         'Authorization': localStorage.getItem("access-token"),
  //         'Content-Type': 'application/json', 
  //     },
  //   });
  //     return response.data;
  //   }

  const startRecording = async () => {
    setIsRecording(true);
  
    const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 오픈비두의 mainStreamManager에서 얻은 오디오 스트림을 가져옵니다
    const openViduAudioStream = mainStreamManager && mainStreamManager.stream
    ? mainStreamManager.stream.getMediaStream().getAudioTracks()[0]
    : null;

    const mixedStream = new MediaStream();
    displayStream.getVideoTracks().forEach(track => mixedStream.addTrack(track));
    audioStream.getAudioTracks().forEach(track => mixedStream.addTrack(track));
    if (openViduAudioStream) {
      mixedStream.addTrack(openViduAudioStream);
    }
  
    const mediaRecorder = new MediaRecorder(mixedStream);
    const chunks = [];
  
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
        setRecordedChunks(chunks); // Reset recordedChunks when starting a new recording
      }
    };
    
    mediaRecorder.start();
    setRecorder(mediaRecorder);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
  
    if (recorder) {
      recorder.stop();
      recorder.stream.getTracks().forEach(track => track.stop());
    }
  };
  
  const downloadRecording = () => {
    if (recordedChunks.length === 0) {
      console.log("No recorded data to download.");
      return;
    }
  
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'recorded-video.webm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: {
          Authorization: localStorage.getItem("access-token"),
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    var liveInfo = {
      live_id: sessionId,
      live_title: null,
      live_desc: userInfo.userNickname + " 님의 생일 축하방입니다.",
      live_host: userInfo.userNo,
      isHost: userNo === userInfo.userNo + "" ? true : false,
    };
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      liveInfo,
      {
        headers: {
          Authorization: localStorage.getItem("access-token"),
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.message);
    return response.data.data; // The token
  };

  const test = () => {
    joinSession();
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
                  xs={7}
                  style={{
                    height: "100%",
                    minHeight: "200px",
                    minWidth: "200px",
                    // height: "300px",
                    backgroundColor: "black",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "20px",
                  }}
                  className="live-display"
                >
                  <div className="container" style={{ height: "100%" }}>
                    {session === undefined ? (
                      <p>종료된 라이브 입니다.</p>
                    ) : (
                      <div className="container" style={{ height: "100%" }}>
                        <div id="session" style={{ height: "100%" }}>
                          <div
                            id="main-video"
                            className="col-md-6"
                            style={{ height: "100%" }}
                          >
                            <UserVideoComponent
                              streamManager={mainStreamManager}
                              style={{ height: "100%" }}
                            />
                          </div>
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
                {/* <ViewersCarousel viewers={viewers} /> */}
                <div id="video-container" className="col-md-6">
                  {publisher !== undefined ? (
                    <div
                      className="stream-container col-md-6 col-xs-6"
                      id="my-stream-container"
                      onClick={() => handleMainVideoStream(publisher)}
                    >
                      <UserVideoComponent streamManager={publisher} />
                    </div>
                  ) : null}
                  {subscribers.map((sub, i) => (
                    <div
                      key={sub.id}
                      className="stream-container col-md-6 col-xs-6 subscriber-stream-container"
                      onClick={() => handleMainVideoStream(sub)}
                    >
                      <span>{sub.id}</span>
                      <UserVideoComponent streamManager={sub} />
                    </div>
                  ))}
                </div>
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
              <ButtonGroups mainStreamManager={mainStreamManager} />
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
              <ChatBox session={session} />
            </div>
          </div>
        </Grid>
        {isMediumScreen && (
          <Grid item xs={12}>
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
                marginTop: "10px",
              }}
              onClick={leaveSession}
            >
              나가기
            </Button>
          </Grid>
        )}
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
            <ButtonGroups mainStreamManager={mainStreamManager} />
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
            {isRecording ? (
              <Button
              className="exit-live-button"
              variant="contained"
              style={{
                fontFamily: "MaplestoryOTFBold",
                width: "50%",
                height: "100%",
                fontSize: "25px",
                color: "white",
                borderRadius: "20px",
                texShadow: "0.1px 0.1px 4px #e892a4",
                boxSizing: "border-box",
              }}
              onClick={stopRecording}
            >
              녹화중단
            </Button>
             ) : (
            <Button
              className="exit-live-button"
              variant="contained"
              style={{
                fontFamily: "MaplestoryOTFBold",
                width: "50%",
                height: "100%",
                fontSize: "25px",
                color: "white",
                borderRadius: "20px",
                texShadow: "0.1px 0.1px 4px #e892a4",
                boxSizing: "border-box",
              }}
              onClick={startRecording}
            >
              녹화시작
            </Button>
            )}
            {recordedChunks.length > 0 && (
              <Button
              className="exit-live-button"
              variant="contained"
              style={{
                fontFamily: "MaplestoryOTFBold",
                width: "50%",
                height: "100%",
                fontSize: "25px",
                color: "white",
                borderRadius: "20px",
                texShadow: "0.1px 0.1px 4px #e892a4",
                boxSizing: "border-box",
              }}
              onClick={downloadRecording}
            >다운로드</Button>
            )}
           {/* <video ref={videoRef} controls style={{ maxWidth: '100%' }}>
              {recordedChunks.map((chunk, index) => (
          <source key={index} src={URL.createObjectURL(chunk)} type="video/webm" />
            ))}
           </video> */}
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default LivePage;
