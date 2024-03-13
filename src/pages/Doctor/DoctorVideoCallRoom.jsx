import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";

function DoctorVideoCallRoom() {
  const { roomID } = useParams();
  const accessToken = Cookies.get("access");
  const decoded = jwtDecode(accessToken);
  const userID = decoded.user_id;
  const userName = decoded.first_name;

  console.log(
    "this is the  authentication_user from redux store 👉👉👉👉👉👉👉👉👉👉👉👉👉👉",
    userID,
    userName
  );

  const myMeeting = async (element) => {
    // generate Kit Token
    const appID = 742957611;
    const serverSecret = "0d579fcb64d555c454d15cfb3d121803";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID, 
      userName
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "copy link",
          url:
            window.location.origin +
            "/room" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,

      showTextChat: true,
      showUserList: true,
      maxUsers: 2,
      layout: "Auto",
      showLayoutButton: false,
    });
  };
  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}

export default DoctorVideoCallRoom;
