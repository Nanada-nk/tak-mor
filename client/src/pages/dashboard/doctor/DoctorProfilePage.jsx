
import { useEffect, useState, useRef } from "react";
import { BubblesIcon } from "lucide-react";
import authApi from "../../../api/authApi.js";
import doctorApi from "../../../api/doctorApi.js";
import DoctorProfile from "../../../components/profile/doctorProfile.jsx";


function DoctorProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editField, setEditField] = useState(null); // field name being edited
  const [editValue, setEditValue] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const inputRef = useRef(null);
  // Focus input when editing
  useEffect(() => {
    if (editField && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editField]);
  // Inline edit handler
  const startEdit = (field, value) => {
    setEditField(field);
    setEditValue(value ?? "");
  };

  const cancelEdit = () => {
    setEditField(null);
    setEditValue("");
  };

  const saveEdit = async () => {
    if (!editField) return;
    setEditLoading(true);
    try {
      const payload = { [editField]: editValue };
      await doctorApi.updateProfile(payload);
      // Refetch profile
      const res = await authApi.getMe();
      setProfile(res.data.user);
      setEditField(null);
      setEditValue("");
    } catch {
      alert("Failed to update profile. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleInputKey = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    authApi
      .getMe()
      .then((res) => {
        setProfile(res.data.user);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch profile");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BubblesIcon className="w-10 h-10 animate-spin text-pri-gr1" />
      </div>
    );
  }

  if (error || !profile || !profile.Doctor || !profile.Doctor.firstName || !profile.Doctor.lastName) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Doctor profile not found or incomplete.
      </div>
    );
  }

  // Handler for saving specialties
  const handleSpecialtiesSave = async (specialtyIds) => {
    try {
      await doctorApi.updateProfile({ specialties: specialtyIds });
      const res = await authApi.getMe();
      setProfile(res.data.user);
    } catch (err) {
      console.error('Failed to update specialties:', err?.response?.data || err);
      alert("Failed to update specialties. Please try again.\n" + (err?.response?.data?.error || ''));
    }
  };

  return (
    <DoctorProfile
      profile={profile}
      editField={editField}
      editValue={editValue}
      editLoading={editLoading}
      inputRef={inputRef}
      startEdit={startEdit}
      cancelEdit={cancelEdit}
      saveEdit={saveEdit}
      setEditValue={setEditValue}
      handleInputKey={handleInputKey}
      onSpecialtiesSave={handleSpecialtiesSave}
    />
  );
}

export default DoctorProfilePage
