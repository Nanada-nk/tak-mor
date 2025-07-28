import { useState } from "react";


function DoctorProfile() {

    const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    firstName: 'James',
    lastName: 'Smith',
    email: 'james.smith@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Springfield, USA',
    specialtyId: "302012",
    birtDate: "1 jan 2001"
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-10 mb-10">
        <div className="flex items-start space-x-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img
              className="h-48 w-48 rounded-full object-cover"
              src="https://via.placeholder.com/150"
              alt="User Avatar"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 relative">
            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-0 right-0 text-gray-600 hover:text-blue-600"
              title="Edit"
            >
              {/* Pencil Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full border rounded px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 mt-1">{user.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full border rounded px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 mt-1">{user.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border rounded px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 mt-1">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full border rounded px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 mt-1">{user.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      className="mt-1 block w-full border rounded px-3 py-2 text-sm"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-900 mt-1">{user.address}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">specialtyId</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={user.specialtyId}
                      onChange={handleChange}
                      className="mt-1 block w-full border rounded px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 mt-1">{user.specialtyId}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">birtDate</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={user.birtDate}
                      onChange={handleChange}
                      className="mt-1 block w-full border rounded px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 mt-1">{user.birtDate}</p>
                  )}
                </div>
              </div>



            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile