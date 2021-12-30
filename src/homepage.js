import React from "react";
import "./homepage.css";
import { useState, useEffect } from "react";

import { Link, Route, Routes, useNavigate } from "react-router-dom";
import CreateProject from "./createprojectpages/create-project.component";
import Myproject from "./myprojects";
import ProjectList from "./createprojectpages/project-list.component";
import Mainupcom from "./upcomingprojectspage/mainupcoming";

function Newpage() {
  const [str, setstate] = useState("");

  function change(val) {
    setstate(val);
  }

  let na = useNavigate();

  function fromfirst() {
    localStorage.removeItem("emid");
    na("/");
  }
  //newuser condition redirect
  //console.log(localStorage.getItem("emid"));

  useEffect(() => {
    if (!localStorage.getItem("emid")) {
      console.log("inside function ", localStorage.getItem("emid"));

      na("/");
    }
  }, []);

  return (
    <div className="homepagebuttons">
      <button className="homepagebuttonind" onClick={() => change("m")}>
        MY PROJECT
      </button>

      <button className="homepagebuttonind" onClick={() => change("o")}>
        ONGOING PROJECT
      </button>
      <button className="homepagebuttonind" onClick={() => change("a")}>
        CREATE PROJECT
      </button>
      <button className="homepagebuttonind" onClick={() => change("u")}>
        UP COMING
      </button>
      <button className="homepagebuttonind" onClick={() => fromfirst()}>
        LOG OUT
      </button>
      <div>
        {str === "" ? <Myproject /> : <></>}
        {str === "o" ? <ProjectList /> : <></>}
        {str === "u" ? <Mainupcom></Mainupcom> : <></>}
        {str === "m" ? <Myproject></Myproject> : <></>}
        {str === "a" ? (
          <CreateProject change={() => change("o")}></CreateProject>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Newpage;
