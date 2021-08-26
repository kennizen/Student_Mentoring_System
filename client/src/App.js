import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Main from "./components/Main";
import AdminDashboard from "./components/dashboard/adminDashboard/AdminDashboard";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/admin" exact component={Auth} />
                <Route path="/mentor" exact component={Auth} />
                <Route path="/mentee" exact component={Auth} />
                <Route path="/admin/dashboard" exact component={AdminDashboard} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
