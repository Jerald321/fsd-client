import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axios';


const Userdetails = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
    .get('/me', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      setName(response.data.username);
      setEmail(response.data.email);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        alert('Unauthorized: Please log in first.');
        navigate('/login');
      } else {
        console.error('Error fetching user info:', error);
        alert('An error occurred while fetching user info. Please try again.');
      }
    });
  }, [navigate]);
  

  const handleSignOut = () => {
    axiosInstance
      .post('/logout',{} ,{ withCredentials: true })
      .then((response) => {
        alert(response.data.message); // Logout Successful message
        navigate('/Login'); // Redirect to SignIn
      })
      .catch((error) => {
        console.error('Error during logout:', error);
        alert('An error occurred during logout. Please try again.');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">User Information</h1>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="text-gray-600">{name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-600">{email}</span>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Userdetails;