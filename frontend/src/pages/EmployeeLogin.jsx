import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
    const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const getLoginDetails = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://employeemanagement-c46a.onrender.com/employees/employeeLogin", {
        email: email,
        password: password
      });
      const status = response.status;
      if(status === 200){
        navigate("/employeeDashboard");
      }
      else {
        alert("Something Went Wrong");
      }

    } catch (error) {
      if(error.response){
        if(error.response.status === 500){
          alert("Email or Password Incorrect");
        }
        else{
          alert("Something went wrong: " + error.response.status)
        }
      }


    }

  }
  return (
    <>
    <div className='h-screen w-full flex justify-center items-center bg-gradient-to-b from-black from-50% to-slate-100 to-50% space-y-6'>
        <div className='flex flex-col pt-4 items-center w-[21rem] md:w-[25rem] bg-white rounded-xl h-[20rem] md:h-[23rem]'>
          <h1 className='font-bold text-xl mb-4'>Employee Log in</h1>

          <form onSubmit={getLoginDetails} className='w-1/3 flex flex-col items-center'>

            <input required className='border border-black w-72 md:w-[20rem] p-1 mb-2 md:my-3' type='text' name='email' placeholder='Enter your email' 
            onChange={(e) => {
              setemail(e.target.value)
            }} />
            <input required className='border border-black w-72 md:w-[20rem] p-1 mb-3' type='password' name='password' placeholder='Enter your password'
            onChange={(e) => {
              setpassword(e.target.value)
            }} />

            <button className='border border-black hover:bg-black hover:text-white w-28 h-9' type='submit'>Submit</button>
            <div className='flex flex-col gap-4 pt-2 md:pt-4 text-xs md:text-sm text-black items-center justify-center'>
              <p>email: hammad@example.com</p>
              <p>password: 12345</p>
            </div>
            <Link to='/home'>
            <button className='border border-black hover:bg-black hover:text-white w-28 h-9 mt-20' type='submit'>Back to Home</button>
            </Link>
          </form>
        </div>

    </div>
    </>
  )
}

export default EmployeeLogin