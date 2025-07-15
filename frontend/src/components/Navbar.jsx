import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const saved = localStorage.getItem("lmsUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("lmsUser");
    localStorage.removeItem("lmsToken");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
          LMS
        </h1>

        <div className="space-x-6 hidden md:flex items-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Contact
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full hover:scale-105 transform transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="focus:outline-none"
              >
                <FaUserCircle
                  size={28}
                  className="text-indigo-600 hover:text-indigo-800 transition"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-white border border-gray-200 rounded-xl shadow-lg transition-all duration-200 z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-semibold text-black">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <span className="text-xs text-gray-400 italic">
                      {user.role}
                    </span>
                  </div>

                  <ul className="py-2">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-indigo-50 text-gray-800"
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm hover:bg-indigo-50 text-gray-800"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
