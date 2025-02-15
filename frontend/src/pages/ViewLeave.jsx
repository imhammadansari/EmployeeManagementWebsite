import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeHeader from '../Components/EmployeeHeader';


const ViewLeave = () => {

  const [employee, setemployee] = useState([]);


  axios.defaults.withCredentials = true;

  const getEmployee = async () => {
    try {
      const response = await axios.get("https://backend-hammad-ansaris-projects.vercel.app//employees/viewProfile");

      setemployee(response.data.employee.leave);

    } catch (error) {
      console.log(error.message);

    }
  }

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <>
      <EmployeeHeader />

      <div className='flex bg-slate-200 h-screen'>

        <div className='hidden md:block w-[15rem] bg-black text-white'>

          <div className='px-6'>

            <Link to='/employeeDashboard' ><h1 className='pb-4 mt-5 font-bold text-lg'>Dashboard</h1></Link>
            <Link to='/viewProfile' ><h1 className='py-1'>My Profile</h1></Link>
            <Link to='/leaveRequest' ><h1 className='py-1'>Apply Leave Request</h1></Link>
            <Link to='/viewLeaveRequest' ><h1 className='py-1'>View Leave History</h1></Link>
            <Link to='/markAttendance' ><h1 className='py-1'>Mark Attendance</h1></Link>
            


          </div>

        </div>
        <div className="w-full my-5">
          <h1 className='font-bold md:text-xl text-center mb-5'>Leaves History</h1>

          <div
            className="border-black border-t grid-cols-[2fr_2fr_2fr_2fr_2fr] grid md:grid-cols-[1.5fr_1.5fr_1.5fr_1.5fr_1.5fr] font-bold border-b"
          >
            <div className="text-xs md:text-base border-black border-r text-center">Leave Type</div>
            <div className="text-xs md:text-base border-black border-r text-center">Department</div>
            <div className="text-xs md:text-base border-black border-r text-center">Days</div>
            <div className="text-xs md:text-base border-black border-r text-center">Comment</div>
            <div className="text-xs md:text-base text-center">Status</div>
          </div>

          {employee.map((items, itemsIndex) => (
            <div
              key={itemsIndex}
              className="grid-cols-[2fr_2fr_2fr_2fr_2fr] grid md:grid-cols-[1.5fr_1.5fr_1.5fr_1.5fr_1.5fr] border-black border-b"
            >
              <div className="text-xs md:text-base border-black border-r text-center">{items.leavetype}</div>
              <div className="text-xs md:text-base text-center border-black border-r ">{items.department}</div>
              <div className="text-xs md:text-base border-black border-r text-center">{items.days}</div>
              <div className="text-xs md:text-base border-black border-r text-center">{items.comment}</div>
              <div className="text-xs md:text-base text-center">{items.status}</div>
            </div>
          ))}


        </div>
      </div>

    </>
  )
}

export default ViewLeave