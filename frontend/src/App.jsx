import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ViewEmployee from "./pages/ViewEmployee";
import UpdateEmployee from "./pages/UpdateEmployee";
import DeleteEmployee from "./pages/DeleteEmployee";
import AddDepartment from "./pages/AddDepartment";
import ViewDepartment from "./pages/ViewDepartment";
import DeleteDepartment from "./pages/DeleteDepartment";
import LeaveRequest from "./pages/LeaveRequest";
import EmployeeLogin from "./pages/EmployeeLogin";
import ViewLeave from "./pages/ViewLeave";
import ApprovedLeaveRequests from "./pages/ApprovedLeaveRequests";
import RejectedLeaveRequests from "./pages/RejectedLeaveRequests";
import EmployeeDashboardPage from "./pages/EmployeeDashboardPage";
import ViewProfile from "./pages/ViewProfile";
import PendingLeaves from "./pages/PendingLeaves";
import TotalLeaveRequests from "./pages/TotalLeaveRequests";
import AdminLogin from "./pages/AdminLogin";
import HomePage from "./pages/HomePage";
import MarkAttendance from "./pages/MarkAttendance";
import AttendanceView from "./pages/AttendanceView";
import UpdateAttendance from "./pages/UpdateAttendance";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminDashboard" element={<DashboardPage />} />
        <Route path="/viewEmployees" element={<ViewEmployee />} />
        <Route path="/deleteEmployees" element={<DeleteEmployee />} />
        <Route path="/updateEmployees" element={<UpdateEmployee />} />
        <Route path="/addDepartment" element={<AddDepartment />} />
        <Route path="/viewDepartment" element={<ViewDepartment />} />
        <Route path="/deleteDepartment" element={<DeleteDepartment />} />
        <Route path="/leaveRequest" element={<LeaveRequest />} />
        <Route path="/employeeLogin" element={<EmployeeLogin />} />
        <Route path="/viewLeaveRequest" element={<ViewLeave />} />
        <Route path="/pendingLeaves" element={<PendingLeaves />} />
        <Route path="/approvedLeaveRequests" element={<ApprovedLeaveRequests />} />
        <Route path="/rejectedLeaveRequests" element={<RejectedLeaveRequests />} />
        <Route path="/employeeDashboard" element={<EmployeeDashboardPage />} />
        <Route path="/viewProfile" element={<ViewProfile />} />
        <Route path="/totalLeaveRequests" element={<TotalLeaveRequests />} />
        <Route path="/markAttendance" element={<MarkAttendance />} />
        <Route path="/viewAttendance" element={<AttendanceView />} />
        <Route path="/updateAttendance/:attendanceId" element={<UpdateAttendance />} />
        </Routes>
    </>
  );
}

export default App;
