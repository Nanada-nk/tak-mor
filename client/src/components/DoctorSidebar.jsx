import { Link, useLocation, useNavigate } from "react-router";
import { UserCircle, Calendar, ClipboardList } from 'lucide-react';


const doctorNavLinks = [
  { path: '/dashboard/doctor/profile', label: 'My Profile', icon: <UserCircle size={18} /> },
  { path: '/dashboard/doctor/appointments', label: 'Appointments', icon: <Calendar size={18} /> },
];

function DoctorSidebar() {  
const location = useLocation();
  const navigate = useNavigate();



  return (
    <div className="w-64 bg-blue-800 text-white p-4 flex flex-col min-h-screen">
      <div className="flex-shrink-0 mb-8 font-bold text-xl tracking-wide">Doctor Portal</div>
      <nav className="flex-grow">
        <ul>
          {/* My Profile and Edit Profile on the same line, Edit styled as before */}
          <li className="mb-2">
            <div className="flex items-center">
              <Link
                to="/dashboard/doctor/profile"
                className={`flex items-center justify-between w-full gap-2 p-2 rounded hover:bg-blue-900 transition-colors ${location.pathname === '/dashboard/doctor/profile' ? 'bg-blue-900' : ''}`}
                style={{ minWidth: '180px', flex: 1 }}
              >
                <span className="flex items-center gap-2">
                  <UserCircle size={18} /> My Profile
                </span>
                <span className="flex-1" />
                <button
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate('/dashboard/doctor/profile/edit');
                  }}
                  className={`flex items-center gap-1 px-2 py-1 rounded border border-blue-400 text-xs ml-2 transition-all duration-150
                    ${location.pathname === '/dashboard/doctor/profile/edit' ? 'bg-blue-900 text-white' : 'bg-white text-blue-800'}
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
          {doctorNavLinks.slice(1).map((link) => (
            <li key={link.path} className="mb-2">
              <Link
                to={link.path}
                className={`flex items-center gap-2 p-2 rounded hover:bg-blue-900 transition-colors ${location.pathname === link.path ? 'bg-blue-900' : ''}`}
              >
                {link.icon} {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

    </div>
  );
}

export default DoctorSidebar;
