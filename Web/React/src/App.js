import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FollowProvider } from "./context/FollowContext";
import LogInPage from "./pages/LogInPage";
import KakaoRedirectHandler from "./components/KakaoCallback";
import BirthdayInput from "./pages/BirthdayInput";
import UserPage from "./pages/UserPage";
import ProfileSetting from "./pages/ProfileSetting";
import MyFriend from "./pages/MyFriend";
import NotFound404 from "./pages/NotFound404";
import LivePage from "./pages/LivePage";
import PrivateRoute from "./components/Route/PrivateRoute";

function App() {
  return (
    <FollowProvider>
      <Router>
      <Routes>
          <Route path="/" element={<LogInPage />} />
          <Route path="/auth" element={<KakaoRedirectHandler />} />
          <Route path="/birthdayinput/:userNo" element={<BirthdayInput />} />
          {/* 일단 이상한 페이지로 이동하면 404NotFound로 이동 */}
          <Route path="/*" element={<NotFound404 />} />
          {/* 로그인이 필요한 페이지 */}
          <Route element={<PrivateRoute />}>
            <Route path="/user/:userNo" element={<UserPage />} />
            <Route path="/profile-setting" element={<ProfileSetting />} />
            <Route path="/myfriend/:userNo" element={<MyFriend />} />
            <Route path="/live/:userNo" element={<LivePage />} />
          </Route>      
        </Routes>
      </Router>
    </FollowProvider>
  );
}
export default App;
