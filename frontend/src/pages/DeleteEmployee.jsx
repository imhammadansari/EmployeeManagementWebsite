import axios from 'axios';
import React, { useState } from 'react'
import Header from '../Components/Header';
import { Link } from 'react-router-dom'


const DeleteEmployee = () => {


    const [employeeEmail, setemployeeEmail] = useState("")

    axios.defaults.withCredentials = true;

    const deleteEmail = async (e) => {
        e.preventDefault();

        if (!employeeEmail) {
            alert("Email is required!");
        }

        try {
            const response = await axios.post(`https://employeemanagement-c46a.onrender.com/employees/deleteUsers`, {
                email: employeeEmail
            })

            if (response.status === 200) {
                alert(`Employee with the ${employeeEmail} has been deleted Successfully`);
                setemployeeEmail("");
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Something went wrong!")
                }
                else if (error.response.status === 500) {
                    alert("Admin Must be logged in");
                }
            }
            console.error(error.response || error.message);
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

                <div className='md:mx-10 mx-6 py-5 flex w-full flex-col'>
                    <div className='flex items-center'>
                    <h1 className='font-bold md:text-xl text-center mb-3'>Delete Employee</h1>
                    </div>

                    <form onSubmit={deleteEmail} className='flex flex-col'>
                        <div className='flex flex-col'>
                            <h1>Employee Email</h1>
                            <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
                                <input
                                    value={employeeEmail}

                                    onChange={(e) => {
                                        setemployeeEmail(e.target.value)
                                    }}
                                    className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-[21rem] sm:w-[40rem] md:w-[30rem]'
                                    name='employeeEmail'
                                    type='text'
                                    placeholder='Enter Employee Email'
                                />
                                <button
                                    className='border border-1 border-solid border-black hover:border-none hover:bg-black hover:text-white border-opacity-30-15 w-28 h-9'
                                    type='submit'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default DeleteEmployee