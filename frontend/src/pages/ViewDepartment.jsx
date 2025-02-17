import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header';
import { Link } from 'react-router-dom'



const ViewDepartment = () => {

  const [departmentName, setdepartmentname] = useState([]);


  const getDepartment = async () => {
    try {
      const response = await axios.get('https://employeemanagementwebsite.onrender.com/department/viewDepartment');
      setdepartmentname(response.data.department);
    } catch (error) {
      //   if(error.response){
      //     if(error.response.status === 500){
      //       alert("Admin must be logged in");
      //     }
      //     else{
      //       alert("Something went wrong");
      //     }
      //   }
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDepartment();
  }, []);

  return (
    <>
      <Header />
      <div className='flex bg-slate-200 h-screen'>

        <div className='hidden md:block w-1/5 bg-black text-white'>

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
        <div className="w-full my-5">
          <div
            className="grid grid-cols-[1.5fr_1.5fr] font-bold border-b pb-2"
          >
            <div className="text-md md:text-base text-center">Department Id</div>
            <div className="text-md md:text-base text-center">Department Name</div>
          </div>

          {departmentName?.map((items, itemsIndex) => (
            <div
              key={itemsIndex}
              className="grid grid-cols-[1.5fr_1.5fr] border-b py-2"
            >
              <div className="text-xs md:text-base text-center">{items._id}</div>
              <div className="text-xs md:text-base text-center">{items.name}</div>
            </div>
          ))}


        </div>
      </div>
    </>
  )
}

export default ViewDepartment