import axios from "axios";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from 'react-redux';
import { setUser } from "../redux/UserSlice";

const LoginPage = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const PassEle = useRef();

  const EmailEle = useRef();

  const HandleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const email = EmailEle.current.value;
    const password = PassEle.current.value;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/login`,
        {
          email,
          password,
        }
      );

      toast.success("Login successfully");

      console.log( response.data.data);
      dispatch( setUser(response.data.data))

      navigation("/");
      if (response.data.success) {
        localStorage.setItem("token", response.data.token); // Save token
      }
    } catch (error) {
      // Handle error response
      if (error.response) {
        console.error("Login failed:", error.response.data);
        toast.error(error.response.data.message); // Adjust the message based on your API response
      } else {
        // Network error or request was not made
        console.error("Login error:", error.message);
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Login
          </h2>
          <form onSubmit={HandleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                ref={EmailEle}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Enter your email"
                required=""
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                ref={PassEle}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Enter your password"
                required=""
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-md mt-4 hover:bg-indigo-700"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <button className="text-indigo-600 hover:underline" onClick={()=>navigation("/Register")}  >Sign up</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
