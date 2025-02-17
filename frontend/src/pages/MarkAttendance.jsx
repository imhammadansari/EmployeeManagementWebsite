import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeHeader from '../Components/EmployeeHeader';

const MarkAttendance = () => {
    const [attendanceMark, setattendanceMark] = useState("");
    const [date, setdate] = useState("");
    const [time, settime] = useState("");

    const initializeDateTime = () => {
        const now = new Date();
        setdate(now.toISOString().split('T')[0]);
        settime(now.toTimeString().split(' ')[0]);
    };

    useEffect(() => {
        initializeDateTime();
    }, []);

    axios.defaults.withCredentials = true;

    const markAttendance = async (e) => {
        e.preventDefault();

        if (!attendanceMark) {
          alert("Please fill out all details.");
          return;
        }

        try {
            const response = await axios.post(`https://employeemanagementwebsite.onrender.com/employees/markAttendance`, {
                attendanceMark,
                date,
                time,
            });

            if (response.status === 200) {
                alert("Attendance submitted successfully");
                setattendanceMark("");
                initializeDateTime();
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    alert("Attendance already marked");
                } else {
                    alert("Something Went Wrong: " + error.response.status);
                }
            }
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <>
            <EmployeeHeader />
            <div className='flex bg-slate-200 h-screen'>
                <div className='flex h-full'>
                    <div className='hidden md:block md:w-[15.2rem] md:bg-black bg-opacity-90 text-white'>
                        <div className='px-6'>
                            <Link to='/employeeDashboard'>
                                <h1 className='pb-4 mt-5 font-bold text-lg'>Dashboard</h1>
                            </Link>
                            <Link to='/viewProfile'>
                                <h1 className='py-1'>My Profile</h1>
                            </Link>
                            <Link to='/leaveRequest'>
                                <h1 className='py-1'>Apply Leave Request</h1>
                            </Link>
                            <Link to='/viewLeaveRequest'>
                                <h1 className='py-1'>View Leave History</h1>
                            </Link>
                            <Link to='/markAttendance'>
                                <h1 className='py-1'>Mark Attendance</h1>
                            </Link>
                        </div>
                    </div>
                    <div className='pl-7 sm:pl-8 md:pl-6 flex my-5 flex-col w-full'>
                        <h1 className='font-bold mb-3 md:text-2xl text-center'>Mark Attendance</h1>
                        <form onSubmit={markAttendance} className='flex flex-col'>
                            <div className='flex flex-col md:flex-row gap-2 sm:gap-4 md:gap-12 mb-4'>
                                <div className='flex flex-col'>
                                    <h1 className='text-md sm:text-base md:text-lg'>Attendance</h1>
                                    <select
                                        name='attendanceMark'
                                        value={attendanceMark}
                                        onChange={(e) => setattendanceMark(e.target.value)}
                                        className='border border-1 p-1 border-solid border-black border-opacity-30 w-[20rem] sm:w-[40rem] md:w-[30rem]'
                                    >
                                        <option value="">Select</option>
                                        <option>Present</option>
                                        <option>Absent</option>
                                    </select>
                                </div>
                                <div>
                                    <h1 className='text-md md:text-lg'>Date</h1>
                                    <input
                                        value={date}
                                        onChange={(e) => setdate(e.target.value)}
                                        className='bg-none border border-1 border-solid border-black border-opacity-30-15 p-1 w-80 sm:w-[39.5rem] md:w-[30rem]'
                                        name='date'
                                        type='date'
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-2 md:gap-12 mb-4'>
                                <div>
                                    <h1 className='text-md md:text-lg'>Time</h1>
                                    <input
                                        value={time}
                                        onChange={(e) => settime(e.target.value)}
                                        className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-80 sm:w-[39.5rem] md:w-[30rem]'
                                        name='time'
                                        type='time'
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <button
                                    className='border border-1 border-solid border-black border-opacity-30-15 w-28 h-9'
                                    type='submit'
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MarkAttendance;
