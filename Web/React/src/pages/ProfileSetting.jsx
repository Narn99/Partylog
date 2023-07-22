import React, { useState } from "react";
import SearchFriend from "../components/SearchFriend";
import molru from "../assets/molru.webp";

function ProfileSetting() {
  const [uploadedImage, setUploadedImage] = useState(null); // 프로필 이미지 상태 변수
  const [nickname, setNickname] = useState(""); // 닉네임 상태 변수

  // 이미지 업로드를 처리하는 함수
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 닉네임 입력을 처리하는 함수
  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  // 프로필 저장 버튼을 누를 때 실행되는 함수
  const handleProfileSave = () => {
    if (uploadedImage && nickname) {
      // 여기에 프로필과 닉네임을 서버에 저장하는 로직을 추가해야함
      alert("프로필과 닉네임 저장됨!");
    } else if (!uploadedImage) {
      alert("프로필 사진을 먼저 업로드하세요.");
    } else {
      alert("닉네임을 입력하세요.");
    }
  };

  return (
    <div>
      <div className="MyPage-header">
        <h1 className="loginpage-h1">Partylog</h1>
        <SearchFriend />
        <img src={molru} alt="settingimg" className="MyPage-settingimg" />
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        {uploadedImage ? (
          <img src={uploadedImage} alt="profile-upload" style={{ width: "300px", height: "300px", borderRadius: "50%", margin: "20px" }} />
        ) : (
          <div style={{ width: "200px", height: "200px", borderRadius: "50%", background: "#f0f0f0", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <span style={{ color: "#888" }}>프로필 사진을 업로드하세요</span>
          </div>
        )}

        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ margin: "20px" }} />

        {/* 닉네임 입력란 */}
        <input type="text" value={nickname} onChange={handleNicknameChange} placeholder="닉네임을 입력하세요" style={{ margin: "10px", padding: "5px", fontSize: "16px", textAlign: "center" }} />

        {/* 프로필 저장 버튼 */}
        <button className="ProfileSetting-button" onClick={handleProfileSave}>프로필 저장</button>
      </div>
    </div>
  );
}

export default ProfileSetting;
