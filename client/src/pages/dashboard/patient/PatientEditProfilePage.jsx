
import React, { useEffect, useState } from 'react';
import authApi from '../../../api/authApi';
import accountApi from '../../../api/accountApi';
import PatientProfile from '../../../components/profile/PatientProfile';
import patientApi from '../../../api/patientApi';


function PatientEditProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editLoading, setEditLoading] = useState(false);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const resp = await authApi.getMe();
        setProfile(resp.data.user);
      } catch (err) {
        setError('Failed to load profile');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const startEdit = (field, value) => {
    setEditField(field);
    setEditValue(value ?? "");
  };

  const cancelEdit = () => {
    setEditField(null);
    setEditValue("");
  };

  const saveEdit = async () => {
    setEditLoading(true);
    try {
      if (editField === "phone") {
        const value = (editValue || "").trim();
        const current = (profile?.phone || "").trim();
        if (!value || value === current) { setEditLoading(false); return; }
        await accountApi.updateAccount({ phone: value });
      } else if (editField === "address") {
        const value = (editValue || "").trim();
        const current = (profile?.Patient?.address || "").trim();
        if (!value || value === current) { setEditLoading(false); return; }
        const patientId = profile?.Patient?.id;
        if (patientId) {
          await patientApi.updatePatientInfo(patientId, { address: value });
        }
      } else if (editField === "firstName_lastName") {
        let firstName = "";
        let lastName = "";
        let currentFirst = (profile?.Patient?.firstName || "").trim();
        let currentLast = (profile?.Patient?.lastName || "").trim();
        if (editValue && typeof editValue === "object") {
          firstName = (editValue.firstName || "").trim();
          lastName = (editValue.lastName || "").trim();
        }
        if (!firstName || !lastName || (firstName === currentFirst && lastName === currentLast)) {
          setEditLoading(false); return;
        }
        const patientId = profile?.Patient?.id;
        if (patientId) {
          await patientApi.updatePatientInfo(patientId, { firstName, lastName });
        }
      } else if (["height", "weight", "bloodType", "congenital", "allergies", "surgeries", "medications", "medicalHistory"].includes(editField)) {
        const patientId = profile?.Patient?.id;
        if (patientId) {
          await patientApi.updateMedicalProfile(patientId, { [editField]: editValue });
        }
      } else {
        setEditLoading(false);
        return;
      }
      // Refresh profile
      const resp = await authApi.getMe();
      setProfile(resp.data.user);
      setEditField(null);
      setEditValue("");
    } catch (err) {
      console.error('Error updating profile:', err);
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

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-blue-800">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-600">{error}</div>;
  }

  // Merge Patient info with account email, phone, and PatientMedicalProfile
  const mergedProfile = profile && profile.Patient
    ? {
      ...profile.Patient,
      email: profile.email,
      phone: profile.phone,
      ...(profile.Patient.PatientMedicalProfile || {})
    }
    : null;

  return (
    <PatientProfile
      profile={mergedProfile}
      editField={editField}
      editValue={editValue}
      editLoading={editLoading}
      startEdit={startEdit}
      cancelEdit={cancelEdit}
      saveEdit={saveEdit}
      setEditValue={setEditValue}
      handleInputKey={handleInputKey}
    />
  );
}

export default PatientEditProfilePage;