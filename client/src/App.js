import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Main from "./components/Main";
import AdminDashboard from "./components/dashboard/adminDashboard/AdminDashboard";
import MentorDashboard from "./components/dashboard/mentorDashboard/MentorDashboard";
import Error403 from "./components/error/Error403";
import StudentDashboard from "./components/dashboard/studentDashboard/StudentDashboard";

import "./App.css";

const App = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/admin" exact component={Auth} />
                    <Route path="/mentor" exact component={Auth} />
                    <Route path="/mentee" exact component={Auth} />
                    <Route path="/admin/dashboard" exact component={AdminDashboard} />
                    <Route path="/mentor/dashboard" exact component={MentorDashboard} />
                    <Route path="/mentee/dashboard" exact component={StudentDashboard} />
                    <Route path="/error" exact component={Error403} />
                </Switch>
            </BrowserRouter>
        </React.StrictMode>
    );
};

export default App;
