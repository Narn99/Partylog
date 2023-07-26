import React, { useState } from "react";
import { Button } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';
import SearchFriend from "../components/SearchFriend";
import molru from "../assets/molru.webp";

function ProfileSetting() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const navigate = useNavigate();

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

  const handleProfileSave = () => {
    if (uploadedImage) {
      alert("프로필 저장됨!");
      navigate('/MyPage');
    } else {
      alert("프로필 사진을 먼저 업로드하세요.");
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
          <div style={{ width: "300px", height: "300px", borderRadius: "50%", background: "#f0f0f0", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <span style={{ color: "#888" }}>프로필 사진을 업로드하세요</span>
          </div>
        )}

        <Button variant="contained" component="label" style={{ margin: "20px" }}>
          <PhotoCameraIcon />
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>

        <button className="ProfileSetting-button" onClick={handleProfileSave}>프로필 저장</button>
      </div>
    </div>
  );
}

export default ProfileSetting;
