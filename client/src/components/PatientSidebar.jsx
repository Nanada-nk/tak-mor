
import { User, Calendar, FileText, Lock, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from "react-router";
import authStore from "../stores/authStore.js";
import { toast } from "react-toastify";

const patientNavLinks = [
  { path: '/dashboard/patient/profile', label: 'My Profile', icon: <User size={18} /> },
  { path: '/dashboard/patient/management', label: 'My Appointments', icon: <Calendar size={18} /> },
  { path: '/dashboard/patient/table', label: 'Medical Records', icon: <FileText size={18} /> },
  { path: '/dashboard/patient/changepassword', label: 'Change Password', icon: <Lock size={18} /> },
];

function PatientSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const actionLogout = authStore((state) => state.actionLogout);

  const handleLogout = () => {
    actionLogout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-blue-800 text-white p-4 flex flex-col min-h-screen">
      <div className="flex-shrink-0 mb-8 font-bold text-xl tracking-wide">Patient Portal</div>
      <nav className="flex-grow">
        <ul>
          {/* My Profile and Edit Profile on the same line */}
          <li className="mb-2">
            <div className="flex items-center">
              <Link
                to="/dashboard/patient/profile"
                className={`flex items-center justify-between w-full gap-2 p-2 rounded hover:bg-blue-900 transition-colors ${location.pathname === '/dashboard/patient/profile' ? 'bg-blue-900' : ''}`}
                style={{ minWidth: '180px', flex: 1 }}
              >
                <span className="flex items-center gap-2">
                  <User size={18} /> My Profile
                </span>
                <span className="flex-1" />
                <button
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate('/dashboard/patient/profile/edit');
                  }}
                  className={`flex items-center gap-1 px-2 py-1 rounded border border-blue-400 text-xs ml-2 transition-all duration-150
                    ${location.pathname === '/dashboard/patient/profile/edit' ? 'bg-blue-900 text-white' : 'bg-white text-blue-800'}
                    hover:bg-blue-700 hover:text-white hover:scale-105 hover:shadow-lg cursor-pointer`}
                  style={{ minWidth: 0 }}
                  tabIndex={0}
                >
                  Edit
                </button>
              </Link>
            </div>
          </li>
          {/* Other nav links */}
          {patientNavLinks.slice(1).map((linker) => (
            <li key={linker.path} className="mb-2">
              <Link
                to={linker.path}
                className={`flex items-center gap-2 p-2 rounded hover:bg-blue-900 transition-colors ${location.pathname === linker.path ? 'bg-blue-900' : ''}`}
              >
                {linker.icon} {linker.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full text-left p-2 rounded hover:bg-blue-900 flex items-center"
        >
          <LogOut size={18} className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
}

export default PatientSidebar;