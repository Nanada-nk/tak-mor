import { useEffect, useState, useRef } from "react";
import { BubblesIcon } from "lucide-react";
import authStore from '../../../stores/authStore.js';
import doctorApi from "../../../api/doctorApi.js";
import DoctorProfile from "../../../components/profile/doctorProfile.jsx";
import accountApi from "../../../api/accountApi.js";
import { fetchCsrfToken } from "../../../config/axios.js";
import { useNavigate } from "react-router";

function DoctorProfileEditPage() {
  const user = authStore(state => state.user);
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(!user);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (editField && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editField]);

  useEffect(() => {
    if (!user) {
      setLoading(true);
    } else {
      setProfile(user);
      setLoading(false);
    }
  }, [user]);

  const startEdit = (field, value) => {
    setEditField(field);
    setEditValue(value ?? "");
  };

  const cancelEdit = () => {
    setEditField(null);
    setEditValue("");
    // Do not navigate away; just exit edit mode
  };

  const saveEdit = async (field, value) => {
    setEditLoading(true);
    try {
      if (field === "phone") {
        await fetchCsrfToken();
        await accountApi.updateAccount({ phone: value });
      } else if (field === "firstName_lastName") {
        const payload = { firstName: value.firstName, lastName: value.lastName };
        await doctorApi.updateProfile(payload);
      } else {
        if (!editField) return;
        const payload = { [editField]: editValue };
        await doctorApi.updateProfile(payload);
      }
      await authStore.getState().checkAuth();
      setProfile(authStore.getState().user);
      setEditField(null);
      setEditValue("");
      // Do not navigate away; just exit edit mode and stay on edit page
    } catch {
      alert("Failed to update profile. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleInputKey = (e) => {
    if (e.key === "Enter") {
      saveEdit(editField, editValue);
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BubblesIcon className="w-10 h-10 animate-spin text-pri-gr1" />
      </div>
    );
  }

  if (!profile || !profile.Doctor || !profile.Doctor.firstName || !profile.Doctor.lastName) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Doctor profile not found or incomplete.
      </div>
    );
  }

  const handleSpecialtiesSave = async (specialtyIds) => {
    try {
      const ids = specialtyIds.map(s => typeof s === 'object' && s.id ? s.id : s);
      await doctorApi.updateProfile({ specialties: ids });
      await authStore.getState().checkAuth();
      setProfile(authStore.getState().user);
      navigate("/dashboard/doctor/profile");
    } catch (err) {
      console.error("Failed to update specialties:", err);
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
      saveEdit={() => saveEdit(editField, editValue)}
      setEditValue={setEditValue}
      handleInputKey={handleInputKey}
      onSpecialtiesSave={handleSpecialtiesSave}
    />
  );
}

export default DoctorProfileEditPage;
