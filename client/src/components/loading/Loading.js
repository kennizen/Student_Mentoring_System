import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { LinearProgress } from "@mui/material";

const Loading = ({ width, height, alt }) => {
    if (alt) {
        return <LinearProgress />;
    }
    return (
        <CircularProgress
            sx={{
                width: width,
                height: height,
            }}
        />
    );
};

export default Loading;
