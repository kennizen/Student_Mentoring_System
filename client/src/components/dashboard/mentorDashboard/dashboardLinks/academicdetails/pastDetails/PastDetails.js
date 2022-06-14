import React from "react";

const PastDetails = ({ handleShowModal, setOverflow, pastEducation }) => {
    const handleActions = () => {
        handleShowModal();
        setOverflow(false);
    };

    return (
        <>
            <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-m32 rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-2 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">
                                Past Education Details
                            </h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <button
                                onClick={handleActions}
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>

                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 align-middle py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                    Class
                                </th>
                                <th className="px-6 align-middle py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                    Board
                                </th>
                                <th className="px-6 align-middle py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                    School / university
                                </th>
                                <th className="px-6 align-middle py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                    Marks / Percentage
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-b">
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-900 ">
                                    Class 10
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                    {pastEducation["10"]?.board}
                                </td>
                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                    {pastEducation["10"]?.studied}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                    {pastEducation["10"]?.marks}
                                </td>
                            </tr>
                            <tr>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-900">
                                    Class 12
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                    {pastEducation["12"]?.board}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                    {pastEducation["12"]?.studied}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                    {pastEducation["12"]?.marks}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default PastDetails;
