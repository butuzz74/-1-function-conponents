import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "./Users";
import NavBar from "./NavBar";
import Main from "./Main";
import Login from "./Login";
import SelectedUser from "./SelectedUser";
import NotFound from "./NotFound";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:id" component={SelectedUser} />
                <Route path="/users" component={Users} />
                <Route component={NotFound} />
            </Switch>
        </>
    );
};

export default App;
