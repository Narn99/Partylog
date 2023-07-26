import React from "react";
import ReactDOM from "react-dom/client";
// import { Provider } from 'react-redux'
import App from "./App";
// import store from './store'

ReactDOM.createRoot(document.getElementById("root")).render(
  /*
   * React.StrictMode 적용 시 개발 모드로 인해 useEffect가 2번 실행되어 제거함
   */
  <App />
);
