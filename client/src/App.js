import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Main from "./components/Main";
import MentorDashboard from "./components/dashboard/mentorDashboard/MentorDashboard";
import Error403 from "./components/error/Error403";

import { SocketContext, socket } from "./socket/socket";

const App = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/admin" exact component={Auth} />
                    <Route path="/mentor" exact component={Auth} />
                    <Route path="/mentee" exact component={Auth} />
                    <SocketContext.Provider value={socket}>
                        <Route path="/admin/dashboard" exact component={MentorDashboard} />
                        <Route path="/mentor/dashboard" exact component={MentorDashboard} />
                        <Route path="/mentee/dashboard" exact component={MentorDashboard} />
                    </SocketContext.Provider>
                    <Route path="/error" exact component={Error403} />
                </Switch>
            </BrowserRouter>
        </React.StrictMode>
    );
};

export default App;
