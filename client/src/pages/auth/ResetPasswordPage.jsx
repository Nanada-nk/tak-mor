import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormInput from '../../components/FormInput.jsx';
import authApi from '../../api/authApi.js';
import { schemaResetPassword } from '../../validator/schema.js';
import AuthFormCard from '../../components/auth/AuthFormCard.jsx';


function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schemaResetPassword),
  });

 
  useEffect(() => {
    if (!token) {
      toast.error("Invalid session. Please start the password reset process again.");
      navigate('/forgot-password');
    }
  }, [token, navigate]);

  const onSubmit = async (data) => {
    try {
      const resp = await authApi.resetPassword({
        token, 
        newPassword: data.newPassword
      });
      console.log('resp', resp)

      toast.success(resp.data.message || "Password has been reset successfully!");
      reset();
      navigate("/login");
    } catch (error) {
      console.log('error', error)
      toast.error(error.response?.data?.message || "Failed to reset password. The link may have expired.");
      navigate("/forgot-password");
    }
  };

  return (
    <AuthFormCard
      title="Create New Password"
      subtitle="Your new password must be different from previous used passwords."
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
      buttonText="Reset Password"
    >
      <FormInput
        label="New Password"
        name="newPassword"
        type="password"
        register={register}
        error={errors.newPassword}
        placeholder="Enter your new password"
      />
      <FormInput
        label="Confirm New Password"
        name="confirmNewPassword"
        type="password"
        register={register}
        error={errors.confirmNewPassword}
        placeholder="Confirm your new password"
      />
    </AuthFormCard>
  );
}

export default ResetPasswordPage;