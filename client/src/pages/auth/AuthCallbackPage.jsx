import { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import authStore from '../../stores/authStore.js';
import authApi from '../../api/authApi.js';

function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

 
  const setAuth = authStore.getState().setAuth;
  const logout = authStore.getState().logout;
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; 
    hasRun.current = true;

    const processAuth = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (error) {
        toast.error(decodeURIComponent(error) || 'Login failed.');
        navigate('/login', { replace: true });
        return;
      }

      if (token) {
        try {
          authStore.setState({ token });

          const response = await authApi.getMe();
          const { user } = response.data;

          setAuth({ user, accessToken: token });
          toast.success('Login successful!');

          if (user.role === 'DOCTOR') {
            navigate('/doctorprofile', { replace: true });
          } else if (user.role === 'ADMIN') {
            navigate('/admin/patientdashboard', { replace: true });
          } else {
            navigate('/patientprofile', { replace: true });
          }

        } catch (fetchError) {
          toast.error('Could not verify login session. Please try again.');
          logout();
          navigate('/login', { replace: true });
        }
      } else {
        toast.error('Authentication callback is missing a token.');
        navigate('/login', { replace: true });
      }
    };

    processAuth();
  }, [searchParams, navigate]); 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-lg font-medium text-gray-700">Finalizing login...</p>
      </div>
    </div>
  );
}

export default AuthCallbackPage;
