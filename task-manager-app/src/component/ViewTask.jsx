import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

const ViewTask = ({ onClose }) => {

  const ViewTask=useSelector(state=>state.userTask.ViewTask)
 // console.log(ViewTask)

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-2xl font-bold mb-4">Task Details</h2>
        <p><strong>Title:</strong> {ViewTask.title}</p>
        <p><strong>Description:</strong> {ViewTask.description}</p>
        <p><strong>Due Date:</strong> {moment(ViewTask.dueDate).format("Do MMM YY")}</p>
        <p><strong>Status:</strong> <span className={`px-4 py-2  ${ViewTask.status === "Complete" ? "text-green-500 font-bold" : ""} ${ViewTask.status === "Pending" ? "text-red-500 font-bold" : ""} ${ViewTask.status === "In Progress" ? "text-yellow-500 font-bold" : ""}`}> {ViewTask.status}</span></p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewTask;
