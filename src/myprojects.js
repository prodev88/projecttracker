import React, { useState, useEffect } from "react";
import "./myproject.css";

function Myproject() {
  const [sublist, setsublist] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/getsub")
      .then((response) => response.json())
      .then((data) => {
        setsublist(data);
      });
  }, []);

  return (
    <div className="subtemp">
      <h1>CURRENT WORKING PROJECTS</h1>
      <hr></hr>
      <ul>
        {sublist.map((sub, index) => {
          if (sub.employeeemail === localStorage.getItem("emid")) {
            return (
              <div className="subc">
                <li key={index}>
                  <div>{sub.projectname}</div>
                </li>
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default Myproject;
