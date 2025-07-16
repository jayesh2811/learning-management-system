// // src/components/dashboard/AdminDashboard.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import DashboardChart from "./DashboardChart";
// import Section from "./Section";
// import ListTable from "./ListTable";
// import { useAppContext } from "../../context/AppContext";
// import { toast } from "react-toastify";

// const AdminDashboard = () => {
//   const { backendUrl, token } = useAppContext();
//   const [students, setStudents] = useState([]);
//   const [instructors, setInstructors] = useState([]);
//   const [pendingInstructors, setPendingInstructors] = useState([]);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const [newName, setNewName] = useState("");
//   const [newEmail, setNewEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [newConfirm, setNewConfirm] = useState("");

//   const [batchName, setBatchName] = useState("");
//   const [batchInstructor, setBatchInstructor] = useState("");
//   const [selectedStudents, setSelectedStudents] = useState([]);

//   const [batches, setBatches] = useState([]);

//   const fetchData = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/admin/users`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudents(res.data.students || []);
//       setInstructors(res.data.instructors || []);
//       setPendingInstructors(res.data.pendingInstructors || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load admin data");
//     }
//   };

//   const handleApprove = async (id) => {
//     try {
//       await axios.patch(
//         `${backendUrl}/admin/instructor/${id}/approve`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success("Instructor approved");
//       fetchData();
//     } catch (err) {
//       toast.error("Failed to approve instructor");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${backendUrl}/admin/instructor/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Instructor deleted");
//       fetchData();
//     } catch (err) {
//       toast.error("Failed to delete instructor");
//     }
//   };

//   const handleCreateInstructor = async (e) => {
//     e.preventDefault();

//     if (!newName || !newEmail || !newPassword || !newConfirm) {
//       return toast.error("All fields are required.");
//     }

//     if (newPassword !== newConfirm) {
//       return toast.error("Passwords do not match.");
//     }

//     try {
//       const res = await axios.post(
//         `${backendUrl}/admin/create-instructor`,
//         {
//           name: newName,
//           email: newEmail,
//           password: newPassword,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       toast.success("Instructor created successfully!");
//       fetchData();

//       setNewName("");
//       setNewEmail("");
//       setNewPassword("");
//       setNewConfirm("");
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Error creating instructor.");
//     }
//   };

//   const fetchBatches = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/admin/batches`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBatches(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch batches");
//     }
//   };

//   const handleDeleteBatch = async (id) => {
//     try {
//       await axios.delete(`${backendUrl}/admin/batch/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Batch deleted");
//       fetchBatches();
//     } catch (err) {
//       toast.error("Error deleting batch");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchBatches();
//   }, []);

//   const adminChartData = [
//     { name: "Instructors", count: instructors.length },
//     { name: "Students", count: students.length },
//   ];

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-indigo-700">👨‍💼 Admin Dashboard</h2>

//       <DashboardChart
//         title="Users Overview"
//         data={adminChartData}
//         dataKey="count"
//       />

//       <Section title="All Instructors">
//         <ListTable data={instructors} />
//       </Section>

//       <Section title="All Students">
//         <ListTable data={students} />
//       </Section>

//       <Section title="All Batches">
//         <table className="w-full border rounded text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2">Batch Name</th>
//               <th className="p-2">Instructor</th>
//               <th className="p-2">Students</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {batches.map((batch) => (
//               <tr key={batch._id} className="border-t hover:bg-gray-50">
//                 <td className="p-2">{batch.name}</td>
//                 <td className="p-2">{batch.instructor?.name}</td>
//                 <td className="p-2">{batch.students?.length}</td>
//                 <td className="p-2 space-x-2">
//                   <button
//                     onClick={() => openEditModal(batch)}
//                     className="px-2 py-1 text-white bg-blue-500 rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDeleteBatch(batch._id)}
//                     className="px-2 py-1 text-white bg-red-500 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Section>

//       <Section title="Instructor Approval Requests">
//         {pendingInstructors.length === 0 ? (
//           <p>No pending requests</p>
//         ) : (
//           <table className="w-full border rounded">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-2 text-left">Name</th>
//                 <th className="p-2 text-left">Email</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pendingInstructors.map((instr) => (
//                 <tr key={instr._id} className="border-t">
//                   <td className="p-2">{instr.name}</td>
//                   <td className="p-2">{instr.email}</td>
//                   <td className="p-2 space-x-2 text-center">
//                     <button
//                       onClick={() => handleApprove(instr._id)}
//                       className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleDelete(instr._id)}
//                       className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </Section>

//       <Section title="Create Instructor">
//         <form onSubmit={handleCreateInstructor} className="space-y-3">
//           <input
//             type="text"
//             placeholder="Name"
//             className="w-full border p-2 rounded"
//             value={newName}
//             onChange={(e) => setNewName(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full border p-2 rounded"
//             value={newEmail}
//             onChange={(e) => setNewEmail(e.target.value)}
//           />
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className="w-full border p-2 rounded pr-10"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//           <div className="relative">
//             <input
//               type={showConfirm ? "text" : "password"}
//               placeholder="Confirm Password"
//               className="w-full border p-2 rounded pr-10"
//               value={newConfirm}
//               onChange={(e) => setNewConfirm(e.target.value)}
//             />
//             <span
//               onClick={() => setShowConfirm(!showConfirm)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
//             >
//               {showConfirm ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//           <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
//             Create Instructor
//           </button>
//         </form>

//         <Section title="Create Batch">
//           <form
//             onSubmit={async (e) => {
//               e.preventDefault();
//               if (!batchName || !batchInstructor)
//                 return toast.error("All fields required");

//               try {
//                 await axios.post(
//                   `${backendUrl}/admin/create-batch`,
//                   {
//                     name: batchName,
//                     instructorId: batchInstructor,
//                     studentIds: selectedStudents,
//                   },
//                   { headers: { Authorization: `Bearer ${token}` } }
//                 );

//                 toast.success("Batch created successfully");
//                 setBatchName("");
//                 setBatchInstructor("");
//                 setSelectedStudents([]);
//               } catch (err) {
//                 console.error(err);
//                 toast.error("Failed to create batch");
//               }
//             }}
//             className="space-y-3"
//           >
//             <input
//               type="text"
//               placeholder="Batch Name"
//               className="w-full border p-2 rounded"
//               value={batchName}
//               onChange={(e) => setBatchName(e.target.value)}
//             />

//             <select
//               className="w-full border p-2 rounded"
//               value={batchInstructor}
//               onChange={(e) => setBatchInstructor(e.target.value)}
//             >
//               <option value="">Select Instructor</option>
//               {instructors.map((instr) => (
//                 <option key={instr._id} value={instr._id}>
//                   {instr.name}
//                 </option>
//               ))}
//             </select>

//             <label className="block text-sm font-medium">Select Students</label>
//             <div className="max-h-40 overflow-y-auto border rounded p-2">
//               {students.map((stu) => (
//                 <label key={stu._id} className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     checked={selectedStudents.includes(stu._id)}
//                     onChange={() => {
//                       setSelectedStudents((prev) =>
//                         prev.includes(stu._id)
//                           ? prev.filter((id) => id !== stu._id)
//                           : [...prev, stu._id]
//                       );
//                     }}
//                   />
//                   <span>{stu.name}</span>
//                 </label>
//               ))}
//             </div>

//             <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
//               Create Batch
//             </button>
//           </form>
//         </Section>
//       </Section>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import DashboardChart from "./DashboardChart";
// import Section from "./Section";
// import ListTable from "./ListTable";
// import { useAppContext } from "../../context/AppContext";
// import { toast } from "react-toastify";

// const AdminDashboard = () => {
//   const { backendUrl, token } = useAppContext();

//   const [students, setStudents] = useState([]);
//   const [instructors, setInstructors] = useState([]);
//   const [pendingInstructors, setPendingInstructors] = useState([]);
//   const [batches, setBatches] = useState([]);

//   const [newName, setNewName] = useState("");
//   const [newEmail, setNewEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [newConfirm, setNewConfirm] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const [batchName, setBatchName] = useState("");
//   const [batchInstructor, setBatchInstructor] = useState("");
//   const [selectedStudents, setSelectedStudents] = useState([]);

//   const [editBatchId, setEditBatchId] = useState(null);

//   const fetchData = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/admin/users`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudents(res.data.students || []);
//       setInstructors(res.data.instructors || []);
//       setPendingInstructors(res.data.pendingInstructors || []);
//     } catch (err) {
//       toast.error("Failed to load users");
//     }
//   };

//   const fetchBatches = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/admin/batches`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBatches(res.data.batches || []);
//     } catch (err) {
//       toast.error("Failed to fetch batches");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchBatches();
//   }, []);

//   const handleApprove = async (id) => {
//     try {
//       await axios.patch(
//         `${backendUrl}/admin/instructor/${id}/approve`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success("Instructor approved");
//       fetchData();
//     } catch {
//       toast.error("Approval failed");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${backendUrl}/admin/instructor/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Instructor deleted");
//       fetchData();
//     } catch {
//       toast.error("Deletion failed");
//     }
//   };

//   const handleDeleteBatch = async (id) => {
//     try {
//       await axios.delete(`${backendUrl}/admin/batch/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Batch deleted");
//       fetchBatches();
//     } catch {
//       toast.error("Batch deletion failed");
//     }
//   };

//   const handleCreateInstructor = async (e) => {
//     e.preventDefault();
//     if (!newName || !newEmail || !newPassword || !newConfirm)
//       return toast.error("All fields are required.");
//     if (newPassword !== newConfirm)
//       return toast.error("Passwords do not match.");

//     try {
//       await axios.post(
//         `${backendUrl}/admin/create-instructor`,
//         { name: newName, email: newEmail, password: newPassword },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Instructor created");
//       setNewName("");
//       setNewEmail("");
//       setNewPassword("");
//       setNewConfirm("");
//       fetchData();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error creating instructor");
//     }
//   };

//   const handleSubmitBatch = async (e) => {
//     e.preventDefault();
//     if (!batchName || !batchInstructor)
//       return toast.error("Name and instructor required");

//     try {
//       if (editBatchId) {
//         await axios.put(
//           `${backendUrl}/admin/batch/${editBatchId}`,
//           {
//             name: batchName,
//             instructorId: batchInstructor,
//             studentIds: selectedStudents,
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         toast.success("Batch updated");
//       } else {
//         await axios.post(
//           `${backendUrl}/admin/create-batch`,
//           {
//             name: batchName,
//             instructorId: batchInstructor,
//             studentIds: selectedStudents,
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         toast.success("Batch created");
//       }

//       setBatchName("");
//       setBatchInstructor("");
//       setSelectedStudents([]);
//       setEditBatchId(null);
//       fetchBatches();
//     } catch (err) {
//       toast.error("Batch save failed");
//     }
//   };

//   const openEditModal = (batch) => {
//     setEditBatchId(batch._id);
//     setBatchName(batch.name);
//     setBatchInstructor(batch.instructor?._id);
//     setSelectedStudents(batch.students?.map((s) => s._id) || []);
//   };

//   const adminChartData = [
//     { name: "Instructors", count: instructors.length },
//     { name: "Students", count: students.length },
//   ];

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-indigo-700">👨‍💼 Admin Dashboard</h2>

//       <DashboardChart
//         title="Users Overview"
//         data={adminChartData}
//         dataKey="count"
//       />

//       <Section title="All Instructors">
//         <ListTable data={instructors} />
//       </Section>

//       <Section title="All Students">
//         <ListTable data={students} />
//       </Section>

//       <Section title="All Batches">
//         <table className="w-full border rounded text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2">Batch Name</th>
//               <th className="p-2">Instructor</th>
//               <th className="p-2">Students</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Array.isArray(batches) &&
//               batches.map((batch) => (
//                 <tr key={batch._id} className="border-t hover:bg-gray-50">
//                   <td className="p-2">{batch.name}</td>
//                   <td className="p-2">{batch.instructor?.name}</td>
//                   <td className="p-2">{batch.students?.length}</td>
//                   <td className="p-2 space-x-2">
//                     <button
//                       onClick={() => openEditModal(batch)}
//                       className="px-2 py-1 text-white bg-blue-500 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteBatch(batch._id)}
//                       className="px-2 py-1 text-white bg-red-500 rounded"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </Section>

//       <Section title="Instructor Approval Requests">
//         {pendingInstructors.length === 0 ? (
//           <p>No pending requests</p>
//         ) : (
//           <table className="w-full border rounded">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-2 text-left">Name</th>
//                 <th className="p-2 text-left">Email</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pendingInstructors.map((instr) => (
//                 <tr key={instr._id} className="border-t">
//                   <td className="p-2">{instr.name}</td>
//                   <td className="p-2">{instr.email}</td>
//                   <td className="p-2 space-x-2 text-center">
//                     <button
//                       onClick={() => handleApprove(instr._id)}
//                       className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleDelete(instr._id)}
//                       className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </Section>

//       <Section title={editBatchId ? "Edit Batch" : "Create Batch"}>
//         <form onSubmit={handleSubmitBatch} className="space-y-3">
//           <input
//             type="text"
//             placeholder="Batch Name"
//             className="w-full border p-2 rounded"
//             value={batchName}
//             onChange={(e) => setBatchName(e.target.value)}
//           />

//           <select
//             className="w-full border p-2 rounded"
//             value={batchInstructor}
//             onChange={(e) => setBatchInstructor(e.target.value)}
//           >
//             <option value="">Select Instructor</option>
//             {instructors.map((instr) => (
//               <option key={instr._id} value={instr._id}>
//                 {instr.name}
//               </option>
//             ))}
//           </select>

//           <label className="block text-sm font-medium">Select Students</label>
//           <div className="max-h-40 overflow-y-auto border rounded p-2">
//             {students.map((stu) => (
//               <label key={stu._id} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedStudents.includes(stu._id)}
//                   onChange={() => {
//                     setSelectedStudents((prev) =>
//                       prev.includes(stu._id)
//                         ? prev.filter((id) => id !== stu._id)
//                         : [...prev, stu._id]
//                     );
//                   }}
//                 />
//                 <span>{stu.name}</span>
//               </label>
//             ))}
//           </div>

//           <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
//             {editBatchId ? "Update Batch" : "Create Batch"}
//           </button>
//         </form>
//       </Section>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import DashboardChart from "./DashboardChart";
import Section from "./Section";
import ListTable from "./ListTable";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { backendUrl, token } = useAppContext();

  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [pendingInstructors, setPendingInstructors] = useState([]);
  const [batches, setBatches] = useState([]);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirm, setNewConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [batchName, setBatchName] = useState("");
  const [batchInstructor, setBatchInstructor] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [editBatchId, setEditBatchId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data.students || []);
      setInstructors(res.data.instructors || []);
      setPendingInstructors(res.data.pendingInstructors || []);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  const fetchBatches = async () => {
    try {
      const res = await axios.get(`${backendUrl}/admin/batches`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBatches(res.data.batches || []);
    } catch (err) {
      toast.error("Failed to fetch batches");
    }
  };

  useEffect(() => {
    fetchData();
    fetchBatches();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(
        `${backendUrl}/admin/instructor/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Instructor approved");
      fetchData();
    } catch {
      toast.error("Approval failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/admin/instructor/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Instructor deleted");
      fetchData();
    } catch {
      toast.error("Deletion failed");
    }
  };

  const handleDeleteBatch = async (id) => {
    try {
      await axios.delete(`${backendUrl}/admin/batch/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Batch deleted");
      fetchBatches();
    } catch {
      toast.error("Batch deletion failed");
    }
  };

  const handleCreateInstructor = async (e) => {
    e.preventDefault();
    if (!newName || !newEmail || !newPassword || !newConfirm)
      return toast.error("All fields are required.");
    if (newPassword !== newConfirm)
      return toast.error("Passwords do not match.");

    try {
      await axios.post(
        `${backendUrl}/admin/create-instructor`,
        { name: newName, email: newEmail, password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Instructor created");
      setNewName("");
      setNewEmail("");
      setNewPassword("");
      setNewConfirm("");
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating instructor");
    }
  };

  const handleSubmitBatch = async (e) => {
    e.preventDefault();
    if (!batchName || !batchInstructor)
      return toast.error("Name and instructor required");

    try {
      if (editBatchId) {
        await axios.put(
          `${backendUrl}/admin/batch/${editBatchId}`,
          {
            name: batchName,
            instructorId: batchInstructor,
            studentIds: selectedStudents,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Batch updated");
      } else {
        await axios.post(
          `${backendUrl}/admin/create-batch`,
          {
            name: batchName,
            instructorId: batchInstructor,
            studentIds: selectedStudents,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Batch created");
      }

      setBatchName("");
      setBatchInstructor("");
      setSelectedStudents([]);
      setEditBatchId(null);
      fetchBatches();
    } catch (err) {
      toast.error("Batch save failed");
    }
  };

  const openEditModal = (batch) => {
    setEditBatchId(batch._id);
    setBatchName(batch.name);
    setBatchInstructor(batch.instructor?._id);
    setSelectedStudents(batch.students?.map((s) => s._id) || []);
  };

  const adminChartData = [
    { name: "Instructors", count: instructors.length },
    { name: "Students", count: students.length },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">👨‍💼 Admin Dashboard</h2>
        <p className="text-purple-100">
          Manage your institution's users, batches, and instructors
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Instructors
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {instructors.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Students
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {students.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Batches</p>
              <p className="text-3xl font-bold text-gray-900">
                {batches.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <DashboardChart
        title="Users Overview"
        data={adminChartData}
        dataKey="count"
      />

      <div className="grid lg:grid-cols-2 gap-8">
        <Section title="All Instructors">
          <ListTable data={instructors} />
        </Section>

        <Section title="All Students">
          <ListTable data={students} />
        </Section>
      </div>

      <Section title="All Batches">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array.isArray(batches) &&
                batches.map((batch) => (
                  <tr
                    key={batch._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {batch.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {batch.instructor?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {batch.students?.length} students
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => openEditModal(batch)}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBatch(batch._id)}
                        className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Instructor Approval Requests">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {pendingInstructors.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">
                No pending instructor requests
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pendingInstructors.map((instr) => (
                  <tr
                    key={instr._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {instr.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{instr.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                      <button
                        onClick={() => handleApprove(instr._id)}
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Approve
                      </button>
                      <button
                        onClick={() => handleDelete(instr._id)}
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Section>

      <div className="grid lg:grid-cols-2 gap-8">
        <Section title={editBatchId ? "Edit Batch" : "Create Batch"}>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <form onSubmit={handleSubmitBatch} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch Name
                </label>
                <input
                  type="text"
                  placeholder="Enter batch name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Instructor
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  value={batchInstructor}
                  onChange={(e) => setBatchInstructor(e.target.value)}
                >
                  <option value="">Choose an instructor</option>
                  {instructors.map((instr) => (
                    <option key={instr._id} value={instr._id}>
                      {instr.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Students
                </label>
                <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-gray-50">
                  {students.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      No students available
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {students.map((stu) => (
                        <label
                          key={stu._id}
                          className="flex items-center space-x-3 p-2 hover:bg-white rounded-lg transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(stu._id)}
                            onChange={() => {
                              setSelectedStudents((prev) =>
                                prev.includes(stu._id)
                                  ? prev.filter((id) => id !== stu._id)
                                  : [...prev, stu._id]
                              );
                            }}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-700">
                            {stu.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {editBatchId ? "Update Batch" : "Create Batch"}
              </button>
            </form>
          </div>
        </Section>

        <Section title="Create Instructor">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <form onSubmit={handleCreateInstructor} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter instructor's full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter instructor's email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm the password"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    value={newConfirm}
                    onChange={(e) => setNewConfirm(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showConfirm ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Create Instructor
              </button>
            </form>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default AdminDashboard;
