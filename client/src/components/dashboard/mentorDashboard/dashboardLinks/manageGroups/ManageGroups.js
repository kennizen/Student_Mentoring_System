import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    adminAssignMentees,
    adminGetMentorMentee,
    adminRemoveMentees,
    adminSaveGroup,
} from "../../../../../actions/admin";

import MentorTile from "./MentorTile";
import SearchIcon from "../../../../../assets/icons/SearchIcon";
import AcademicCapIcon from "../../../../../assets/icons/AcademicCapIcon";
import MentorIcon from "../../../../../assets/icons/MentorIcon";
import { CSSTransition } from "react-transition-group";
import ModalOverlay from "../../../../modal/ModalOverlay";
import AssignModal from "./manageGroupModals/AssignModal";
import ViewModal from "./manageGroupModals/ViewModal";

const ManageGroups = () => {
    const dispatch = useDispatch();

    // accessing global state for fetching the list of mentors and mentees
    const {
        mentorMenteeDetails: { mentors, students },
    } = useSelector((state) => state.admin);

    // fetching mentor mentee details
    useEffect(() => {
        dispatch(adminGetMentorMentee());
    }, [dispatch]);

    // state variable to save the group state and send to the backend
    const [group, setGroup] = useState({
        mentorId: "",
        studentIds: [],
    });

    // state variables
    const [assignMentees, setAssignMentees] = useState([]);
    const [viewMentees, setViewMentees] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState(undefined);

    // states for modals
    const [showOverlay, setShowOverlay] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    // noderefs for modal
    const overlayRef = useRef(null);
    const assignModalRef = useRef(null);
    const viewModalRef = useRef(null);

    // function to handle assign
    const handleAssign = () => {
        let newMentees = [];
        newMentees = students.filter(
            (student) => student.mentoredBy === "" || student.mentoredBy === undefined
        );
        setAssignMentees(newMentees);
        setShowOverlay(true);
        setShowAssignModal(true);
    };

    // function to handle view
    const handleView = (mentorId) => {
        let newMentees = [];
        newMentees = students.filter(
            (student) =>
                student.mentoredBy !== undefined &&
                student.mentoredBy.toString() === mentorId.toString()
        );
        setViewMentees(newMentees);
        setShowOverlay(true);
        setShowViewModal(true);
    };

    // function to handle assign selection
    const handleSelection = (mid, sid) => {
        if (group.studentIds.includes(sid)) {
            let newGroup = group.studentIds.filter((id) => id !== sid.toString());
            setGroup({
                mentorId: mid,
                studentIds: newGroup,
            });
        } else {
            setGroup({
                mentorId: mid,
                studentIds: [...group.studentIds, sid],
            });
        }
    };

    // function to handle save group
    const handleAssignMentees = () => {
        dispatch(adminAssignMentees(group));
        setShowOverlay(false);
        setShowAssignModal(false);
        setGroup({
            mentorId: "",
            studentIds: [],
        });
    };

    // function to handle save group
    const handleRemoveMentees = () => {
        dispatch(adminRemoveMentees(group));
        setShowOverlay(false);
        setShowViewModal(false);
        setGroup({
            mentorId: "",
            studentIds: [],
        });
    };

    console.log("mentors in manage group", mentors);
    console.log("mentees in manage group", students);
    console.log("group in manage group", group);

    return (
        <div className="h-full w-full px-5 py-5 relative">
            <CSSTransition
                nodeRef={overlayRef}
                in={showOverlay}
                timeout={300}
                classNames="overlay"
                unmountOnExit
            >
                <ModalOverlay nodeRef={overlayRef} />
            </CSSTransition>
            <CSSTransition
                nodeRef={assignModalRef}
                in={showAssignModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <AssignModal
                    nodeRef={assignModalRef}
                    assignMentees={assignMentees}
                    setShowOverlay={setShowOverlay}
                    setShowAssignModal={setShowAssignModal}
                    selectedMentor={selectedMentor}
                    group={group}
                    handleSelection={handleSelection}
                    setGroup={setGroup}
                    handleAssignMentees={handleAssignMentees}
                />
            </CSSTransition>
            <CSSTransition
                nodeRef={viewModalRef}
                in={showViewModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <ViewModal
                    nodeRef={viewModalRef}
                    viewMentees={viewMentees}
                    setShowOverlay={setShowOverlay}
                    setShowViewModal={setShowViewModal}
                    selectedMentor={selectedMentor}
                    group={group}
                    handleSelection={handleSelection}
                    setGroup={setGroup}
                    handleRemoveMentees={handleRemoveMentees}
                />
            </CSSTransition>
            <div className="w-full p-3 rounded-md h-full">
                <div className="w-full mb-10 flex items-end justify-between">
                    <div className="flex items-end justify-start gap-x-4">
                        <h5 className="flex justify-start items-center p-5 bg-white shadow-sm rounded-md gap-x-4">
                            <div className="rounded-full p-3 bg-blue-100">
                                <MentorIcon alt={true} myStyle={"h-5 w-5 text-blue-600"} />
                            </div>
                            <div className="flex flex-col">
                                <h3>{mentors?.length}</h3>
                                <h5 className="text-gray-500">Total Mentors</h5>
                            </div>
                        </h5>
                        <h5 className="flex justify-start items-center p-5 bg-white shadow-sm rounded-md gap-x-4">
                            <div className="rounded-full p-3 bg-orange-100">
                                <AcademicCapIcon alt={true} myStyle={"text-orange-500 w-5 h-5"} />
                            </div>
                            <div className="flex flex-col">
                                <h3>{students?.length}</h3>
                                <h5 className="text-gray-500">Total Mentees</h5>
                            </div>
                        </h5>
                    </div>
                    <div className="flex justify-end items-end">
                        <div className="relative">
                            <input
                                //onChange={handleSearch}
                                type="text"
                                className="pl-11 rounded-md xl:w-96 border-0 shadow-sm"
                                placeholder="Search by department..."
                            />
                            <div className="absolute top-2.5 left-3">
                                <SearchIcon alt={true} myStyle={"h-5 w-5 mr-2"} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-4/5 overflow-y-auto pr-2 flex flex-wrap items-start justify-start gap-x-5 gap-y-3">
                    {mentors?.map((mentor) => {
                        return (
                            <MentorTile
                                key={mentor._id}
                                mentor={mentor}
                                handleAssign={handleAssign}
                                handleView={handleView}
                                setSelectedMentor={setSelectedMentor}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ManageGroups;
