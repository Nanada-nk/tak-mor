
import { Link, useLocation, useNavigate } from "react-router";
import { ChartColumnStackedIcon, FolderCog, PackageSearch, Star, Ticket, TrashIcon, UsersRound , ShieldUser , BriefcaseMedical, ClipboardCheck} from 'lucide-react';
import authStore from "../stores/authStore.js";
import { toast } from "react-toastify";




const adminNavLinks = [
  { path: '/admin/patientdashboard', label: 'Patient Dashboard', icon: <ShieldUser size={18} /> },
  { path: '/admin/doctordashboard', label: 'Doctor Dashboard', icon: <BriefcaseMedical size={20} /> },
  { path: '/admin/appointmentdashboard', label: 'Appointment Dashboard', icon: <ClipboardCheck size={20} /> },
];


function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const actionLogout = authStore((state) => state.actionLogout);

  const handleLogout = () => {
    actionLogout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-primary-gradient text-white p-4 flex flex-col">
      <div className="flex-shrink-0 mb-8">
        <div>
                        <img src="../../../public/takmor.svg" alt='logo' className="h-12 w-auto object-contain" /> 
                    </div>
      </div>
      <nav className="flex-grow">
        <ul>
          {adminNavLinks.map((linker) => (
            <li key={linker.path} className="mb-2">
              <Link
                to={linker.path}

                className={`flex items-center gap-2 p-2 rounded hover:bg-green-950  ${location.pathname === linker.path ? 'bg-green-950' : ''}`}
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
          className="w-full text-left p-2 rounded hover:bg-green-950 flex items-center"
        >
          <TrashIcon size={18} className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;