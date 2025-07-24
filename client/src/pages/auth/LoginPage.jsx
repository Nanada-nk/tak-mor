import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "../../validator/schema.js";
import { toast } from "react-toastify";
import FormInput from "../../components/FormInput.jsx";
import authStore from "../../stores/authStore.js";
import { useEffect } from "react";
import AuthLayout from "../../components/auth/AuthLayout.jsx";
import AuthFormCard from "../../components/auth/AuthFormCard.jsx";

function LoginPage() {
  const actionLogin = authStore((state)  => state.actionLogin);
  const isLoggedIn = authStore((state) => state.isLoggedIn);
  const user = authStore((state) => state.user);
  const isLoading = authStore((state) => state.isLoading);
  const navigate = useNavigate();

  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
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
      await actionLogin(data);
      toast.success("Login successful!");
      reset();
      
    } catch (error) {
      // console.error("Login failed:", error);
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };
  
  const handleLoginRedirect = () => {
    if (!isLoading && isLoggedIn && user) {
      if (user.role === 'SUPERADMIN' || user.role === 'ADMIN') {
        navigate("/admin/users", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }


  useEffect(() => {
    handleLoginRedirect()
  }, [isLoggedIn, user, isLoading, navigate]);
  
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      reset({ email: savedEmail, remember: true });
    }
  }, [reset]);

  return (
    // <AuthLayout>
    <div className="my-5">
      <AuthFormCard
        title={["Sign in"]}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        buttonText="Login"
        bottomText="Don't have an account ?"
        bottomLinkPath="/register"
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
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
        />

         {/* ✅ Remember Me checkbox */}
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

    </div>
    // </AuthLayout>
    
  )
}

export default LoginPage
