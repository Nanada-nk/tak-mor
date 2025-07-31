import React from "react";
import doctorApi from "/src/api/doctorApi.js";
import authStore from "/src/stores/authStore.js";
import Modal from "/src/components/Modal.jsx";

function DoctorAppointmentsPage() {
  const [showDetail, setShowDetail] = React.useState(null);
  const [appointments, setAppointments] = React.useState([]);
  const { user } = authStore();

  React.useEffect(() => {
    if (!user || !user.Doctor) return;
    const fetchAppointments = async () => {
      try {
        const resp = await doctorApi.getAppointments(user.Doctor.id);
        setAppointments(resp.data);
      } catch (err) {
        setAppointments([]);
        console.error("Failed to fetch appointments:", err);
      }
    };
    fetchAppointments();
  }, [user]);
  return (
    <div className="max-w-5xl mx-auto py-8 px-2 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">My Appointments</h1>
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 min-h-[480px] min-w-[900px]">
        <div className="bg-white shadow-md">
          <div className="flex justify-between">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.Patient?.firstName || '-'} {appointment.Patient?.lastName || ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.date?.slice(0,10)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.startTime} - {appointment.endTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.symptoms}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900" onClick={() => setShowDetail(appointment)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal for appointment detail */}
        <Modal isOpen={!!showDetail} onClose={() => setShowDetail(null)} title="Appointment Detail">
          {showDetail && (
            <>
              <div className="mb-2 text-xs text-blue-900 font-mono">Booking ID: {showDetail.id || '-'}</div>
              <div className="flex flex-col gap-3 mb-4">
                {/* Patient Card */}
                <div className="bg-white rounded-xl shadow p-3 flex flex-col gap-1 border border-blue-100 w-full">
                  <div className="text-blue-900 font-bold text-base mb-1">Patient</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-2 gap-y-1 text-xs mb-2">
                    <div><span className="font-semibold">Name:</span> {showDetail.Patient?.firstName || '-'} {showDetail.Patient?.lastName || ''}</div>
                    <div><span className="font-semibold">Phone:</span> {showDetail.Patient?.Account?.phone || '-'}</div>
                    <div><span className="font-semibold">Email:</span> {showDetail.Patient?.Account?.email || '-'}</div>
                  </div>
                  <div className="font-semibold text-blue-800 text-xs mt-1 mb-1">Medical Info</div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 grid grid-cols-2 sm:grid-cols-5 gap-x-2 gap-y-1 text-xs">
                    <div><span className="font-semibold">Height:</span> {showDetail.Patient?.PatientMedicalProfile?.height ? showDetail.Patient.PatientMedicalProfile.height + ' cm' : '-'}</div>
                    <div><span className="font-semibold">Weight:</span> {showDetail.Patient?.PatientMedicalProfile?.weight ? showDetail.Patient.PatientMedicalProfile.weight + ' kg' : '-'}</div>
                    <div><span className="font-semibold">Blood Type:</span> {showDetail.Patient?.PatientMedicalProfile?.bloodType || '-'}</div>
                    <div><span className="font-semibold">Congenital:</span> {showDetail.Patient?.PatientMedicalProfile?.congenital || '-'}</div>
                    <div><span className="font-semibold">Allergies:</span> {showDetail.Patient?.PatientMedicalProfile?.allergies || '-'}</div>
                    <div><span className="font-semibold">Surgeries:</span> {showDetail.Patient?.PatientMedicalProfile?.surgeries || '-'}</div>
                    <div><span className="font-semibold">Medications:</span> {showDetail.Patient?.PatientMedicalProfile?.medications || '-'}</div>
                    <div><span className="font-semibold">Symptoms:</span> {showDetail.symptoms || '-'}</div>
                  </div>
                </div>
                {/* Appointment Card */}
                <div className="bg-white rounded-xl shadow p-3 flex flex-col gap-1 border border-blue-100 w-full">
                  <div className="text-blue-900 font-bold text-base mb-1">Appointment</div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-2 gap-y-1 text-xs">
                    <div><span className="font-semibold">Date:</span> {showDetail.date ? showDetail.date.slice(0,10) : '-'}</div>
                    <div><span className="font-semibold">Time:</span> {showDetail.startTime || '-'} - {showDetail.endTime || '-'}</div>
                    <div><span className="font-semibold">Status:</span> {showDetail.status || '-'}</div>
                    <div><span className="font-semibold">Type:</span> -</div>
                    <div><span className="font-semibold">Service:</span> -</div>
                  </div>
                </div>
                {/* Doctor Card */}
                <div className="bg-white rounded-xl shadow p-3 flex flex-col gap-1 border border-blue-100 w-full">
                  <div className="text-blue-900 font-bold text-base mb-1">Doctor</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1 text-xs">
                    <div><span className="font-semibold">Name:</span> {showDetail.Doctor?.firstName || '-'} {showDetail.Doctor?.lastName || ''}</div>
                    <div><span className="font-semibold">Specialty:</span> {showDetail.Doctor?.specialties && showDetail.Doctor.specialties.length > 0 ? showDetail.Doctor.specialties.map(s => s.Specialty?.name).filter(Boolean).join(', ') : '-'}</div>
                    <div className="col-span-2"><span className="font-semibold">Bio:</span> {showDetail.Doctor?.bio || '-'}</div>
                    <div><span className="font-semibold">Phone:</span> {showDetail.Doctor?.Account?.phone || '-'}</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default DoctorAppointmentsPage;
