import React, { useState } from "react";
import SearchFriend from "../components/SearchFriend";
import molru from "../assets/molru.webp";

function ProfileSetting() {
  const [uploadedImage, setUploadedImage] = useState(null);

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

  return (
    <div>
      <div className="MyPage-header">
        <h1 className="loginpage-h1">Partylog</h1>
        <SearchFriend />
        <img src={molru} alt="settingimg" className="MyPage-settingimg" />
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        {uploadedImage ? (
          <img src={uploadedImage} alt="profile-upload" style={{ width: "200px", height: "200px", borderRadius: "50%", margin: "20px" }} />
        ) : (
          <div style={{ width: "200px", height: "200px", borderRadius: "50%", background: "#f0f0f0", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <span style={{ color: "#888" }}>프로필 사진을 업로드하세요</span>
          </div>
        )}

        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ margin: "20px" }} />
        <button className="MyPage-live-button">프로필 저장</button>
      </div>
    </div>
  );
}

export default ProfileSetting;
