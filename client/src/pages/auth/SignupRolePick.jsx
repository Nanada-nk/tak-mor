import { useNavigate } from 'react-router';

export default function SignupRolePick() {
  const navigate = useNavigate();

  const handleDoctorSignup = () => navigate('/registerdoctor');
  const handlePatientSignup = () => navigate('/registerpatient');

  return (
    <div className="h-120 bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Doctor Signup */}
          <div
            onClick={handleDoctorSignup}
            className="flex-1 border border-gray-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://img.icons8.com/ios-filled/50/3B82F6/doctor-male.png"
                alt="Doctor Icon"
                className="w-10 h-10"
              />
              <h3 className="text-xl font-medium">Sign Up as Doctor</h3>
            </div>
            <p className="text-gray-600">
              Register as a Tak-Mor doctor to offer medical consultations and manage appointments.
            </p>
          </div>

          {/* Patient Signup */}
          <div
            onClick={handlePatientSignup}
            className="flex-1 border border-gray-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://img.icons8.com/ios-filled/50/3B82F6/user.png"
                alt="Patient Icon"
                className="w-10 h-10"
              />
              <h3 className="text-xl font-medium">Sign Up as Patient</h3>
            </div>
            <p className="text-gray-600">
              Create an account as a patient to book appointments and manage your health records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
