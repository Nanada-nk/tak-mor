import React from 'react';

// Example columns for a patient table
const columns = [
  { label: 'ID', key: 'id' },
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Gender', key: 'gender' },
  { label: 'Phone', key: 'phone' },
  { label: 'Email', key: 'email' },
  { label: 'Status', key: 'status' },
  { label: 'Action', key: 'action' },
];

function PatientTableColumnsComponent() {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full min-w-[700px] divide-y divide-gray-200 bg-white rounded-xl shadow">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Example row, replace with real data as needed */}
          <tr className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">John</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Doe</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Male</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">0812345678</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">john@example.com</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">Active</td>
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
              <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PatientTableColumnsComponent;