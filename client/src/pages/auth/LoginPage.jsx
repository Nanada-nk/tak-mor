import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { schemaLogin } from "../../validator/schema.js";
import authStore from "../../stores/authStore.js";
import FormInput from "../../components/FormInput.jsx";
import AuthFormCard from "../../components/auth/AuthFormCard.jsx";
import SocialLogins from "../../components/auth/SocialLogins.jsx";


function LoginPage() {
  const actionLogin = authStore((state) => state.actionLogin);
  const isLoggedIn = authStore((state) => state.isLoggedIn);
  const user = authStore((state) => state.user);
  const isLoading = authStore((state) => state.isLoading);
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schemaLogin),
    mode: 'onBlur',
    defaultValues: {
      email: "",
      password: "",
      remember: false
    }
  });

  const onSubmit = async (data) => {
    try {
      // จัดการ "Remember Me"
      if (data.remember) {
        localStorage.setItem("rememberEmail", data.email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      await actionLogin(data);
      toast.success("Login successful!");

      reset({
        email: data.remember ? data.email : "",
        password: "",
        remember: data.remember
      });

    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };


  useEffect(() => {
    if (!isLoading && isLoggedIn && user) {

      if (user.role === 'ADMIN') {
        navigate("/admin/patientdashboard", { replace: true });
      } else if (user.role === 'DOCTOR') {
        navigate("/doctorprofile", { replace: true });
      } else { // Default to PATIENT
        navigate("/patientprofile", { replace: true });
      }
    }
  }, [isLoggedIn, user, isLoading, navigate]);



  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      reset({ email: savedEmail, remember: true });
    }
  }, [reset]);

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
            We will send a confirmation code to your email.
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

            <label className="flex items-center gap-2 text-sm">
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

  )
}

export default LoginPage
