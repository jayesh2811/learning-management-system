// import React, { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

// const roles = ["Student", "Instructor", "Admin"];

// const Auth = () => {
//   const location = useLocation();
//   const isLogin = location.pathname === "/login";
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [selectedRole, setSelectedRole] = useState("Student");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isLogin && password !== confirm) {
//       return toast.error("Passwords do not match");
//     }

//     // TODO: replace with real API call
//     const fakeResponse = {
//       success: true,
//       token: "sample_token",
//       user: { name: name || "User", email, role: selectedRole },
//     };

//     if (fakeResponse.success) {
//       localStorage.setItem("lmsUser", JSON.stringify(fakeResponse.user));
//       localStorage.setItem("lmsToken", fakeResponse.token);

//       toast.success(
//         isLogin
//           ? `Welcome back, ${fakeResponse.user.name}!`
//           : `Account created as ${selectedRole}`
//       );

//       setTimeout(() => navigate("/"), 1500);
//     } else {
//       toast.error("Something went wrong!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4">
//       <motion.div
//         initial={{ y: 30, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md p-8 border rounded-xl shadow-lg"
//       >
//         <h2 className="text-2xl font-bold text-center mb-6">
//           {isLogin ? "Login to Your Account" : "Create a New Account"}
//         </h2>

//         <div className="flex justify-center gap-4 mb-6">
//           {roles.map((role) => (
//             <button
//               key={role}
//               className={`border px-4 py-2 rounded-full text-sm ${
//                 selectedRole === role ? "bg-black text-white" : "bg-gray-100"
//               }`}
//               onClick={() => setSelectedRole(role)}
//               type="button"
//             >
//               {role}
//             </button>
//           ))}
//         </div>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {!isLogin && (
//             <div className="flex items-center border rounded px-3 py-2">
//               <FaUser className="mr-2 text-gray-500" />
//               <input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 type="text"
//                 placeholder="Name"
//                 className="w-full outline-none"
//                 required
//               />
//             </div>
//           )}

//           <div className="flex items-center border rounded px-3 py-2">
//             <FaEnvelope className="mr-2 text-gray-500" />
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               placeholder="Email"
//               className="w-full outline-none"
//               required
//             />
//           </div>

//           <div className="flex items-center border rounded px-3 py-2 relative">
//             <FaLock className="mr-2 text-gray-500" />
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className="w-full outline-none"
//               required
//             />
//             <span
//               className="absolute right-3 cursor-pointer text-gray-500"
//               onClick={() => setShowPassword((p) => !p)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>

//           {!isLogin && (
//             <div className="flex items-center border rounded px-3 py-2 relative">
//               <FaLock className="mr-2 text-gray-500" />
//               <input
//                 value={confirm}
//                 onChange={(e) => setConfirm(e.target.value)}
//                 type={showConfirm ? "text" : "password"}
//                 placeholder="Confirm Password"
//                 className="w-full outline-none"
//                 required
//               />
//               <span
//                 className="absolute right-3 cursor-pointer text-gray-500"
//                 onClick={() => setShowConfirm((p) => !p)}
//               >
//                 {showConfirm ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//           )}

//           {isLogin && (
//             <div className="text-right">
//               <Link
//                 to="/forgot-password"
//                 className="text-sm text-gray-500 hover:underline"
//               >
//                 Forgot Password?
//               </Link>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition"
//           >
//             {isLogin ? "Login" : "Sign Up"} as {selectedRole}
//           </button>
//         </form>

//         <p className="text-center text-sm mt-4 text-gray-600">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <Link
//             to={isLogin ? "/signup" : "/login"}
//             className="text-black cursor-pointer underline ml-1"
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Auth;

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { useAppContext } from "../context/AppContext";

const roles = ["Student", "Instructor", "Admin"];
const quotes = [
  "“Empower Your Career with IT Skills.”",
  "“Learn. Build. Succeed.”",
  "“Unlock Your Potential.”",
];

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { setUser, setToken } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = isLogin
      ? { email, password, role: selectedRole }
      : { name, email, password, role: selectedRole };

    if (!isLogin && password !== confirm) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await fetch(import.meta.env.VITE_API_BASE_URL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Something went wrong");

      if (isLogin) {
        // Admin, Student, or approved Instructor
        localStorage.setItem("lmsUser", JSON.stringify(data.user));
        localStorage.setItem("lmsToken", data.token);
        setUser(data.user);
        setToken(data.token);
        toast.success(`Welcome back, ${data.user.name}`);
        setTimeout(() => navigate("/"), 1000);
      } else {
        // For Instructor: wait for approval
        if (selectedRole === "Instructor") {
          toast.info("Registered. Please wait for admin approval.");
        } else {
          toast.success("Registered successfully!");
          localStorage.setItem("lmsUser", JSON.stringify(data.user));
          localStorage.setItem("lmsToken", data.token);
          setUser(data.user);
          setToken(data.token);
          setTimeout(() => navigate("/"), 1000);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* 🟪 Left Side with Typewriter */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-500 to-indigo-600 items-center justify-center p-8 rounded-l-2xl">
        <div className="text-white text-center space-y-6 max-w-md">
          <h1 className="text-4xl font-bold">
            <Typewriter
              words={quotes}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h1>
          <p className="text-pink-100">
            Join thousands of learners. Build, grow, and succeed with us.
          </p>
        </div>
      </div>

      {/* 🟦 Right Side with Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
            {isLogin ? "Login to Your Account" : "Create New Account"}
          </h2>

          {/* Role Selector */}
          <div className="flex justify-center gap-4 mb-6">
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedRole === role
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <InputField
                Icon={FaUser}
                type="text"
                placeholder="Name"
                value={name}
                onChange={setName}
              />
            )}

            <InputField
              Icon={FaEnvelope}
              type="email"
              placeholder="Email"
              value={email}
              onChange={setEmail}
            />

            <PasswordInput
              Icon={FaLock}
              placeholder="Password"
              value={password}
              onChange={setPassword}
              show={showPassword}
              toggle={() => setShowPassword((v) => !v)}
            />

            {!isLogin && (
              <PasswordInput
                Icon={FaLock}
                placeholder="Confirm Password"
                value={confirm}
                onChange={setConfirm}
                show={showConfirm}
                toggle={() => setShowConfirm((v) => !v)}
              />
            )}

            {isLogin && (
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            )}

            {/* Submit */}
            <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:opacity-90 transition">
              {isLogin ? "Login" : "Sign Up"} as {selectedRole}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              to={isLogin ? "/signup" : "/login"}
              className="text-indigo-600 hover:underline font-medium"
            >
              {isLogin ? "Sign Up" : "Login"}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// 🔸 Reusable Small Components
const InputField = ({ Icon, type, placeholder, value, onChange }) => (
  <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
    <Icon className="text-gray-500 mr-2" />
    <input
      type={type}
      placeholder={placeholder}
      className="w-full outline-none text-gray-700"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  </div>
);

const PasswordInput = ({
  Icon,
  placeholder,
  value,
  onChange,
  show,
  toggle,
}) => (
  <div className="relative flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
    <Icon className="text-gray-500 mr-2" />
    <input
      type={show ? "text" : "password"}
      placeholder={placeholder}
      className="w-full outline-none text-gray-700"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
    <span
      onClick={toggle}
      className="absolute right-3 cursor-pointer text-gray-500"
    >
      {show ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
);

export default Auth;
