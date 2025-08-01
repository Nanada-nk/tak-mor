

import React, { useEffect, useState } from 'react';
import patientApi from '../../../api/patientApi';
import authStore from '../../../stores/authStore';
import Modal from '../../../components/Modal.jsx';

function PatientManagementPage() {
  const user = authStore(state => state.user);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetail, setShowDetail] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.Patient?.id) {
        setError('No patient ID found.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const resp = await patientApi.getAppointments(user.Patient.id);
        setAppointments(resp.data);
      } catch (err) {
        setError('Failed to fetch appointments.');
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [user]);

  if (loading) return <div className="flex items-center justify-center min-h-screen text-blue-800">Loading appointments...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-600">{error}</div>;

  return (
    <div className="w-full max-w-full py-8 px-2 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-900">My Appointments</h1>
      {appointments.length === 0 ? (
        <div className="text-gray-500">No appointments found.</div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[900px] divide-y divide-gray-200 bg-white rounded-xl shadow">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{appt.date?.slice(0,10) || '-'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{appt.startTime} - {appt.endTime}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{appt.Doctor?.firstName || '-'} {appt.Doctor?.lastName || ''}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{appt.symptoms || '-'}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{appt.status}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900" onClick={() => setShowDetail(appt)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for appointment detail */}
      <Modal isOpen={!!showDetail} onClose={() => setShowDetail(null)} title="Appointment Detail">
        {showDetail && (
          <div className="space-y-4">
            <div className="mb-2 text-xs text-blue-900 font-mono">Booking ID: {showDetail.id || '-'}</div>
            <div className="flex flex-col gap-3 mb-4">
              {/* Doctor Card */}
              <div className="bg-white rounded-xl shadow p-3 flex flex-col gap-1 border border-blue-100 w-full">
                <div className="text-blue-900 font-bold text-base mb-1">Doctor</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-2 gap-y-1 text-xs mb-2">
                  <div><span className="font-semibold">Name:</span> {showDetail.Doctor?.firstName || '-'} {showDetail.Doctor?.lastName || ''}</div>
                  <div><span className="font-semibold">Phone:</span> {showDetail.Doctor?.Account?.phone || '-'}</div>
                  <div><span className="font-semibold">Email:</span> {showDetail.Doctor?.Account?.email || '-'}</div>
                </div>
              </div>
            </div>
            <div className="font-semibold text-blue-800 text-xs mt-1 mb-1">Appointment Info</div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 grid grid-cols-2 sm:grid-cols-5 gap-x-2 gap-y-1 text-xs">
              <div><span className="font-semibold">Date:</span> {showDetail.date ? showDetail.date.slice(0,10) : '-'}</div>
              <div><span className="font-semibold">Time:</span> {showDetail.startTime || '-'} - {showDetail.endTime || '-'}</div>
              <div><span className="font-semibold">Status:</span> {showDetail.status || '-'}</div>
              <div><span className="font-semibold">Type:</span> -</div>
              <div><span className="font-semibold">Service:</span> {showDetail.symptoms || '-'}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default PatientManagementPage;