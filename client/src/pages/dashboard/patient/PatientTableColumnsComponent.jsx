import React from 'react';
import { Eye } from 'lucide-react';

// Example columns for a patient table
const columns = [
  { label: 'รหัส', key: 'id' },
  { label: 'ชื่อ', key: 'firstName' },
  { label: 'นามสกุล', key: 'lastName' },
  { label: 'เพศ', key: 'gender' },
  { label: 'เบอร์โทร', key: 'phone' },
  { label: 'อีเมล', key: 'email' },
  { label: 'สถานะ', key: 'status' },
  { label: 'การจัดการ', key: 'action' },
];

function PatientTableColumnsComponent() {
  return (
    <div className="w-full max-w-full py-8 px-2 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-900">ประวัติการรักษา</h1>
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[700px] divide-y divide-gray-200 bg-white rounded-xl shadow">
        <thead className="bg-blue-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* No data row, only empty state below */}
          {/* Empty state */}
          <tr>
            <td colSpan={columns.length} className="py-16 text-center text-gray-400 text-base">
              <div className="flex flex-col items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                ยังไม่มีข้อมูลประวัติการรักษา
              </div>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientTableColumnsComponent;