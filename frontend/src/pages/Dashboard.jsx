// src/pages/Dashboard.jsx
import React from "react";
import { useAppContext } from "../context/AppContext";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import InstructorDashboard from "../components/dashboard/InstructorDashboard";
import StudentDashboard from "../components/dashboard/StudentDashboard";

const Dashboard = () => {
  const { user } = useAppContext();

  if (!user)
    return <p className="text-center mt-20">Please login to continue</p>;

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        {user.role === "Admin" && <AdminDashboard />}
        {user.role === "Instructor" && <InstructorDashboard />}
        {user.role === "Student" && <StudentDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;
