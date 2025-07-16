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
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">👨‍🏫 Instructor Dashboard</h2>
        <p className="text-purple-100">
          Manage your batches and upload video content for your students
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">My Batches</p>
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

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Students
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {batches.reduce(
                  (total, batch) => total + (batch.students?.length || 0),
                  0
                )}
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Uploaded Videos
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {videos.length}
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
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <DashboardChart
        title="Students per Batch"
        data={chartData}
        dataKey="students"
      />

      <Section title="Upload New Video">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Title
              </label>
              <input
                type="text"
                placeholder="Enter a descriptive title for your video"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Batch
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
              >
                <option value="">Choose a batch for this video</option>
                {batches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name} ({b.students?.length || 0} students)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video File
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="video/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Supported formats: MP4, AVI, MOV, WMV
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span>Upload Video</span>
            </button>
          </form>
        </div>
      </Section>

      <Section title="My Uploaded Videos">
        {batches.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No batches assigned yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Contact your admin to get assigned to batches
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {batches.map((batch) => {
              const batchVideos = videos.filter(
                (v) => v.batch?._id === batch._id
              );
              const count = visibleVideos[batch._id] || 5;
              const isMore = batchVideos.length > count;

              return (
                <div
                  key={batch._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                          <span>🎥</span>
                          <span>{batch.name}</span>
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {batch.students?.length || 0} students •{" "}
                          {batchVideos.length} videos
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {batchVideos.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg
                            className="w-6 h-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-500">
                          No videos uploaded for this batch yet
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          Upload your first video using the form above
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4">
                          {batchVideos.slice(0, count).map((video) => (
                            <VideoCard
                              key={video._id}
                              title={video.title}
                              description={`Uploaded for ${batch.name}`}
                              url={video.url}
                              onDelete={() => handleDeleteVideo(video._id)}
                            />
                          ))}
                        </div>
                        {isMore && (
                          <div className="text-center mt-6">
                            <button
                              onClick={() =>
                                setVisibleVideos((prev) => ({
                                  ...prev,
                                  [batch._id]: count + 5,
                                }))
                              }
                              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                              Load More Videos
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
};

export default InstructorDashboard;
