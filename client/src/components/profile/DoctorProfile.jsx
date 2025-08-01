

import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";
import SpecialtySelector from "./SpecialtySelector";

function DoctorProfile({
  profile,
  editField,
  editValue,
  editLoading,
  startEdit,
  cancelEdit,
  saveEdit,
  setEditValue,
  handleInputKey,
  onSpecialtiesSave,
  onProfilePictureClick // Add this line
}) {
  // Determine if the profile is in display-only mode (no edit props passed)
  const isDisplayOnly = !startEdit || !saveEdit || !cancelEdit;
  const navigate = useNavigate();
  // Use separate refs for each editable field to avoid focus issues on cancel
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const bioRef = useRef(null);

  // Specialty editing state
  const [editSpecialties, setEditSpecialties] = React.useState(false);
  const [pendingSpecialties, setPendingSpecialties] = React.useState(Array.isArray(profile.Doctor?.specialties) ? profile.Doctor.specialties : []);
  const [savingSpecialties, setSavingSpecialties] = React.useState(false);

  // Focus the correct input/textarea when entering edit mode
  React.useEffect(() => {
    if (editField === "address" && addressRef.current) {
      addressRef.current.focus();
    } else if (editField === "bio" && bioRef.current) {
      bioRef.current.focus();
    } else if (editField === "firstName" && firstNameRef.current) {
      firstNameRef.current.focus();
    } else if (editField === "lastName" && lastNameRef.current) {
      lastNameRef.current.focus();
    } else if (editField === "phone" && phoneRef.current) {
      phoneRef.current.focus();
    }
  }, [editField]);
  if (!profile || !profile.Doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Doctor profile not found or incomplete.
      </div>
    );
  }

  const doctor = profile.Doctor;
  const fullName = `${doctor.firstName} ${doctor.lastName}`.trim();
  const email = profile.email;
  const phone = profile.phone;
  const address = doctor.address || "";
  const specialties = Array.isArray(doctor.specialties) ? doctor.specialties : [];
  const bio = doctor.bio || "";

  return (
    <div className="flex justify-center items-start min-h-[90vh] bg-gradient-to-br from-blue-100/60 to-white py-12 px-2">
      <div className="w-full max-w-3xl bg-white/95 rounded-3xl shadow-2xl border border-blue-100 relative overflow-hidden">
        {/* Edit/Done button top right */}
        {isDisplayOnly ? (
          <button
            className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-800 transition-colors z-20"
            onClick={() => navigate('/dashboard/doctor/profile/edit')}
            title="Edit Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 3.487a2.121 2.121 0 113 3L7.5 18.35l-4 1 1-4L16.862 3.487z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-2-2" /></svg>
            Edit
          </button>
        ) : (
          <button
            className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded shadow hover:bg-green-800 transition-colors z-20"
            onClick={() => navigate('/dashboard/doctor/profile')}
            title="Done"
          >
            Done
          </button>
        )}
        {/* Card header with avatar overlay */}
        <div className="relative flex flex-row items-center justify-start bg-gradient-to-r from-blue-200/60 to-blue-100/40 pt-10 pb-6 mb-4 px-8 gap-8">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-200/40 to-transparent pointer-events-none" />
          {/* Profile Picture on the left */}
          <div className="relative z-10 flex-shrink-0">
            <div
              className={`h-36 w-36 flex items-center justify-center rounded-full bg-blue-100 border-4 border-blue-300 shadow-lg overflow-hidden ring-4 ring-white ${!isDisplayOnly ? 'cursor-pointer hover:ring-blue-400' : ''}`}
              onClick={!isDisplayOnly && typeof onProfilePictureClick === 'function' ? onProfilePictureClick : undefined}
              title={!isDisplayOnly ? 'Change Profile Picture' : undefined}
            >
              <img
                src={profile.profilePictureUrl ? profile.profilePictureUrl : `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=3b82f6&color=fff&size=160`}
                alt="Doctor Avatar"
                className="h-full w-full object-cover"
              />
              {!isDisplayOnly && (
                <div className="absolute bottom-0 right-0 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full p-2.5 shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105 ring-2 ring-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
          {/* Name, Email, Phone on the right */}
          <div className="mt-0 text-left space-y-1 z-10 flex-1">
            {/* Editable First Name & Last Name */}
            <div className="text-2xl font-bold text-blue-800 flex items-center gap-2 flex-wrap min-h-[40px]">
              {editField === "firstName_lastName" ? (
                <div className="flex items-center gap-1">
                  <input
                    ref={firstNameRef}
                    className="border-b-2 border-blue-400 bg-blue-50 px-2 py-1 rounded text-blue-900 font-medium w-52 min-w-[150px] text-base"
                    value={editValue.firstName}
                    onChange={e => setEditValue({ ...editValue, firstName: e.target.value })}
                    onKeyDown={handleInputKey}
                    disabled={editLoading}
                    placeholder="First Name"
                  />
                  <input
                    ref={lastNameRef}
                    className="border-b-2 border-blue-400 bg-blue-50 px-2 py-1 rounded text-blue-900 font-medium w-52 min-w-[150px] text-base"
                    value={editValue.lastName}
                    onChange={e => setEditValue({ ...editValue, lastName: e.target.value })}
                    onKeyDown={handleInputKey}
                    disabled={editLoading}
                    placeholder="Last Name"
                  />
                  <button
                    type="button"
                    onClick={saveEdit}
                    className="btn btn-success btn-sm btn-circle ml-1"
                    aria-label="Save edit"
                    title="Save"
                    disabled={editLoading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="btn btn-error btn-sm btn-circle ml-1"
                    tabIndex={-1}
                    aria-label="Cancel edit"
                    title="Cancel"
                    disabled={editLoading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ) : (
                <span className="flex items-center gap-3">
                  <span>{doctor.firstName}</span>
                  <span>{doctor.lastName}</span>
                  {!isDisplayOnly && (
                    <button
                      type="button"
                      onClick={() => startEdit("firstName_lastName", { firstName: doctor.firstName, lastName: doctor.lastName })}
                      className="btn btn-ghost btn-xs btn-circle opacity-70 hover:opacity-100"
                      aria-label="Edit name"
                      title="Edit name"
                      style={{ padding: 0 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" /></svg>
                    </button>
                  )}
                </span>
              )}
            </div>
            {/* Email (not editable) */}
            <div className="text-base text-gray-500 break-all min-h-[40px] flex items-center">{email}</div>
            {/* Editable Phone */}
            <div className="text-base text-gray-500 min-h-[40px] flex items-center">
              {editField === "phone" ? (
                <div className="flex items-center gap-1">
                  <input
                    ref={phoneRef}
                    className="border-b-2 border-blue-400 bg-blue-50 px-1 py-0.5 rounded text-blue-900 w-32"
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onKeyDown={handleInputKey}
                    disabled={editLoading}
                  />
                  <button
                    type="button"
                    onClick={saveEdit}
                    className="btn btn-success btn-sm btn-circle ml-1"
                    aria-label="Save edit"
                    title="Save"
                    disabled={editLoading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="btn btn-error btn-sm btn-circle ml-1"
                    tabIndex={-1}
                    aria-label="Cancel edit"
                    title="Cancel"
                    disabled={editLoading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ) : (
                <span className="flex items-center gap-1">
                  <span>{phone}</span>
                  {!isDisplayOnly && (
                    <button
                      type="button"
                      onClick={() => startEdit("phone", phone)}
                      className="btn btn-ghost btn-xs btn-circle opacity-70 hover:opacity-100"
                      aria-label="Edit phone"
                      title="Edit phone"
                      style={{ padding: 0 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" /></svg>
                    </button>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-blue-100 mx-6 mb-2" />
        {/* Profile details */}
        <div className="flex flex-col md:flex-row gap-10 items-start px-6 pb-10">
          <div className="flex-1 w-full space-y-7">
            {/* Editable Address */}
            <div>
              <div className="flex gap-1 mb-1 min-h-[24px] items-center justify-between">
                <span className="text-sm font-semibold text-blue-700 flex items-center h-6">Address</span>
                {editField === "address" ? (
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={saveEdit}
                    className="btn btn-success btn-xs btn-circle btn-ghost"
                      aria-label="Save edit"
                      title="Save"
                      disabled={editLoading}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                    className="btn btn-error btn-xs btn-circle btn-ghost"
                      tabIndex={-1}
                      aria-label="Cancel edit"
                      title="Cancel"
                      disabled={editLoading}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ) : (
                  !isDisplayOnly && (
                    <button
                      type="button"
                      onClick={() => startEdit("address", address)}
                      className="btn btn-ghost btn-circle btn-xs ml-1"
                      aria-label="Edit address"
                      title="Edit address"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" /></svg>
                    </button>
                  )
                )}
              </div>
              {editField === "address" ? (
                <input
                  type="text"
                  ref={addressRef}
                  className="border border-blue-100 bg-blue-50 p-3 rounded-lg text-blue-900 w-full text-base shadow-sm align-middle"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  placeholder={doctor.address ? "Enter address..." : "No address"}
                  onKeyDown={handleInputKey}
                  disabled={editLoading}
                  style={{height: 'auto', minHeight: 'unset', lineHeight: '1.5'}}
                />
              ) : (
                <div className="p-3 rounded-lg bg-blue-50 text-gray-800 border border-blue-100 shadow-sm min-h-[40px]">{doctor.address || "No address"}</div>
              )}
            </div>
            {/* Specialties (editable) */}
            <div>
              <div className="flex items-center mb-1 gap-1 justify-between">
                <div className="text-sm font-semibold text-blue-700">Specialties</div>
                {editSpecialties ? (
                  <div className="flex gap-1">
                    <button
                      type="button"
                    className="btn btn-success btn-xs btn-circle btn-ghost"
                      disabled={savingSpecialties}
                      onClick={async () => {
                        setSavingSpecialties(true);
                        if (onSpecialtiesSave) {
                          await onSpecialtiesSave(pendingSpecialties.map(s => s.id));
                        }
                        setSavingSpecialties(false);
                        setEditSpecialties(false);
                      }}
                      aria-label="Save specialties"
                      title="Save"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </button>
                    <button
                      type="button"
                    className="btn btn-error btn-xs btn-circle btn-ghost"
                      disabled={savingSpecialties}
                      onClick={() => setEditSpecialties(false)}
                      aria-label="Cancel specialties"
                      title="Cancel"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ) : (
                  !isDisplayOnly && (
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs btn-circle ml-1"
                      aria-label="Edit specialties"
                      title="Edit specialties"
                      onClick={() => {
                        setEditSpecialties(true);
                        setPendingSpecialties(
                          specialties.map(s =>
                            s.Specialty
                              ? { id: s.Specialty.id, name: s.Specialty.name }
                              : { id: s.id, name: s.name }
                          )
                        );
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" /></svg>
                    </button>
                  )
                )}
              </div>
              {editSpecialties ? (
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 shadow-sm relative">
                  <SpecialtySelector
                    selected={pendingSpecialties}
                    onChange={setPendingSpecialties}
                    disabled={savingSpecialties}
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {specialties.length > 0
                    ? specialties.map((s, i) => (
                        <span key={s.specialtyId || s.Specialty?.id || i} className="bg-blue-200/80 text-blue-900 px-3 py-1 rounded-full text-xs font-medium shadow">
                          {s.Specialty?.name || s.Specialty?.id || "Unknown"}
                        </span>
                      ))
                    : <span className="text-gray-400">No specialties</span>}
                </div>
              )}
            </div>
            {/* Editable Bio */}
            <div>
              <div className="flex gap-1 mb-1 min-h-[24px] items-center justify-between">
                <span className="text-sm font-semibold text-blue-700 flex items-center h-6">Bio</span>
                {editField === "bio" ? (
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={saveEdit}
                    className="btn btn-success btn-xs btn-circle btn-ghost"
                      aria-label="Save edit"
                      title="Save"
                      disabled={editLoading}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                    className="btn btn-error btn-xs btn-circle btn-ghost"
                      tabIndex={-1}
                      aria-label="Cancel edit"
                      title="Cancel"
                      disabled={editLoading}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ) : (
                  !isDisplayOnly && (
                    <button
                      type="button"
                      onClick={() => startEdit("bio", bio)}
                      className="btn btn-ghost btn-circle btn-xs ml-1"
                      aria-label="Edit bio"
                      title="Edit bio"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" /></svg>
                    </button>
                  )
                )}
              </div>
              {editField === "bio" ? (
                <textarea
                  ref={bioRef}
                  className="border border-blue-100 bg-blue-50 p-3 rounded-lg text-blue-900 w-full text-base shadow-sm min-h-[56px] h-[56px] resize-none"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  placeholder={doctor.bio ? "Enter bio..." : "No bio"}
                  onKeyDown={handleInputKey}
                  disabled={editLoading}
                />
              ) : (
                <div className="p-3 rounded-lg bg-blue-50 text-gray-800 border border-blue-100 shadow-sm min-h-[56px] whitespace-pre-line">{doctor.bio || "No bio"}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;