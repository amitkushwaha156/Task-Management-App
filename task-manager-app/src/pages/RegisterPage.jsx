



import axios from "axios";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigation = useNavigate();
  const PassEle = useRef();
  const NameEle = useRef();

  const EmailEle = useRef();

  const HandleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const name = NameEle.current.value;
    const email = EmailEle.current.value;
    const password = PassEle.current.value;

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/register`,
        { name,
          email,
          password,
        }
      );

      toast.success("Sign Up successful");
      navigation("/Login")
      // console.log("Sign Up successful", response.data);
    
   
    } catch (error) {
      // Handle error response
      if (error.response) {
        toast.error(error.response.data.msg); 
      } else {
        // console.error("Sign Up error:", error.message);
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Sign Up
          </h2>
          <form onSubmit={HandleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm text-gray-700">
               Name
              </label>
              <input
                id="name"
                type="text"
                ref={NameEle}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Enter your name"
                required
              />
            </div>
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
                required
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
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded-md mt-4 hover:bg-indigo-700"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600 text-sm">
            Back to {" "}
            <button className="text-blue-600 hover:underline" onClick={()=>navigation("/Login")}  >Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

