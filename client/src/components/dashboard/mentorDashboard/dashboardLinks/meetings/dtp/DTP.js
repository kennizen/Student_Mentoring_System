import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers";

import DateField from "./DateField";

const DTP = ({ date, handleDateChange }) => {
    return (
        <div className="mt-2 flex items-start justify-between gap-x-3">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                    clearable
                    value={date}
                    disablePast
                    inputFormat="dd/MM/yyyy, hh:mm a"
                    onChange={handleDateChange}
                    renderInput={({ inputRef, inputProps }) => (
                        <div className="flex flex-col w-full">
                            <DateField inputRef={inputRef} inputProps={inputProps} />
                        </div>
                    )}
                />
            </LocalizationProvider>
        </div>
    );
};

export default DTP;
