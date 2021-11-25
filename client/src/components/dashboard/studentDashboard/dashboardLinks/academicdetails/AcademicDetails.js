import React from "react";

const AcademicDetails = () => {
    return (
        <div className="w-full p-5">
            <h2>Past Education</h2>
            <div className="flex space-x-2 mt-5 bg-white p-6 shadow-md border border-gray-200 rounded-lg">
                <div className="flex-1">
                    <h2 className="mb-2">Semester: 1 - Courses Details</h2>
                    <table className="mt-3 w-full mx-1">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="text-xs font-medium text-gray-700 px-3 py-3 text-left uppercase tracking-wider"
                                >
                                    Course
                                </th>
                                <th
                                    scope="col"
                                    className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider"
                                >
                                    Board
                                </th>
                                <th
                                    scope="col"
                                    className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider"
                                >
                                    Percentage/CGPA
                                </th>
                            </tr>
                        </thead>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Class 10
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                SEBA
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Class 12
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                AHSEC
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="flex-0"></div>
                <div className="flex-1">
                    <table className="mt-3 w-full mx-1">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="text-xs font-medium text-gray-700 px-3 py-3 text-left uppercase tracking-wider"
                                >
                                    Course
                                </th>
                                <th
                                    scope="col"
                                    className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider"
                                >
                                    Board
                                </th>
                                <th
                                    scope="col"
                                    className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider"
                                >
                                    Percentage/CGPA
                                </th>
                            </tr>
                        </thead>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                UG
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                DU
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                PG
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                TezU
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="flex space-x-2 mt-5 bg-white p-6 shadow-md border border-gray-200 rounded-lg">
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h2 className="mb-2">Semester: 1 - Courses Details</h2>
                        <button className="">Edit</button>
                    </div>

                    <table className="w-full mx-3">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="text-xs font-medium text-gray-700 px-3 py-3 text-left uppercase tracking-wider"
                                >
                                    Course code
                                </th>
                                <th
                                    scope="col"
                                    className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider"
                                >
                                    Title
                                </th>
                                <th
                                    scope="col"
                                    className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider"
                                >
                                    Credit
                                </th>
                                <th
                                    scope="col"
                                    className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider"
                                >
                                    Type
                                </th>
                                <th
                                    scope="col"
                                    className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider"
                                >
                                    Grade
                                </th>
                            </tr>
                        </thead>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Class 10
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                SEBA
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Class 12
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                AHSEC
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Class 12
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                AHSEC
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="flex space-x-2 mt-5 bg-white p-6 shadow-md border border-gray-200 rounded-lg">
                <div className="flex-1">
                    <h2 className="mb-2">Semester: 2 - Course Details</h2>
                    <table className="w-full mx-3">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="text-xs font-medium text-gray-700 px-3 py-3 text-left uppercase tracking-wider"
                                >
                                    Course code
                                </th>
                                <th
                                    scope="col"
                                    className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider"
                                >
                                    Title
                                </th>
                                <th
                                    scope="col"
                                    className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider"
                                >
                                    Credit
                                </th>
                                <th
                                    scope="col"
                                    className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider"
                                >
                                    Type
                                </th>
                                <th
                                    scope="col"
                                    className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider"
                                >
                                    Grade
                                </th>
                            </tr>
                        </thead>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Class 10
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                SEBA
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Class 12
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                AHSEC
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Class 12
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                AHSEC
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                                70%
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AcademicDetails;
