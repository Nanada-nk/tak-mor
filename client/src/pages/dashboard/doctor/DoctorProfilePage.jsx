import { useEffect, useState } from "react";
import { BubblesIcon } from "lucide-react";
import authStore from '../../../stores/authStore.js';
import DoctorProfile from "../../../components/profile/doctorProfile.jsx";

function DoctorProfilePage() {
  const user = authStore(state => state.user);
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    if (!user) {
      setLoading(true);
    } else {
      setProfile(user);
      setLoading(false);
    }
  }, [user]);

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

  return (
    <DoctorProfile
      profile={profile}
      // No edit props passed, so DoctorProfile will be display-only
    />
  );
}

export default DoctorProfilePage;