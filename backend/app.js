const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const bodyParser = require("body-parser");

require('dotenv').config();

const employeesRouter = require('./routes/employeesRouter');
const adminRouter = require("./routes/adminRouter");
const departmentRouter = require("./routes/departmentRouter");
const employeeModel = require('./models/employee-model');

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true, 
}));


app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res) {
    res.send("welcome");
})

app.use('/employees', employeesRouter);
app.use('/admin', adminRouter);
app.use('/department', departmentRouter);


app.listen(8000);