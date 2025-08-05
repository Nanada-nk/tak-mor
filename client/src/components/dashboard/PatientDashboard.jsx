import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.js";

function PatientDashboard() {
  const [patients, setPatients] = useState([]);
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [editedPatient, setEditedPatient] = useState({});

  useEffect(() => {
    axiosInstance
      .get("/api/patient")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("Failed to fetch patients:", err));
  }, []);

  const handleEdit = (patient) => {
    setEditingPatientId(patient.id);
    setEditedPatient({
      firstName: patient.firstName,
      lastName: patient.lastName,
      phone: patient.Account?.phone || "",
      email: patient.Account?.email || "",
      role: patient.Account?.role || "",
      address: patient.address || "",
    });
  };

  const handleInputChange = (e, field) => {
    setEditedPatient({
      ...editedPatient,
      [field]: e.target.value,
    });
  };

  const handleSave = async (id) => {
    try {
      const response = await axiosInstance.put(
        `/api/patient/${id}`,
        editedPatient
      );

      
      setPatients((prev) =>
        prev.map((pat) => (pat.id === id ? response.data : pat))
      );

      setEditingPatientId(null);
    } catch (error) {
      console.error("Failed to save patient:", error);
      alert("Failed to save changes.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
              <div className='w-full  h-20 p-6 text-center text-3xl mb-4 bg-blue-200 font-extrabold rounded-md shadow-sm border border-gray-200 '>ข้อมูลรายชื่อ คนไข้ / Patient List</div>

      <div className="bg-white shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 text-left"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ชื่อจริง
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                นามสกุล
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                เบอร์มือถือ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                อีเมล
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ที่อยู่
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สร้างเมื่อ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                แก้ใข
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {patient?.Account?.profilePictureUrl ? (
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={patient.Account.profilePictureUrl}
                          alt=""
                        />
                      ) : (
                        <span className="text-lg h-full font-bold text-blue-500 rounded-full w-full bg-blue-100 flex items-center justify-center">
                          {patient.firstName?.[0]?.toUpperCase() || ""}
                          {patient.lastName?.[0]?.toUpperCase() || ""}
                        </span>
                      )}
                    </div>
                    <div className="ml-4">{patient.id}</div>
                  </div>
                </td>

                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingPatientId === patient.id ? (
                    <input
                      type="text"
                      value={editedPatient.firstName}
                      onChange={(e) => handleInputChange(e, "firstName")}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    patient.firstName
                  )}
                </td>

              
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingPatientId === patient.id ? (
                    <input
                      type="text"
                      value={editedPatient.lastName}
                      onChange={(e) => handleInputChange(e, "lastName")}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                   patient.lastName
                  )}
                </td>

               
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingPatientId === patient.id ? (
                    <input
                      type="text"
                      value={editedPatient.phone}
                      onChange={(e) => handleInputChange(e, "phone")}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    patient.Account?.phone || "Not available"
                  )}
                </td>

              
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingPatientId === patient.id ? (
                    <input
                      type="text"
                      value={editedPatient.email}
                      onChange={(e) => handleInputChange(e, "email")}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    patient.Account?.email
                  )}
                </td>

              
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingPatientId === patient.id ? (
                    <select
                      value={editedPatient.role}
                      onChange={(e) => handleInputChange(e, "role")}
                      className="border px-2 py-1 rounded w-full"
                    >
                      <option value="">Select role</option>
                      <option value="DOCTOR">DOCTOR</option>
                      <option value="ADMIN">PATIENT</option>
                      <option value="STAFF">ADMIN</option>
                    </select>
                  ) : (
                    patient.Account?.role
                  )}
                </td>

             
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingPatientId === patient.id ? (
                    <input
                      type="text"
                      value={editedPatient.address}
                      onChange={(e) => handleInputChange(e, "address")}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : patient.address?.length > 10 ? (
                    patient.address.substring(0, 10) + "..."
                  ) : (
                    patient.address
                  )}
                </td>

               
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.Account?.createdAt?.split("T")[0]}
                </td>

              
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingPatientId === patient.id ? (
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleSave(patient.id)}
                        className="text-green-600 hover:text-green-900"
                        title="Save"
                      >
                        💾
                      </button>
                      <button
                        onClick={() => setEditingPatientId(null)}
                        className="text-red-600 hover:text-red-900"
                        title="Cancel"
                      >
                        ❌
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(patient)}
                      className="text-gray-600 mr-5 hover:text-gray-900"
                      title="Edit"
                    >
                      ✏️
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientDashboard;
