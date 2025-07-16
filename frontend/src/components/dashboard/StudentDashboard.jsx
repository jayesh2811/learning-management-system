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
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">🎓 Student Dashboard</h2>
        <p className="text-blue-100">
          Track your learning progress and access your course materials
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Videos</p>
              <p className="text-3xl font-bold text-gray-900">
                {videos.length}
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
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Videos Watched
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {Object.values(watched).filter(Boolean).length}
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Progress</p>
              <p className="text-3xl font-bold text-gray-900">
                {videos.length > 0
                  ? Math.round(
                      (Object.values(watched).filter(Boolean).length /
                        videos.length) *
                        100
                    )
                  : 0}
                %
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <DashboardChart
        title="Learning Progress"
        data={progressData}
        dataKey="watched"
      />

      {batchInfo && (
        <div className="grid lg:grid-cols-2 gap-8">
          <Section title="My Batch">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
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
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {batchInfo.name}
                  </h3>
                  <p className="text-gray-600">Your assigned batch</p>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Instructor Info">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {batchInfo.instructor?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {batchInfo.instructor?.name}
                  </h3>
                  <p className="text-gray-600">{batchInfo.instructor?.email}</p>
                  <span className="inline-block mt-1 px-2 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-full">
                    Instructor
                  </span>
                </div>
              </div>
            </div>
          </Section>
        </div>
      )}

      <Section title="Course Videos">
        {videos.length === 0 ? (
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
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No videos available yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Your instructor will upload videos soon
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {videos.map((video, index) => (
                <div
                  key={video._id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            watched[video._id]
                              ? "bg-green-100 text-green-600"
                              : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          }`}
                        >
                          {watched[video._id] ? (
                            <svg
                              className="w-6 h-6"
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
                          ) : (
                            <FaPlay className="text-lg" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-500">
                            Day {index + 1}
                          </span>
                          {watched[video._id] && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Completed
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mt-1">
                          {video.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Status:{" "}
                          {watched[video._id] ? "Watched" : "Not Watched"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleWatched(video._id)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          watched[video._id]
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {watched[video._id] ? "Mark Unwatched" : "Mark Watched"}
                      </button>

                      <button
                        onClick={() => {
                          setSelectedVideo(video.url);
                          setShowModal(true);
                        }}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaPlay className="w-4 h-4 mr-2" />
                        Watch Video
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      {showModal && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Video Player
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <video
                controls
                className="w-full rounded-lg shadow-lg"
                src={selectedVideo}
                style={{ maxHeight: "70vh" }}
              />
            </div>

            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
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
