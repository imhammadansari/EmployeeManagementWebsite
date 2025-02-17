import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

    const [name, setname] = useState("");
    const [logout, setlogout] = useState("");
    const navigate = useNavigate();
    

    axios.defaults.withCredentials = true;

const getName = async () => {
    try {
        const response = await axios.get(`https://employeemanagementwebsite.onrender.com/admin/getAdmin`);
        setname(response.data.admin);
    } catch (error) {
        console.error(error.response?.data || error.message);
    }
};

const adminLogout = async () => {
    try {
        const response = await axios.post("https://employeemanagementwebsite.onrender.com/admin/adminLogout");
        setlogout(response);

        if(response.status === 200){
            alert("You are Logged Out")
            navigate("/adminLogin")
          }
          else if(response.data === "No one is logged in"){
            alert("No one is logged in");
          }
      } catch (error) {
          console.error("Logout error:", error.response.data);
      }

}

useEffect (() => {
    getName();
}, []);


  return (
    <>
    <div className='w-full bg-black text-white justify-between h-11 flex items-center px-4 md:px-8'>
        <div className='text-white flex items-center gap-16 md:gap-40'>
            <h1 className='md:text-xl'>EMS</h1>
            <h1 className='text-sm md:text-base md:text-start'>Welcome, {name.name}</h1>
        </div>


        <div>
            <button className='text-sm md:text-base' onClick={adminLogout}>Logout</button>
        </div>

    </div>
    </>
    )
}

export default Header