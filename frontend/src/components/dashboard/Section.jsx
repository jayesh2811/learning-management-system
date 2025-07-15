// src/components/dashboard/Section.jsx
import React from "react";

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
    <div className="bg-gray-100 p-4 rounded-xl">{children}</div>
  </div>
);

export default Section;
