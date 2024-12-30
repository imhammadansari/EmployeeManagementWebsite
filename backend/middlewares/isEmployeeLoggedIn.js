const jwt = require("jsonwebtoken");  
const employeeModel = require("../models/employee-model");  

module.exports = async function(req, res, next) {  
    if (!req.cookies.token) {  
        return res.status(401).send("Employee must be logged in!");  
    } else {  
        try {  
            const decoded = jwt.verify(req.cookies.token, process.env.EMPLOYEE_JWT_KEY);  
            
            const employee = await employeeModel.findOne({ email: decoded.email }).select("-password");  

            if (!employee) {  
                return res.status(404).send("Employee not found");  
            }  

            req.employee = employee;  

            next();  
        } catch (error) {  
            return res.status(401).send("Invalid token: " + error.message);  
        }  
    }  
}