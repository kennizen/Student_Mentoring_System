const meeting = (state = { meetings: [] }, action) => {
    switch (action.type) {
        case "FETCH_MEETINGS":
            return {
                ...state,
                meetings: action.meetings,
            };
        case "ADD_MEETING":
            const newMeeting = state.meetings;
            newMeeting.push(action.newMeeting);
            return {
                ...state,
                meetings: newMeeting,
            };
        case "UPDATE_MEETING":
            const idx = state.meetings.findIndex(
                (meeting) => meeting._id.toString() === action.meeting._id.toString()
            );
            state.meetings[idx] = action.meeting;
            return {
                ...state,
                meetings: [...state.meetings],
            };
        default:
            return state;
    }
};

export default meeting;
