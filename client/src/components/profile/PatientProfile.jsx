
import { useState, useRef, useEffect } from "react";

function PatientProfile({
  profile,
  editField,
  editValue,
  editLoading,
  startEdit,
  cancelEdit,
  saveEdit,
  setEditValue,
  handleInputKey
}) {
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
      <div className="max-w-4xl mx-auto">
        {/* Profile Pic + Name Row */}
        <div className="flex flex-col items-center md:flex-row md:items-center gap-6 mb-8">
          {/* Profile Picture */}
          <div className="relative">
            <div className="h-36 w-36 md:h-40 md:w-40 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 border-4 border-blue-200 shadow flex items-center justify-center overflow-hidden select-none">
              <span className="text-6xl font-bold text-white">
                {profile?.firstName?.[0]?.toUpperCase() || ''}{profile?.lastName?.[0]?.toUpperCase() || ''}
              </span>
            </div>
          </div>
          {/* Name */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl font-bold text-gray-800">{profile?.firstName || ''} {profile?.lastName || ''}</h1>
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
                  <div className="flex gap-4 md:col-span-2">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-500">First Name</label>
                      {editField === "firstName_lastName" ? (
                        <input
                          ref={firstNameRef}
                          className="input input-sm w-full"
                          value={editValue.firstName}
                          onChange={e => setEditValue({ ...editValue, firstName: e.target.value })}
                          onKeyDown={handleInputKey}
                          disabled={editLoading}
                          placeholder="First Name"
                        />
                      ) : (
                        <span className="text-gray-900 mt-1 font-medium">
                          {profile?.firstName || '-'}
                          {startEdit && (
                            <button type="button" className="ml-2 btn btn-xs btn-ghost" onClick={() => startEdit("firstName_lastName", { firstName: profile?.firstName, lastName: profile?.lastName })} title="Edit Name">
                              ✎
                            </button>
                          )}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-500">Last Name</label>
                      {editField === "firstName_lastName" ? (
                        <input
                          ref={lastNameRef}
                          className="input input-sm w-full"
                          value={editValue.lastName}
                          onChange={e => setEditValue({ ...editValue, lastName: e.target.value })}
                          onKeyDown={handleInputKey}
                          disabled={editLoading}
                          placeholder="Last Name"
                        />
                      ) : (
                        <span className="text-gray-900 mt-1 font-medium">
                          {profile?.lastName || '-'}
                        </span>
                      )}
                    </div>
                    {editField === "firstName_lastName" && (
                      <div className="flex items-center gap-2 ml-2">
                        <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                        <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">HN</label>
                    <span className="text-gray-900 mt-1 font-medium">{profile?.hn || '-'}</span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Email</label>
                    <span className="text-gray-900 mt-1 font-medium">{profile?.email || '-'}</span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Phone</label>
                    {editField === "phone" ? (
                      <input
                        ref={phoneRef}
                        className="input input-sm w-full"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onKeyDown={handleInputKey}
                        disabled={editLoading}
                        placeholder="Phone"
                      />
                    ) : (
                      <span className="text-gray-900 mt-1 font-medium">
                        {profile?.phone || '-'}
                        {startEdit && (
                          <button type="button" className="ml-2 btn btn-xs btn-ghost" onClick={() => startEdit("phone", profile?.phone)} title="Edit Phone">
                            ✎
                          </button>
                        )}
                      </span>
                    )}
                    {editField === "phone" && (
                      <div className="flex items-center gap-2 mt-1">
                        <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                        <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">National ID</label>
                    <span className="text-gray-900 mt-1 font-medium">{profile?.nationalId || '-'}</span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Birth Date</label>
                    <span className="text-gray-900 mt-1 font-medium">{profile?.birthDate || '-'}</span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Gender</label>
                    <span className="text-gray-900 mt-1 font-medium">{profile?.gender || '-'}</span>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-500">Address</label>
                    {editField === "address" ? (
                      <input
                        ref={addressRef}
                        className="input input-sm w-full"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onKeyDown={handleInputKey}
                        disabled={editLoading}
                        placeholder="Address"
                      />
                    ) : (
                      <span className="text-gray-900 mt-1 font-medium">
                        {profile?.address || '-'}
                        {startEdit && (
                          <button type="button" className="ml-2 btn btn-xs btn-ghost" onClick={() => startEdit("address", profile?.address)} title="Edit Address">
                            ✎
                          </button>
                        )}
                      </span>
                    )}
                    {editField === "address" && (
                      <div className="flex items-center gap-2 mt-1">
                        <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                        <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                      </div>
                    )}
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
                        <div className="flex items-center gap-2 mt-1">
                          <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                          <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <span className="text-gray-900 mt-1 font-medium">
                        {profile?.emergencyContactName || '-'}
                        {startEdit && (
                          <button type="button" className="ml-2 btn btn-xs btn-ghost" onClick={() => startEdit("emergencyContactName", {
                            emergencyContactName: profile?.emergencyContactName || '',
                            emergencyContactPhone: profile?.emergencyContactPhone || '',
                            emergencyContactRelation: profile?.emergencyContactRelation || ''
                          })} title="Edit Emergency Contact Name">
                            ✎
                          </button>
                        )}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Phone</label>
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
                        <div className="flex items-center gap-2 mt-1">
                          <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                          <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <span className="text-gray-900 mt-1 font-medium">
                        {profile?.emergencyContactPhone || '-'}
                        {startEdit && (
                          <button type="button" className="ml-2 btn btn-xs btn-ghost" onClick={() => startEdit("emergencyContactPhone", {
                            emergencyContactName: profile?.emergencyContactName || '',
                            emergencyContactPhone: profile?.emergencyContactPhone || '',
                            emergencyContactRelation: profile?.emergencyContactRelation || ''
                          })} title="Edit Emergency Contact Phone">
                            ✎
                          </button>
                        )}
                      </span>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-500">Relation</label>
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
                        <div className="flex items-center gap-2 mt-1">
                          <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                          <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <span className="text-gray-900 mt-1 font-medium">
                        {profile?.emergencyContactRelation || '-'}
                        {startEdit && (
                          <button type="button" className="ml-2 btn btn-xs btn-ghost" onClick={() => startEdit("emergencyContactRelation", {
                            emergencyContactName: profile?.emergencyContactName || '',
                            emergencyContactPhone: profile?.emergencyContactPhone || '',
                            emergencyContactRelation: profile?.emergencyContactRelation || ''
                          })} title="Edit Emergency Contact Relation">
                            ✎
                          </button>
                        )}
                      </span>
                    )}
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
                    {editField === "height" ? (
                      <input
                        ref={heightRef}
                        className="input input-sm w-full"
                        value={getFieldValue('height')}
                        onChange={e => setEditValue({ ...editValue, height: e.target.value })}
                        onKeyDown={handleInputKey}
                        disabled={editLoading}
                        placeholder="Height"
                      />
                    ) : (
                      <span className="text-gray-900 mt-1 font-medium">
                        {profile?.height || '-'}
                        {startEdit && (
                          <button type="button" className="ml-2 btn btn-xs btn-ghost" onClick={() => startEdit("height", { height: profile?.height, weight: profile?.weight, bloodType: profile?.bloodType, congenital: profile?.congenital, allergies: profile?.allergies })} title="Edit Height">
                            ✎
                          </button>
                        )}
                      </span>
                    )}
                    {editField === "height" && (
                      <div className="flex items-center gap-2 mt-1">
                        <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                        <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Weight (kg)</label>
                    {editField === "weight" ? (
                      <input
                        ref={weightRef}
                        className="input input-sm w-full"
                        value={getFieldValue('weight')}
                        onChange={e => setEditValue({ ...editValue, weight: e.target.value })}
                        onKeyDown={handleInputKey}
                        disabled={editLoading}
                        placeholder="Weight"
                      />
                    ) : (
                      <span className="text-gray-900 mt-1 font-medium">
                        {profile?.weight || '-'}
                        {startEdit && (
                          <button type="button" className="ml-2 btn btn-xs btn-ghost" onClick={() => startEdit("weight", { height: profile?.height, weight: profile?.weight, bloodType: profile?.bloodType, congenital: profile?.congenital, allergies: profile?.allergies })} title="Edit Weight">
                            ✎
                          </button>
                        )}
                      </span>
                    )}
                    {editField === "weight" && (
                      <div className="flex items-center gap-2 mt-1">
                        <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                        <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Blood Type</label>
                    {editField === "bloodType" ? (
                      <input
                        ref={bloodTypeRef}
                        className="input input-sm w-full"
                        value={getFieldValue('bloodType')}
                        onChange={e => setEditValue({ ...editValue, bloodType: e.target.value })}
                        onKeyDown={handleInputKey}
                        disabled={editLoading}
                        placeholder="Blood Type"
                      />
                    ) : (
                      <span className="text-gray-900 mt-1 font-medium">
                        {profile?.bloodType || '-'}
                        {startEdit && (
                          <button type="button" className="ml-2 btn btn-xs btn-ghost" onClick={() => startEdit("bloodType", { height: profile?.height, weight: profile?.weight, bloodType: profile?.bloodType, congenital: profile?.congenital, allergies: profile?.allergies })} title="Edit Blood Type">
                            ✎
                          </button>
                        )}
                      </span>
                    )}
                    {editField === "bloodType" && (
                      <div className="flex items-center gap-2 mt-1">
                        <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                        <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Congenital Diseases</label>
                    {editField === "congenital" ? (
                      <input
                        ref={congenitalRef}
                        className="input input-sm w-full"
                        value={getFieldValue('congenital')}
                        onChange={e => setEditValue({ ...editValue, congenital: e.target.value })}
                        onKeyDown={handleInputKey}
                        disabled={editLoading}
                        placeholder="Congenital Diseases"
                      />
                    ) : (
                      <span className="text-gray-900 mt-1 font-medium">
                        {profile?.congenital || '-'}
                        {startEdit && (
                          <button type="button" className="ml-2 btn btn-xs btn-ghost" onClick={() => startEdit("congenital", { height: profile?.height, weight: profile?.weight, bloodType: profile?.bloodType, congenital: profile?.congenital, allergies: profile?.allergies })} title="Edit Congenital Diseases">
                            ✎
                          </button>
                        )}
                      </span>
                    )}
                    {editField === "congenital" && (
                      <div className="flex items-center gap-2 mt-1">
                        <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                        <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Allergies</label>
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
                        <div className="flex items-center gap-2 mt-1">
                          <button type="button" className="btn btn-success btn-xs" onClick={saveEdit} disabled={editLoading}>Save</button>
                          <button type="button" className="btn btn-error btn-xs" onClick={cancelEdit} disabled={editLoading}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <span className="text-gray-900 mt-1 font-medium">
                        {profile?.allergies || '-'}
                        {startEdit && (
                          <button type="button" className="ml-2 btn btn-xs btn-ghost" onClick={() => startEdit("allergies", { height: profile?.height, weight: profile?.weight, bloodType: profile?.bloodType, congenital: profile?.congenital, allergies: profile?.allergies })} title="Edit Allergies">
                            ✎
                          </button>
                        )}
                      </span>
                    )}
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