import React, { useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddEditTask = ({ task, onClose, onRefresh }) => {
  const TitleEle = useRef();
  const DescriptionEle = useRef();
  const dueDateEle = useRef();
  const StatusEle = useRef();

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    
    if (dueDateEle.current) {
      dueDateEle.current.setAttribute('min', formattedDate);
    }
    if (task) {
      TitleEle.current.value = task.title;
      DescriptionEle.current.value = task.description;
      dueDateEle.current.value = task.dueDate.split("T")[0];
      StatusEle.current.value = task.status;
    } else {
  
      TitleEle.current.value = "";
      DescriptionEle.current.value = "";
      dueDateEle.current.value = "";
      StatusEle.current.value = "Pending"; 
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title: TitleEle.current.value,
      description: DescriptionEle.current.value,
      dueDate: dueDateEle.current.value,
      status: StatusEle.current.value,
    };

    try {
      if (task) {
        // Update task
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/tasks/${task._id}`, taskData);
        toast.success("Task updated successfully");
      } else {
        // Create new task
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks`, taskData);
        toast.success("Task created successfully");
      }
      onRefresh(); 
      onClose(); 
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Failed to save task");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">{task ? "Edit Task" : "Create Task"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              ref={TitleEle}
              className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg p-2 w-full"
              placeholder="Task Title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <textarea
              required
              rows="4" 
              ref={DescriptionEle}
              className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg p-2 w-full"
              placeholder="Task description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              ref={dueDateEle}
              className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
            <select
              ref={StatusEle}
              className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg p-2 w-full"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
            >
              {task ? "Update Task" : "Create Task"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditTask;
