import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({ myStyle }) => {
    return <CircularProgress className={`${myStyle}`} />;
};

export default Loading;
