import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormInput from "../../components/FormInput.jsx";
import authApi from "../../api/authApi.js";
import { schemaForgotPassword } from "../../validator/schema.js";
import AuthFormCard from "../../components/auth/AuthFormCard.jsx";


function ForgotPasswordPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schemaForgotPassword),
    mode: 'onBlur'
  });

  const onSubmit = async (data) => {
    try {
      const resp = await authApi.forgotPassword({ email: data.email });
      console.log('resp', resp)

      toast.success(resp.data.message || "OTP has been sent to your email.");
      reset();
      navigate("/otp", { state: { email: data.email } });

    } catch (error) {
      console.error("Forgot password failed:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP.");
    }
  };

  return (
    <>
      <AuthFormCard
        title="Forgot Password?"
        subtitle="Enter your email and we will send you an OTP code to reset your password."
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        buttonText="Send OTP"
        bottomText="Remembered your password?"
        bottomLinkPath="/login"
        bottomLinkText="Sign In"
      >

        <FormInput
          label="Your Email"
          name="email"
          type="email"
          register={register}
          error={errors.email}
          placeholder="Enter Your Email"
        />

      </AuthFormCard>
    </>
  );
}

export default ForgotPasswordPage;