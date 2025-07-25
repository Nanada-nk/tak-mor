import { useEffect } from 'react';
import { useSearchParams, useNavigate, Navigate } from 'react-router';
import { toast } from 'react-toastify';
import authStore from '../../stores/authStore.js';
import authApi from '../../api/authApi.js';

function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  console.log('testtt', searchParams.get('error'))
  

  // const { actionSocialLogin, user,setAuthSocialLogin } = authStore((state) => ({
  //   actionSocialLogin: state.actionSocialLogin,
  //   user: state.user,
  //   setAuthSocialLogin: state.setAuthSocialLogin
  // }));

  const actionSocialLogin = authStore((state)=> state.actionSocialLogin)
  const user = authStore((state)=> state.user)
  const setAuthSocialLogin = authStore((state)=> state.setAuthSocialLogin)

 
  useEffect(() => {
   
    const token = searchParams.get('token');
    console.log('token', token)

    const error = searchParams.get('error');
    console.log('error', error)

    if (error) {
      toast.error(error || 'Login failed.');
      // navigate('/login');
    } else if (token) {

      console.log('token test', token)
     
      const fetchUser = async () => {
        try {
         
          localStorage.setItem('accessToken', token);
          
         
          const response = await authApi.getMe();
          console.log('response test', response)
          
          setAuthSocialLogin(response.data.user,token)
          // actionSocialLogin({ accessToken: token, user: response.data.user });
          // navigate('/');
          // console.log('window.location', window.location)
          // window.location.href('/')

      
        } catch (fetchError) {
          toast.error('Could not fetch user data after login.');
          localStorage.removeItem('accessToken');
          navigate('/login');
        }
      };
      
      console.log('fetchUser', fetchUser)
      fetchUser();
    } else {
      
      toast.error('Invalid callback state.');
      // navigate('/login');
    }
  }, [searchParams, navigate, actionSocialLogin]); 


  useEffect(() => {

    if (user) {
      toast.success('Login successful! Redirecting...');
     
      navigate(user.role === 'DOCTOR' ? "/doctor/dashboard" : "/patient/dashboard", { replace: true });
    }
  }, [user, navigate]); 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-lg font-medium text-gray-700">Finalizing your login...</p>
        <p className="text-sm text-gray-500">Please wait a moment.</p>
      </div>
    </div>
  );
}

export default AuthCallbackPage;
