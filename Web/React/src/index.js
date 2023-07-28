import React from "react";
import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
import App from "./App";
import "./css/GlobalFont.css";
// import store from './store'
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fbb3c2", // 여기에 원하는 primary 색상을 지정합니다.
    },
  },
  typography: {
    fontFamily: "MaplestoryOTFLight",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
<<<<<<< HEAD
    <App />
=======
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* <Provider store={store}> */}
      <App />
      {/* </Provider> */}
    </ThemeProvider>
  </React.StrictMode>
>>>>>>> Web-MyPage
);
