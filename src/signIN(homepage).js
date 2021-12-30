import React from "react";

//import Signup from './signUP';
import "./signIN.css";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

const Signin = () => {
  const [em, changeem] = useState("");
  const [pa, changepa] = useState("");

  let nav = useNavigate();
  function nextpage() {
    nav("/signup");
  }

  function handlesubmit(e) {
    e.preventDefault();
    if (em.length === 0 || pa.length === 0) {
      alert("It cant be empty");
    } else {
      fetch("http://localhost:4000/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: em,
          password: pa,
        }),
      })
        .then((res) => {
          res.text().then((resp1) => {
            //console.log(resp1);
            //alert(resp1);
            if (resp1 === "0") {
              alert("CHECK YOUR EMAIL AND PASSWORD");
            }
            if (resp1 === "1") {
              localStorage.setItem("emid", em);
              nav("/new");
            }
          });
        })
        .catch((err) => {
          console.log("error:", err);
        });
      console.log(pa + em);
    }
  }

  function onemail(e) {
    changeem(e.target.value);
  }
  function onpass(e) {
    changepa(e.target.value);
  }
  return (
    <div className="maindivv">
      <div className="box">
        <h1>COMPANY DASHBOARD</h1>
        <h1> SIGN IN </h1>
        <form>
          <div className="grp">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              onChange={onemail}
            />
          </div>

          <div className="grp">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              onChange={onpass}
            />
          </div>
          <input type="submit" value="SIGN IN" onClick={handlesubmit}></input>
        </form>
        <br />
        <br />

        <p>
          Don't have an account ? &nbsp; &nbsp; &nbsp;{" "}
          <button className="btn" onClick={nextpage}>
            {" "}
            Sign Up
          </button>{" "}
        </p>
      </div>
    </div>
  );
};
export default Signin;
