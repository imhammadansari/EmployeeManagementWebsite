import axios from 'axios';
import React, { useState } from 'react';
import Header from '../Components/Header';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AttendanceView = () => {
    const [employeeEmail, setemployeeEmail] = useState("");
    const [attendance, setattendance] = useState([]);
    const { attendanceId } = useParams();
    const [deleteAttendance, setdeleteAttendance] = useState('');
    const navigate = useNavigate();

    const getAttendance = async (e) => {
        e.preventDefault();

        if (!employeeEmail) {
            alert("Email is required");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/employees/viewAttendance/${employeeEmail}`);
            setattendance(response.data.employee);
            console.log(response.data.employee);
        } catch (error) {
            alert("Error fetching attendance data.");
            console.error(error);
        }
    };

    const deleteAttend = async (attendanceId) => {
        try {
            const response = await axios.post(`http://localhost:8000/employees/deleteAttendance/${attendanceId}`);
            setdeleteAttendance(prevAttendance => {
                prevAttendance.filter(item => item._id !== attendanceId)
            });

            if (response.status === 200) {
                alert("Attendance deleted Successfully");

            }
        } catch (error) {
            console.log(error.response?.data || error.message);
            alert("Error updating attendance.");
        }
    }


    return (
        <>
            <Header />

            <div className='flex h-screen bg-slate-200'>
                <div className='hidden md:block w-1/6 bg-black text-white'>
                    <div className='px-6'>
                        <Link to='/adminDashboard'><h1 className='pb-4 mt-5 font-bold text-lg'>Dashboard</h1></Link>
                        <Link to='/viewAttendance'><h1 className='py-1'>Attendance</h1></Link>
                        <Link to='/viewEmployees'><h1 className='py-1'>Employees</h1></Link>
                        <Link to='/addEmployee'><h1 className='py-1'>Add Employee</h1></Link>
                        <Link to='/updateEmployees'><h1 className='py-1'>Update Employee</h1></Link>
                        <Link to='/deleteEmployees'><h1 className='py-1'>Remove Employee</h1></Link>

                        <div className='pt-4'>
                            <Link to='/viewDepartment'><h1 className='py-1'>Departments</h1></Link>
                            <Link to='/addDepartment'><h1 className='py-1'>Add Department</h1></Link>
                            <Link to='/deleteDepartment'><h1 className='py-1'>Remove Department</h1></Link>
                        </div>

                        <div className='pt-4'>
                            <Link to='/totalLeaveRequests'><h1 className='py-1'>Total Leaves</h1></Link>
                            <Link to='/pendingLeaves'><h1 className='py-1'>Pending Leaves</h1></Link>
                            <Link to='/approvedLeaveRequests'><h1 className='py-1'>Approved Leaves</h1></Link>
                            <Link to='/rejectedLeaveRequests'><h1 className='py-1'>Rejected Leaves</h1></Link>
                        </div>
                    </div>
                </div>

                <div className='mx-3 md:mx-6 flex flex-col mt-4'>
                    <h1 className='font-bold text-base md:text-xl text-center mb-3'>View Attendance</h1>

                    <form onSubmit={getAttendance} className='flex flex-col'>
                        <div className='flex flex-col'>
                            <h1>Employee Email</h1>
                            <div className='flex flex-col md:flex-row gap-4 md:gap-10'>
                                <input onChange={(e) => {
                                    setemployeeEmail(e.target.value);
                                }}
                                    className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]'
                                    name='employeeEmail'
                                    type='text'
                                    placeholder='Enter Employee Email'
                                />
                                <button
                                    className='border border-1 border-solid border-black hover:border-none hover:bg-black hover:text-white border-opacity-30-15 w-20 h-7 md:w-28 md:h-9'
                                    type='submit'>
                                    Find
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="w-full mt-6">
    <div className="grid border-t border-l grid-cols-[2.5fr_2.5fr_2.5fr_3fr] md:grid-cols-4 font-bold border-black border-b">
        <div className="text-xs md:w-[17rem] md:text-base md:text-center border-black border-r">Attendance</div>
        <div className="text-xs md:text-base md:w-[17rem] md:text-center border-black border-r">Date</div>
        <div className="text-xs md:text-base md:text-center md:w-[17rem] border-black border-r">Time</div>
        <div className="text-xs md:text-base md:text-center border-black md:w-[17rem] border-r">Decision</div>
    </div>

    {attendance?.map((items, itemsIndex) => (
        <div
            key={itemsIndex}
            className="grid grid-cols-[2.5fr_2.5fr_2.5fr_3fr] md:grid-cols-4 border-black border-b border-l"
        >
            <div className="text-xs md:w-[17rem] md:text-base md:text-center border-black border-r">{items.attendanceMark}</div>
            <div className="text-xs md:text-base md:w-[17rem] md:text-center border-black border-r">{items.date}</div>
            <div className="text-xs md:text-base md:text-center md:w-[17rem] border-black border-r">{items.time}</div>
            <div className="border-black border-r flex justify-center gap-1 md:gap-2 md:w-[17rem] items-center">
                <Link to={`/updateAttendance/${items._id}`}>
                    <button className="text-xs md:text-xs md:text-center my-1 p-1 w-12 md:w-24 bg-black text-white rounded">Update</button>
                </Link>
                <button
                    onClick={() => deleteAttend(items._id)}
                    className="text-xs md:text-xs md:text-center my-1 p-1 w-12 md:w-24 bg-red-600 text-white rounded">
                    Delete
                </button>
            </div>
        </div>
    ))}
</div>

                </div>
            </div>
        </>
    );
}

export default AttendanceView;