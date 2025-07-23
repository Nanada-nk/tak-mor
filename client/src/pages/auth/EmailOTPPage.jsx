import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import OtpInput from 'react-otp-input';
import authApi from '../../api/authApi.js';
import { schemaVerifyOtp } from '../../validator/schema.js';




const maskEmail = (email) => {
  if (!email) return "";
  const [name, domain] = email.split('@');
  if (name.length <= 2) {
    return `${name.slice(0, 1)}*@${domain}`;
  }
  const maskedName = name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
  return `${maskedName}@${domain}`;
};

function EmailOTPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [timer, setTimer] = useState(59);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schemaVerifyOtp),
    defaultValues: { otp: '' },
    mode: 'onBlur'
  });

  
  useEffect(() => {
    let interval;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval); 
  }, [isResendDisabled]);



  useEffect(() => {
    if (!email) {
      toast.error("An email address is required. Please try again.");
      navigate('/forgot-password');
    }
  }, [email, navigate]);


  const handleResend = async () => {
    if (!isResendDisabled) {
      try {
        await authApi.forgotPassword({ email });
        toast.success("A new OTP has been sent.");
        setTimer(59); 
        setIsResendDisabled(true); 
        reset({ otp: '' }); 
      } catch (error) {
        toast.error("Failed to resend OTP. Please try again later.");
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      const resp = await authApi.verifyOtp({ email, otp: data.otp });
      toast.success(resp.data.message || "OTP verified successfully!");
      reset();
      navigate("/reset-password", { state: { token: resp.data.resetToken } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired OTP.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-xl max-w-md w-full text-center">

        
        <div className="mx-auto flex items-center justify-center h-16 w-16 bg-blue-100 rounded-full mb-4">
          <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        
        <h1 className="text-2xl font-bold text-gray-800">Email OTP</h1>
        <p className="text-gray-500 mt-2 mb-6">
          OTP sent to your Email Address ending {maskEmail(email)}
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
         
          <div className="mb-6 flex justify-center">
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <OtpInput
                  value={field.value}
                  onChange={field.onChange}
                  numInputs={4}
                  separator={<span style={{ width: "1rem" }}></span>}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    width: "3.5rem",
                    height: "3.5rem",
                    fontSize: "1.5rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #d1d5db",
                    margin:4
                  }}
                  focusStyle={{
                    border: "2px solid #3b82f6",
                    outline: "none"
                  }}
                />
              )}
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-2">
                {errors.otp.message}
              </p>
            )}
          </div>

          
          <div className="text-sm text-gray-600 mb-6">
            Didn't receive OTP code?{' '}
            {isResendDisabled ? (
              <span className="text-red-500 bg-red-100 py-1 px-2 rounded-full text-xs">
                {`00:${timer.toString().padStart(2, '0')} sec`}
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="font-semibold text-blue-600 hover:text-blue-700 focus:outline-none"
                disabled={isResendDisabled}
              >
                Resend Code
              </button>
            )}
          </div>

          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmailOTPPage;