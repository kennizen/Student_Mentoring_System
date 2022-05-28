import React from "react";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const DateField = ({ inputRef, inputProps }) => {
    return (
        <div className="relative w-full">
            <input
                required
                {...inputProps}
                ref={inputRef}
                type="text"
                className="rounded-lg border-blueGray-300 border focus:ring-0 w-full"
                placeholder="Select date and time"
            />
            <div className="absolute top-2.5 right-12">
                <CalendarMonthRoundedIcon className="text-gray-500" />
            </div>
            <div className="absolute top-2.5 right-3">
                <AccessTimeIcon className="text-gray-500" />
            </div>
        </div>
    );
};

export default DateField;
