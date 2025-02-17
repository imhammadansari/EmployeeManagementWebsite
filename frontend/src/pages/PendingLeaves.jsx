import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';


const PendingLeaves = () => {
    const [employees, setEmployees] = useState([]);

    axios.defaults.withCredentials = true;

    const getEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:8000/employees/viewUsers");
            setEmployees(response.data.employee);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleApprove = async (employeeId, leaveId) => {
        try {
            const response = await axios.post("http://localhost:8000/employees/approveRejectLeave", {
                employeeId,
                leaveId,
                status: "Approved"
            });
            getEmployees();
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleReject = async (employeeId, leaveId) => {
        try {
            const response = await axios.post("http://localhost:8000/employees/approveRejectLeave", {
                employeeId,
                leaveId,
                status: "Rejected"
            });
            getEmployees();
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <>
            <Header />
            <div className='flex h-screen bg-slate-200'>
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
                    <h1 className='font-bold md:text-xl text-center mb-5'>Pending Leaves</h1>
                    <div className="grid md:pl-4 pl-4 border-t grid-cols-[2fr_2fr_2fr_2fr_2fr] md:grid-cols-[1.5fr_1.5fr_1.5fr_1fr_2.5fr,_1.5fr] font-bold border-black border-b">
                        <div className="text-xs md:text-base border-black border-r md:text-center">Employee Name</div>
                        <div className="text-xs md:text-base border-black border-r text-center">Leave Type</div>
                        <div className="text-xs md:text-base border-black border-r text-center">Department</div>
                        <div className="text-xs md:text-base border-black border-r text-center">Days</div>
                        <div className="hidden md:block text-sm md:text-base border-black border-r text-center">Comment</div>
                        <div className="text-xs md:text-base text-center">Status</div>
                    </div>

                    {employees?.map((employee) => (
                        employee.leave.filter((leaveItem) => leaveItem.status === 'Pending').map((leaveItem, index) => (
                            <div key={index} className="grid md:pl-4 pl-4 grid-cols-[2fr_2fr_2fr_2fr_2fr] md:grid-cols-[1.5fr_1.5fr_1.5fr_1fr_2.5fr,_1.5fr] border-black border-b">
                                <div className="text-xs md:text-base border-black border-r md:text-center">{`${employee.firstname} ${employee.lastname}`}</div>
                                <div className="text-xs md:text-base border-black border-r text-center">{leaveItem.leavetype}</div>
                                <div className="text-xs md:text-base text-center border-black border-r ">{employee.department}</div>
                                <div className="text-xs md:text-base border-black border-r text-center">{leaveItem.days}</div>
                                <div className="hidden md:block text-sm md:text-base border-black border-r text-center">{leaveItem.comment}</div>

                            
                                <div className='flex flex-col items-center my-1 md:my-2'>
                                    <button
                                        className='bg-green-600 w-14 h-7 text-xs md:text-base md:w-28 md:h-9 rounded-sm'
                                        onClick={() => handleApprove(employee._id, leaveItem._id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className='bg-red-600 mt-2 rounded-sm w-14 h-7 text-xs md:text-base md:w-28 md:h-9'
                                        onClick={() => handleReject(employee._id, leaveItem._id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    ))}
                </div>
            </div>
        </>
    );
}

export default PendingLeaves;
