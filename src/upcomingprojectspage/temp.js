import React, { useEffect, useState } from "react";
import "./temp.css";
import "./mainupcoming";
import "./upcoming";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Temp(props) {
  //removing function

  function rem(id) {
    fetch("http://localhost:4000/del/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => props.toremove(res));
  }

  return (
    <div className="tempc">
      <ul>
        {props.todol.map((task, index) => {
          return (
            <li key={index}>
              <div>{task.projectname}</div>

              <DeleteForeverIcon
                className="del"
                onClick={() => rem(task._id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Temp;
