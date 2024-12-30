import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const EmployeeHeader = () => {

    const [name, setname] = useState("");
    const [logout, setlogout] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const getEmployee = async () => {
        try {
          const response = await axios.get('http://localhost:8000/employees/viewProfile');
          setname(response.data.employee);
        } catch (error) {
          console.log(error.message);
        }
      };
    
const employeeLogout = async () => {
    try {
        const response = await axios.post("http://localhost:8000/employees/employeeLogout");
        setlogout(response);

        if(response.status === 200){
            alert("You are Logged Out")
            navigate("/employeeLogin")
          }
          else if(response.data === "No one is logged in"){
            alert("No one is logged in");
          }
      } catch (error) {
          console.error("Logout error:", error.response.data);
      }

}

useEffect(() => {
    getEmployee();
  }, []);
  return (
    <>
    <div className='w-full bg-black text-white justify-between h-11 flex items-center px-4 md:px-8'>
        <div className='text-white flex items-center gap-16 md:gap-40'>
            <h1 className='md:text-xl'>EMS</h1>
            <h1 className='md:text-start'>Welcome, {name.firstname}</h1>
        </div>


        <div>
            <button className='text-sm md:text-base' onClick={employeeLogout}>Logout</button>
        </div>

    </div>
    </>
    )
}

export default EmployeeHeader