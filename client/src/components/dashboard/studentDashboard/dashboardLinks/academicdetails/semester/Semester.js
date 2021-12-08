import React from "react";

const Semester = ({ semester, course }) => {
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-m32 rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-2 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">
                                Semester - {semester}
                            </h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <button
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
                                <th className="px-6 align-middle py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Code
                                </th>
                                <th className="px-6 align-middle py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Title
                                </th>
                                <th className="px-6 align-middle py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Credit
                                </th>
                                <th className="px-6 align-middle py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Type
                                </th>
                                <th className="px-6 align-middle py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Grade
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {course.map((course) => {
                                return (
                                    <tr className="border-b" key={course.code}>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {course.code}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                            {course.title}
                                        </td>
                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                            {course.credit}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                            {course.type}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                            {course.grade}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Semester;
