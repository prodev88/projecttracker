import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Signup from "./signUP";
import Newpage from "./homepage";
import Signin from "./signIN(homepage)";
import Mainupcom from "./upcomingprojectspage/mainupcoming";
import Allprojects from "./allprojects";
import Myproject from "./myprojects";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/new" element={<Newpage></Newpage>}></Route>
        <Route path="/upcoming" element={<Mainupcom />}></Route>
        <Route path="/myprojects" element={<Myproject />}></Route>
        <Route path="/allprojects" element={<Allprojects />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
