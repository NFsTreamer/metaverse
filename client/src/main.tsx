import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./index.scss";
import "antd/dist/antd.css";

import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "./MuiTheme";
import store from "./stores";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={muiTheme}>
      <App />
    </ThemeProvider>
  </Provider>
);
