import axios from 'axios';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/UserSlice';
import { AiOutlineLogout } from 'react-icons/ai';

const NavBar = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const User=useSelector((state)=>state?.user)

    useEffect(() => {
        if (User && User.name) {
          localStorage.setItem("userName", User.name);
        }
      }, [User]);
    
      const getUsername = localStorage.getItem("userName");
   // console.log(User)

    const handleLogout = async () => {
        try {
            
         
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/logout`);
            toast.error("Logout Successfully")

            dispatch(logout());
            localStorage.clear()
      
            navigation('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
      
        if (!token) {
            navigation('/login');
        }
    }, [navigation]);

    return (
        <div className="">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                   
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-indigo-600">Hi ! {getUsername}</h1>
                        </div>
                        <div className="">
                            <div className="flex space-x-4">
                              
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                   <span className="flex items-center">
                                   <AiOutlineLogout /> &nbsp;Logout
                      </span>
                                     
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
        </div>
    );
};

export default NavBar;
