// src/pages/Dashboard.jsx
import React from "react";
import { useAppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import InstructorDashboard from "../components/dashboard/InstructorDashboard";
import StudentDashboard from "../components/dashboard/StudentDashboard";

const Dashboard = () => {
  const { user } = useAppContext();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
            <p className="text-gray-600 mb-6">Please login to access your dashboard</p>
            <a
              href="/login"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium rounded-lg hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Login Now
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
              <h1 className="text-2xl font-bold text-white">
                Welcome back, {user.name}!
              </h1>
              <p className="text-purple-100 mt-1">
                {user.role} Dashboard
              </p>
            </div>
            <div className="p-6">
              {user.role === "Admin" && <AdminDashboard />}
              {user.role === "Instructor" && <InstructorDashboard />}
              {user.role === "Student" && <StudentDashboard />}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
