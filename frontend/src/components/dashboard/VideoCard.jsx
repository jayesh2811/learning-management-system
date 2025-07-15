import React from "react";
import { FaPlay, FaTrash } from "react-icons/fa";

const VideoCard = ({ title, description, url, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all">
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg w-16 h-16 flex items-center justify-center">
          <FaPlay className="text-white text-xl" />
        </div>
        <div>
          <h3 className="text-md font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">
            {description || "Uploaded Video"}
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          View
        </a>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
