import { useNavigate } from "react-router"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { schemaRegister } from "../../validator/schema.js";
import authApi from "../../api/authApi.js";
import FormInput from "../../components/FormInput.jsx";
import AuthFormCard from "../../components/auth/AuthFormCard.jsx";
import SocialLogins from "../../components/auth/SocialLogins.jsx";
// import authStore from "../../stores/authStore.js";


function RegisterDoctorPage() {

  const navigate = useNavigate();
  // const actionRegister = authStore((state)=>state.actionRegister)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues
  } = useForm({
    resolver: yupResolver(schemaRegister),
    mode: 'onBlur',
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = async (data) => {
    console.log("Attempting to submit registration with data:", data);

    // const isAgreed = getValues("agreeToTerms");

    // if (!isAgreed) {
    //   return toast.error("Please accept the Terms of Service and Privacy Policy.");
    // }

    // console.log('isAgreed', isAgreed)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const resp = await authApi.registerDoctor(data);
      // actionRegister(data)
      console.log('resp', resp);
      toast.success("Registration successful! Please log in.");
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <AuthFormCard
          title={["Doctor Sign Up"]}
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          buttonText="Register"
          bottomText="Already have an account?"
          bottomLinkPath="/login"
          bottomLinkText="Login"
        >
          <FormInput
            label="FirstName"
            name="firstName"
            register={register}
            error={errors.firstName}
            placeholder="Enter FirstName"
          />

          <FormInput
            label="LastName"
            name="lastName"
            register={register}
            error={errors.lastName}
            placeholder="Enter LastName"
          />

          <FormInput
            label="Phone"
            name="phone"
            register={register}
            error={errors.phone}
            placeholder="Enter Phone"
          />

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

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            error={errors.confirmPassword}
            placeholder="Confirm Password"
          />

        </AuthFormCard>

        <SocialLogins role="DOCTOR" pageType="register" />
      </div>
    </div>
  )
}

export default RegisterDoctorPage
