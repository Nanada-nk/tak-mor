import { useNavigate } from "react-router"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../../validator/schema.js";
import { toast } from "react-toastify";
import FormInput from "../../components/FormInput.jsx";
import authApi from "../../api/authApi.js";
import AuthFormCard from "../../components/auth/AuthFormCard.jsx";
import authStore from "../../stores/authStore.js";


function RegisterPage() {

  const navigate = useNavigate();
  // const actionRegister = authStore((state)=>state.actionRegister)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schemaRegister),
    mode: 'onBlur'
  });

  const onSubmit = async (data) => {
    console.log("Attempting to submit registration with data:", data);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const resp = await authApi.registerPatient(data);
      // actionRegister(data)
      console.log('resp', resp);
      toast.success("Registration successful! Please log in.");
      alert('Register Successful')
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };


  return (
 
      <AuthFormCard
        title={["Register"]}
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
          placeholder="Enter Email"
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
    
  )
}

export default RegisterPage
