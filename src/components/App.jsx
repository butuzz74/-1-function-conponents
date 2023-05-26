import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../layout/Login";
import Main from "../layout/Main";
import NavBar from "./ui/NavBar";
import Users from "../layout/Users";
// import UserEditPage from "./page/userEdit/UserEditPage";

const App = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                {/* <Route path="/users/:userId?/edit" component={UserEditPage} /> */}
                <Route path="/users/:userId?/:edit?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" component={Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default App;
