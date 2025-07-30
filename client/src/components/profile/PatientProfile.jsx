import { useState } from "react";

function PatientProfile() {
  // Mock data for all Patient and PatientMedicalProfile fields
  const profile = {
    // Personal Info
    hn: "45",
    firstName: "James",
    lastName: "Smith",
    nationalId: "1234567890123",
    birthDate: "2001-01-01",
    gender: "Male",
    address: "123 Main St, Springfield, USA",
    // Emergency Contact
    emergencyContactName: "Mary Smith",
    emergencyContactPhone: "987-654-3210",
    emergencyContactRelation: "Mother",
    // Medical Info
    height: "180",
    weight: "75",
    bloodType: "O+",
    congenital: "None",
    allergies: "Penicillin",
    surgeries: "Appendectomy",
    medications: "Ibuprofen",
    medicalHistory: "Asthma"
  };

  const [tab, setTab] = useState("personal");

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center md:items-start md:w-1/3">
            <div className="relative">
              <div className="h-40 w-40 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 border-4 border-blue-200 shadow flex items-center justify-center overflow-hidden select-none">
                <span className="text-6xl font-bold text-white">
                  {profile.firstName?.[0]?.toUpperCase() || ''}{profile.lastName?.[0]?.toUpperCase() || ''}
                </span>
              </div>
            </div>
            <div className="mt-4 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800">{profile.firstName} {profile.lastName}</h1>
              <p className="text-sm text-gray-500">Patient Profile</p>
            </div>
          </div>

          {/* Tabs and Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex w-full mb-6 border-b">
              <button
                className={`group flex-1 px-4 py-1 font-semibold rounded-t flex items-center justify-center gap-1 ${tab === 'personal' ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500' : 'text-gray-500 hover:text-blue-700'}`}
                onClick={() => setTab('personal')}
              >
                <svg
                  className={`inline h-4 w-4 -mt-0.5 ${tab === 'personal' ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'}`}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Personal Info
              </button>
              <button
                className={`group flex-1 px-4 py-1 font-semibold rounded-t flex items-center justify-center gap-1 min-w-0 ${tab === 'emergency' ? 'bg-red-100 text-red-700 border-b-2 border-red-500' : 'text-gray-500 hover:text-red-700'}`}
                onClick={() => setTab('emergency')}
              >
                <svg
                  className={`inline h-4 w-4 -mt-0.5 flex-shrink-0 ${tab === 'emergency' ? 'text-red-500' : 'text-gray-400 group-hover:text-red-500'}`}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92V19a2 2 0 01-2 2A19.72 19.72 0 013 5a2 2 0 012-2h2.09a2 2 0 012 1.72c.13.81.36 1.6.7 2.34a2 2 0 01-.45 2.11l-.27.27a16 16 0 006.29 6.29l.27-.27a2 2 0 012.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0122 16.92z" />
                </svg>
                <span className="overflow-hidden text-ellipsis">Emergency Contact</span>
              </button>
              <button
                className={`group flex-1 px-4 py-1 font-semibold rounded-t flex items-center justify-center gap-1 ${tab === 'medical' ? 'bg-green-100 text-green-700 border-b-2 border-green-500' : 'text-gray-500 hover:text-green-700'}`}
                onClick={() => setTab('medical')}
              >
                <svg
                  className={`inline h-4 w-4 -mt-0.5 ${tab === 'medical' ? 'text-green-500' : 'text-gray-400 group-hover:text-green-500'}`}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Medical Info
              </button>
            </div>

            {/* Tab Content */}
            {tab === 'personal' && (
              <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-400">
                <h2 className="text-lg font-semibold mb-4 text-blue-700 flex items-center gap-2">
                  <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500">HN</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.hn}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">First Name</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.firstName}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Last Name</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.lastName}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">National ID</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.nationalId}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Birth Date</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.birthDate}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Gender</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.gender}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-500">Address</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.address}</p>
                  </div>
                </div>
              </div>
            )}
            {tab === 'emergency' && (
              <div className="bg-white rounded-lg shadow p-6 border-t-4 border-red-400">
                <h2 className="text-lg font-semibold mb-4 text-red-700 flex items-center gap-2">
                  <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92V19a2 2 0 01-2 2A19.72 19.72 0 013 5a2 2 0 012-2h2.09a2 2 0 012 1.72c.13.81.36 1.6.7 2.34a2 2 0 01-.45 2.11l-.27.27a16 16 0 006.29 6.29l.27-.27a2 2 0 012.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0122 16.92z" /></svg>
                  Emergency Contact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Name</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.emergencyContactName}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.emergencyContactPhone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-500">Relation</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.emergencyContactRelation}</p>
                  </div>
                </div>
              </div>
            )}
            {tab === 'medical' && (
              <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-400">
                <h2 className="text-lg font-semibold mb-4 text-green-700 flex items-center gap-2">
                  {/* Standard medical cross icon */}
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  Medical Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Height (cm)</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.height}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Weight (kg)</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.weight}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Blood Type</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.bloodType}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Congenital Diseases</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.congenital}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Allergies</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.allergies}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Surgeries</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.surgeries}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Medications</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.medications}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-500">Medical History</label>
                    <p className="text-gray-900 mt-1 font-medium">{profile.medicalHistory}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;