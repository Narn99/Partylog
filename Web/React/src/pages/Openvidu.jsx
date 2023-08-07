import React, { useState, useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import '../css/Openvidu.css';
import UserVideoComponent from '../components/openvidu/UserVideoComponent';
import { useSelector } from "react-redux";

const APPLICATION_SERVER_URL = `${process.env.REACT_APP_API_SERVER_URL}/`;

const Openvidu = () => {
    var userInfo = useSelector(state => state.auth.userData);
    var OV = new OpenVidu();;
    var [mySessionId, setMysessionId] = useState(`Session${userInfo.userNo}`);
    var [myUserName, setMyUserName] = useState(userInfo.userNickname);
    var [session, setSession] = useState(OV.initSession());
    var [mainStreamManager, setMainStreamManager] = useState(undefined);
    var [publisher, setPublisher] = useState(undefined);
    var [subscribers, setSubscribers] = useState([]);
    var [currentVideoDevice, setCurrentVideoDevice] = useState({}); // eslint-disable-line no-unused-vars

    useEffect(() => {
        joinSession();
        // eslint-disable-next-line
    }, []);

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

        window.close();
    }

    // const switchCamera = async () => {
    //     try {
    //         const devices = await OV.getDevices()
    //         var videoDevices = devices.filter(device => device.kind === 'videoinput');

    //         if (videoDevices && videoDevices.length > 1) {

    //             var newVideoDevice = videoDevices.filter(device => device.deviceId !== currentVideoDevice.deviceId)

    //             if (newVideoDevice.length > 0) {
    //                 // Creating a new publisher with specific videoSource
    //                 // In mobile devices the default and first camera is the front one
    //                 var newPublisher = OV.initPublisher(undefined, {
    //                     videoSource: newVideoDevice[0].deviceId,
    //                     publishAudio: true,
    //                     publishVideo: true,
    //                     mirror: true
    //                 });

    //                 //newPublisher.once("accessAllowed", () => {
    //                 await session.unpublish(mainStreamManager)

    //                 await session.publish(newPublisher)
    //                 // setCurrentVideoDevice(newVideoDevice[0]);
    //                 setMainStreamManager(newPublisher);
    //                 setPublisher(newPublisher);
    //             }
    //         }
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

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
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The sessionId
    }

    const createToken = async (sessionId) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The token
    }

    return (
        <div className="container">
            {session === undefined ? (
                // <div id="join">
                //     <div id="img-div">
                //         <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
                //     </div>
                //     <div id="join-dialog" className="jumbotron vertical-center">
                //         <h1> Join a video session </h1>
                //         <form className="form-group" onSubmit={this.joinSession}>
                //             <p>
                //                 <label>Participant: </label>
                //                 <input
                //                     className="form-control"
                //                     type="text"
                //                     id="userName"
                //                     value={myUserName}
                //                     onChange={this.handleChangeUserName}
                //                     required
                //                 />
                //             </p>
                //             <p>
                //                 <label> Session: </label>
                //                 <input
                //                     className="form-control"
                //                     type="text"
                //                     id="sessionId"
                //                     value={mySessionId}
                //                     onChange={this.handleChangeSessionId}
                //                     required
                //                 />
                //             </p>
                //             <p className="text-center">
                //                 <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
                //             </p>
                //         </form>
                //     </div>
                // </div>
                <p>미팅룸 생성 중 입니다.</p>
            ) : null}

            {session !== undefined ? (
                <div id="session">
                    <div id="session-header">
                        <h1 id="session-title">{mySessionId}</h1>
                        <input
                            className="btn btn-large btn-danger"
                            type="button"
                            id="buttonLeaveSession"
                            onClick={leaveSession}
                            value="나가기"
                        />
                        {/* <input
                            className="btn btn-large btn-success"
                            type="button"
                            id="buttonSwitchCamera"
                            onClick={switchCamera}
                            value="Switch Camera"
                        /> */}
                    </div>

                    {mainStreamManager !== undefined ? (
                        <div id="main-video" className="col-md-6">
                            <UserVideoComponent streamManager={mainStreamManager} />

                        </div>
                    ) : null}
                    <div id="video-container" className="col-md-6">
                        {publisher !== undefined ? (
                            <div className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(publisher)}>
                                <UserVideoComponent
                                    streamManager={publisher} />
                            </div>
                        ) : null}
                        {subscribers.map((sub, i) => (
                            <div key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(sub)}>
                                <span>{sub.id}</span>
                                <UserVideoComponent streamManager={sub} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Openvidu;