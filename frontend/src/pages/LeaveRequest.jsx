import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeHeader from '../Components/EmployeeHeader';


const LeaveRequest = () => {

    const [leavetype, setleavetype] = useState("")
    const [department, setdepartment] = useState("")
    const [days, setdays] = useState("")
    const [status, setstatus] = useState("")
    const [comment, setcomment] = useState("")

    axios.defaults.withCredentials = true;
    const addLeave = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`https://employeemanagement-c46a.onrender.com/employees/leaveRequest`, {
                leavetype,
                department,
                days,
                status,
                comment
            })
            
            if(response.status === 200){
                alert("Request submitted successfully");
                setleavetype("");
                setdays("");
                setcomment("");
                setdepartment("");

            }
            else{
                alert("Something went wrong");

            }


        } catch (error) {
            console.log(error.response?.data || error.message);
        }
        
    }
  return (
    <>
    <EmployeeHeader />

    <div className='flex bg-slate-200 h-screen'>

    <div className='flex h-full'>

        <div className='hidden md:block md:w-[15.2rem] md:bg-black bg-opacity-90 text-white'>

        <div className='px-6'>
            
            <Link to='/employeeDashboard' ><h1 className='pb-4 mt-5 font-bold text-lg'>Dashboard</h1></Link>
            <Link to='/viewProfile' ><h1 className='py-1'>My Profile</h1></Link>
            <Link to='/leaveRequest' ><h1 className='py-1'>Apply Leave Request</h1></Link>
            <Link to='/viewLeaveRequest' ><h1 className='py-1'>View Leave History</h1></Link>
            <Link to='/markAttendance' ><h1 className='py-1'>Mark Attendance</h1></Link>
            
            
            
          </div>

        </div>

        <div className='pl-7 sm:pl-8 md:pl-6 flex my-5 flex-col w-full'>
          <h1 className='font-bold mb-3 md:text-2xl text-center'>Leave Request</h1>
          <form onSubmit={addLeave} className='flex flex-col'>
            <div className='flex flex-col md:flex-row gap-2 sm:gap-4 md:gap-12 mb-4'>

              <div className='flex flex-col'>
                <h1 className='text-md sm:text-base md:text-lg'>Leave Type</h1>
              <input onChange={(e) => {
                setleavetype(e.target.value);
              }} value={leavetype} className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-80 sm:w-[39.5rem] md:w-[30rem]' name='leavetype' type='text' placeholder='Enter Leave Type' />
              </div>

              <div>
                <h1 className='text-md md:text-lg'>Department</h1>
              <select value={department} onChange={(e) => {
                setdepartment(e.target.value);
              }} className='bg-none border border-1 border-solid border-black border-opacity-30-15 p-1 w-80 sm:w-[39.5rem] md:w-[30rem]' name='department' type='text' placeholder='Enter department' >
                <option>select</option>
                  <option>IT</option>
                  <option>HR</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Finance</option>
                  <option>Operations Management</option>
                  </select>
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-2 md:gap-12 mb-4'>
              <div>
                <h1 className='text-md md:text-lg'>Days</h1>
                <input value={days} onChange={(e) => {
                setdays(e.target.value);
              }} className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-80 sm:w-[39.5rem] md:w-[30rem]' name='days' type='Number' placeholder='Enter days ' />
              </div>

              <div>
                <h1 className='text-md md:text-lg'>Status</h1>
                <input value={"Pending"} onChange={(e) => {
                setstatus(e.target.value);
              }}  
              readOnly
                className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-80 sm:w-[39.5rem] md:w-[30rem]' name='status' type='text' placeholder='Enter status' />
              </div>

              </div>

              <div className='flex flex-col md:flex-row md:gap-12 mb-4'>

              <div className='flex flex-col'>
                <h1 className='text-md md:text-lg'>Comment</h1>
              <input value={comment} onChange={(e) => {
                setcomment(e.target.value);
              }} className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-80 sm:w-[39.5rem] md:w-[63rem]' name='comment' type='text' placeholder='Enter Comment' />
              </div>

            </div>

              

              <div className='flex justify-center'>
              <button className='border border-1 border-solid border-black border-opacity-30-15 w-28 h-9' type='submit'>Add</button>
            </div>
            
            
            </form>
        </div>
        </div>
        </div>
        
    </>
  )
}

export default LeaveRequest