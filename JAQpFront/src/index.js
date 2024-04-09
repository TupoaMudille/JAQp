import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import ReactDOM from "react-dom/client";
import "./index.css";
import Auth from "./pages/Auth";
import Reg from "./pages/Reg";
import Main from "./Main";
import Settings from "./pages/Settings";
import Constructor from "./pages/Constructor";
import reportWebVitals from "./reportWebVitals";
export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter history={history}>
    <Routes>
      <Route exact path="/" element={<Auth />} />
      <Route exact path="/registration" element={<Reg />} />
      <Route exact path="/main" element={<Main />} />
      <Route exact path="/constructor" element={<Constructor />} />
      <Route exact path="/settingsId=?" element={<Settings />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
