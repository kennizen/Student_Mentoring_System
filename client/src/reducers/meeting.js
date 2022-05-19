const meeting = (state = { meetings: [] }, action) => {
    switch (action.type) {
        case "FETCH_MEETINGS":
            return {
                ...state,
                meetings: action.meetings.sort((a, b) => {
                    return a.date > b.date ? 1 : -1;
                }),
            };
        case "ADD_MEETING":
            let newMeeting = state.meetings;
            newMeeting.push(action.newMeeting);
            return {
                ...state,
                meetings: newMeeting.sort((a, b) => {
                    return a.date > b.date ? 1 : -1;
                }),
            };
        default:
            return state;
    }
};

export default meeting;
