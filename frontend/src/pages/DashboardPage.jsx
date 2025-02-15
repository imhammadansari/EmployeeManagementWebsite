import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import axios from 'axios';

function DashboardPage() {

  const [employees, setEmployees] = useState([]);
  const [departmentName, setdepartmentname] = useState([]);
  const [totalLeaves, settotalLeaves] = useState([]);
  const [pendingLeaves, setpendingLeaves] = useState([]);
  const [approvedLeaves, setapprovedLeaves] = useState([]);
  const [rejectedLeaves, setrejectedLeaves] = useState([]);
  

  axios.defaults.withCredentials = true;

  const getEmployees = async () => {
    try {
        const response = await axios.get("https://backend-hammad-ansaris-projects.vercel.app//employees/viewUsers");
        setEmployees(response.data.employee);
    } catch (error) {
        console.log(error.message);
    }
}

const getDepartment = async () => {
  try {
    const response = await axios.get('https://backend-hammad-ansaris-projects.vercel.app//department/viewDepartment');
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
}


useEffect(() => {
    getEmployees();
    getDepartment();

      const fetchData = async () => {
        try {
          const response = await axios.get("https://backend-hammad-ansaris-projects.vercel.app//employees/viewUsers");
          const allEmployees = response.data.employee;
          setEmployees(allEmployees);
    
          let totalLeavesCount = 0;
          let pendingCount = 0;
          let approvedCount = 0;
          let rejectedCount = 0;
    
          allEmployees.forEach(employee => {
            const leaveArray = employee.leave || [];
    
            totalLeavesCount += leaveArray.length;
    
            leaveArray.forEach(leave => {
              if (leave.status === 'Pending') pendingCount++;
              else if (leave.status === 'Approved') approvedCount++;
              else if (leave.status === 'Rejected') rejectedCount++;
            });
          });
    
          settotalLeaves(totalLeavesCount);
          setpendingLeaves(pendingCount);
          setapprovedLeaves(approvedCount);
          setrejectedLeaves(rejectedCount);
    
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };
    
      fetchData();
    }, []);
  

  return (

    <>
      <Header />
      <div className='flex bg-slate-200 h-full'>
        <div className='hidden md:block w-[17.3rem] bg-black text-white'>

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

        <div className='flex flex-col w-full mx-4 my-5'>

          <div>
            <h1 className='font-bold mb-4 md:text-2xl'>Dashboard Overview</h1>

            <h1 className='font-bold mb-4 text-xl'>Attendance</h1>

            <div className='flex flex-col gap-4 md:gap-0 md:flex-row md:items-center'>

              <div className='bg-white rounded w-[22rem] md:w-80 flex items-center'>

                <div className='bg-green-600 w-20 h-20 flex justify-center items-center rounded'>
                  <Link to='/viewAttendance' >
                    <img className='w-14' src='/attendance.png' />
                  </Link>
                </div>

                <div className='pl-2'>
                  <h1>View Attendance</h1>
                </div>
                </div>
                </div>

            <h1 className='font-bold mb-4 text-xl mt-10'>Employees</h1>

            <div className='flex flex-col gap-4 md:gap-0 md:flex-row md:items-center'>

              <div className='bg-white rounded w-[22rem] md:w-80 flex items-center'>

                <div className='bg-green-600 w-20 h-20 flex justify-center items-center rounded'>
                  <Link to='/viewEmployees' >
                    <img className='w-14' src='/totalEmp.png' />
                  </Link>
                </div>

                <div className='pl-2'>
                  <h1>Total Employees</h1>
                  <h1>{employees.length}</h1>
                </div>

              </div>

              <div className='bg-white md:ml-6 rounded w-[22rem] md:w-80 flex items-center'>

                <div className='bg-yellow-400 w-20 h-20 flex justify-center items-center rounded'>
                  <Link to='/addEmployee' >
                    <img className='w-14' src='/addEmp.png' />
                  </Link>
                </div>
                <div className='pl-2'>
                  <h1>Add Employees</h1>
                </div>

              </div>

              <div className='bg-white md:ml-6 rounded w-[22rem] md:w-80 flex items-center'>

                <div className='bg-red-600 w-20 h-20 flex justify-center items-center rounded'>
                  <Link to='/deleteEmployees' >
                    <img className='w-14' src='/deleteEmp.png' />
                  </Link>

                </div>
                <div className='pl-2'>
                  <h1>Delete Employees</h1>
                </div>

              </div>

            </div>

          </div>


          <div className='mt-10'>
            <h1 className='font-bold text-xl mb-4'>Departments</h1>

            <div className='flex flex-col md:flex-row gap-4 md:gap-0 md:items-center'>

              <div className='bg-white rounded w-[22rem] md:w-80 flex items-center'>

                <div className='bg-green-600 w-20 h-20 flex justify-center items-center rounded'>
                  <Link to='/viewDepartment' >
                    <img className='w-14' src='/viewDep.png' />
                  </Link>
                </div>

                <div className='pl-2'>
                  <h1>Total Departments</h1>
                  <h1>{departmentName.length}</h1>
                </div>

              </div>

              <div className='bg-white md:ml-6 rounded w-[22rem] md:w-80 flex items-center'>

                <div className='bg-yellow-400 w-20 h-20 flex justify-center items-center rounded'>
                  <Link to='/addDepartment' >
                    <img className='w-14' src='/adddepartment.png' />
                  </Link>
                </div>
                <div className='pl-2'>
                  <h1>Add Department</h1>
                </div>

              </div>

              <div className='bg-white md:ml-6 rounded w-[22rem] md:w-80 flex items-center'>

                <div className='bg-red-600 w-20 h-20 flex justify-center items-center rounded'>
                  <Link to='/deleteDepartment' >
                    <img className='w-14' src='/removeDep.png' />
                  </Link>

                </div>
                <div className='pl-2'>
                  <h1>Delete Department</h1>
                </div>

              </div>

            </div>
          </div>

          <div className='mt-10'>
            <h1 className='font-bold text-xl mb-4'>Leave Requests</h1>

            <div className='flex flex-col'>

              <div className='flex flex-col md:flex-row gap-4 md:gap-0'>

                <div className='bg-white rounded w-[22rem] md:w-[30.2rem] flex items-center'>

                  <div className='bg-green-600 w-20 h-20 flex justify-center items-center rounded'>
                    <Link to='/totalLeaveRequests' >
                      <img className='w-14' src='/leaveReq.png' />
                    </Link>

                  </div>
                  <div className='pl-2'>
                    <h1>Total Leaves</h1>
                    <h1>{totalLeaves}</h1>
                  </div>

                </div>

                <div className='bg-white rounded md:ml-10 w-[22rem] md:w-[30.2rem] flex items-center'>

                  <div className='bg-yellow-600 w-20 h-20 flex justify-center items-center rounded'>
                    <Link to='/pendingLeaves' >
                      <img className='w-14' src='/pendingReq.png' />
                    </Link>

                  </div>
                  <div className='pl-2'>
                    <h1>Pending Leaves</h1>
                    <h1>{pendingLeaves}</h1>
                  </div>

                </div>

              </div>

              <div className='flex flex-col md:flex-row gap-4 md:gap-0 mt-4'>

                <div className='bg-white rounded w-[22rem] md:w-[30.2rem] flex items-center'>

                  <div className='bg-blue-600 w-20 h-20 flex justify-center items-center rounded'>
                    <Link to='/approvedLeaveRequests' >
                      <img className='w-14' src='/approvedReq.png' />
                    </Link>

                  </div>
                  <div className='pl-2'>
                    <h1>Approved Leaves</h1>
                    <h1>{approvedLeaves}</h1>
                  </div>

                </div>

                <div className='bg-white rounded md:ml-10 w-[22rem] md:w-[30.2rem] flex items-center'>

                  <div className='bg-red-600 w-20 h-20 flex justify-center items-center rounded'>
                    <Link to='/rejectedLeaveRequests' >
                      <img className='w-14' src='/rejectReq.png' />
                    </Link>

                  </div>
                  <div className='pl-2'>
                    <h1>Rejected Leaves</h1>
                    <h1>{rejectedLeaves}</h1>
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

export default DashboardPage