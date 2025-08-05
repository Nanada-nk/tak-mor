
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

function PatientProfile({
  profile,
  editField,
  editValue,
  editLoading,
  startEdit,
  cancelEdit,
  saveEdit,
  setEditValue,
  handleInputKey,
  onProfilePictureClick,
  customGender,
  setCustomGender
}) {
  const isDisplayOnly = !startEdit || !saveEdit || !cancelEdit;
  const navigate = useNavigate();
  // Helper to get value for a field from editValue or profile
  const getFieldValue = (field) => {
    let val = '';
    if (editField && typeof editValue === 'object' && editValue !== null && field in editValue) {
      val = editValue[field];
    } else if (profile?.[field] !== undefined && profile?.[field] !== null) {
      val = profile[field];
    }
    // Always return a string for input value
    return val === undefined || val === null ? '' : String(val);
  };
  const [tab, setTab] = useState("personal");
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const heightRef = useRef(null);
  const weightRef = useRef(null);
  const bloodTypeRef = useRef(null);
  const congenitalRef = useRef(null);
  const allergiesRef = useRef(null);
  const surgeriesRef = useRef(null);
  const medicationsRef = useRef(null);
  const medicalHistoryRef = useRef(null);

  // Focus input when editing
  useEffect(() => {
    if (editField === "firstName_lastName" && firstNameRef.current) firstNameRef.current.focus();
    if (editField === "phone" && phoneRef.current) phoneRef.current.focus();
    if (editField === "address" && addressRef.current) addressRef.current.focus();
    if (editField === "height" && heightRef.current) heightRef.current.focus();
    if (editField === "weight" && weightRef.current) weightRef.current.focus();
    if (editField === "bloodType" && bloodTypeRef.current) bloodTypeRef.current.focus();
    if (editField === "congenital" && congenitalRef.current) congenitalRef.current.focus();
    if (editField === "allergies" && allergiesRef.current) allergiesRef.current.focus();
    if (editField === "surgeries" && surgeriesRef.current) surgeriesRef.current.focus();
    if (editField === "medications" && medicationsRef.current) medicationsRef.current.focus();
    if (editField === "medicalHistory" && medicalHistoryRef.current) medicalHistoryRef.current.focus();
  }, [editField]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto relative">
        {/* Edit/Done button top right */}
        {isDisplayOnly ? (
          <button
            className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-800 transition-colors z-20"
            onClick={() => navigate('/dashboard/patient/profile/edit')}
            title="Edit Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 3.487a2.121 2.121 0 113 3L7.5 18.35l-4 1 1-4L16.862 3.487z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-2-2" /></svg>
            Edit
          </button>
        ) : (
          <button
            className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded shadow hover:bg-green-800 transition-colors z-20"
            onClick={() => navigate('/dashboard/patient/profile')}
            title="Done"
          >
            Done
          </button>
        )}
        {/* Profile Pic + Name Row */}
        <div className="flex flex-col items-center md:flex-row md:items-center gap-6 mb-8">
          {/* Profile Picture */}
          <div className="relative">
            <div 
              className={`h-36 w-36 md:h-40 md:w-40 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 border-4 border-blue-200 shadow flex items-center justify-center overflow-hidden select-none ${!isDisplayOnly ? 'cursor-pointer hover:ring-4 hover:ring-blue-300' : ''}`}
              onClick={!isDisplayOnly && typeof onProfilePictureClick === 'function' ? onProfilePictureClick : undefined}
              title={!isDisplayOnly ? 'Change Profile Picture' : undefined}
            >
              {profile?.profilePictureUrl ? (
                <img
                  src={profile.profilePictureUrl}
                  alt="Patient Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-6xl font-bold text-white">
                  {profile?.firstName?.[0]?.toUpperCase() || ''}{profile?.lastName?.[0]?.toUpperCase() || ''}
                </span>
              )}
            </div>
            {!isDisplayOnly && (
              <div 
                className="absolute bottom-0 right-0 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full p-2.5 shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105 ring-2 ring-white cursor-pointer"
                onClick={typeof onProfilePictureClick === 'function' ? onProfilePictureClick : undefined}
                title="Change Profile Picture"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            )}
          </div>
          {/* Name */}
          <div className="flex flex-col items-center md:items-start">
            {editField === "firstName_lastName" ? (
              <div className="flex items-center gap-2">
                <input
                  ref={firstNameRef}
                  className="input input-sm max-w-[10rem]"
                  value={editValue.firstName}
                  onChange={e => setEditValue({ ...editValue, firstName: e.target.value })}
                  onKeyDown={handleInputKey}
                  disabled={editLoading}
                  placeholder="First Name"
                />
                <input
                  ref={lastNameRef}
                  className="input input-sm max-w-[10rem]"
                  value={editValue.lastName}
                  onChange={e => setEditValue({ ...editValue, lastName: e.target.value })}
                  onKeyDown={handleInputKey}
                  disabled={editLoading}
                  placeholder="Last Name"
                />
                <button type="button" className="btn btn-success btn-xs ml-2" onClick={saveEdit} disabled={editLoading}>Save</button>
                <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-gray-800">{profile?.firstName || ''} {profile?.lastName || ''}</h1>
                {startEdit && (
                  <button type="button" className="ml-1 p-0.5 rounded-full hover:bg-blue-100 focus:outline-none" onClick={() => startEdit("firstName_lastName", { firstName: profile?.firstName, lastName: profile?.lastName })} title="Edit Name">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <rect x="2" y="17" width="20" height="3" rx="1.5" fill="#e0e7ff"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.121 2.121 0 113 3L7.5 18.35l-4 1 1-4L16.862 3.487z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-2-2" />
                    </svg>
                  </button>
                )}
              </div>
            )}
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
                  {/* Name field removed, now editable beside profile picture */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500">HN</label>
                    <span className="text-gray-900 mt-1 font-medium">{profile?.hn || '-'}</span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Email</label>
                    <span className="text-gray-900 mt-1 font-medium">{profile?.email || '-'}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <label className="block text-xs font-medium text-gray-500">Phone</label>
                      {startEdit && (
                        <button type="button" className="ml-1 p-0.5 rounded-full hover:bg-blue-100 focus:outline-none" onClick={() => startEdit("phone", profile?.phone)} title="Edit Phone">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <rect x="2" y="17" width="20" height="3" rx="1.5" fill="#e0e7ff"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.121 2.121 0 113 3L7.5 18.35l-4 1 1-4L16.862 3.487z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-2-2" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="flex items-center min-h-[2.25rem]">
                      {editField === "phone" ? (
                        <>
                          <input
                            ref={phoneRef}
                            className="input input-sm w-full"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            onKeyDown={handleInputKey}
                            disabled={editLoading}
                            placeholder="Phone"
                          />
                          <div className="flex items-center gap-2 ml-2">
                            <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                            <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <span className="text-gray-900 font-medium w-full">{profile?.phone || '-'}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">National ID</label>
                    <span className="text-gray-900 mt-1 font-medium">{profile?.nationalId || '-'}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <label className="block text-xs font-medium text-gray-500">Birth Date</label>
                      {startEdit && (
                        <button type="button" className="ml-1 p-0.5 rounded-full hover:bg-blue-100 focus:outline-none" onClick={() => startEdit("birthDate", profile?.birthDate)} title="Edit Birth Date">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <rect x="2" y="17" width="20" height="3" rx="1.5" fill="#e0e7ff"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.121 2.121 0 113 3L7.5 18.35l-4 1 1-4L16.862 3.487z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-2-2" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="flex items-center min-h-[2.25rem]">
                      {editField === "birthDate" ? (
                        <>
                          <input
                            type="date"
                            className="input input-sm w-full"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            onKeyDown={handleInputKey}
                            disabled={editLoading}
                            placeholder="Birth Date"
                          />
                          <div className="flex items-center gap-2 ml-2">
                            <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                            <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <span className="text-gray-900 font-medium w-full">{profile?.birthDate || '-'}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <label className="block text-xs font-medium text-gray-500">Gender</label>
                      {startEdit && (
                        <button type="button" className="ml-1 p-0.5 rounded-full hover:bg-blue-100 focus:outline-none" onClick={() => startEdit("gender", profile?.gender)} title="Edit Gender">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <rect x="2" y="17" width="20" height="3" rx="1.5" fill="#e0e7ff"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.121 2.121 0 113 3L7.5 18.35l-4 1 1-4L16.862 3.487z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-2-2" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="flex items-center min-h-[2.25rem]">
                      {editField === "gender" ? (
                        <>
                          <select
                            className="input input-sm w-full max-w-[10rem]"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            onKeyDown={handleInputKey}
                            disabled={editLoading}
                          >
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                          </select>
                          {editValue === "OTHER" && typeof setCustomGender === 'function' && (
                            <input
                              className="input input-sm ml-2 w-full max-w-[12rem]"
                              placeholder="Please specify..."
                              value={typeof customGender !== 'undefined' ? customGender : ''}
                              onChange={e => setCustomGender(e.target.value)}
                              onKeyDown={handleInputKey}
                              disabled={editLoading}
                            />
                          )}
                          <div className="flex items-center gap-2 ml-2">
                            <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                            <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <span className="text-gray-900 font-medium w-full">{profile?.gender || '-'}</span>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-1 mb-1">
                      <label className="block text-xs font-medium text-gray-500">Address</label>
                      {startEdit && (
                        <button type="button" className="ml-1 p-0.5 rounded-full hover:bg-blue-100 focus:outline-none" onClick={() => startEdit("address", profile?.address)} title="Edit Address">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <rect x="2" y="17" width="20" height="3" rx="1.5" fill="#e0e7ff"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.121 2.121 0 113 3L7.5 18.35l-4 1 1-4L16.862 3.487z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-2-2" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="flex items-center min-h-[2.25rem]">
                      {editField === "address" ? (
                        <>
                          <textarea
                            ref={addressRef}
                            className="input input-sm w-full h-full max-w-md resize-none"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            onKeyDown={handleInputKey}
                            disabled={editLoading}
                            placeholder="Address"
                            rows={2}
                          />
                          <div className="flex items-center gap-2 ml-2">
                            <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                            <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <span className="text-gray-900 font-medium w-full">{profile?.address || '-'}</span>
                      )}
                    </div>
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
                    <div className="flex items-center gap-1 mb-1">
                      <label className="block text-xs font-medium text-gray-500">Name</label>
                      {startEdit && (
                        <button type="button" className="ml-1 p-0.5 rounded-full hover:bg-blue-100 focus:outline-none" onClick={() => startEdit("emergencyContactName", {
                          emergencyContactName: profile?.emergencyContactName || '',
                          emergencyContactPhone: profile?.emergencyContactPhone || '',
                          emergencyContactRelation: profile?.emergencyContactRelation || ''
                        })} title="Edit Emergency Contact Name">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <rect x="2" y="17" width="20" height="3" rx="1.5" fill="#e0e7ff"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.121 2.121 0 113 3L7.5 18.35l-4 1 1-4L16.862 3.487z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-2-2" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="flex items-center min-h-[2.25rem]">
                    {editField === "emergencyContactName" ? (
                      <>
                        <input
                          className="input input-sm w-full"
                          value={typeof editValue === 'object' ? editValue.emergencyContactName || '' : editValue || ''}
                          onChange={e => setEditValue({ ...editValue, emergencyContactName: e.target.value })}
                          onKeyDown={handleInputKey}
                          disabled={editLoading}
                          placeholder="Emergency Contact Name"
                        />
                        <div className="flex items-center gap-2 ml-2">
                          <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                          <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <span className="text-gray-900 font-medium w-full">{profile?.emergencyContactName || '-'}</span>
                    )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <label className="block text-xs font-medium text-gray-500">Phone</label>
                      {startEdit && (
                        <button type="button" className="ml-1 p-0.5 rounded-full hover:bg-blue-100 focus:outline-none" onClick={() => startEdit("emergencyContactPhone", {
                          emergencyContactName: profile?.emergencyContactName || '',
                          emergencyContactPhone: profile?.emergencyContactPhone || '',
                          emergencyContactRelation: profile?.emergencyContactRelation || ''
                        })} title="Edit Emergency Contact Phone">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <rect x="2" y="17" width="20" height="3" rx="1.5" fill="#e0e7ff"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.121 2.121 0 113 3L7.5 18.35l-4 1 1-4L16.862 3.487z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-2-2" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="flex items-center min-h-[2.25rem]">
                    {editField === "emergencyContactPhone" ? (
                      <>
                        <input
                          className="input input-sm w-full"
                          value={typeof editValue === 'object' ? editValue.emergencyContactPhone || '' : editValue || ''}
                          onChange={e => setEditValue({ ...editValue, emergencyContactPhone: e.target.value })}
                          onKeyDown={handleInputKey}
                          disabled={editLoading}
                          placeholder="Emergency Contact Phone"
                        />
                        <div className="flex items-center gap-2 ml-2">
                          <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                          <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <span className="text-gray-900 font-medium w-full">{profile?.emergencyContactPhone || '-'}</span>
                    )}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-1 mb-1">
                      <label className="block text-xs font-medium text-gray-500">Relation</label>
                      {startEdit && (
                        <button type="button" className="ml-1 p-0.5 rounded-full hover:bg-blue-100 focus:outline-none" onClick={() => startEdit("emergencyContactRelation", {
                          emergencyContactName: profile?.emergencyContactName || '',
                          emergencyContactPhone: profile?.emergencyContactPhone || '',
                          emergencyContactRelation: profile?.emergencyContactRelation || ''
                        })} title="Edit Emergency Contact Relation">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <rect x="2" y="17" width="20" height="3" rx="1.5" fill="#e0e7ff"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.121 2.121 0 113 3L7.5 18.35l-4 1 1-4L16.862 3.487z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-2-2" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="flex items-center min-h-[2.25rem]">
                    {editField === "emergencyContactRelation" ? (
                      <>
                        <input
                          className="input input-sm w-full"
                          value={typeof editValue === 'object' ? editValue.emergencyContactRelation || '' : editValue || ''}
                          onChange={e => setEditValue({ ...editValue, emergencyContactRelation: e.target.value })}
                          onKeyDown={handleInputKey}
                          disabled={editLoading}
                          placeholder="Emergency Contact Relation"
                        />
                        <div className="flex items-center gap-2 ml-2">
                          <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                          <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <span className="text-gray-900 font-medium w-full">{profile?.emergencyContactRelation || '-'}</span>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tab === 'medical' && (
              <div className="bg-white rounded-lg shadow p-4 border-t-4 border-green-400">
                <h2 className="text-lg font-semibold mb-2 text-green-700 flex items-center gap-2">
                  {/* Standard medical cross icon */}
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  Medical Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <label className="block text-xs font-medium text-gray-500">Height (cm)</label>
                      {startEdit ? (
                        <button type="button" className="ml-1 p-0.5 rounded-full hover:bg-blue-100 focus:outline-none" onClick={() => startEdit("height", { height: profile?.height, weight: profile?.weight, bloodType: profile?.bloodType, congenital: profile?.congenital, allergies: profile?.allergies })} title="Edit Height">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <rect x="2" y="17" width="20" height="3" rx="1.5" fill="#e0e7ff"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.121 2.121 0 113 3L7.5 18.35l-4 1 1-4L16.862 3.487z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-2-2" />
                          </svg>
                        </button>
                      ) : (
                        <span className="ml-1 inline-block w-5 h-5 opacity-0 pointer-events-none"></span>
                      )}
                    </div>
                    <div className="flex items-center min-h-[2rem]">
                      {editField === "height" ? (
                        <>
                          <input
                            ref={heightRef}
                            className="input input-sm w-full"
                            value={getFieldValue('height')}
                            onChange={e => setEditValue({ ...editValue, height: e.target.value })}
                            onKeyDown={handleInputKey}
                            disabled={editLoading}
                            placeholder="Height"
                          />
                          <div className="flex items-center gap-2 ml-2">
                            <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                            <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <span className="text-gray-900 font-medium w-full">{profile?.height || '-'}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <label className="block text-xs font-medium text-gray-500">Weight (kg)</label>
                      {startEdit ? (
                        <button type="button" className="ml-1 p-0.5 rounded-full hover:bg-blue-100 focus:outline-none" onClick={() => startEdit("weight", { height: profile?.height, weight: profile?.weight, bloodType: profile?.bloodType, congenital: profile?.congenital, allergies: profile?.allergies })} title="Edit Weight">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <rect x="2" y="17" width="20" height="3" rx="1.5" fill="#e0e7ff"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.121 2.121 0 113 3L7.5 18.35l-4 1 1-4L16.862 3.487z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-2-2" />
                          </svg>
                        </button>
                      ) : (
                        <span className="ml-1 inline-block w-5 h-5 opacity-0 pointer-events-none"></span>
                      )}
                    </div>
                    <div className="flex items-center min-h-[2rem]">
                      {editField === "weight" ? (
                        <>
                          <input
                            ref={weightRef}
                            className="input input-sm w-full"
                            value={getFieldValue('weight')}
                            onChange={e => setEditValue({ ...editValue, weight: e.target.value })}
                            onKeyDown={handleInputKey}
                            disabled={editLoading}
                            placeholder="Weight"
                          />
                          <div className="flex items-center gap-2 ml-2">
                            <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                            <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <span className="text-gray-900 font-medium w-full">{profile?.weight || '-'}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <label className="block text-xs font-medium text-gray-500">Blood Type</label>
                      {startEdit ? (
                        <button type="button" className="ml-1 p-0.5 rounded-full hover:bg-blue-100 focus:outline-none" onClick={() => startEdit("bloodType", { height: profile?.height, weight: profile?.weight, bloodType: profile?.bloodType, congenital: profile?.congenital, allergies: profile?.allergies })} title="Edit Blood Type">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <rect x="2" y="17" width="20" height="3" rx="1.5" fill="#e0e7ff"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.121 2.121 0 113 3L7.5 18.35l-4 1 1-4L16.862 3.487z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-2-2" />
                          </svg>
                        </button>
                      ) : (
                        <span className="ml-1 inline-block w-5 h-5 opacity-0 pointer-events-none"></span>
                      )}
                    </div>
                    <div className="flex items-center min-h-[2rem]">
                      {editField === "bloodType" ? (
                        <>
                          <input
                            ref={bloodTypeRef}
                            className="input input-sm w-full"
                            value={getFieldValue('bloodType')}
                            onChange={e => setEditValue({ ...editValue, bloodType: e.target.value })}
                            onKeyDown={handleInputKey}
                            disabled={editLoading}
                            placeholder="Blood Type"
                          />
                          <div className="flex items-center gap-2 ml-2">
                            <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                            <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <span className="text-gray-900 font-medium w-full">{profile?.bloodType || '-'}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <label className="block text-xs font-medium text-gray-500">Congenital Diseases</label>
                      {startEdit ? (
                        <button type="button" className="ml-1 p-0.5 rounded-full hover:bg-blue-100 focus:outline-none" onClick={() => startEdit("congenital", { height: profile?.height, weight: profile?.weight, bloodType: profile?.bloodType, congenital: profile?.congenital, allergies: profile?.allergies })} title="Edit Congenital Diseases">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <rect x="2" y="17" width="20" height="3" rx="1.5" fill="#e0e7ff"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.121 2.121 0 113 3L7.5 18.35l-4 1 1-4L16.862 3.487z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-2-2" />
                          </svg>
                        </button>
                      ) : (
                        <span className="ml-1 inline-block w-5 h-5 opacity-0 pointer-events-none"></span>
                      )}
                    </div>
                    <div className="flex items-center min-h-[2rem]">
                      {editField === "congenital" ? (
                        <>
                          <input
                            ref={congenitalRef}
                            className="input input-sm w-full"
                            value={getFieldValue('congenital')}
                            onChange={e => setEditValue({ ...editValue, congenital: e.target.value })}
                            onKeyDown={handleInputKey}
                            disabled={editLoading}
                            placeholder="Congenital Diseases"
                          />
                          <div className="flex items-center gap-2 ml-2">
                            <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                            <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <span className="text-gray-900 font-medium w-full">{profile?.congenital || '-'}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <label className="block text-xs font-medium text-gray-500">Allergies</label>
                      {startEdit ? (
                        <button type="button" className="ml-1 p-0.5 rounded-full hover:bg-blue-100 focus:outline-none" onClick={() => startEdit("allergies", { height: profile?.height, weight: profile?.weight, bloodType: profile?.bloodType, congenital: profile?.congenital, allergies: profile?.allergies })} title="Edit Allergies">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <rect x="2" y="17" width="20" height="3" rx="1.5" fill="#e0e7ff"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.121 2.121 0 113 3L7.5 18.35l-4 1 1-4L16.862 3.487z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-2-2" />
                          </svg>
                        </button>
                      ) : (
                        <span className="ml-1 inline-block w-5 h-5 opacity-0 pointer-events-none"></span>
                      )}
                    </div>
                    <div className="flex items-center min-h-[2rem]">
                      {editField === "allergies" ? (
                        <>
                          <input
                            ref={allergiesRef}
                            className="input input-sm w-full"
                            value={getFieldValue('allergies')}
                            onChange={e => setEditValue({ ...editValue, allergies: e.target.value })}
                            onKeyDown={handleInputKey}
                            disabled={editLoading}
                            placeholder="Allergies"
                          />
                          <div className="flex items-center gap-2 ml-2">
                            <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                            <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <span className="text-gray-900 font-medium w-full">{profile?.allergies || '-'}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default PatientProfile;