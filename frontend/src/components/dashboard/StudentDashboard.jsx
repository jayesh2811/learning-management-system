// // src/components/dashboard/StudentDashboard.jsx
// import React from "react";
// import DashboardChart from "./DashboardChart";
// import Section from "./Section";

// const progressData = [
//   { name: "Day 1", watched: 1 },
//   { name: "Day 2", watched: 1 },
//   { name: "Day 3", watched: 0 },
// ];

// const StudentDashboard = () => (
//   <div className="space-y-6">
//     <h2 className="text-2xl font-bold text-blue-700">🎓 Student Dashboard</h2>

//     <DashboardChart
//       title="Learning Progress"
//       data={progressData}
//       dataKey="watched"
//     />

//     <Section title="My Batches">
//       <ul className="list-disc pl-5">
//         <li>MERN Bootcamp</li>
//       </ul>
//     </Section>

//     <Section title="Batch Info">
//       <p className="text-sm">Batch: MERN Bootcamp</p>
//       <p className="text-sm">Timing: Mon–Fri 6 PM</p>
//     </Section>

//     <Section title="Instructor Info">
//       <p className="text-sm">Instructor: Lokesh Sharma</p>
//       <p className="text-sm">Email: lokesh@lms.com</p>
//     </Section>

//     <Section title="Day-wise Videos">
//       <ul className="list-decimal pl-5 text-sm text-gray-700">
//         <li>Day 1 - Introduction to MERN</li>
//         <li>Day 2 - React Basics</li>
//         <li>Day 3 - Props & State</li>
//       </ul>
//     </Section>
//   </div>
// );

// export default StudentDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAppContext } from "../../context/AppContext";
// import DashboardChart from "./DashboardChart";
// import Section from "./Section";
// import VideoCard from "../dashboard/VideoCard";
// import { toast } from "react-toastify";
// import Modal from "react-modal";

// const StudentDashboard = () => {
//   const { backendUrl, token } = useAppContext();
//   const [batch, setBatch] = useState(null);
//   const [videos, setVideos] = useState([]);
//   const [watched, setWatched] = useState({});
//   const [visibleCount, setVisibleCount] = useState(5);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const fetchDashboardData = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/student/dashboard`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBatch(res.data.batch);
//       setVideos(res.data.videos);
//     } catch (err) {
//       console.error("Failed to fetch student dashboard data", err);
//       toast.error("Error loading dashboard");
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const toggleWatched = (videoId) => {
//     setWatched((prev) => ({ ...prev, [videoId]: !prev[videoId] }));
//   };

//   const openModal = (videoUrl) => {
//     setSelectedVideo(videoUrl);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedVideo(null);
//   };

//   const progressData = videos.slice(0, visibleCount).map((v, idx) => ({
//     name: `Day ${idx + 1}`,
//     watched: watched[v._id] ? 1 : 0,
//   }));

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-blue-700">🎓 Student Dashboard</h2>

//       <DashboardChart
//         title="Learning Progress"
//         data={progressData}
//         dataKey="watched"
//       />

//       {batch && (
//         <>
//           <Section title="My Batch">
//             <p className="text-sm font-medium text-gray-700">{batch.name}</p>
//           </Section>

//           <Section title="Instructor Info">
//             <p className="text-sm">Name: {batch.instructor.name}</p>
//             <p className="text-sm">Email: {batch.instructor.email}</p>
//           </Section>

//           <Section title="Videos">
//             <div className="space-y-3">
//               {videos.slice(0, visibleCount).map((video) => (
//                 <VideoCard
//                   key={video._id}
//                   title={video.title}
//                   description={
//                     watched[video._id] ? "✅ Watched" : "Not Watched"
//                   }
//                   url={video.url}
//                   onDelete={() => toggleWatched(video._id)}
//                   viewOnly
//                   onView={() => openModal(video.url)}
//                 />
//               ))}

//               {visibleCount < videos.length && (
//                 <button
//                   onClick={() => setVisibleCount((prev) => prev + 5)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Load More
//                 </button>
//               )}
//             </div>
//           </Section>
//         </>
//       )}

//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         contentLabel="Video Player"
//         className="bg-white rounded-lg shadow-lg p-4 max-w-3xl mx-auto mt-20"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Video Player</h2>
//           <button onClick={closeModal} className="text-red-600 font-bold">
//             ✕
//           </button>
//         </div>
//         {selectedVideo && (
//           <video src={selectedVideo} controls className="w-full h-96 rounded" />
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default StudentDashboard;

// src/components/dashboard/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardChart from "./DashboardChart";
import Section from "./Section";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { FaPlay } from "react-icons/fa";

const StudentDashboard = () => {
  const { backendUrl, token } = useAppContext();
  const [batchInfo, setBatchInfo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [watched, setWatched] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${backendUrl}/student/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBatchInfo(res.data.batch);
      setVideos(res.data.videos || []);
      const watchStatus = {};
      res.data.videos.forEach((v) => {
        watchStatus[v._id] = v.watched || false;
      });
      setWatched(watchStatus);
    } catch (err) {
      console.error("Dashboard error", err);
      toast.error("Failed to load dashboard");
    }
  };

  const toggleWatched = async (videoId) => {
    try {
      await axios.put(
        `${backendUrl}/student/video/${videoId}/watched`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWatched((prev) => ({ ...prev, [videoId]: !prev[videoId] }));
    } catch (err) {
      toast.error("Failed to update watch status");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const progressData = videos.map((v, i) => ({
    name: `Day ${i + 1}`,
    watched: watched[v._id] ? 1 : 0,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-700">🎓 Student Dashboard</h2>

      <DashboardChart
        title="Learning Progress"
        data={progressData}
        dataKey="watched"
      />

      {batchInfo && (
        <>
          <Section title="My Batch">
            <p className="bg-gray-100 p-2 rounded">{batchInfo.name}</p>
          </Section>

          <Section title="Instructor Info">
            <div className="bg-gray-100 p-2 rounded">
              <p>
                <strong>Name:</strong> {batchInfo.instructor?.name}
              </p>
              <p>
                <strong>Email:</strong> {batchInfo.instructor?.email}
              </p>
            </div>
          </Section>
        </>
      )}

      <Section title="Videos">
        <div className="space-y-4">
          {videos.map((video) => (
            <div
              key={video._id}
              className="flex items-center justify-between bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg w-16 h-16 flex items-center justify-center">
                  <FaPlay className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {watched[video._id] ? "Watched" : "Not Watched"}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => toggleWatched(video._id)}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Mark as {watched[video._id] ? "Unwatched" : "Watched"}
                </button>
                <button
                  onClick={() => {
                    setSelectedVideo(video.url);
                    setShowModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 text-xl"
                >
                  <FaPlay />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {showModal && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full">
            <video
              controls
              className="w-full max-h-[80vh] rounded"
              src={selectedVideo}
            />
            <div className="text-right mt-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
