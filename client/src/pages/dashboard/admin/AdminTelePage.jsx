import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import adminStore from "../../../stores/adminStore.js";
import TeleAppointmentTable from "../../../components/dashboard/TeleAppointmentTable.jsx"; 
import adminTeleApi from '../../../api/adminTeleApi.js';
import Swal from 'sweetalert2';


function AdminTelePage() {

  const appointments = adminStore((state) => state.appointments)
  const isLoading = adminStore((state) => state.isLoading)
  const error = adminStore((state) => state.error)
  const pagination = adminStore((state) => state.pagination)
  const filters = adminStore((state) => state.filters)
  const fetchAppointments = adminStore((state) => state.fetchAppointments)
  const setFilters = adminStore((state) => state.setFilters)
  const setPagination = adminStore((state) => state.setPagination)

  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  useEffect(() => {
    fetchAppointments(filters, pagination.currentPage);
  }, [fetchAppointments, filters, pagination.currentPage]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setFilters({ search: searchTerm });
    setPagination({ currentPage: 1 })
  };

  const handlePageChange = (newPage) => {
    setPagination({ currentPage: newPage });
  };

  const handleEditAppointment = useCallback((appointmentId) => {
    console.log("Edit appointment with ID:", appointmentId);
    Swal.fire({
      icon: 'info',
      title: 'ฟังก์ชันแก้ไข',
      text: `กำลังจะแก้ไข Appointment ID: ${appointmentId}`,
      confirmButtonText: 'ตกลง'
    });
  }, []);


  const handleDeleteAppointment = useCallback(async (appointmentId) => {
    console.log("Delete appointment with ID:", appointmentId);

    const result = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: `คุณต้องการลบการนัดหมาย ID: ${appointmentId} ใช่หรือไม่?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
      try {
        await adminTeleApi.deleteTeleAppointment(appointmentId);
        console.log(`Appointment ${appointmentId} deleted successfully.`);
        Swal.fire(
          'ลบสำเร็จ!',
          'การนัดหมายถูกลบเรียบร้อยแล้ว.',
          'success'
        );
        fetchAppointments(filters, pagination.currentPage);
      } catch (err) {
        console.error("Failed to delete appointment:", err);
        Swal.fire(
          'เกิดข้อผิดพลาด!',
          err.response?.data?.message || 'ไม่สามารถลบการนัดหมายได้.',
          'error'
        );
      }
    }
  }, [fetchAppointments, filters, pagination.currentPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 font-prompt">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-xl">
          <span className="loading loading-infinity loading-xl text-primary"></span>
          <p className="mt-4 text-lg font-semibold text-gray-700">กำลังโหลดข้อมูลการนัดหมาย...</p>
          <p className="text-sm text-gray-500">โปรดรอสักครู่</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-xl">
          <span className="loading loading-infinity loading-xl text-error"></span>
          <h3 className="mt-4 text-lg font-semibold text-red-700">เกิดข้อผิดพลาดในการโหลดข้อมูล</h3>
          <p className="text-lg">{error}</p>
          <button
            onClick={() => fetchAppointments(filters, pagination.currentPage)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-prompt p-4">
      <h3 className="text-2xl font-bold mb-4">Telemedicine Appointment Management</h3>


      <div className="flex items-center my-7 space-x-2">
        <label className="input input-bordered flex items-center gap-2 flex-grow">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search VN, Patient, or Doctor..."
            className="grow"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchSubmit();
            }}
          />
        </label>
        <button className="btn btn-neutral px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700" onClick={handleSearchSubmit}>Search</button>
        <button className="btn btn-neutral px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">+ Add Appointment</button>
      </div>


      <TeleAppointmentTable
        appointments={appointments}
        pagination={pagination}
        onPageChange={handlePageChange}
        onEditAppointment={handleEditAppointment}
        onDeleteAppointment={handleDeleteAppointment}
      />
    </div>
  );
}

export default AdminTelePage;