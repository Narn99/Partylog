import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import KakaoRedirectHandler from "./components/KakaoCallback";
import BirthdayInput from "./pages/BirthdayInput";
import MyPage from "./pages/MyPage"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/auth" element={<KakaoRedirectHandler />} />
        <Route path="/birthdayinput" element={<BirthdayInput />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
