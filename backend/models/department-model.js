const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/employeeManagementSystem');

const departmentSchema = mongoose.Schema({
    name: String,
})

module.exports = mongoose.model("departments", departmentSchema);
