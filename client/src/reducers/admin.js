const admin = (state = { authData: null }, action) => {
    switch (action.type) {
        case "SIGN_IN":
            console.log("inside reducers of admin");
            console.log(action);
            return state;
        default:
            return state;
    }
};

export default admin;
