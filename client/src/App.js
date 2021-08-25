import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Main from "./components/Main";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/admin" exact component={Auth} />
                <Route path="/mentor" exact component={Auth} />
                <Route path="/mentee" exact component={Auth} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
