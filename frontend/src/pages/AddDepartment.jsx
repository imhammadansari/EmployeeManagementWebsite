import React, { useState } from 'react'
import Header from '../Components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom'



const AddDepartment = () => {

  const [name, setname] = useState("")

  const addDepartments = async (e) => {
    e.preventDefault();

    if (
      !name
    ) {
      alert("Please fill out all details.");
      return;
    }

    try {
      const response = await axios.post("https://employeemanagementwebsite.onrender.com/department/addDepartment", {
        name
      })

      if (response.status === 200) {
        alert("Department Created Sucessfully");
        setname('');
      }
      else if (response.status === 401) {
        alert("Department already exist")
      }
      else {
        alert("Something went wrong")
      }
    } catch (error) {
      if (error.response) {
          if (error.response.status === 500) {
              alert(error.response.data.message || "Admin must be logged in!");
          } else {
              alert("Something went wrong. Please try again.");
          }
      } else {
          alert("Something went wrong. Please check your connection.");
      }
      console.log(error.response?.data || error.message);

    }

  }
  return (
    <>
      <Header />

      <div className='flex bg-slate-200 h-screen'>

        <div className='hidden md:block w-[18.1rem] bg-black text-white'>

          <div className='px-6'>

            <Link to='/adminDashboard' ><h1 className='pb-4 mt-5 font-bold text-lg'>Dashboard</h1></Link>
            <Link to='/viewAttendance'><h1 className='py-1'>Attendance</h1></Link>
            <Link to='/viewEmployees' ><h1 className='py-1'>Employees</h1></Link>
            <Link to='/addEmployee' ><h1 className='py-1'>Add Employee</h1></Link>
            <Link to='/updateEmployees' ><h1 className='py-1'>Update Employee</h1></Link>
            <Link to='/deleteEmployees' ><h1 className='py-1'>Remove Employee</h1></Link>

            <div className='pt-4'>
              <Link to='/viewDepartment' ><h1 className='py-1'>Departments</h1></Link>
              <Link to='/addDepartment' ><h1 className='py-1'>Add Department</h1></Link>
              <Link to='/deleteDepartment' ><h1 className='py-1'>Remove Department</h1></Link>
            </div>

            <div className='pt-4'>
              <Link to='/totalLeaveRequests' ><h1 className='py-1'>Total Leaves</h1></Link>
              <Link to='/pendingLeaves' ><h1 className='py-1'>Pending Leaves</h1></Link>
              <Link to='/approvedLeaveRequests' ><h1 className='py-1'>Approved Leaves</h1></Link>
              <Link to='/rejectedLeaveRequests' ><h1 className='py-1'>Rejected Leaves</h1></Link>
            </div>


          </div>
        </div>


        <div className='md:mx-10 mx-6 w-full flex flex-col mt-5'>
          <h1 className='font-bold md:text-xl mb-3'>Add Department</h1>
          <form onSubmit={addDepartments} className='flex flex-col'>
            <div className='flex flex-row gap-6 md:gap-12 mb-4'>

              <div className='flex flex-col'>
                <h1>Department Name</h1>
                <div className='flex flex-col md:flex-row gap-3 md:gap-6'>
                <input value={name} onChange={(e) => {
                  setname(e.target.value);
                }} className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]' name='name' type='text' placeholder='Enter Department Name' />
                
                <button className='border border-1 border-solid border-black border-opacity-30-15 w-20 h-7 md:w-28 md:h-9' type='submit'>Add</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}

export default AddDepartment