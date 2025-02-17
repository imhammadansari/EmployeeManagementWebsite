import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const getLoginDetails = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://employeemanagementwebsite.onrender.com/admin/adminLogin", {
        email,
        password
      });

      if (response.status === 200) {
        navigate("/adminDashboard");
      } else {
        alert("Something Went Wrong");
      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 500) {
          alert("Email or Password Incorrect");
        } else {
          alert("Something Went Wrong: " + error.response.status);
        }
      } else {
        alert("Network Error: Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='h-screen w-full flex justify-center items-center bg-gradient-to-b from-black from-50% to-slate-100 to-50% md:space-y-6'>
      <div className='flex flex-col pt-4 items-center w-[21rem] md:w-[25rem] bg-white rounded-xl h-[20rem] md:h-[23rem]'>
        <h1 className='font-bold text-xl mb-4'>Admin Log in</h1>
        <form onSubmit={getLoginDetails} className='w-1/3 flex flex-col items-center'>
          <input className='border border-black w-72 md:w-[20rem] p-1 mb-2 md:my-3' type='email' name='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)}
            required />
          <input
            className='border border-black w-72 md:w-[20rem] p-1 mb-3'
            type='password'
            name='password'
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className='border border-black hover:bg-black hover:text-white w-28 h-9' type='submit'>Log In</button>
          <Link to='/home'>
            <button className='border border-black hover:bg-black hover:text-white w-28 h-9 mt-20' type='button'>Back to Home</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;