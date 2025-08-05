import { Outlet, useNavigate } from 'react-router';
import DoctorSidebar from '../components/DoctorSidebar.jsx';
import authStore from '../stores/authStore.js';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { BubblesIcon } from 'lucide-react';

function DoctorLayout() {
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
    if (token && user && user.role !== 'DOCTOR') {
      toast.error("Access Denied. You must be a Doctor to view this page.");
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    handleAccessControl();
  }, []);


  return (
    <div className="flex h-fit bg-blue-100">
      <DoctorSidebar />
      <div className="flex-1 flex flex-col ">
        
          <Outlet />
        
      </div>
    </div>
  );
}

export default DoctorLayout;
