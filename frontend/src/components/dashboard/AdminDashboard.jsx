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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-indigo-700">👨‍💼 Admin Dashboard</h2>

      <DashboardChart
        title="Users Overview"
        data={adminChartData}
        dataKey="count"
      />

      <Section title="All Instructors">
        <ListTable data={instructors} />
      </Section>

      <Section title="All Students">
        <ListTable data={students} />
      </Section>

      <Section title="All Batches">
        <table className="w-full border rounded text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Batch Name</th>
              <th className="p-2">Instructor</th>
              <th className="p-2">Students</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(batches) &&
              batches.map((batch) => (
                <tr key={batch._id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{batch.name}</td>
                  <td className="p-2">{batch.instructor?.name}</td>
                  <td className="p-2">{batch.students?.length}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => openEditModal(batch)}
                      className="px-2 py-1 text-white bg-blue-500 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBatch(batch._id)}
                      className="px-2 py-1 text-white bg-red-500 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Section>

      <Section title="Instructor Approval Requests">
        {pendingInstructors.length === 0 ? (
          <p>No pending requests</p>
        ) : (
          <table className="w-full border rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingInstructors.map((instr) => (
                <tr key={instr._id} className="border-t">
                  <td className="p-2">{instr.name}</td>
                  <td className="p-2">{instr.email}</td>
                  <td className="p-2 space-x-2 text-center">
                    <button
                      onClick={() => handleApprove(instr._id)}
                      className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDelete(instr._id)}
                      className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Section>

      <Section title={editBatchId ? "Edit Batch" : "Create Batch"}>
        <form onSubmit={handleSubmitBatch} className="space-y-3">
          <input
            type="text"
            placeholder="Batch Name"
            className="w-full border p-2 rounded"
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
          />

          <select
            className="w-full border p-2 rounded"
            value={batchInstructor}
            onChange={(e) => setBatchInstructor(e.target.value)}
          >
            <option value="">Select Instructor</option>
            {instructors.map((instr) => (
              <option key={instr._id} value={instr._id}>
                {instr.name}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium">Select Students</label>
          <div className="max-h-40 overflow-y-auto border rounded p-2">
            {students.map((stu) => (
              <label key={stu._id} className="flex items-center space-x-2">
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
                />
                <span>{stu.name}</span>
              </label>
            ))}
          </div>

          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            {editBatchId ? "Update Batch" : "Create Batch"}
          </button>
        </form>
      </Section>

      <Section title="Create Instructor">
        <form onSubmit={handleCreateInstructor} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border p-2 rounded pr-10"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full border p-2 rounded pr-10"
              value={newConfirm}
              onChange={(e) => setNewConfirm(e.target.value)}
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            Create Instructor
          </button>
        </form>
      </Section>
    </div>
  );
};

export default AdminDashboard;
