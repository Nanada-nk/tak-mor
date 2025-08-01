import { useNavigate } from 'react-router';


function TeleAppointmentTable({ appointments, pagination, onPageChange, onEditAppointment, onDeleteAppointment }) {
  const navigate = useNavigate();

  // Function สำหรับสร้าง Page Number Buttons
  const renderPageNumbers = () => {
    const pageNumbers = [];
    // สร้างปุ่ม Page Number ทั้งหมด
    for (let i = 1; i <= pagination.totalPages; i++) {
      pageNumbers.push(
        <li key={i}>
          <button
            onClick={() => onPageChange(i)}
            className={`px-4 py-2 rounded-full border border-gray-300 ${i === pagination.currentPage ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            aria-label={`Go to page ${i}`} // เพิ่ม Accessibility
          >
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden font-prompt">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{appt.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium cursor-pointer hover:underline">{appt.vn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appt.patientId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appt.doctorId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appt.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${appt.startTime} - ${appt.endTime}`}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${appt.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        appt.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                          appt.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                            appt.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : // เพิ่มสถานะ CANCELLED
                              'bg-gray-100 text-gray-800'
                      }`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appt.appointmentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appt.createdAt ? new Date(appt.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* Edit Button */}
                    <button
                      onClick={() => onEditAppointment && onEditAppointment(appt.id)} // เรียก prop function
                      className="text-blue-600 hover:text-blue-900 mr-2"
                      aria-label="Edit Appointment"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => onDeleteAppointment && onDeleteAppointment(appt.id)} // เรียก prop function
                      className="text-red-600 hover:text-red-900 mr-2"
                      aria-label="Delete Appointment"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    {/* ปุ่ม Join Call (ถ้าสถานะเหมาะสม) */}
                    {appt.status === 'CONFIRMED' && (
                      <button
                        onClick={() => navigate(`/video/${appt.appointmentId}`)}
                        className="text-green-600 hover:text-green-900 ml-2"
                        aria-label="Join Call"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197 3.197m0 0l-3.197-3.197m3.197 3.197v4.041m0-4.041a2.35 2.35 0 01-2.35-2.35v-1.916a2.35 2.35 0 012.35-2.35h.001a2.35 2.35 0 012.35 2.35v1.916a2.35 2.35 0 01-2.35 2.35zM12 19.5c-3.102 0-5.6-2.5-5.6-5.6V6.5c0-3.102 2.5-5.6 5.6-5.6s5.6 2.5 5.6 5.6v7.4c0 3.102-2.5 5.6-5.6 5.6z" />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="py-4 text-center text-gray-500">No appointments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center my-5">
        <nav aria-label="Pagination" className="flex justify-center items-center space-x-2">
          <button
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            aria-label="Previous page" // เพิ่ม Accessibility
          >
            Prev
          </button>

          <ul className="flex space-x-2">
            {renderPageNumbers()}
          </ul>

          <button
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            aria-label="Next page" // เพิ่ม Accessibility
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}

export default TeleAppointmentTable;