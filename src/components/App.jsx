import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "../layout/Login";
import Main from "../layout/Main";
import NavBar from "./NavBar";
import Users from "../layout/Users";

const App = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?" component={Users} />
                <Route path="/login" component={Login} />
                <Route path="/" component={Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default App;
