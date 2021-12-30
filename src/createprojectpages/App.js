import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";

import Navbar from "./components/navbar.component";
import ProjectList from "./components/project-list.component";
import EditProject from "./components/edit-project.component";
import CreateProject from "./components/create-project.component";
const App = () => {
  return (
    <div>
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Switch>
            <Route path="/" exact component={ProjectList} />
            <Route path="/edit/:id" exact component={EditProject} />
            <Route path="/create" exact component={CreateProject} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
export default App;
