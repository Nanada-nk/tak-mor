import { Outlet, useNavigate } from 'react-router';
import PatientSidebar from '../components/PatientSidebar.jsx';
import authStore from '../stores/authStore.js';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { BubblesIcon } from 'lucide-react';

function PatientLayout() {
  const navigate = useNavigate();
  const token = authStore(state => state.token);
  const checkAuth = authStore(state => state.checkAuth);
  const isLoading = authStore(state => state.isLoading);
  const user = authStore(state => state.user);

  const handleAccessControl = () => {
    checkAuth();
    if (isLoading) return;
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    if (token && user && user.role !== 'PATIENT') {
      toast.error("Access Denied. You must be a Patient to view this page.");
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    handleAccessControl();
    // eslint-disable-next-line
  }, []);

  // if (isLoading || !user) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-gray-100">
  //       <BubblesIcon className="w-10 h-10 animate-spin text-blue-800" />
  //     </div>
  //   );
  // }

  return (
    <div className="flex h-[90vh] bg-blue-100">
      <PatientSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default PatientLayout;
