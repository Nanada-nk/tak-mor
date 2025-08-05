import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.js";

function DoctorDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [editedDoctor, setEditedDoctor] = useState({});

  useEffect(() => {
    axiosInstance
      .get("/api/doctor")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Failed to fetch doctors:", err));
  }, []);

  const handleEdit = (doctor) => {
    setEditingDoctorId(doctor.id);
    setEditedDoctor({
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      phone: doctor.Account?.phone || "",
      email: doctor.Account?.email || "",
      role: doctor.Account?.role || "",
      address: doctor.address || "",
    });
  };

  const handleInputChange = (e, field) => {
    setEditedDoctor({
      ...editedDoctor,
      [field]: e.target.value,
    });
  };

  const handleSave = async (id) => {
    try {
      const response = await axiosInstance.put(
        `/api/doctor/${id}`,
        editedDoctor
      );

      // Update local state
      setDoctors((prev) =>
        prev.map((doc) => (doc.id === id ? response.data : doc))
      );

      setEditingDoctorId(null);
    } catch (error) {
      console.error("Failed to save doctor:", error);
      alert("Failed to save changes.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className='w-full h-20 p-6 text-center text-3xl mb-4 bg-blue-200 font-extrabold rounded-md shadow-sm border border-gray-200 '>ข้อมูลรายชื่อ แพทย์ / Doctor List</div>
      <div className="bg-white shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 text-left"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Added
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="hover:bg-gray-50">
                <td></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {doctor?.Account?.profilePictureUrl ? (
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={doctor.Account.profilePictureUrl}
                          alt=""
                        />
                      ) : (
                        <span className="text-lg h-full font-bold text-blue-500 rounded-full w-full bg-blue-100 flex items-center justify-center">
                          {doctor.firstName?.[0]?.toUpperCase() || ""}
                          {doctor.lastName?.[0]?.toUpperCase() || ""}
                        </span>
                      )}
                    </div>
                    <div className="ml-4">{doctor.id}</div>
                  </div>
                </td>

                {/* First Name */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingDoctorId === doctor.id ? (
                    <input
                      type="text"
                      value={editedDoctor.firstName}
                      onChange={(e) => handleInputChange(e, "firstName")}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    doctor.firstName
                  )}
                </td>

                {/* Last Name */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingDoctorId === doctor.id ? (
                    <input
                      type="text"
                      value={editedDoctor.lastName}
                      onChange={(e) => handleInputChange(e, "lastName")}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    doctor.lastName
                  )}
                </td>

                {/* Phone */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingDoctorId === doctor.id ? (
                    <input
                      type="text"
                      value={editedDoctor.phone}
                      onChange={(e) => handleInputChange(e, "phone")}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    doctor.Account?.phone || "Not available"
                  )}
                </td>

                {/* Email */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingDoctorId === doctor.id ? (
                    <input
                      type="text"
                      value={editedDoctor.email}
                      onChange={(e) => handleInputChange(e, "email")}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    doctor.Account?.email
                  )}
                </td>

                {/* Role */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingDoctorId === doctor.id ? (
                    <select
                      value={editedDoctor.role}
                      onChange={(e) => handleInputChange(e, "role")}
                      className="border px-2 py-1 rounded w-full"
                    >
                      <option value="">Select role</option>
                      <option value="DOCTOR">DOCTOR</option>
                      <option value="ADMIN">PATIENT</option>
                      <option value="STAFF">ADMIN</option>
                    </select>
                  ) : (
                    doctor.Account?.role
                  )}
                </td>

                {/* Address */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingDoctorId === doctor.id ? (
                    <input
                      type="text"
                      value={editedDoctor.address}
                      onChange={(e) => handleInputChange(e, "address")}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : doctor.address?.length > 10 ? (
                    doctor.address.substring(0, 10) + "..."
                  ) : (
                    doctor.address
                  )}
                </td>

                {/* Created At */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doctor.Account?.createdAt?.split("T")[0]}
                </td>

                {/* Action */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingDoctorId === doctor.id ? (
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleSave(doctor.id)}
                        className="text-green-600 hover:text-green-900"
                        title="Save"
                      >
                        💾
                      </button>
                      <button
                        onClick={() => setEditingDoctorId(null)}
                        className="text-red-600 hover:text-red-900"
                        title="Cancel"
                      >
                        ❌
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(doctor)}
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

export default DoctorDashboard;
