import { useEffect, useState } from "react";
import authApi from "../../../api/authApi";
import PatientProfile from "../../../components/profile/PatientProfile";


function PatientProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const resp = await authApi.getMe();
        console.log('API /api/auth/me response:', resp);
        setProfile(resp.data.user);
      } catch (err) {
        setError("Failed to load profile");
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-blue-800">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-600">{error}</div>;
  }

  console.log('PatientProfilePage profile state:', profile);
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
    <div>
      <PatientProfile profile={mergedProfile} />
    </div>
  );
}

export default PatientProfilePage;
