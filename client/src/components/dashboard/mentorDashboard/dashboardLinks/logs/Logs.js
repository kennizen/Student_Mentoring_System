import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminFetchLogs } from "../../../../../actions/admin";
import RefreshIcon from "../../../../../assets/icons/RefreshIcon";

const Logs = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // // state variable to store the fetched logs from the db
    // const [logs, setlogs] = useState([]);

    const { logs } = useSelector((state) => state.admin);

    // function to reload the logs
    const handleReload = () => {
        dispatch(adminFetchLogs(history));
    };

    console.log("logs", logs);

    return (
        <div className="w-full h-full p-4 overflow-hidden">
            <h1 className="px-5">System Logs</h1>
            <div className="flex items-end justify-between w-full px-5">
                <h5>Total Logs - {logs.length}</h5>
                <button
                    onClick={handleReload}
                    title="Reload logs"
                    className="flex items-center justify-between py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-800 transition-colors text-white"
                >
                    <RefreshIcon alt={true} myStyle={"h-5 w-5 mr-2"} />
                    Refresh
                </button>
            </div>
            <div className="w-full p-4 h-9/10 bg-white rounded-md mt-4 overflow-y-auto">
                <div className="flex flex-col">
                    <div className="sm:-mx-6 lg:-mx-8">
                        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                            <table className="min-w-full text-center">
                                <thead className="bg-gray-800 sticky-top">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4"
                                        >
                                            Avatar
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4"
                                        >
                                            Role
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4"
                                        >
                                            Action
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4"
                                        >
                                            Details
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4"
                                        >
                                            IP Address
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4"
                                        >
                                            Time
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs
                                        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                                        .map((log) => {
                                            return (
                                                <tr key={log._id} className="bg-white border-b">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center justify-center">
                                                        <img
                                                            src={
                                                                log?.user?.avatar?.url === ""
                                                                    ? `https://api.dicebear.com/9.x/personas/svg`
                                                                    : log?.user?.avatar?.url
                                                            }
                                                            alt=""
                                                            className="h-8 w-8 rounded-full"
                                                        />
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {log?.userModel}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {`${log?.user?.firstname} ${log?.user?.middlename} ${log?.user?.lastname}`}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {log?.user?.email}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {log?.event_type.replace(/_/g, " ")}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {log?.event_detail}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {log?.ip}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {moment(log?.createdAt).format(
                                                            "MMMM Do YYYY, h:mm:ss a"
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logs;
