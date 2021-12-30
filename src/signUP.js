import Newpage from "./homepage";
import React from "react";
import "./signUP.css";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

const Signup = (props) => {
  var [na, changena] = useState("");
  var [em, changeem] = useState("");
  var [pa, changepa] = useState("");

  let nav = useNavigate();

  function handlesubmit(e) {
    console.log(props);
    na = na.trim();
    em = em.trim();
    pa = pa.trim();
    var reg = /^\w+@\w+\.(com|org|net)$/;
    if (na.length === 0 || em.length === 0 || pa.length === 0) {
      alert("VALUE IS EMPTY ");
    } else if (!reg.test(em)) {
      alert("ENTER A PROPER EMAIL ID ");
    } else if (na.length < 5) {
      {
        alert("NAME CAN'T BE LESS THAN 5");
      }
    } else if (pa.length < 5) {
      alert("PASSWORD CAN'T BE LESS THAN 5");
    } else {
      e.preventDefault();
      localStorage.setItem("emid", em);
      fetch("http://localhost:4000/postdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: na,
          email: em,
          password: pa,
        }),
      })
        .then((res) => {
          res.text().then((resp2) => {
            if (resp2 === "1") {
              nav("/new");
            }
            if (resp2 === "0") {
              alert("EMAIL ALREADY EXISTS");
            }
          });
        })
        .catch((err) => {
          console.log("error:", err);
        });
      console.log(na + pa + em);
    }
  }
  function onname(e) {
    changena(e.target.value);
  }
  function onemail(e) {
    changeem(e.target.value);
  }
  function onpass(e) {
    changepa(e.target.value);
  }
  return (
    <div className="maindiv">
      <div className="box">
        <h1> SIGN UP </h1>
        <form>
          <div className="grp">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              onChange={onname}
            />
          </div>
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
          <input type="submit" value="SIGN UP" onClick={handlesubmit}></input>
        </form>
      </div>
    </div>
  );
};
export default Signup;
