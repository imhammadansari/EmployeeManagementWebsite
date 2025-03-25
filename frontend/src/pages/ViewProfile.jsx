import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import EmployeeHeader from '../Components/EmployeeHeader';


const ViewProfile = () => {
  const [employee, setEmployee] = useState([]);

  axios.defaults.withCredentials = true;

  const getEmployee = async () => {
    try {
      const response = await axios.get('https://employeemanagement-c46a.onrender.com/employees/viewProfile');
      setEmployee(response.data.employee);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <>
      <EmployeeHeader />

      <div className="flex bg-slate-200 h-screen">
        <div className="hidden md:block w-[15.1rem] bg-black text-white ">
          <div className='px-6'>

            <Link to='/employeeDashboard' ><h1 className='pb-4 mt-5 font-bold text-lg'>Dashboard</h1></Link>
            <Link to='/viewProfile' ><h1 className='py-1'>My Profile</h1></Link>
            <Link to='/leaveRequest' ><h1 className='py-1'>Apply Leave Request</h1></Link>
            <Link to='/viewLeaveRequest' ><h1 className='py-1'>View Leave History</h1></Link>
            <Link to='/markAttendance' ><h1 className='py-1'>Mark Attendance</h1></Link>
            


          </div>
        </div>

        <div className="w-full px-6 my-4">
          <h1 className="md:text-2xl font-bold mb-4">Employee Profile</h1>

          <div className="bg-white p-6 shadow rounded-lg">
            {employee ? (
              <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                <div><strong>First Name:</strong> {employee.firstname}</div>
                <div><strong>Last Name:</strong> {employee.lastname}</div>
                <div><strong>Email:</strong> {employee.email}</div>
                <div><strong>Phone Number:</strong> {employee.phoneNumber}</div>
                <div><strong>Country:</strong> {employee.country}</div>
                <div><strong>City:</strong> {employee.city}</div>
                <div><strong>Gender:</strong> {employee.gender}</div>
                <div><strong>Designation:</strong> {employee.designation}</div>
                <div><strong>Department:</strong> {employee.department}</div>
                <div><strong>Working Hours:</strong> {employee.workinghours}</div>
                <div><strong>Salary:</strong> {employee.salary}</div>
              </div>
            ) : (
              <div>No Employee Found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProfile;
