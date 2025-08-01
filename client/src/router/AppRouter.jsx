// import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import DoctorLayout from "../layouts/DoctorLayout.jsx";
import PatientLayout from "../layouts/PatientLayout.jsx";

import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import RegisterDoctorPage from "../pages/auth/RegisterDoctorPage.jsx";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.jsx";
import EmailOTPPage from "../pages/auth/EmailOTPPage.jsx";
import SignupRolePick from "../pages/auth/SignupRolePick.jsx";
import AuthCallbackPage from "../pages/auth/AuthCallbackPage.jsx";
import TermOfService from "../pages/termOfService/TermOfService.jsx";
import PrivacyPolicy from "../pages/privacyPolicy/PrivacyPolicy.jsx";

import NewsPage from "../pages/news/NewsPage.jsx";
import NewContentPage from "../pages/news/NewsContentPage.jsx";
import PolicyPage from "../pages/PolicyPage.jsx";
import TermsConditionsPage from "../pages/TermsConditionsPage.jsx";
import ContactUsPage from "../pages/ContactUsPage.jsx";

import DoctorListPage from "../pages/doctor/DoctorListPage.jsx";
import DoctorAvailabilityPage from "../pages/doctor/DoctorAvailabilityPage.jsx";
import DoctorProfilePage from "../pages/dashboard/doctor/DoctorProfilePage.jsx";

import DoctorAppointmentsPage from "../pages/dashboard/doctor/DoctorAppointmentsPage.jsx";
import DoctorProfileEditPage from "../pages/dashboard/doctor/DoctorProfileEditPage.jsx";

import AppointmentTypePage from "../pages/booking/AppointmentTypePage.jsx";
import BookingComfirmationPage from "../pages/booking/BookingComfirmationPage.jsx";
import BookingDateTimePage from "../pages/booking/BookingDateTimePage.jsx";
import BookingPage from "../pages/booking/BookingPage.jsx";
import PatientInfoPage from "../pages/booking/PatientInfoPage.jsx";
import PaymentPage from "../pages/booking/PaymentPage.jsx";
import PrescriptionDetailPage from "../pages/prescription/PrescriptionDetailPage.jsx";

import CallingPage from "../pages/tele/calling/CallingPage.jsx";
import ChatPage from "../pages/tele/chat/ChatPage.jsx";
import VideoCallPage from "../pages/tele/videoCall/VideoCallPage.jsx";

import AdminPatientDashboardManagementPage from "../pages/dashboard/admin/AdminPatientDashboardManagementPage.jsx";
import PatientProfilePage from "../pages/dashboard/patient/PatientProfilePage.jsx";
import PatientManagementPage from "../pages/dashboard/patient/PatientManagementPage.jsx"
import EditProfilePage from "../pages/dashboard/patient/PatientEditProfilePage.jsx";
import ChangePasswordPage from "../pages/dashboard/patient/ChangePasswordPage.jsx";
import PatientTableColumns from "../pages/dashboard/patient/PatientTableColumnsComponent.jsx";

import DoctorManagementPage from "../pages/dashboard/doctor/DoctorManagementPage.jsx";

import NotFoundPage from "../pages/utils/NotFoundPage.jsx";
import ComingSoonPage from "../pages/utils/ComingSoonPage.jsx";
import MaintenancePage from "../pages/utils/MaintenancePage.jsx";
import ServerErrorPage from "../pages/utils/ServerErrorPage.jsx";


import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";
import authStore from "../stores/authStore.js";
import { fetchCsrfToken } from '../config/axios.js';
import AdminDoctorDashboardMenagementPage from "../pages/dashboard/admin/AdminDoctorDashboardMenagementPage.jsx";
import AdminAppointmentDashboardManagementPage from "../pages/dashboard/admin/AdminAppointmentDashboardManagementPage.jsx";
import AboutUsPage from "../pages/AboutUsPage.jsx";
import FaqPage from "../pages/Faq/FaqPage.jsx";
import CategorySpecialtiesPage from "../pages/CategorySpecialtiesPage.jsx";
import AllDoctorList from "../pages/doctorList/DoctorList.jsx";

import InternalMedicinePage from "../pages/InternalMedicinePage.jsx";
import AddDoctorDashboard from "../pages/dashboard/doctor/AddDoctorDashboard.jsx";
import AdminTelePage from "../pages/dashboard/admin/AdminTelePage.jsx";
import AdminStatisticalData from "../pages/dashboard/admin/AdminStatisticalData.jsx";
import PatientEditProfilePage from "../pages/dashboard/patient/PatientEditProfilePage.jsx";


function AppRouter() {
  const checkAuth = authStore((state) => state.checkAuth)
  const isLoading = authStore((state) => state.isLoading)

  useEffect(() => {
    const setupAxiosInterceptors = async () => {
      try {
        const backendUrl = import.meta.env.VITE_API_BASE_URL;
        if (!backendUrl) {
          console.error("VITE_API_BASE_URL is not defined in client/.env");
          return;
        }
        await fetchCsrfToken(); // Call fetchCsrfToken from config/axios.js
      } catch (error) {
        console.error('Failed to setup Axios interceptor:', error);
      }
    };

    setupAxiosInterceptors();
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-xl">
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg font-semibold text-gray-700">กำลังตรวจสอบสิทธิ์...</p>
          <p className="text-sm text-gray-500">โปรดรอสักครู่</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="internalmedicine" element={<InternalMedicinePage />} />
          {/* Auth */}
          <Route path="login" element={<LoginPage />} />
          <Route path="registerpatient" element={<RegisterPage />} />
          <Route path="registerdoctor" element={<RegisterDoctorPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="otp" element={<EmailOTPPage />} />
          <Route path="rolepick" element={<SignupRolePick />} />
          <Route path="auth/callback" element={<AuthCallbackPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="termsOfService" element={<TermOfService />} />
          <Route path="privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="alldoctor" element={<AllDoctorList />} />



          {/* Public */}
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:id" element={<NewContentPage />} />
          <Route path="policy" element={<PolicyPage />} />
          <Route path="terms" element={<TermsConditionsPage />} />
          <Route path="contactus" element={<ContactUsPage />} />
          <Route path="aboutus" element={<AboutUsPage />} />
          <Route path="categoryspecialties" element={<CategorySpecialtiesPage />} />
        {/* Doctor public pages */}
        <Route path="doctorlist" element={<DoctorListPage />} />
        <Route path="doctoravailability" element={<DoctorAvailabilityPage />} />
        {/* Doctor dashboard (protected) */}
      
          {/* Utils Page */}
          <Route path="comingsoon" element={<ComingSoonPage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
          <Route path="servererror" element={<ServerErrorPage />} />
        </Route>

        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/" element={<MainLayout />}>
          {/* Telecommunication */}
          <Route path="call/:roomId" element={<CallingPage />} />
          <Route path="chat/:appointmentId" element={<ChatPage />} />
          <Route path="video/:roomId" element={<VideoCallPage />} />
          <Route path="call" element={<CallingPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="video" element={<VideoCallPage />} />
          {/* Booking */}
          <Route path="booking" element={<BookingPage />} />
          <Route path="appointment" element={<AppointmentTypePage />} />
          <Route path="bookingdatetime" element={<BookingDateTimePage />} />
          <Route path="patientinfo" element={<PatientInfoPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="confirmation" element={<BookingComfirmationPage />} />
          <Route path="prescription" element={<PrescriptionDetailPage />} />
          {/* Patient Management (legacy routes removed, use dashboard routes below) */}
          <Route path="patientmanagement" element={<PatientManagementPage />} />
          <Route path="editprofile" element={<EditProfilePage />} />
          <Route path="changepassword" element={<ChangePasswordPage />} />
          <Route path="patienttable" element={<PatientTableColumns />} />
          {/* Doctor Profile */}
          <Route path="/dashboard/doctor" element={<DoctorLayout />}>
            <Route index element={<DoctorProfilePage />} />
            <Route path="profile" element={<DoctorProfilePage />} />
            <Route path="profile/edit" element={<DoctorProfileEditPage />} />
            <Route path="appointments" element={<DoctorAppointmentsPage />} />
          </Route>
          {/* Patient Profile (Dashboard) */}
          <Route path="/dashboard/patient" element={<PatientLayout />}>
            <Route index element={<PatientProfilePage />} />
            <Route path="profile" element={<PatientProfilePage />} />
            <Route path="profile/edit" element={<PatientEditProfilePage />} />
            <Route path="changepassword" element={<ChangePasswordPage />} />
            <Route path="management" element={<PatientManagementPage />} />
            <Route path="table" element={<PatientTableColumns />} />
          </Route>
          <Route path="doctormanagement" element={<DoctorManagementPage />} />
        </Route>
        {/* </Route> */}

        {/* <Route element={<AdminRoute />}> */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="patientdashboard" element={<AdminPatientDashboardManagementPage />} />
            <Route path="doctordashboard" element={<AdminDoctorDashboardMenagementPage />} />
            <Route path="appointmentdashboard" element={<AdminAppointmentDashboardManagementPage />} />
            <Route path="doctordashboard/add" element={<AddDoctorDashboard />} />
            <Route path="telemanagement" element={<AdminTelePage />} />
          </Route>
        {/* </Route> */}

        {/* <Route element={<AdminRoute />}> */}
          <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminStatisticalData/>}/>
          <Route path="patientdashboard" element={<AdminPatientDashboardManagementPage />} />
          <Route path="doctordashboard" element={<AdminDoctorDashboardMenagementPage/>} />
          <Route path="appointmentdashboard" element={<AdminAppointmentDashboardManagementPage/>}/>
          <Route path="doctordashboard/add" element={<AddDoctorDashboard/>}/>
          
          </Route>
        {/* </Route> */}

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
