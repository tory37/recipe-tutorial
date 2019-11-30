import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Recipes from "components/Recipes";
import AddRecipe from "components/AddRecipe";
import Nav from "components/Nav";

const App = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Recipes} />
            <Route path="/addrecipe" component={AddRecipe} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
