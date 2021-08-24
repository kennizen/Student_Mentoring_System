import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Main from "./components/Main";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/admin" component={Auth} />
                <Route path="/mentor" component={Auth} />
                <Route path="/mentee" component={Auth} />
                <Route path="/" component={Main} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
