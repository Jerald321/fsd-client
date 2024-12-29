
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import axiosInstance from './axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, SetisPasswordVisible] = useState(false);
  

  // Check for token on component load
  useEffect(() => {
    axios
      .get('https://token-8t63.onrender.com/api/v1/me',{}, { withCredentials: true })
      .then(() => {
        // If token is valid, redirect to userInfo
        navigate('/userdetails');
      })
      .catch((error) => {
        // If no token or token is invalid, do nothing
        if (error.response && error.response.status === 401) {
          console.log('No valid token found. Stay on Login.');
        } else {
          console.error('Error checking token:', error);
        }
      });
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === '') return alert('Please Enter Valid Email');
    if (password === '') return alert('Please Fill Password');

    axiosInstance 
      .post(
        '/login',
        { email, password },
        { withCredentials: true } // Include cookies in the request
      )
      .then((response) => {
        console.log('Login successful:', response.data.message);
        alert('Login Successful');
        navigate('/userdetails'); // Redirect to UserInfo page
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message); // Show backend error message
        } else {
          console.error('Login failed:', error);
          alert('An error occurred during login. Please try again.');
        }
      });
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    < >
      <section className="bg-gray-700">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                  
                    onChange={emailChange}
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 
                  required placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="flex justify-center items-center">
                  <input
                    type={isPasswordVisible?"text":"password"}
                    onChange={passwordChange}
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <svg  onClick={() => SetisPasswordVisible(!isPasswordVisible)} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 relative right-5 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>

                  </div>
                  
                </div>


                <div className='flex  justify-around '>
                <button
                  type="submit"
                  className="text-white text-xl   pb-4 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>
                <button 
                  type="submit"
                  className="text-white text-xl  pb-4  bg-blue-700
                   hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={()=>{navigate('/PasswordReset')}}>
                   Forget Password
                </button>
              

                </div>
         



                <div className="flex flex-col">
                  
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{' '}
                    <p
                      onClick={() => {
                        navigate('/register');
                      }}
                      className="hover:cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                     Create a new Account
                    </p>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
