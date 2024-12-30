import React from 'react'
import { Link } from 'react-router-dom'
import EmployeeHeader from '../Components/EmployeeHeader'

function EmployeeDashboardPage() {
  return (

    <>
      <EmployeeHeader />
      <div className='flex bg-slate-200 h-screen'>
        <div className='hidden md:block md:w-[15.5rem] md:h-full md:bg-black md:text-white'>

        <div className='px-6'>
                    
                    <Link to='/employeeDashboard' ><h1 className='pb-4 mt-5 font-bold text-lg'>Dashboard</h1></Link>
                    <Link to='/viewProfile' ><h1 className='py-1'>My Profile</h1></Link>
                    <Link to='/leaveRequest' ><h1 className='py-1'>Apply Leave Request</h1></Link>
                    <Link to='/viewLeaveRequest' ><h1 className='py-1'>View Leave History</h1></Link>
                    <Link to='/markAttendance' ><h1 className='py-1'>Mark Attendance</h1></Link>
                    
                    
                    
                  </div>

        </div>

        <div className='flex my-5 flex-col w-full mx-4 '>

          <div className='h-screen'>
            <h1 className='font-bold mb-4 md:text-2xl'>Dashboard Overview</h1>

            <div className='flex flex-col'>

              <div className='flex flex-col md:flex-row'>

                <div className='bg-white rounded mt-4 w-80 md:w-[32rem] flex items-center'>

                  <div className='bg-green-600 w-16 h-16 md:w-20 md:h-20 flex justify-center items-center rounded'>
                    <Link to='/leaveRequest' >
                      <img className='w-10 md:w-14' src='/leaveReq.png' />
                    </Link>

                  </div>
                  <div className='pl-2'>
                    <h1 className='text-sm md:text-lg'>Apply Leave</h1>
                  </div>

                </div>

                <div className='bg-white rounded mt-4 md:ml-10 w-80 md:w-[32rem] flex items-center'>

                  <div className='bg-yellow-600 w-16 h-16 md:w-20 md:h-20 flex justify-center items-center rounded'>
                    <Link to='/viewLeaveRequest' >
                      <img className='w-10 md:w-14' src='/pendingReq.png' />
                    </Link>

                  </div>
                  <div className='pl-2'>
                    <h1 className='text-sm md:text-lg'>View Leave History</h1>
                  </div>

                </div>

                <div className='bg-white rounded mt-4 md:hidden md:ml-10 w-80 md:w-[32rem] flex items-center'>

                  <div className='bg-yellow-600 w-16 h-16 md:w-20 md:h-20 flex justify-center items-center rounded'>
                    <Link to='/viewProfile' >
                      <img className='w-10 md:w-14' src='/pendingReq.png' />
                    </Link>

                  </div>
                  <div className='pl-2'>
                    <h1 className='text-sm md:text-lg'>View Profile</h1>
                  </div>

                </div>

              </div>

                </div>
                </div>
                </div>

      </div>
    </>
  )
}

export default EmployeeDashboardPage