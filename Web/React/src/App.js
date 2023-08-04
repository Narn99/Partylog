import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FollowProvider } from "./context/FollowContext";
import { Provider } from "react-redux";
import { store } from "./store/store";
import LogInPage from "./pages/LogInPage";
import KakaoRedirectHandler from "./components/KakaoCallback";
import BirthdayInput from "./pages/BirthdayInput";
import UserPage from "./pages/UserPage";
import ProfileSetting from "./pages/ProfileSetting";
import MyFriend from "./pages/MyFriend";
import NotFound404 from "./pages/NotFound404";
import LivePage from "./pages/LivePage";

function App() {
  return (
    <Provider store={store}>
      <FollowProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LogInPage />} />
            <Route path="/auth" element={<KakaoRedirectHandler />} />
            <Route path="/birthdayinput" element={<BirthdayInput />} />
            <Route path="/user/:userNo" element={<UserPage />} />
            <Route path="/profile-setting" element={<ProfileSetting />} />
            <Route path="/myfriend/:userNo" element={<MyFriend />} />
            <Route path="/live/:userNo" element={<LivePage />} />

            {/* 일단 이상한 페이지로 이동하면 404NotFound로 이동 */}
            <Route path="/*" element={<NotFound404 />} />
          </Routes>
        </Router>
      </FollowProvider>
    </Provider>
  );
}
export default App;
