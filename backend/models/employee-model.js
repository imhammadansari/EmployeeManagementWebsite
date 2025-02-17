import mongoose from 'mongoose';

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

export default mongoose.model("employees", employeeSchema);
