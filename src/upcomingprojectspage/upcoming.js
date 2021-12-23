import { useState } from "react";
import "./upcoming.css";

import "./mainupcoming";

function Upcom(props) {
  const [str, setstr] = useState("");

  function valc(e) {
    setstr(e.target.value);
    console.log(e.target.value);
  }

  //onclick submit function - POST
  function handlesubmit(e) {
    if (str.trim() === "") {
      e.preventDefault();
      return;
    } else {
      e.preventDefault();
      fetch("http://localhost:4000/postproject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectname: str,
          status: false,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setstr("");
          props.addtolist(data);
        })
        .catch((err) => {
          console.log("error:", err);
        });
    }
  }

  return (
    <div className="upmaindiv">
      <div>
        <h1 className="titleup"> UPCOMING PROJECTS </h1>
      </div>
      <div>
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder="Enter new project..."
            value={str}
            onChange={valc}
          ></input>

          <button> ADD </button>
        </form>
      </div>
    </div>
  );
}

export default Upcom;
