import React, { Component } from "react";
import axios from "axios";
import "./createpage.css";

export default class CreateProject extends Component {
  constructor(props) {
    super(props);

    this.onChangeprojectname = this.onChangeprojectname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      projectName: "",
      description: "",
    };
  }

  onChangeprojectname(e) {
    this.setState({
      projectName: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const project = {
      projectName: this.state.projectName,
      description: this.state.description,
    };

    console.log(project);

    axios
      .post("http://localhost:4000/ongoing/add", project)
      .then((res) => console.log(res.data));
    this.props.change();
  }

  render() {
    return (
      <div className="createpro">
        <h1>CREATE NEW PROJECT</h1>
        <hr></hr>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="headin">PROJECTNAME : </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.projectName}
              onChange={this.onChangeprojectname}
            />
          </div>
          <div className="form-group">
            <label className="headin">DESCRIPTION : </label>
            <textarea
              type="text"
              required
              className="form-control   descchange"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Project"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
