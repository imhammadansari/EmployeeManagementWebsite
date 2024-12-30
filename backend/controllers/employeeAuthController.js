const employeeModule = require("../models/employee-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports.registeredUser = async function (req, res) {  
    try {  
        let { firstname, lastname, email, password, phoneNumber, city, country, gender, designation, department, workinghours, salary } = req.body;  

        let employee = await employeeModule.findOne({email: email});  
        if (employee) return res.status(401).send("Employee already registered");  

        const salt = await bcrypt.genSalt(10);  
        const hash = await bcrypt.hash(password, salt);  

        employee = await employeeModule.create({  
            firstname,  
            lastname,  
            email,  
            password: hash,  
            phoneNumber,  
            city,  
            country,  
            gender,  
            designation,  
            department,  
            workinghours,  
            salary  
        });  
 
        res.status(200).send("Employee Created Successfully");  

    } catch (error) {  
        res.status(500).send({ error: error.message });  
    }  
}

module.exports.employeeLoggedin = async function(req, res) {
    try {
        let {email, password} = req.body;

        let employee = await employeeModule.findOne({email: email});
            if(!employee) return res.status(500).send("Email or Password incorrect!");

            bcrypt.compare(password, employee.password, function (error, result){
                if(result) {
                    const token = jwt.sign({ email: employee.email, _id: employee._id }, process.env.EMPLOYEE_JWT_KEY);

                    res.cookie("token", token);
                    res.send("employee Logged in Successfuly");
                }
                else{
                    res.status(500).send("Email or Password Incorrect!")
                }
            })
        
    } catch (error) {

        res.send(error.message)
        
    }
}

module.exports.viewUsers = async function (req, res) {
    try {

        let employee = await employeeModule.find();

        if(!employee) return res.status(500).send("No Employee Found");
        
        
        res.send({status: "ok", employee: employee});

    } catch (error) {
        if (!res.headersSent) { 
            res.status(500).send(error.message); 
        }    }
}

module.exports.viewUserByEmail = async function (req, res) {  
    try {  
        const email = req.params.email;  
        let employee = await employeeModule.findOne({ email });
        
        if (!employee) {  
            return res.status(404).send("Employee not found.");  
        }  
        
        res.send({ status: "ok", employee: employee });  
    } catch (error) {  
        res.status(500).send({ error: error.message });  
    }  
};

module.exports.ViewProfile = async function (req, res){
    try {

        const email = req.employee.email;

        const employee = await employeeModule.findOne({email});

        if(!employee) return res.status(401).send("No Employee Found");

        res.send({status: "ok", employee: employee})
    } catch (error) {
        res.status(500).send({ error: error.message });  

    }
}

module.exports.addLeave = async (req, res) => {
    try {
        const { leavetype, department, days, status, comment } = req.body;

        const email = req.employee.email;

        if(!email) return res.status(404).send("Email is required");

        const employee = await employeeModule.findOne({email});
        console.log(req.employee);



        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        employee.leave.push({ leavetype, department, days, comment });
        await employee.save();

        res.send({ status: "ok", message: "Leave submitted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error adding leave");
    }
}

module.exports.approveRejectLeave = async (req, res) => {
    try {
        const { employeeId, leaveId, status } = req.body;

        if (!employeeId || !leaveId || !status) {
            return res.status(400).send("Employee ID, Leave ID, and Status are required");
        }

        const employee = await employeeModule.findById(employeeId);
        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        const leaveRequest = employee.leave.id(leaveId);
        if (!leaveRequest) {
            return res.status(404).send("Leave request not found");
        }

        leaveRequest.status = status;
        await employee.save();

        res.send({ status: "ok", message: `Leave ${status} successfully` });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports.MarkAttendance = async function(req, res){
    try {
        const {attendanceMark, date, time} = req.body;

        const email = req.employee.email;

        if(!email) return res.status(503).send("Email is required!");

        const employee = await employeeModule.findOne({email});

        if(!employee) return res.status(501).send("User not found");

        const existingAttendance = await employeeModule.findOne({
            'attendance.date': date,
          });
      
          if (existingAttendance) {
            return res.status(400).send('Attendance for today is already marked.');
          }

        employee.attendance.push({attendanceMark, date, time});
        await employee.save();

        res.send({ status: "ok", message: "Attendance submitted successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports.ViewAttendance = async function (req, res){
    try {
        const employee = await employeeModule.find();

        if(!employee) return res.status(505).send("No Employees found");

        res.send({status: "ok", employee: employee});
    } catch (error) {
        res.status(500).send({ error: error.message });

    }
}

module.exports.viewAttendanceById = async function (req, res) {
    try {
        const { attendanceId } = req.params;

        const employee = await employeeModule.findOne({
            'attendance._id': attendanceId
        });

        if (!employee) {
            return res.status(404).send("Attendance not found.");
        }

        const attendance = employee.attendance.id(attendanceId);

        if (!attendance) {
            return res.status(404).send("Attendance record not found.");
        }

        res.send({ status: "ok", attendance });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


module.exports.ViewAttendanceByEmail = async function (req, res){
    try {
        const email = req.params.email;

        let employee = await employeeModule.findOne({email});

        if(!employee) return res.status(400).send("Employee not found");

        res.send({status: "ok", employee: employee.attendance});
    } catch (error) {
        res.status(500).send({ error: error.message });

    }
}

module.exports.UpdateAttendance = async function (req, res) {
    try {
        const { attendanceMark} = req.body;
        const { attendanceId } = req.params;

        if (!attendanceId) return res.status(501).send("AttendanceId are required to update the attendance");

        const updateAttendance = await employeeModule.findOneAndUpdate(
            { "attendance._id": attendanceId },
            {
                $set: {
                    "attendance.$.attendanceMark": attendanceMark,
                }
            },
            { new: true, runValidators: true }
        );

        if (!updateAttendance) return res.status(502).send("Attendance not found");

        res.send({ status: "ok", updateAttendance: updateAttendance });
        
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports.DeleteAttendance = async function (req, res){
    try {
        const {attendanceId} = req.params;

        if(!attendanceId) return res.status(501).send("AttendanceID is required to delete the Attendance");

        const deleteAttendance = await employeeModule.findOneAndUpdate({"attendance._id": attendanceId},
            { $pull: {attendance: {_id: attendanceId}}},
            {new: true}
        );

        if(!deleteAttendance) return res.status(502).send("Attendance does not found");

        res.send({status: "ok", deleteAttendance});
    } catch (error) {
        res.status(500).send({ error: error.message });

    }
}

module.exports.updateUsers = async function (req, res) {
    try {
        let {firstname, lastname, email, phoneNumber, city, country, gender, designation, department, workinghours, salary} = req.body;

        if(!email) return res.status(400).send("Email is required to update the details");

        const updatedUser = await employeeModule.findOneAndUpdate (
            {email},
            {firstname, lastname, phoneNumber, city, country, gender, designation, department, workinghours, salary},
            {new: true, runValidators: true}
        )

        if(!updatedUser) return res.status(400).send("Employee does not exist");

        res.send({status: "ok", updatedUser: updatedUser})

    } catch (error) {
        res.status(500).send({ error: error.message });
        
    }
}



module.exports.deleteUsers = async function(req, res) {
    try {
        let {email} = req.body;

        if(!email) return res.status(401).send("Email is required to Delete");

        const deletedUser = await employeeModule.findOneAndDelete({email});

        if(!deletedUser) return res.status(401).send("User does not exist");

        res.send(`Employee with ${email} has been deleted Successfully.`)

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports.EmployeeLogout =  async function (req, res) {
    try {
        if(req.cookies.token) {
            res.clearCookie("token");
            res.status(200).send("Employee logged out Successfuly");
        }
        else{
            res.status(500).send("Something is went wrong");
        }
    } catch (error) {
        return res.send(error.message);
    }
}