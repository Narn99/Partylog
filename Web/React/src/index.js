import React from "react";
import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
import App from "./App";
import "./css/GlobalFont.css";
// import store from './store'
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import registerServiceWorker from './registerServiceWorker';

const theme = createTheme({
  palette: {
    primary: {
      main: "#fbb3c2", // 여기에 원하는 primary 색상을 지정합니다.
    },
  },
  typography: {
    fontFamily: "MaplestoryOTFLight, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  // </React.StrictMode>
);
registerServiceWorker();