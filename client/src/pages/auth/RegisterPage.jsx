import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { schemaRegister } from "../../validator/schema.js";
import authApi from "../../api/authApi.js";
import FormInput from "../../components/FormInput.jsx";
import AuthFormCard from "../../components/auth/AuthFormCard.jsx";
import SocialLogins from "../../components/auth/SocialLogins.jsx";
import PolicyModal from "../../components/auth/PolicyModal.jsx";
import TermsOfServiceContent from "../../components/auth/content/TermsOfServiceContent.jsx";
import PrivacyPolicyContent from "../../components/auth/content/PrivacyPolicyContent.jsx";

function RegisterPage() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", content: null });
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(schemaRegister),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false
    }
  });

  const agreeToTermsValue = watch("agreeToTerms");

  const openModal = (type) => {
    setModalData({
      title: type === "terms" ? "Terms of Service" : "Privacy Policy",
      content:
        type === "terms" ? <TermsOfServiceContent /> : <PrivacyPolicyContent />
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const onSubmit = async (data) => {
    if (!data.agreeToTerms) {
      return toast.error(
        "Please accept the Terms of Service and Privacy Policy."
      );
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await authApi.registerPatient(data);

      toast.success("Registration successful!");
      reset();
      setSuccess(true); // 👈 Switch to success view
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 font-prompt">
        <div className="w-full max-w-md space-y-8">
          {!success ? (
            <>
              <AuthFormCard
                title={["Patient Sign Up"]}
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

                <div className="form-control mt-6">
                  <label className="label cursor-pointer justify-start gap-1">
                    <input
                      type="checkbox"
                      {...register("agreeToTerms")}
                      className="checkbox checkbox-primary checkbox-xs"
                    />
                    <span className="label-text text-[11px] text-gray-600">
                      I have read and agree to the{" "}
                      <button
                        type="button"
                        onClick={() => openModal("terms")}
                        className="link link-primary font-medium"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        onClick={() => openModal("policy")}
                        className="link link-primary font-medium"
                      >
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                </div>
              </AuthFormCard>
              <SocialLogins role="PATIENT" pageType="register" />
            </>
          ) : (
            // ✅ Success Message Section
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold text-green-600 mb-4">SUCCESS</h2>
              <p className="text-gray-700 mb-2 text-lg font-semibold">
                Thank you for registering as a patient.
              </p>
              <p className="text-gray-600 mb-6 text-sm font-light">
                Your account has been created successfully. You can now log in to
                book appointments and manage your profile.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary w-full"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>

      <PolicyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalData.title}
      >
        {modalData.content}
      </PolicyModal>
    </>
  );
}

export default RegisterPage;
