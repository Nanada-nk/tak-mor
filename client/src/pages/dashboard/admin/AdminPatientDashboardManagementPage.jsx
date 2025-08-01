// import {Search} from "lucide-react"
// import PatientDashboard from "../../../components/dashboard/PatientDashboard.jsx"

// function AdminPatientDashboardManagementPage() {
//   return (
//     <div className="font-prompt">
//       <h3>AdminDashBoard</h3>

//       <div className="join my-7">
//         <div>
//           <label className="input validator join-item w-100 ">
//             <Search />
//             <input type="email" placeholder="Searc ..." required />
//           </label>
//           <div className="validator-hint hidden">Enter valid email address</div>
//         </div>
//         <button className="btn btn-neutral join-item">+ Add </button>
//       </div>
//       <div>
//         <PatientDashboard/>
//       </div>

//     </div>
//   )
// }
// export default AdminPatientDashboardManagementPage



import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import PatientDashboard from "../../../components/dashboard/PatientDashboard.jsx"
import adminStore from "../../../stores/adminStore.js";

function AdminPatientDashboardManagementPage() {

  const patients = adminStore((state) => state.patients);
  const isLoading = adminStore((state) => state.isLoading);
  const error = adminStore((state) => state.error);
  const pagination = adminStore((state) => state.pagination);
  const filters = adminStore((state) => state.filters);
  const fetchPatients = adminStore((state) => state.fetchPatients);
  const setFilters = adminStore((state) => state.setFilters);
  const setPagination = adminStore((state) => state.setPagination);


  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  useEffect(() => {
    fetchPatients(filters, pagination.currentPage);
  }, [fetchPatients, filters, pagination.currentPage]);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setFilters({ search: searchTerm });
  };

  const handlePageChange = (newPage) => {
    setPagination({ currentPage: newPage });
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-xl">
          <span className="loading loading-infinity loading-xl text-primary"></span>
          <p className="mt-4 text-lg font-semibold text-gray-700">กำลังโหลดข้อมูลผู้ป่วย...</p>
          <p className="text-sm text-gray-500">โปรดรอสักครู่</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-xl">
          <span className="loading loading-infinity loading-xl text-error"></span>
          <h3 className="mt-4 text-lg font-semibold text-red-700">เกิดข้อผิดพลาดในการโหลดข้อมูล</h3>
          <p className="text-sm text-red-500">{error}</p> {/* แสดงข้อความ Error */}
          <button
            onClick={() => fetchPatients(filters, pagination.currentPage)} // ปุ่มลองใหม่
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
      <h3 className="text-2xl font-bold mb-4">Patient Management Dashboard</h3>

      <div className="flex items-center my-7 space-x-2">
        <label className="input input-bordered flex items-center gap-2 flex-grow">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search ..."
            className="grow"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearchSubmit();
            }}
          />
        </label>
        <button className="btn btn-neutral px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700" onClick={handleSearchSubmit}>Search</button>
        <button className="btn btn-neutral px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">+ Add Patient</button>
      </div>

      <div>
        <PatientDashboard
          patients={patients}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default AdminPatientDashboardManagementPage;