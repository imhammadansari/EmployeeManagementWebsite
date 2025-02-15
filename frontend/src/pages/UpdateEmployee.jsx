import axios from 'axios';
import React, { useState } from 'react';
import Header from '../Components/Header';
import { Link } from 'react-router-dom'


function UpdateEmployee() {
    const [employeeEmail, setEmployeeEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [gender, setGender] = useState("");
    const [designation, setDesignation] = useState("");
    const [department, setDepartment] = useState("");
    const [workingHours, setWorkingHours] = useState("");
    const [salary, setSalary] = useState("");

    axios.defaults.withCredentials = true;

    const findEmployee = async (e) => {
        e.preventDefault();

        if (!employeeEmail) {
            alert("Please enter the employee email.");
            return;
        }

        try {
            const response = await axios.get(`https://backend-hammad-ansaris-projects.vercel.app//employees/viewUsers/${employeeEmail}`);
            const employeeData = response.data.employee;

            if (employeeData) {

                setFirstname(employeeData.firstname);
                setLastname(employeeData.lastname);
                setEmail(employeeData.email);
                setPhoneNumber(employeeData.phoneNumber);
                setCountry(employeeData.country);
                setCity(employeeData.city);
                setGender(employeeData.gender);
                setDesignation(employeeData.designation);
                setDepartment(employeeData.department);
                setWorkingHours(employeeData.workinghours);
                setSalary(employeeData.salary);
            } else {
                alert("Employee not found.");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 500) {
                    alert("Admin Must be logged in")
                }
                else {
                    alert("Something went wrong");
                }
            }
            console.log(error.response?.data || error.message);
        }
    }

    const registerEmployee = async (e) => {
        e.preventDefault();
        if (!firstname || !lastname || !email || !phoneNumber || !country || !city || !gender || !designation || !department || !workingHours || !salary) {
            alert("Please fill out all details.");
            return;
        }

        try {
            const response = await axios.post('https://backend-hammad-ansaris-projects.vercel.app//employees/updateUsers', {
                firstname, lastname, email, phoneNumber, country, city, gender, designation, department, workingHours, salary
            });

            const status = response.status;

            if (status === 200) {
                alert("Employee updated successfully");
                setEmployeeEmail("");
                setFirstname("");
                setLastname("");
                setEmail("");
                setPhoneNumber("");
                setCountry("");
                setCity("");
                setGender("");
                setDesignation("");
                setDepartment("");
                setWorkingHours("");
                setSalary("");
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    return (
        <>
            <Header />
            <div className='flex h-full bg-slate-200'>
                <div className='hidden md:block w-1/6 bg-black text-white'>
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

                <div className='mx-6 md:mx-10 flex flex-col mt-4'>
                    <h1 className='font-bold text-xl text-center mb-3'>Update Employee</h1>

                    <form onSubmit={findEmployee} className='flex flex-col'>
                        <div className='flex flex-col'>
                            <h1>Employee Email</h1>
                            <div className='flex flex-col md:flex-row gap-4 md:gap-10'>
                                <input onChange={(e) => {
                                    setEmployeeEmail(e.target.value);
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

                    <form onSubmit={registerEmployee} className='flex flex-col mt-10'>
                        <div className='flex flex-col md:flex-row gap-4 md:gap-12 mb-4'>
                            <div className='flex flex-col'>
                                <h1>First Name</h1>
                                <input
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]'
                                    name='firstname'
                                    type='text'
                                    placeholder='Enter First Name'
                                />
                            </div>

                            <div>
                                <h1>Last Name</h1>
                                <input
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    className='bg-none border border-1 border-solid border-black border-opacity-30-15 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]'
                                    name='lastname'
                                    type='text'
                                    placeholder='Enter Last Name'
                                />
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-4 md:gap-12 mb-4'>
                            <div>
                                <h1>Phone Number</h1>
                                <input
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]'
                                    name='phoneNumber'
                                    type='number'
                                    placeholder='Enter Phone Number'
                                />
                            </div>

                            <div>
                                <h1>Email</h1>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]'
                                    name='email'
                                    type='email'
                                    placeholder='Enter Email'
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-4 md:gap-12 mb-4'>
                            <div>
                                <h1>Country</h1>
                                <input
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]'
                                    name='country'
                                    type='text'
                                    placeholder='Enter Country'
                                />
                            </div>

                            <div>
                                <h1>City</h1>
                                <input
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className='bg-none border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]'
                                    name='city'
                                    type='text'
                                    placeholder='Enter City'
                                />
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-4 md:gap-12 mb-4'>
                            <div>
                                <h1>Gender</h1>
                                <select
                                    name='gender'
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className='border border-1 p-1 border-solid border-black border-opacity-30 w-[20rem] sm:w-[40rem] md:w-[30rem]'>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-4 md:gap-12 mb-4'>
                            <div>
                                <h1>Designation</h1>
                                <input
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    className='border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]'
                                    name='designation'
                                    type='text'
                                    placeholder='Enter Designation'
                                />
                            </div>

                            <div>
                                <h1>Department</h1>
                                <input
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className='border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]'
                                    name='department'
                                    type='text'
                                    placeholder='Enter Department'
                                />
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-4 md:gap-12 mb-4'>
                            <div>
                                <h1>Working Hours</h1>
                                <select
                                    name='workinghours'
                                    value={workingHours}
                                    onChange={(e) => setWorkingHours(e.target.value)}
                                    className='border border-1 border-solid p-1 border-black border-opacity-30 w-[20rem] sm:w-[40rem] md:w-[30rem]'>
                                    <option value="">Select</option>
                                    <option value="8:00AM - 4:00PM">8:00AM - 4:00PM</option>
                                    <option value="4:00PM - 12:00AM">4:00PM - 12:00AM</option>
                                    <option value="12:00AM - 8:00PM">12:00AM - 8:00PM</option>
                                </select>
                            </div>

                            <div>
                                <h1>Salary</h1>
                                <input
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    className='border border-1 border-solid border-black border-opacity-30 p-1 w-[20rem] sm:w-[40rem] md:w-[30rem]'
                                    name='salary'
                                    type='number'
                                    placeholder='Enter Salary'
                                />
                            </div>
                        </div>

                        <div className='flex justify-center pb-6'>
                            <button className='border border-1 border-solid hover:border-none hover:bg-black hover:text-white border-black border-opacity-30-15 w-28 h-9' type='submit'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateEmployee;  