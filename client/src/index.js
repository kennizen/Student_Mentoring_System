import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// import "tw-elements";
import reducers from "./reducers/index";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
