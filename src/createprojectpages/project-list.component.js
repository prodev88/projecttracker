import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./projectlist.css";

function subpost(pn, pid) {
  fetch("http://localhost:4000/addsub", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      employeeemail: localStorage.getItem("emid"),
      projectname: pn,
      projectid: pid,
    }),
  })
    .then((res) => {
      console.log(pn + pid);
    })
    .catch((err) => {
      console.log("error:", err);
    });
}

const Project = (props) => {
  useEffect(() => {
    if (props.sublist.indexOf(props.project._id) === -1) {
      setbuttonvar("SUBSCRIBE");
    } else {
      setbuttonvar("UNSUBSCRIBE");
    }
  }, [props.sublist, props.project._id]);

  const [buttonvar, setbuttonvar] = useState("SUBSCRIBE");
  const toggleText = (pro) => {
    if (buttonvar === "SUBSCRIBE") {
      setbuttonvar("UNSUBSCRIBE");

      subpost(props.project.projectName, props.project._id);
    } else {
      fetch("http://localhost:4000/subdel/" + pro, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      setbuttonvar("SUBSCRIBE");
    }
  };
  return (
    <tr>
      <td>{props.project.projectName}</td>
      <td>{props.project.description}</td>
      <td>
        <Link to={"/edit/" + props.project._id}>EDIT</Link> |{" "}
        <a
          href="#"
          onClick={() => {
            props.deleteProject(props.project._id);
          }}
        >
          DELETE
        </a>
        {" | "}
        <a
          href="#"
          onClick={() => {
            toggleText(props.project._id);
          }}
        >
          {buttonvar}
        </a>
      </td>
    </tr>
  );
};

export default class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.deleteProject = this.deleteProject.bind(this);

    this.state = { projects: [], subtablelist: [], temparr: [], onlyid: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/ongoing")
      .then((response) => {
        this.setState({ projects: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("http://localhost:4000/getsub")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ subtablelist: data });
        for (let i = 0; i < this.state.subtablelist.length; i++) {
          this.state.temparr[i] = this.state.subtablelist[i].projectid;
        }

        // console.log(this.state.temparr);
        this.setState({ onlyid: this.state.temparr });
        // console.log(this.state.onlyid);
      });
  }

  deleteProject(id) {
    console.log(this.state.subtablelist);
    axios.delete("http://localhost:4000/ongoing/" + id).then((response) => {
      console.log(response.data);

      fetch("http://localhost:4000/subdel/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    });

    this.setState({
      projects: this.state.projects.filter((el) => el._id !== id),
    });
  }

  projectList() {
    return this.state.projects.map((currentproject) => {
      return (
        <Project
          project={currentproject}
          deleteProject={this.deleteProject}
          key={currentproject._id}
          sublist={this.state.onlyid}
        />
      );
    });
  }

  render() {
    return (
      <div className="prolist">
        <h3>COMPANY PROJECTS</h3>
        <hr></hr>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>PROJECTNAME</th>
              <th>DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>{this.projectList()}</tbody>
        </table>
      </div>
    );
  }
}
