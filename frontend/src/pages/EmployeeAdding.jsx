import axios from 'axios';
import React, { useState } from 'react';
import Header from '../Components/Header';
import { Link } from 'react-router-dom'


const EmployeeAdding = () => {

    const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [city, setcity] = useState("");
  const [password, setpassword] = useState("")
  const [country, setcountry] = useState("");
  const [gender, setgender] = useState("");
  const [designation, setdesignation] = useState("");
  const [department, setdepartment] = useState("");
  const [workinghours, setworkinghours] = useState("");
  const [salary, setsalary] = useState("")

  axios.defaults.withCredentials = true;

  const registerEmployee = async (e) => {
    e.preventDefault();

    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !phoneNumber ||
      !country ||
      !city ||
      !gender ||
      !designation ||
      !department ||
      !workinghours ||
      !salary
    ) {
      alert("Please fill out all details.");
      return;
    }

    try {
      const response = await axios.post("https://employeemanagementwebsite.onrender.com/employees/registerUser", {
        firstname,
        lastname,
        email,
        password,
        phoneNumber,
        country,
        city,
        gender,
        designation,
        department,
        workinghours,
        salary,
      });

      if (response.status === 200) {
        alert("Employee Created Successfully");
        setfirstname("");
        setlastname("");
        setcity("");
        setcountry("");
        setdepartment("");
        setdesignation("");
        setemail("");
        setgender("");
        setpassword("");
        setphoneNumber("");
        setsalary("");
        setworkinghours("");
      } else {
        alert("Something went wrong");
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
  };

  return (
    <>
      <Header />

      <div className='flex bg-slate-200 h-screen'>

        <div className='hidden md:block w-[14rem] bg-black text-white'>

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

        <div className='mx-6 md:mx-10 flex flex-col '>
          <h1 className='font-bold text-xl text-center mt-4 mb-3'>Add Employee</h1>
          <form onSubmit={registerEmployee} className='flex flex-col'>
            <div className='flex flex-col md:flex-row gap-6 md:gap-12 mb-4'>

              <div className='flex flex-col'>
                <h1>First Name</h1>
                <input value={firstname} onChange={(e) => {
                  setfirstname(e.target.value);
                }} className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]' name='firstname' type='text' placeholder='Enter First Name' />
              </div>

              <div>
                <h1>Last Name</h1>
                <input value={lastname} onChange={(e) => {
                  setlastname(e.target.value);
                }} className='bg-none border border-1 border-solid border-black border-opacity-30-15 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]' name='lastname' type='text' placeholder='Enter Last Name' />
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-6 md:gap-12 mb-4'>

            <div>
                <h1>Email</h1>
                <input value={email} onChange={(e) => {
                  setemail(e.target.value);
                }} className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]' name='email' type='text' placeholder='Enter Email' />
              </div>

              <div>
                <h1>Password</h1>
                <input value={password} onChange={(e) => {
                  setpassword(e.target.value);
                }} className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]' name='password' type='Password' placeholder='Enter Password' />
              </div>

            </div>

            <div className='flex flex-col md:flex-row gap-6 md:gap-12 mb-4'>
              <div>
                <h1>Country</h1>
                <input value={country} onChange={(e) => {
                  setcountry(e.target.value);
                }} className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]' name='country' type='text' placeholder='Enter Country' />
              </div>

              <div>
                <h1>City</h1>
                <input value={city} onChange={(e) => {
                  setcity(e.target.value);
                }} className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]' name='city' type='text' placeholder='Enter City' />
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-6 md:gap-12 mb-4'>

              <div>
                <h1>Gender</h1>
                <select value={gender} name='gender' onChange={(e) => {
                  setgender(e.target.value);
                }} className='border border-1 p-1 border-solid border-black border-opacity-30 w-[20rem] sm:w-[40rem] md:w-[30rem]'>
                  <option>select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div>
                <h1>Phone Number</h1>
                <input value={phoneNumber} onChange={(e) => {
                  setphoneNumber(e.target.value);
                }} className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]' name='phoneNumber' type='Number' placeholder='Enter Phone Number' />
              </div>

              
            </div>

            <div className='flex flex-col md:flex-row gap-6 md:gap-12 mb-4'>
              <div>
                <h1>Designation</h1>
                <input value={designation} onChange={(e) => {
                  setdesignation(e.target.value);
                }} className='border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]' name='designation' type='text' placeholder='Enter Designation' />
              </div>

              <div>
                <h1>Department</h1>
                <select value={department} onChange={(e) => {
                  setdepartment(e.target.value);
                }} className='border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]' name='department' type='text' placeholder='Enter Department' >
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

            <div className='flex flex-col md:flex-row gap-6 md:gap-12 mb-4'>
              <div>
                <h1>Working Hours</h1>
                <select value={workinghours} name='workinghours' onChange={(e) => {
                  setworkinghours(e.target.value);
                }} className='border border-1 border-solid p-1 border-black border-opacity-30 w-[20rem] sm:w-[40rem] md:w-[30rem]'>
                  <option>select</option>
                  <option>8:00AM - 4:00PM</option>
                  <option>4:00PM - 12:00AM</option>
                  <option>12:00AM - 8:00PM</option>
                </select>
              </div>

              <div>
                <h1>Salary</h1>
                <input value={salary} onChange={(e) => {
                  setsalary(e.target.value);
                }} className='border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]' name='salary' type='Number' placeholder='Enter Salary' />
              </div>
            </div>

            <div className='flex justify-center'>
              <button className='border border-1 border-solid border-black border-opacity-30-15 w-28 h-9' type='submit'>Add</button>
            </div>

          </form>
        </div>


      </div>
    </>
  )
}

export default EmployeeAdding