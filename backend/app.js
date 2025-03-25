import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import path from "path";
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();

import employeesRouter from './routes/employeesRouter.js';
import adminRouter from "./routes/adminRouter.js";
import departmentRouter from "./routes/departmentRouter.js";
const __dirname = path.resolve();

app.use(cors({
    origin: "https://employeemanagement-c46a.onrender.com", 
    credentials: true
}));

const PORT = process.env.PORT || 8080;
const URL = process.env.MONGODB_URL;
const connectDb = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connect Successful")
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); 
    }
}

connectDb();

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(cookieParser());
app.use(bodyParser.json());


app.use('/employees', employeesRouter);
app.use('/admin', adminRouter);
app.use('/department', departmentRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
