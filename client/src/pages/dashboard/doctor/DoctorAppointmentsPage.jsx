import React from "react";
import doctorApi from "/src/api/doctorApi.js";
import authStore from "/src/stores/authStore.js";
import Modal from "/src/components/Modal.jsx";

function DoctorAppointmentsPage() {
  const [showDetail, setShowDetail] = React.useState(null);
  const [appointments, setAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });
  const { user } = authStore();

  const fetchAppointments = async () => {
    if (!user?.Doctor?.id) return;
    setLoading(true);
    try {
      const resp = await doctorApi.getAppointments(user.Doctor.id);
      setAppointments(resp.data);
    } catch (err) {
      setAppointments([]);
      console.error("Failed to fetch appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, [user?.Doctor?.id]);

  // Sorting logic
  const sortedAppointments = React.useMemo(() => {
    if (!sortConfig.key) return appointments;
    const sorted = [...appointments];
    sorted.sort((a, b) => {
      let aValue, bValue;
      switch (sortConfig.key) {
        case 'date':
          aValue = a.date || '';
          bValue = b.date || '';
          break;
        case 'startTime':
          aValue = a.startTime || '';
          bValue = b.startTime || '';
          break;
        case 'patient':
          aValue = (a.Patient?.firstName || '') + (a.Patient?.lastName || '');
          bValue = (b.Patient?.firstName || '') + (b.Patient?.lastName || '');
          break;
        case 'symptoms':
          aValue = a.symptoms || '';
          bValue = b.symptoms || '';
          break;
        case 'status':
          aValue = a.status || '';
          bValue = b.status || '';
          break;
        default:
          aValue = '';
          bValue = '';
      }
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [appointments, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };
  // Status badge color helper
  const statusColor = status => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-700 border-green-300';
      case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-300';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  // Loading spinner for initial load

  return (
    <div className="py-8 px-2 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">การนัดหมายของฉัน</h1>
        <button
          className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded shadow text-sm"
          onClick={fetchAppointments}
          disabled={loading}
          title="รีเฟรชข้อมูล"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M19.418 19A9 9 0 115 5.582" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20v-5h-.581" /></svg>
          รีเฟรช
        </button>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-blue-800 gap-2">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
          <span>กำลังโหลดข้อมูลการนัดหมาย...</span>
        </div>
      ) : appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span>ไม่พบข้อมูลการนัดหมาย</span>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[900px] bg-white rounded-xl shadow">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider cursor-pointer select-none transition-colors duration-150 hover:bg-blue-100 focus:bg-blue-200" tabIndex={0} onClick={() => handleSort('date')} onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleSort('date'); }}>
                  วันที่ {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider cursor-pointer select-none transition-colors duration-150 hover:bg-blue-100 focus:bg-blue-200" tabIndex={0} onClick={() => handleSort('startTime')} onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleSort('startTime'); }}>
                  เวลา {sortConfig.key === 'startTime' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider cursor-pointer select-none transition-colors duration-150 hover:bg-blue-100 focus:bg-blue-200" tabIndex={0} onClick={() => handleSort('patient')} onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleSort('patient'); }}>
                  ชื่อผู้ป่วย {sortConfig.key === 'patient' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider cursor-pointer select-none transition-colors duration-150 hover:bg-blue-100 focus:bg-blue-200" tabIndex={0} onClick={() => handleSort('symptoms')} onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleSort('symptoms'); }}>
                  อาการ/บริการ {sortConfig.key === 'symptoms' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">ประเภท</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider cursor-pointer select-none transition-colors duration-150 hover:bg-blue-100 focus:bg-blue-200" tabIndex={0} onClick={() => handleSort('status')} onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleSort('status'); }}>
                  สถานะ {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {sortedAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">{appointment.date ? (() => { const d = new Date(appointment.date); return d.toLocaleDateString('th-TH'); })() : '-'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{appointment.startTime} - {appointment.endTime}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{appointment.Patient?.firstName || '-'} {appointment.Patient?.lastName || ''}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{appointment.symptoms}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">-</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full border text-xs font-semibold ${statusColor(appointment.status)}`}>{
                      appointment.status === 'COMPLETED' ? 'เสร็จสิ้น' :
                      appointment.status === 'CANCELLED' ? 'ยกเลิก' :
                      appointment.status === 'PENDING' ? 'รอดำเนินการ' :
                      appointment.status === 'CONFIRMED' ? 'ยืนยันแล้ว' :
                      appointment.status || '-'
                    }</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <button
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                      onClick={() => setShowDetail(appointment)}
                      title="ดูรายละเอียดการนัดหมาย"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      ดูรายละเอียด
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal for appointment detail */}
      <Modal isOpen={!!showDetail} onClose={() => setShowDetail(null)} title="รายละเอียดการนัดหมาย">
        {showDetail && (
          <>
            <div className="mb-2 text-xs text-blue-900 font-mono">รหัสการจอง: {showDetail.id || '-'}</div>
            <div className="flex flex-col gap-3 mb-4">
              {/* Patient Card */}
              <div className="bg-white rounded-xl shadow p-3 flex flex-col gap-1 border border-blue-100 w-full">
                <div className="text-blue-900 font-bold text-base mb-1">ข้อมูลผู้ป่วย</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-2 gap-y-1 text-xs mb-2">
                  <div><span className="font-semibold">ชื่อ-นามสกุล:</span> {showDetail.Patient?.firstName || '-'} {showDetail.Patient?.lastName || ''}</div>
                  <div><span className="font-semibold">เบอร์โทร:</span> {showDetail.Patient?.Account?.phone || '-'}</div>
                  <div><span className="font-semibold">อีเมล:</span> {showDetail.Patient?.Account?.email || '-'}</div>
                </div>
                <div className="font-semibold text-blue-800 text-xs mt-1 mb-1">ข้อมูลทางการแพทย์</div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 grid grid-cols-2 sm:grid-cols-5 gap-x-2 gap-y-1 text-xs">
                  <div><span className="font-semibold">ส่วนสูง:</span> {showDetail.Patient?.PatientMedicalProfile?.height ? showDetail.Patient.PatientMedicalProfile.height + ' ซม.' : '-'}</div>
                  <div><span className="font-semibold">น้ำหนัก:</span> {showDetail.Patient?.PatientMedicalProfile?.weight ? showDetail.Patient.PatientMedicalProfile.weight + ' กก.' : '-'}</div>
                  <div><span className="font-semibold">กรุ๊ปเลือด:</span> {showDetail.Patient?.PatientMedicalProfile?.bloodType || '-'}</div>
                  <div><span className="font-semibold">โรคประจำตัว:</span> {showDetail.Patient?.PatientMedicalProfile?.congenital || '-'}</div>
                  <div><span className="font-semibold">โรคภูมิแพ้:</span> {showDetail.Patient?.PatientMedicalProfile?.allergies || '-'}</div>
                  <div><span className="font-semibold">การผ่าตัด:</span> {showDetail.Patient?.PatientMedicalProfile?.surgeries || '-'}</div>
                  <div><span className="font-semibold">ยาที่ใช้:</span> {showDetail.Patient?.PatientMedicalProfile?.medications || '-'}</div>
                  <div><span className="font-semibold">อาการ:</span> {showDetail.symptoms || '-'}</div>
                </div>
              </div>
              {/* Appointment Card */}
              <div className="bg-white rounded-xl shadow p-3 flex flex-col gap-1 border border-blue-100 w-full">
                <div className="text-blue-900 font-bold text-base mb-1">ข้อมูลการนัดหมาย</div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-2 gap-y-1 text-xs">
                  <div><span className="font-semibold">วันที่:</span> {showDetail.date ? showDetail.date.slice(0,10) : '-'}</div>
                  <div><span className="font-semibold">เวลา:</span> {showDetail.startTime || '-'} - {showDetail.endTime || '-'}</div>
                  <div><span className="font-semibold">สถานะ:</span> {showDetail.status === 'COMPLETED' ? 'เสร็จสิ้น' :
                    showDetail.status === 'CANCELLED' ? 'ยกเลิก' :
                    showDetail.status === 'PENDING' ? 'รอดำเนินการ' :
                    showDetail.status === 'CONFIRMED' ? 'ยืนยันแล้ว' :
                    showDetail.status || '-'}
                  </div>
                  <div><span className="font-semibold">ประเภท:</span> -</div>
                  <div><span className="font-semibold">บริการ:</span> -</div>
                </div>
              </div>
              {/* Doctor Card */}
              <div className="bg-white rounded-xl shadow p-3 flex flex-col gap-1 border border-blue-100 w-full">
                <div className="text-blue-900 font-bold text-base mb-1">ข้อมูลแพทย์</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1 text-xs">
                  <div><span className="font-semibold">ชื่อ-นามสกุล:</span> {showDetail.Doctor?.firstName || '-'} {showDetail.Doctor?.lastName || ''}</div>
                  <div><span className="font-semibold">ความเชี่ยวชาญ:</span> {showDetail.Doctor?.specialties && showDetail.Doctor.specialties.length > 0 ? showDetail.Doctor.specialties.map(s => s.Specialty?.name).filter(Boolean).join(', ') : '-'}</div>
                  <div className="col-span-2"><span className="font-semibold">ประวัติ:</span> {showDetail.Doctor?.bio || '-'}</div>
                  <div><span className="font-semibold">เบอร์โทร:</span> {showDetail.Doctor?.Account?.phone || '-'}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default DoctorAppointmentsPage;
