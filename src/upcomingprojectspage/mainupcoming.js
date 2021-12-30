import React, { useState, useEffect } from "react";
import Temp from "./temp.js";
import Upcom from "./upcoming";
import "./mainupcoming.css";
function Mainupcom() {
  const [todol, settodol] = useState([]);

  //main list
  useEffect(() => {
    fetch("http://localhost:4000/getfull")
      .then((response) => response.json())
      .then((data) => {
        settodol(data);
        console.log(data);
      });
  }, []);

  function addtolist(newt) {
    settodol([...todol, newt]);
    console.log("am inside a prop");
    console.log(newt);
    console.log(todol);
  }

  //function to remove
  function toremove(task) {
    const newl = todol.filter((item) => !(item._id === task._id));
    settodol(newl);
  }

  return (
    <div className="mainupcom">
      <Upcom addtolist={addtolist} />
      <Temp todol={todol} toremove={toremove} />
    </div>
  );
}

export default Mainupcom;
