import { Link, useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../Components/Header';

const UpdateAttendance = () => {
    const { attendanceId } = useParams();
    const [attendanceMark, setAttendanceMark] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAttendance = async () => {  
            try {  
                const response = await axios.get(`https://backend-hammad-ansaris-projects.vercel.app//employees/viewAttendanceById/${attendanceId}`);  
                const attendanceData = response.data.attendance;  
        
                if (attendanceData) {  
                    setAttendanceMark(attendanceData.attendanceMark);  
                    setDate(attendanceData.date);  
                    setTime(attendanceData.time);  
                } else {  
                    alert("Attendance not found.");  
                }  
            } catch (error) {  
                console.error("Error fetching attendance data:", error.response?.data || error.message);  
                alert("Error fetching attendance data.");  
            }  
        };

        fetchAttendance();
    }, [attendanceId]);

    const updateAttendance = async (e) => {
        e.preventDefault();
        if (!attendanceMark) {
            alert("Please fill out all details.");
            return;
        }

        try {
            const response = await axios.post(`https://backend-hammad-ansaris-projects.vercel.app//employees/updateAttendance/${attendanceId}`, {
                attendanceId, attendanceMark
            });
            console.log(response);
            alert("Attendance updated successfully!");
            navigate('/viewAttendance');
        } catch (error) {
            console.log(error.response?.data || error.message);
            alert("Error updating attendance.");
        }
    };

    return (
        <>
            <Header />
            <div className="flex h-screen bg-slate-200">

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

                <div className="mx-6 flex flex-col mt-4">
                    <h1 className="font-bold text-lg md:text-xl text-center mb-3">Update Attendance</h1>

                    <form onSubmit={updateAttendance} className="flex flex-col md:mt-10">
                        <div className="flex flex-col md:flex-row gap-4 md:gap-12 mb-4">
                            <div className="flex flex-col">
                                <h1>Attendance</h1>
                                <select
                                    name="attendanceMark"
                                    value={attendanceMark}
                                    onChange={(e) => setAttendanceMark(e.target.value)}
                                    className="border border-1 border-solid p-1 border-black border-opacity-30 w-[20rem] sm:w-[40rem] md:w-[30rem]"
                                >
                                    <option value="">Select</option>
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                </select>
                            </div>

                            <div>
                                <h1>Date</h1>
                                <input
                                    value={date}
                                    readOnly
                                    className="bg-none border border-1 border-solid border-black border-opacity-30-15 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]"
                                    name="date"
                                    type="date"
                                    placeholder="Enter Date"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 md:gap-12 mb-4">
                            <div>
                                <h1>Time</h1>
                                <input
                                    value={time}
                                    readOnly
                                    className="bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]"
                                    name="time"
                                    type="time"
                                    placeholder="Enter Time"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button className="border border-1 border-solid hover:border-none hover:bg-black hover:text-white border-black border-opacity-30-15 w-28 h-9" type="submit">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateAttendance;
