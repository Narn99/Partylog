import React, { useState } from "react";
import { Button } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

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
      navigate("/MyPage");
    } else {
      alert("프로필 사진을 먼저 업로드하세요.");
    }
  };

  return (
    <div>
      <NavBar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="profile-upload"
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                margin: "20px",
              }}
            />
          ) : (
            <div
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: "#f0f0f0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#888" }}>프로필 사진을 업로드하세요</span>
            </div>
          )}

          <Button
            variant="contained"
            component="label"
            style={{ position: "absolute", bottom: "20px", right: "20px" }}
          >
            <PhotoCameraIcon />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
        </div>

        <button className="ProfileSetting-button" onClick={handleProfileSave}>
          프로필 저장
        </button>
      </div>
    </div>
  );
}

export default ProfileSetting;
