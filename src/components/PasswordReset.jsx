import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [istokenVisible, SetistokenVisible] = useState(false)
  const [isPasswordVisible, SetisPasswordVisible] = useState(false)
  const handleGenerateResetLink = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post("https://token-8t63.onrender.com/api/v1/forgetpassword", { email:email });
      
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error sending reset link.");
    }
  };

  const handleResetPassword = async () => {
    if (!token || !newPassword) {
      alert("Please enter the token and the new password.");
      return;
    }

    try {
      const response = await axios.post("https://token-8t63.onrender.com/api/v1/setNewPassword", { token, newPassword });
      alert(response.data.message);
      await navigate('/Login');
      
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error resetting password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Password Reset</h1>

        {/* Email Input and Generate Link */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your email"
          />
          <button
            onClick={handleGenerateResetLink}
            className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Generate Reset Link
          </button>
        </div>

        {/* Token Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Token</label>
          <div className="flex justify-center items-center">
          <input
            type={istokenVisible?"text":"password"}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter the token you received"
          />
          <svg  onClick={() => SetistokenVisible(!istokenVisible)} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 relative right-5 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>

          </div>
          
          
        </div>

        {/* New Password Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">New Password</label>
          <div className="flex justify-center items-center">
          <input
            type={isPasswordVisible?"text":"password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your new password"
          />
          <svg  onClick={() => SetisPasswordVisible(!isPasswordVisible)} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 relative right-5 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>

          </div>
          
          <button
            onClick={handleResetPassword}
            className="w-full mt-2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;