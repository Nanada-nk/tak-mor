

import React from "react";
import { useRef } from "react";
import SpecialtySelector from "./SpecialtySelector";

function DoctorProfile({
  profile,
  editField,
  editValue,
  editLoading,
  inputRef,
  startEdit,
  cancelEdit,
  saveEdit,
  setEditValue,
  handleInputKey,
  onSpecialtiesSave
}) {
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
  const address = doctor.address || "No address";
  const specialties = Array.isArray(doctor.specialties) ? doctor.specialties : [];
  const bio = doctor.bio || "No bio";

  return (
    <div className="flex justify-center items-start min-h-[90vh] bg-gradient-to-br from-blue-100/60 to-white py-12 px-2">
      <div className="w-full max-w-3xl bg-white/95 rounded-3xl shadow-2xl border border-blue-100 relative overflow-hidden">
        {/* Card header with avatar overlay */}
        <div className="relative flex flex-row items-center justify-start bg-gradient-to-r from-blue-200/60 to-blue-100/40 pt-10 pb-6 mb-4 px-8 gap-8">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-200/40 to-transparent pointer-events-none" />
          {/* Profile Picture on the left */}
          <div className="relative z-10 flex-shrink-0">
            <div className="h-36 w-36 flex items-center justify-center rounded-full bg-blue-100 border-4 border-blue-300 shadow-lg overflow-hidden ring-4 ring-white">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=3b82f6&color=fff&size=160`}
                alt="Doctor Avatar"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          {/* Name, Email, Phone on the right */}
          <div className="mt-0 text-left space-y-2 z-10 flex-1">
            {/* Editable First Name & Last Name */}
            <div className="text-2xl font-bold text-blue-800 flex items-center gap-2 flex-wrap min-h-[40px]">
              {editField === "firstName" ? (
                <div className="flex items-center gap-1">
                  <input
                    ref={firstNameRef}
                    className="border-b-2 border-blue-400 bg-blue-50 px-1 py-0.5 rounded text-blue-900 font-bold w-40 min-w-[120px]"
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
                  <span>{doctor.firstName}</span>
                  <button
                    type="button"
                    onClick={() => startEdit("firstName", doctor.firstName)}
                    className="btn btn-ghost btn-xs btn-circle opacity-70 hover:opacity-100"
                    aria-label="Edit first name"
                    title="Edit first name"
                    style={{ padding: 0 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" /></svg>
                  </button>
                </span>
              )}
              {editField === "lastName" ? (
                <div className="flex items-center gap-1">
                  <input
                    ref={lastNameRef}
                    className="border-b-2 border-blue-400 bg-blue-50 px-1 py-0.5 rounded text-blue-900 font-bold w-40 min-w-[120px]"
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
                  <span>{doctor.lastName}</span>
                  <button
                    type="button"
                    onClick={() => startEdit("lastName", doctor.lastName)}
                    className="btn btn-ghost btn-xs btn-circle opacity-70 hover:opacity-100"
                    aria-label="Edit last name"
                    title="Edit last name"
                    style={{ padding: 0 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" /></svg>
                  </button>
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
                  <button
                    type="button"
                    onClick={() => startEdit("address", address)}
                    className="btn btn-ghost btn-circle btn-xs ml-1"
                    aria-label="Edit address"
                    title="Edit address"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" /></svg>
                  </button>
                )}
              </div>
              {editField === "address" ? (
                <input
                  type="text"
                  ref={addressRef}
                  className="border border-blue-100 bg-blue-50 p-3 rounded-lg text-blue-900 w-full text-base shadow-sm align-middle"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  // onBlur removed to prevent auto-save on outside click
                  onKeyDown={handleInputKey}
                  disabled={editLoading}
                  style={{height: 'auto', minHeight: 'unset', lineHeight: '1.5'}}
                />
              ) : (
                <div className="p-3 rounded-lg bg-blue-50 text-gray-800 border border-blue-100 shadow-sm min-h-[40px]">{address}</div>
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
                  <button
                    type="button"
                    onClick={() => startEdit("bio", bio)}
                    className="btn btn-ghost btn-circle btn-xs ml-1"
                    aria-label="Edit bio"
                    title="Edit bio"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" /></svg>
                  </button>
                )}
              </div>
              {editField === "bio" ? (
                <textarea
                  ref={bioRef}
                  className="border border-blue-100 bg-blue-50 p-3 rounded-lg text-blue-900 w-full text-base shadow-sm min-h-[56px] h-[56px] resize-none"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  // onBlur removed to prevent auto-save on outside click
                  onKeyDown={handleInputKey}
                  disabled={editLoading}
                />
              ) : (
                <div className="p-3 rounded-lg bg-blue-50 text-gray-800 border border-blue-100 shadow-sm min-h-[56px] whitespace-pre-line">{bio}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;