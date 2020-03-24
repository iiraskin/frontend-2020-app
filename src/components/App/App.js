import React from 'react';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
