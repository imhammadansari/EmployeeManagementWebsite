import jwt from "jsonwebtoken";  
import adminModel from "../models/admin-model.js";  

export default async function(req, res, next) {  

    if (!req.cookies.token) {  
        return res.status(401).send("Admin must be logged in!");  
    }  
    
    try {  

        const decoded = jwt.verify(req.cookies.token, process.env.ADMIN_JWT_KEY);  


        const admin = await adminModel.findOne({ email: decoded.email }).select("-password");  


        if (!admin) {  
            return res.status(403).send("Admin not found or session expired.");  
        }  


        req.admin = admin;  

        next();   
    } catch (error) {  
        return res.status(401).send("Invalid token: " + error.message);  
    }  
};