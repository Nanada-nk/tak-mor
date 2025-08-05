
import { useEffect, useState } from "react";
import PatientProfile from "../../../components/profile/PatientProfile";
import authApi from "../../../api/authApi";
import authStore from "../../../stores/authStore";


function PatientProfilePage() {
  const user = authStore(state => state.user);
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(!user);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!user) {
      const fetchProfile = async () => {
        try {
          setLoading(true);
          const resp = await authApi.getMe();
          setProfile(resp.data.user);
        } catch (err) {
          setError("Failed to load profile");
          console.error("Error fetching profile:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    } else {
      setProfile(user);
      setLoading(false);
    }
  }, [user]);

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
        profilePictureUrl: profile.profilePictureUrl, // Add profile picture URL
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
