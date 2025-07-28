import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { schemaLogin } from "../../validator/schema.js";
import authStore from "../../stores/authStore.js";
import authApi from "../../api/authApi.js";
import FormInput from "../../components/FormInput.jsx";
import AuthFormCard from "../../components/auth/AuthFormCard.jsx";
import SocialLogins from "../../components/auth/SocialLogins.jsx";

function LoginPage() {
  // ดึง state และ action จาก Zustand store
  const setAuth = authStore((state) => state.setAuth);
  const isLoggedIn = authStore((state) => state.isLoggedIn);
  const user = authStore((state) => state.user);
  const isLoading = authStore((state) => state.isLoading);


  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue, 
  } = useForm({
    resolver: yupResolver(schemaLogin),
    mode: 'onBlur',
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

 const onSubmit = async (data) => {
    try {
      if (data.remember) {
        localStorage.setItem("rememberEmail", data.email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      
      const response = await authApi.login(data);
      const { user, accessToken } = response.data;

     
      setAuth({ user, accessToken });

      toast.success("Login successful!");
      
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.message || "Invalid email or password.");
    }
  };

 
  useEffect(() => {
    if (!isLoading && isLoggedIn && user) {
      if (user.role === 'ADMIN') {
        navigate("/admin/patientdashboard", { replace: true });
      } else if (user.role === 'DOCTOR') {
        navigate("/doctorprofile", { replace: true });
      } else {
        navigate("/patientprofile", { replace: true });
      }
    }
  }, [isLoggedIn, user, isLoading, navigate]);

 
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setValue("email", savedEmail, { shouldValidate: true });
      setValue("remember", true);
    }
  }, [setValue]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <AuthFormCard
          title={["Sign in"]}
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          buttonText="Login"
          bottomText="Don't have an account ?"
          bottomLinkPath="/rolepick"
          bottomLinkText="Sign Up"
        >
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="text-slate-400 text-xs">
            Sign in to continue to your account.
          </p>

          <FormInput
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            placeholder="you@example.com"
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
            placeholder="Enter Password"
          />

          <div className="flex justify-between items-center mb-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                {...register("remember")}
                className="checkbox checkbox-sm"
              />
              Remember me
            </label>
            <div className="text-right text-sm">
              <Link to="/forgot-password" className="font-medium text-pri-gr1 hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>
        </AuthFormCard>

        <SocialLogins role="PATIENT" pageType="login" />
      </div>
    </div>
  );
}

export default LoginPage;
