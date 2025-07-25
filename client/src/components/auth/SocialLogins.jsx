import { toast } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google';

import authApi from "../../api/authApi.js";
import authStore from "../../stores/authStore.js";
import { GoogleIcon, FacebookIcon } from "../icons/index.jsx";


function SocialLogins({ role = 'PATIENT', pageType = 'login' }) {
  const actionSocialLogin = authStore((state) => state.actionSocialLogin);

  
  const actionText = pageType === 'login' ? 'Sign in' : 'Sign up';

 
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      toast.info("Verifying Google account...");
      const idToken = credentialResponse.credential;

     
      const response = role === 'DOCTOR'
        ? await authApi.googleLoginDoctor({ idToken })
        : await authApi.googleLoginPatient({ idToken });

      
      actionSocialLogin(response.data);
      toast.success(`Google ${actionText} successful!`);

    } catch (error) {
      console.error("Google login failed:", error);
      toast.error(error.response?.data?.message || `Google ${actionText} failed.`);
    }
  };
  console.log('handleGoogleSuccess', handleGoogleSuccess)

  const handleGoogleError = () => {
    toast.error(`Google ${actionText} failed. Please try again.`);
  };

  return (
    <div className="w-full">
      <div className="divider text-sm text-gray-500 my-6">OR</div>

      <div className="space-y-3">
        {/* ปุ่ม Google Login (ใช้ Component จาก Library) */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap // ลองเข้าสู่ระบบอัตโนมัติถ้าเคย Login ไว้
          width="100%"
          theme="outline"
          size="large"
          shape="circle"
          logo_alignment="center"
          text={pageType === 'login' ? 'signin_with' : 'signup_with'}
        />

        {/* ปุ่ม Facebook Login (เป็น Link ไปยัง Backend) */}
        <a
          href={`${import.meta.env.VITE_API_BASE_URL}/auth/facebook?role=${role}`}
          className="btn w-full normal-case rounded-3xl"
          style={{ backgroundColor: '#1877F2', color: 'white', borderColor: '#1877F2' }}
        >
          <FacebookIcon />
          {actionText} with Facebook
        </a>
      </div>
    </div>
  );
}

export default SocialLogins;