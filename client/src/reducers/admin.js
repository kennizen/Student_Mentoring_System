const admin = (state = { auth_token: null }, action) => {
    switch (action.type) {
        case "SIGN_IN":
            console.log("inside reducers of admin");
            localStorage.setItem("auth_token", action?.data?.auth_token);
            const states = { ...state, auth_token: action?.data?.auth_token };
            return states;
        default:
            return state;
    }
};

export default admin;
