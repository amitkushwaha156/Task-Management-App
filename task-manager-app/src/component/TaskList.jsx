import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import AddEditTask from "./AddEditTask";
import ViewTask from "./ViewTask";
import toast from "react-hot-toast";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineInfoCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import NavBar from "./NavBar";

const TaskList = () => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const [statusFilter, setStatusFilter] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/tasks`,
        {
          params: { page: currentPage, limit },
        }
      );
      setTasks(response.data.tasks);
      setLoading(false);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const DeleteTask = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`);
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
      setLoading(false);
      toast.error("deleted task");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const applyFilter = () => {
    let filtered = tasks;

    if (statusFilter !== "All") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchTasks();
  }, [currentPage, limit]);

  useEffect(() => {
    applyFilter(); // Apply filter whenever tasks or filter changes
  }, [tasks, statusFilter, searchTerm]);

  const openModal = (task = null) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null); // Reset current task when modal closes
  };

  const handleRefresh = () => {
    fetchTasks(); // Fetch tasks again to update the list
  };

  const openViewModal = (task) => {
    setCurrentTask(task);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setCurrentTask(null);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <NavBar></NavBar>
        <h1 className="text-2xl font-bold text-center mb-4">Task List</h1>

        <div className="mb-4 md:flex md:items-center md:space-x-4">
          <div className="mb-2 md:mb-0">
            <button
              onClick={() => openModal()}
              className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 flex items-center"
            >
              <AiOutlinePlus className="mr-2" /> Add Task
            </button>
          </div>

          <div className="mb-2 md:mb-0 w-full md:w-1/3">
            <input
              type="text"
              className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by title or description"
              onChange={handleSearch}
            />
          </div>

          <div className="w-full md:w-1/4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="Complete">Complete</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
        </div>

        {isModalOpen && (
          <AddEditTask
            task={currentTask}
            onClose={closeModal}
            onRefresh={handleRefresh}
          />
        )}
        {isViewModalOpen && (
          <ViewTask task={currentTask} onClose={closeViewModal} />
        )}

        {loading ? (
          <div>
            <Skeleton height="20px" my="4" />
            <SkeletonText
              mt="5"
              noOfLines={10}
              spacing="7"
              skeletonHeight="2"
            />
          </div>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">SN</th>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Due Date</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-2 text-center border">
                      No data
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task, index) => (
                    <tr key={task._id}>
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{task.title}</td>
                      <td className="px-4 py-2 border">{task.description}</td>
                      <td className="px-4 py-2 border">
                        {moment(task.dueDate).format("Do MMM YY")}
                      </td>
                      <td
                        className={`px-4 py-2 border ${
                          task.status === "Complete"
                            ? "text-green-500 font-bold"
                            : ""
                        } ${
                          task.status === "Pending"
                            ? "text-red-500 font-bold"
                            : ""
                        } ${
                          task.status === "In Progress"
                            ? "text-yellow-500 font-bold"
                            : ""
                        }`}
                      >
                        {task.status}
                      </td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => openModal(task)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mx-1"
                        >
                          <span className="flex items-center">
                            <AiFillEdit /> &nbsp;Edit
                          </span>
                        </button>
                        <button
                          onClick={() => DeleteTask(task._id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mx-1"
                        >
                          <span className="flex items-center">
                            <AiFillDelete /> &nbsp;Delete
                          </span>
                        </button>
                        <button
                          onClick={() => openViewModal(task)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mx-1"
                        >
                          <span className="flex items-center">
                            <AiOutlineInfoCircle /> &nbsp;View
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <div className="mb-4">
            <label className="mr-2">Per page:</label>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value)); // Update limit
                setCurrentPage(1); // Reset to first page when limit changes
              }}
              className="border px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm">
              <li>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                      currentPage === index + 1
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-500 bg-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default TaskList;
