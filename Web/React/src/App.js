import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import KakaoRedirectHandler from "./components/KakaoCallback";
import BirthdayInput from "./pages/BirthdayInput";
import UserPage from "./pages/UserPage";
import ProfileSetting from "./pages/ProfileSetting";
import MyFriend from "./pages/MyFriend";
import { FollowProvider } from "./context/FollowContext";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <FollowProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LogInPage />} />
            <Route path="/auth" element={<KakaoRedirectHandler />} />
            <Route path="/birthdayinput/:userNo" element={<BirthdayInput />} />
            <Route path="/user/:userNo" element={<UserPage />} />
            {/* 추후 mypage는 유저 구분을 위해 '/mypage/:username'같은 식으로 바꿔야함. */}
            <Route path="/profile-setting" element={<ProfileSetting />} />
            <Route path="/myfriend" element={<MyFriend />} />
          </Routes>
        </Router>
      </FollowProvider>
    </Provider>
  );
}
export default App;
