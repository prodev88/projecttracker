import React, { Component } from "react";
import axios from "axios";

//import DatePicker from "react-datepicker";
//npmimport "react-datepicker/dist/react-datepicker.css";
import withMyHook from "./HOC";
class EditProject extends Component {
  constructor(props) {
    super(props);

    this.onChangeprojectName = this.onChangeprojectName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.p=useParams();

    this.state = {
      projectName: "",
      description: "",
    };
  }

  componentDidMount() {
    console.log(this.props);
    axios
      .get("http://localhost:4000/ongoing/" + this.props.p.id)
      .then((response) => {
        this.setState({
          projectName: response.data.projectName,
          description: response.data.description,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeprojectName(e) {
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
    console.log("submit option");
    e.preventDefault();

    const project = {
      projectName: this.state.projectName,
      description: this.state.description,
    };

    console.log(project);

    axios
      .post("http://localhost:4000/ongoing/update/" + this.props.p.id, project)
      .then((res) => console.log(res.data));

    // window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Project</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>projectname</label>
            <input
              type="text"
              className="form-control"
              value={this.state.projectName}
              onChange={this.onChangeprojectName}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary"
              onSubmit={this.onSubmit}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withMyHook(EditProject);
