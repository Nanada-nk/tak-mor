import { useState, useEffect, useRef } from "react";
import axiosInstance from "../../config/axios.js";
import { User, X, Pencil } from "lucide-react";


function DoctorProfile({ profile, doctorId }) {
  const [editField, setEditField] = useState(null); // 'firstName', 'lastName', 'address', 'specialties', 'bio'
  const [user, setUser] = useState(profile || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    specialties: [],
    bio: '',
  });
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [specialtyInput, setSpecialtyInput] = useState("");
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  const specialtyRef = useRef(null);
  // Fetch doctor profile if not provided
  useEffect(() => {
    async function fetchProfile() {
      if (!profile && doctorId) {
        try {
          const res = await axiosInstance.get(`/api/doctor/${doctorId}`);
          const doc = res.data;
          console.log('Fetched doctor profile:', doc);
          setUser({
            firstName: doc.firstName || doc.Doctor?.firstName || doc.Account?.firstName || '',
            lastName: doc.lastName || doc.Doctor?.lastName || doc.Account?.lastName || '',
            email: doc.Account?.email || '',
            phone: doc.Account?.phone || '',
            address: doc.address || doc.Doctor?.address || '',
            specialties: Array.isArray(doc.specialties)
              ? doc.specialties.map(ds => ds.Specialty)
              : [],
            bio: doc.bio || doc.Doctor?.bio || '',
          });
        } catch (err) {
          setError('Failed to fetch doctor profile.');
        }
      }
    }
    fetchProfile();
  }, [profile, doctorId]);

  // Set specialtyInput and specialties when editing specialties
  useEffect(() => {
    if (editField === 'specialties') {
      if (profile && Array.isArray(profile.specialties)) {
        setUser(u => ({ ...u, specialties: profile.specialties }));
      }
      setSpecialtyInput("");
    }
  }, [editField, profile]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (specialtyRef.current && !specialtyRef.current.contains(e.target)) {
        setShowSpecialtyDropdown(false);
      }
    }
    if (showSpecialtyDropdown) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showSpecialtyDropdown]);
  // Specialty input change
  const handleSpecialtyInput = (e) => {
    setSpecialtyInput(e.target.value);
    setShowSpecialtyDropdown(true);
  };



  // Add specialty to user's specialties array and auto-save
  const handleSpecialtySelect = async (specialty) => {
    if (!user.specialties.some(s => String(s.id) === String(specialty.id))) {
      const updatedSpecialties = [...user.specialties, specialty];
      setUser({ ...user, specialties: updatedSpecialties });
      await autoSaveSpecialties(updatedSpecialties);
    }
    setSpecialtyInput("");
    setShowSpecialtyDropdown(false);
  };

  // Add specialty by name (create if not exists) and auto-save
  const handleAddSpecialtyByName = async () => {
    const input = specialtyInput.trim();
    if (!input) return;
    // Prevent adding duplicate
    if (user.specialties.some(s => s.name.toLowerCase() === input.toLowerCase())) {
      setSpecialtyInput("");
      setShowSpecialtyDropdown(false);
      return;
    }
    const match = specialties.find(s => s.name.toLowerCase() === input.toLowerCase());
    let newSpecialty = null;
    if (match) {
      newSpecialty = match;
    } else {
      // Create new specialty
      try {
        const res = await axiosInstance.post('/api/specialty', { name: input });
        if (res.data && res.data.id) {
          newSpecialty = res.data;
          setSpecialties([...specialties, res.data]);
        }
      } catch {
        // ignore error
      }
    }
    if (newSpecialty && !user.specialties.some(s => String(s.id) === String(newSpecialty.id))) {
      const updatedSpecialties = [...user.specialties, newSpecialty];
      setUser({ ...user, specialties: updatedSpecialties });
      await autoSaveSpecialties(updatedSpecialties);
    }
    setSpecialtyInput("");
    setShowSpecialtyDropdown(false);
  };

  // Remove specialty from user's specialties array and auto-save
  const handleRemoveSpecialty = async (id) => {
    const updatedSpecialties = user.specialties.filter(s => String(s.id) !== String(id));
    setUser({ ...user, specialties: updatedSpecialties });
    await autoSaveSpecialties(updatedSpecialties);
  };
  // Auto-save specialties to backend
  const autoSaveSpecialties = async (specialtiesArr) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await axiosInstance.put("/api/doctor/profile", { specialties: specialtiesArr.map(s => s.id) });
      if (res.data && res.data.success) {
        setSuccess("Specialties updated.");
      } else {
        setError(res.data && res.data.error ? res.data.error : "Failed to update specialties.");
      }
    } catch {
      setError("Failed to update specialties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      setUser({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
        specialties: profile.specialties || [],
        bio: profile.bio || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    async function fetchSpecialties() {
      try {
        const res = await axiosInstance.get('/api/specialty');
        setSpecialties(res.data || []);
      } catch {
        setSpecialties([]);
      }
    }
    fetchSpecialties();
  }, []);


  // For text fields
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Save a single field
  const handleSaveField = async (field) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      let updatedUser = { ...user };
      if (field === 'specialties') {
        updatedUser.specialties = user.specialties.map(s => s.id);
      } else {
        updatedUser = { [field]: user[field] };
      }
      const res = await axiosInstance.put("/api/doctor/profile", updatedUser);
      if (res.data && res.data.success) {
        setSuccess("Profile updated successfully.");
        setEditField(null);
      } else {
        setError(res.data && res.data.error ? res.data.error : "Profile update failed.");
      }
    } catch {
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelField = () => {
    setEditField(null);
    setError("");
    setSuccess("");
    if (profile && editField) {
      setUser(u => ({ ...u, [editField]: profile[editField] }));
    }
  };

  // Removed unused handleSave and handleCancel and all isEditing references

  return (
    <div className="flex justify-center items-start min-h-[85vh] bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-3xl mt-10 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="flex flex-col items-center w-full md:w-1/3">
            {user.profileImage && user.profileImage.trim() !== '' ? (
              <img
                className="h-40 w-40 rounded-full object-cover border-4 border-blue-200 shadow"
                src={user.profileImage}
                alt="User Avatar"
                onError={e => { e.target.onerror = null; e.target.src = ''; }}
              />
            ) : (
              <div className="h-40 w-40 flex items-center justify-center rounded-full bg-blue-100 border-4 border-blue-200 shadow">
                <User size={80} className="text-blue-400" />
              </div>
            )}
            <div className="mt-4 text-center">
              <div className="text-lg font-semibold text-gray-800">{user.firstName} {user.lastName}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
              <div className="text-sm text-gray-500">{user.phone}</div>
            </div>
            {/* No global edit button, edit per field */}
          </div>
          <div className="flex-1 w-full">
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                {editField === 'firstName' ? (
                  <div className="flex gap-2 items-center mt-1">
                    <input
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      className="block w-full border rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs" onClick={() => handleSaveField('firstName')} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs" onClick={handleCancelField} disabled={loading}>Cancel</button>
                  </div>
                ) : (
                  <div
                className="mt-1 text-gray-900 group flex items-center gap-1 border border-gray-200 rounded transition bg-white min-h-[56px] px-4 py-3"
                  >
                    <span className="flex-1">{user.firstName}</span>
                    <button
                      type="button"
                      className="ml-1 p-1 rounded hover:bg-blue-50 transition flex-shrink-0"
                      onClick={() => setEditField('firstName')}
                      tabIndex={0}
                      aria-label="Edit first name"
                    >
                      <Pencil size={15} className="text-blue-400 opacity-80 group-hover:opacity-100 transition" />
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                {editField === 'lastName' ? (
                  <div className="flex gap-2 items-center mt-1">
                    <input
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      className="block w-full border rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs" onClick={() => handleSaveField('lastName')} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs" onClick={handleCancelField} disabled={loading}>Cancel</button>
                  </div>
                ) : (
                  <div
                className="mt-1 text-gray-900 group flex items-center gap-1 border border-gray-200 rounded transition bg-white min-h-[56px] px-4 py-3"
                  >
                    <span className="flex-1">{user.lastName || <span className="text-transparent select-none">Placeholder</span>}</span>
                    <button
                      type="button"
                      className="ml-1 p-1 rounded hover:bg-blue-50 transition flex-shrink-0"
                      onClick={() => setEditField('lastName')}
                      tabIndex={0}
                      aria-label="Edit last name"
                    >
                      <Pencil size={15} className="text-blue-400 opacity-80 group-hover:opacity-100 transition" />
                    </button>
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                {editField === 'address' ? (
                  <div className="flex gap-2 items-center mt-1">
                    <textarea
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      className="block w-full border rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows={2}
                    />
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs" onClick={() => handleSaveField('address')} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs" onClick={handleCancelField} disabled={loading}>Cancel</button>
                  </div>
                ) : (
                  <div
                className="mt-1 text-gray-900 group flex items-center gap-1 border border-gray-200 rounded transition bg-white min-h-[56px] px-4 py-3"
                  >
                    <span className="flex-1">{user.address || <span className="text-transparent select-none">Placeholder</span>}</span>
                    <button
                      type="button"
                      className="ml-1 p-1 rounded hover:bg-blue-50 transition flex-shrink-0"
                      onClick={() => setEditField('address')}
                      tabIndex={0}
                      aria-label="Edit address"
                    >
                      <Pencil size={15} className="text-blue-400 opacity-80 group-hover:opacity-100 transition" />
                    </button>
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Specialties</label>
                {editField === 'specialties' ? (
                  <div>
                    <div className="relative" ref={specialtyRef}>
                      {/* Chips for selected specialties */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {user.specialties.map(s => (
                          <span key={s.id} className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {s.name}
                            <button type="button" className="ml-1 text-blue-400 hover:text-blue-700" onClick={async () => await handleRemoveSpecialty(s.id)}>
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          name="specialty"
                          autoComplete="off"
                          value={specialtyInput}
                          onChange={handleSpecialtyInput}
                          onFocus={() => setShowSpecialtyDropdown(true)}
                          className="mt-1 block w-full border rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Type or select specialty"
                          onKeyDown={async (e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              await handleAddSpecialtyByName();
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="mt-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                          onClick={handleAddSpecialtyByName}
                          disabled={!specialtyInput.trim()}
                        >
                          Add
                        </button>
                      </div>
                      {showSpecialtyDropdown && specialtyInput && (
                        <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded shadow mt-1 max-h-40 overflow-y-auto">
                          {specialties.filter(s => s.name.toLowerCase().includes(specialtyInput.toLowerCase()) && !user.specialties.some(sel => String(sel.id) === String(s.id))).length > 0 ? (
                            specialties.filter(s => s.name.toLowerCase().includes(specialtyInput.toLowerCase()) && !user.specialties.some(sel => String(sel.id) === String(s.id))).map(s => (
                              <li
                                key={s.id}
                                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                onClick={async () => await handleSpecialtySelect(s)}
                              >
                                {s.name}
                              </li>
                            ))
                          ) : (
                            <li className="px-4 py-2 text-gray-500">No match. Will create new specialty.</li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                className="mt-1 text-gray-900 group border border-gray-200 rounded transition bg-white min-h-[56px] flex items-center px-4 py-3"
                    style={{ minHeight: 56 }}
                  >
                    <div className="flex flex-wrap gap-2 flex-1 items-center min-h-[24px]">
                      {user.specialties && user.specialties.length > 0 ? (
                        user.specialties.map(s => (
                          <span key={s.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{s.name}</span>
                        ))
                      ) : (
                        <span className="text-gray-400 select-none">No specialties</span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="ml-1 p-1 rounded hover:bg-blue-50 transition flex-shrink-0"
                      onClick={() => setEditField('specialties')}
                      tabIndex={0}
                      aria-label="Edit specialties"
                    >
                      <Pencil size={15} className="text-blue-400 opacity-80 group-hover:opacity-100 transition" />
                    </button>
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                {editField === 'bio' ? (
                  <div className="flex gap-2 items-center mt-1">
                    <textarea
                      name="bio"
                      value={user.bio}
                      onChange={handleChange}
                      className="block w-full border rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows={3}
                    />
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs" onClick={() => handleSaveField('bio')} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs" onClick={handleCancelField} disabled={loading}>Cancel</button>
                  </div>
                ) : (
                  <div
                className="mt-1 text-gray-900 group flex items-center gap-1 border border-gray-200 rounded transition bg-white min-h-[56px] px-4 py-3"
                  >
                    <span className="flex-1">{user.bio || <span className="text-transparent select-none">Placeholder</span>}</span>
                    <button
                      type="button"
                      className="ml-1 p-1 rounded hover:bg-blue-50 transition flex-shrink-0"
                      onClick={() => setEditField('bio')}
                      tabIndex={0}
                      aria-label="Edit bio"
                    >
                      <Pencil size={15} className="text-blue-400 opacity-80 group-hover:opacity-100 transition" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* No global Save/Cancel, handled per-field */}
            {error && <div className="text-red-500 mt-4">{error}</div>}
            {success && <div className="text-green-600 mt-4">{success}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile