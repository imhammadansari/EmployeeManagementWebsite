const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminModel = require("../models/admin-model");
const employeeModel = require("../models/employee-model");

module.exports.adminRegistered = async function (req, res) {
    try {
        let {name, email, password} = req.body;

        let admin = await adminModel.findOne({email: email})

        if(admin) return res.status(400).send("A account already exist, Please Login");

        bcrypt.genSalt(10, function (error, salt) {
            bcrypt.hash(password, salt, async function(error, hash) {

                if(error) return res.send(error.message);

                else{
                    let employee = await adminModel.create ({
                        name,
                        email,
                        password: hash,
                    })

                    let token = jwt.sign({email: employee.email, _id: employee._id}, process.env.ADMIN_JWT_KEY);

                    res.cookie("token", token);
                    res.status(200).send("User Created Successfully");
                }
            })
        })


    } catch (error) {
        res.status(500).send(error.message);

        
    }
}


module.exports.adminLoggedin = async function(req, res) {  
    try {  
        let { email, password } = req.body;  

        let admin = await adminModel.findOne({ email: email });  
        if (!admin) return res.status(500).send("Email or Password incorrect!");  

        bcrypt.compare(password, admin.password, async function(error, result) {  
            if (result) {  
                const token = jwt.sign({ email: admin.email, _id: admin._id }, process.env.ADMIN_JWT_KEY);  

                res.cookie("token", token);  
                res.send("Admin Logged in Successfully");  
            } else {  
                res.status(500).send("Email or Password Incorrect!");  
            }  
        });  
    } catch (error) {  
        res.status(501).send(error.message);  
    }  
}

module.exports.adminName = async function (req, res) {
    try {
        const email = req.admin.email
        const admin = await adminModel.findOne({email: email});

        if(!admin) return res.status(500).send("No admin Found");

        res.send({status: "ok", admin: admin})
    } catch (error) {
        res.status(501).send(error.message);  
    }
}

module.exports.adminLoggedOut =  async function (req, res) {
    try {
        if(req.cookies.token) {
            res.clearCookie("token");
            res.status(200).send("Admin logged out Successfuly");
        }
        else{
            res.status(500).send("Something is went wrong");
        }
    } catch (error) {
        return res.send(error.message);
    }
}


