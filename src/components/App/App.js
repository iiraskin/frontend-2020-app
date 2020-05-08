import React from 'react';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Articles from '../Articles/Articles';
import NewArticle from '../NewArticle/NewArticle';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path='/dashboard' component={Dashboard} />
                    <Route path='/articles' component={Articles} />
                    <Route path='/new-article' component={NewArticle} />
                    <Route component={Login} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
