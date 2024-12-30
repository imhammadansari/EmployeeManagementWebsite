const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/employeeManagementSystem');

const employeeSchema = mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        phoneNumber: Number,
        country: String,
        city: String,
        gender: String,
        designation: String,
        department: String,
        workinghours: String,
        salary: Number,
        leave: [{
            leavetype: String,
            department: String,
            days: Number,
            status: {
                type: String,
                default: "Pending"
            },
            comment: String
        }],

        attendance: [{
            attendanceMark: {
                type: String
            },
            date: String,
            time: String
        }],

    }

)

module.exports = mongoose.model("employees", employeeSchema);