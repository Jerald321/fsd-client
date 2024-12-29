import  { useState } from 'react';
import Validator from 'validator';
import { Navigate, useNavigate } from 'react-router-dom';

import axiosInstance from './axios';

const Register = () => {
    const navigate=useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnteredpassword, setReenterPassword] = useState('');
    const [terms,setTerms]=useState('close');
    const [validateEmail,setValidateEmail]=useState('false');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);
  
   
 
    const handleRegistration=(e)=>{
      e.preventDefault();
      if(name=='') return alert("The Name is required");
      if((email=='') || (validateEmail==false)) return alert("Please Enter Valid Email ID");
      if((password=='')||(password!=reEnteredpassword)) return alert("Pleasse Enter same password in both fields");

      axiosInstance
      .post("/register", { "username":name,"email": email,"password": password })

      .then((response) => {
        console.log("Registration successful:", response.data.message);
        alert("User Created Successfully. Now You can login with those credintials");
      })
      .then(()=>navigate('/Login'))
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.error); // Backend sends 'User already exists'
        } else {
          console.error("Registration failed:", error);
          alert("Registration failed:");
        }
      });
      


    }

    
    const handleNameChange=(e)=>{
        setName(e.target.value);
    }
    const handleEmailChange=(e)=>{
        setEmail(e.target.value)
        if (Validator.isEmail(e.target.value)) {
          setValidateEmail(Validator.isEmail(e.target.value))
      } else {
          setValidateEmail(false);
      }
      
    }
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }
    const handleReEntPasswordChange=(e)=>{
        setReenterPassword(e.target.value);
    }


   



  return (
    <div className="font-[sans-serif] bg-white relative left-[25%]  mx-auto md:h-screen p-4 gap-8">
        
        {terms=='open' ? (<>
            <div  className="max-h-full   flex-col fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md flex flex-col justify-between">
                <div>
                <p className='text-center font-bold mb-4'> Terms & Conditions </p>
                <ul className='list-decimal space-y-2'>
                    <li>This is an examplae app for Password Reset Flow</li>
                    <li>Here Don't share your important things</li>
                    <li>Don't use your app passwords. Instead store some unique passwords</li>
                </ul>
                </div>
                <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700" onClick={()=>setTerms('close')}>
          Close
        </button>

            </div>
            </div>
            
        </>):(<></>)}
     
      <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden max-w-4xl">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Welcome to our registration page! Get started by creating your account.</p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
          </div>
        </div>

        <form className="md:col-span-2 w-full py-6 px-6 sm:px-16" onSubmit={handleRegistration}>
          <div className="mb-6">
            <h3 className="text-gray-800 text-2xl font-bold">Create an account</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Name</label>
              <div className="flex items-center">
                <input name="name" value={name} onChange={handleNameChange} type="text" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter name"  />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 relative right-5" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
              <div className=" flex items-center">
                <input name="email" type="email" value={email} onChange={handleEmailChange} required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter email" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 relative right-5 " viewBox="0 0 682.667 682.667">
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                  </g>
                </svg>
              </div>
              {(validateEmail=='false'&& email!='') ? <><p className='text-red-500'>*Enter Valid Email</p></>:<></>}
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Enter Your Password</label>
              <div className=" flex items-center">
                <input name="password" type={isPasswordVisible?"text":"password"} value={password} onChange={handlePasswordChange} required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter password" />
                <svg onClick={() => setIsPasswordVisible(!isPasswordVisible)} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 relative right-5 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Re- Enter Your Password</label>
              <div className=" flex items-center">
                <input name="reenterPassword" type={isRePasswordVisible?"text":"password"} value={reEnteredpassword} onChange={handleReEntPasswordChange} required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter password" />
                <svg  onClick={() => setIsRePasswordVisible(!isRePasswordVisible)} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 relative right-5 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            {(reEnteredpassword == '' || reEnteredpassword==password)?<></>:<div className='text-red-500'>*Please Enter the same values in both the fields</div>}

            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                I accept the <span onClick={()=>setTerms('open')} className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</span>
              </label>
            </div>
          </div>

          <div className="!mt-12">
            <button type="submit" className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none">
              Create an account
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <span onClick={()=>{navigate('/Login')}} className="text-blue-600 font-semibold hover:underline hover:cursor-pointer ml-1">Login here</span></p>
        </form>
      </div>
    </div>
    
  )
}

export default Register