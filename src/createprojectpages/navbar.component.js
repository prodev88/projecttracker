import React, { Component } from "react";
import { Link } from "react-router-dom";
import bootstrap from "bootstrap";
export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Ongoing projects
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Create Project
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
