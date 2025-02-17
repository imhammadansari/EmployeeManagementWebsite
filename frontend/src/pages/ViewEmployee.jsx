import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';

function ViewEmployee() {
  const [empDetails, setempDetails] = useState([]);

  const getEmployeeDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8000/employees/viewUsers');
      setempDetails(response.data.employee);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          alert("Admin must be logged in");
        }
        else {
          alert("Something went wrong");
        }
      }
      console.log(error.message);
    }
  };

  useEffect(() => {
    getEmployeeDetails();
  }, []);

  return (
    <>
      <Header />

      <div className="w-full py-5 bg-slate-200 h-screen">
        <div
          className="grid border-black border-t grid-cols-[1fr_1fr_1.5fr_0.5fr_2fr_0.5fr] md:grid-cols-[1fr_1fr_1.5fr_1fr_1fr_0.5fr_0.5fr_1.2fr_1fr_1.5fr_0.7fr] font-bold border-b"
        >
          <div className="text-xs md:text-base md:text-center border-black border-r">First Name</div>
          <div className="hidden md:block text-xs md:text-base md:text-center border-black border-r">Last Name</div>
          <div className="text-xs md:text-base md:text-center border-black border-r">Email</div>
          <div className="text-xs md:text-base md:text-center border-black border-r">Phone Number</div>
          <div className="hidden md:block text-xs md:text-base md:text-center border-black border-r">Country</div>
          <div className="text-xs md:text-base md:text-center border-black border-r">City</div>
          <div className="hidden md:block text-xs md:text-base md:text-center border-black border-r">Gender</div>
          <div className="hidden md:block text-xs md:text-base md:text-center border-black border-r">Designation</div>
          <div className="text-xs md:text-base md:text-center border-black border-r">Department</div>
          <div className="hidden md:block text-xs md:text-base md:text-center border-black border-r">Working Hours</div>
          <div className="text-xs md:text-base md:text-center">Salary</div>
        </div>

        {empDetails?.map((items, itemsIndex) => (
          <div
            key={itemsIndex}
            className="grid border-black border-top grid-cols-[1fr_1fr_1.5fr_0.5fr_2fr_0.5fr] md:grid-cols-[1fr_1fr_1.5fr_1fr_1fr_0.5fr_0.5fr_1.2fr_1fr_1.5fr_0.7fr] border-b"
          >
            <div className="text-xs md:text-md md:text-center border-black border-r">{items.firstname}</div>
            <div className="hidden md:block text-xs md:text-md md:text-center border-black border-r">{items.lastname}</div>
            <div className="text-xs md:text-md md:text-center border-black border-r">{items.email}</div>
            <div className="text-xs md:text-md md:text-center border-black border-r">{items.phoneNumber}</div>
            <div className="hidden md:block text-xs md:text-md md:text-center border-black border-r">{items.country}</div>
            <div className="text-xs md:text-md md:text-center border-black border-r">{items.city}</div>
            <div className="hidden md:block text-xs md:text-md md:text-center border-black border-r">{items.gender}</div>
            <div className="hidden md:block text-xs md:text-md md:text-center border-black border-r">{items.designation}</div>
            <div className="text-xs md:text-md md:text-center border-black border-r">{items.department}</div>
            <div className="hidden md:block text-xs md:text-md md:text-center border-black border-r">{items.workinghours}</div>
            <div className="text-xs md:text-md md:text-center">{items.salary}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewEmployee;
