// // src/components/dashboard/InstructorDashboard.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DashboardChart from "./DashboardChart";
// import Section from "./Section";
// import { useAppContext } from "../../context/AppContext";
// import { toast } from "react-toastify";

// const InstructorDashboard = () => {
//   const { backendUrl, token } = useAppContext();

//   const [batches, setBatches] = useState([]);
//   const [title, setTitle] = useState("");
//   const [file, setFile] = useState(null);
//   const [batchId, setBatchId] = useState("");
//   const [videos, setVideos] = useState([]);

//   const fetchInstructorBatches = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/instructor/batches`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBatches(res.data.batches || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch instructor batches");
//     }
//   };

//   const fetchInstructorVideos = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/instructor/videos`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setVideos(res.data.videos || []);
//     } catch (err) {
//       console.error("❌ Failed to fetch videos", err);
//       toast.error("Failed to load videos");
//     }
//   };

//   useEffect(() => {
//     fetchInstructorBatches();
//     fetchInstructorVideos();
//   }, []);

//   const chartData = batches.map((b) => ({
//     name: b.name,
//     students: b.students?.length || 0,
//   }));

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!title || !file || !batchId) {
//       return toast.error("All fields are required");
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("video", file);
//     formData.append("batchId", batchId);

//     try {
//       console.log("Uploading video...");
//       const res = await axios.post(
//         `${backendUrl}/instructor/upload`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       toast.success("Video uploaded successfully");
//       console.log("✅ Upload response:", res.data);
//       setTitle("");
//       setFile(null);
//       setBatchId("");
//       fetchInstructorVideos(); // Refresh video list
//     } catch (err) {
//       console.error("❌ Upload failed:", err.response?.data || err.message);
//       toast.error("Video upload failed");
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-purple-700">
//         👨‍🏫 Instructor Dashboard
//       </h2>

//       <DashboardChart
//         title="Students per Batch"
//         data={chartData}
//         dataKey="students"
//       />

//       <Section title="My Assigned Batches">
//         <ul className="list-disc pl-5">
//           {batches.map((b) => (
//             <li key={b._id}>{b.name}</li>
//           ))}
//         </ul>
//       </Section>

//       <Section title="Enrolled Students (Batch-wise)">
//         {batches.map((b) => (
//           <div key={b._id} className="mb-4">
//             <h4 className="font-semibold">{b.name}</h4>
//             <ul className="list-disc pl-5 text-sm text-gray-600">
//               {b.students.map((s) => (
//                 <li key={s._id}>
//                   {s.name} ({s.email})
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </Section>

//       <Section title="Upload Video">
//         <form
//           onSubmit={handleUpload}
//           className="space-y-3"
//           encType="multipart/form-data"
//         >
//           <input
//             type="text"
//             placeholder="Video Title"
//             className="w-full border p-2 rounded"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <select
//             className="w-full border p-2 rounded"
//             value={batchId}
//             onChange={(e) => setBatchId(e.target.value)}
//           >
//             <option value="">Select Batch</option>
//             {batches.map((b) => (
//               <option key={b._id} value={b._id}>
//                 {b.name}
//               </option>
//             ))}
//           </select>

//           <input
//             type="file"
//             accept="video/*"
//             className="w-full border p-2 rounded"
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//           <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
//             Upload
//           </button>
//         </form>
//       </Section>

//       <Section title="My Uploaded Videos (Batch-wise)">
//         {batches.map((batch) => {
//           const batchVideos = videos.filter(
//             (video) => video.batch?._id === batch._id
//           );
//           if (batchVideos.length === 0) return null;

//           return (
//             <div key={batch._id} className="mb-6">
//               <h3 className="text-lg font-semibold text-indigo-700 mb-3">
//                 🎥 {batch.name}
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {batchVideos.map((video) => (
//                   <div
//                     key={video._id}
//                     className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
//                   >
//                     <h4 className="font-semibold text-purple-700 mb-2">
//                       {video.title}
//                     </h4>
//                     <video
//                       controls
//                       src={video.url}
//                       className="w-full h-48 rounded border"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         })}
//       </Section>
//     </div>
//   );
// };

// export default InstructorDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardChart from "./DashboardChart";
import Section from "./Section";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import VideoCard from "../dashboard/VideoCard";

const InstructorDashboard = () => {
  const { backendUrl, token } = useAppContext();
  const [batches, setBatches] = useState([]);
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [batchId, setBatchId] = useState("");
  const [visibleVideos, setVisibleVideos] = useState({}); // { batchId: number }

  const fetchInstructorBatches = async () => {
    try {
      const res = await axios.get(`${backendUrl}/instructor/batches`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBatches(res.data.batches || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch instructor batches");
    }
  };

  const fetchInstructorVideos = async () => {
    try {
      const res = await axios.get(`${backendUrl}/instructor/videos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(res.data.videos || []);
    } catch (err) {
      console.error("❌ Failed to fetch videos", err);
      toast.error("Failed to load videos");
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await axios.delete(`${backendUrl}/instructor/videos/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Video deleted");
      fetchInstructorVideos();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete video");
    }
  };

  useEffect(() => {
    fetchInstructorBatches();
    fetchInstructorVideos();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !file || !batchId) {
      return toast.error("All fields are required");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", file);
    formData.append("batchId", batchId);

    try {
      const res = await axios.post(
        `${backendUrl}/instructor/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Video uploaded successfully");
      setTitle("");
      setFile(null);
      setBatchId("");
      fetchInstructorVideos();
    } catch (err) {
      console.error("❌ Upload failed:", err.response?.data || err.message);
      toast.error("Video upload failed");
    }
  };

  const chartData = batches.map((b) => ({
    name: b.name,
    students: b.students?.length || 0,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">
        👨‍🏫 Instructor Dashboard
      </h2>

      <DashboardChart
        title="Students per Batch"
        data={chartData}
        dataKey="students"
      />

      <Section title="Upload Video">
        <form onSubmit={handleUpload} className="space-y-3">
          <input
            type="text"
            placeholder="Video Title"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="w-full border p-2 rounded"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
          >
            <option value="">Select Batch</option>
            {batches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="video/*"
            className="w-full border p-2 rounded"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            Upload
          </button>
        </form>
      </Section>

      <Section title="My Uploaded Videos (Batch-wise)">
        {batches.map((batch) => {
          const batchVideos = videos.filter((v) => v.batch?._id === batch._id);
          if (batchVideos.length === 0) return null;

          const count = visibleVideos[batch._id] || 5;
          const isMore = batchVideos.length > count;

          return (
            <div key={batch._id} className="space-y-3 mb-6">
              <h3 className="text-lg font-semibold text-indigo-700">
                🎥 {batch.name}
              </h3>
              <div className="space-y-3">
                {batchVideos.slice(0, count).map((video) => (
                  <VideoCard
                    key={video._id}
                    title={video.title}
                    description={`Batch: ${batch.name}`}
                    url={video.url}
                    onDelete={() => handleDeleteVideo(video._id)}
                  />
                ))}
              </div>
              {isMore && (
                <button
                  onClick={() =>
                    setVisibleVideos((prev) => ({
                      ...prev,
                      [batch._id]: count + 5,
                    }))
                  }
                  className="mt-2 text-indigo-600 hover:underline text-sm"
                >
                  Load more...
                </button>
              )}
            </div>
          );
        })}
      </Section>
    </div>
  );
};

export default InstructorDashboard;
