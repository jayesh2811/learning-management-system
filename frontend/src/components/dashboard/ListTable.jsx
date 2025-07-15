// src/components/dashboard/ListTable.jsx
import React from "react";

const ListTable = ({ data }) => (
  <table className="w-full text-left text-sm border-collapse">
    <thead>
      <tr className="bg-gray-200">
        <th className="p-2">#</th>
        <th className="p-2">Name</th>
        <th className="p-2">Email</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, i) => (
        <tr key={item._id} className="hover:bg-gray-50">
          <td className="p-2">{i + 1}</td>
          <td className="p-2">{item.name}</td>
          <td className="p-2">{item.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ListTable;
