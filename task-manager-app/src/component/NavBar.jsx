import axios from 'axios';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/UserSlice';

const NavBar = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const User=useSelector((state)=>state?.user)
   // console.log(User)

    const handleLogout = async () => {
        try {
            
            localStorage.removeItem('token');
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/logout`);
            toast.error("Logout Successfully")

            dispatch(logout());
      
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
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                   
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-indigo-600">Hi ! {User.name}</h1>
                        </div>
                        <div className="">
                            <div className="flex space-x-4">
                              
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
        </nav>
    );
};

export default NavBar;
