import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import RegisterDoctorPage from "../pages/auth/RegisterDoctorPage.jsx";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.jsx";
import EmailOTPPage from "../pages/auth/EmailOTPPage.jsx";
import SignupRolePick from "../pages/auth/SignupRolePick.jsx";
import AuthCallbackPage from "../pages/auth/AuthCallbackPage.jsx";
import TermOfService from "../pages/termOfService/termOfService.jsx";
import PrivacyPolicy from "../pages/privacyPolicy/privacyPolicy.jsx";

import NewsPage from "../pages/news/NewsPage.jsx";
import NewContentPage from "../pages/news/NewsContentPage.jsx";
import PolicyPage from "../pages/PolicyPage.jsx";
import TermsConditionsPage from "../pages/TermsConditionsPage.jsx";
import ContactUsPage from "../pages/ContactUsPage.jsx";

import DoctorListPage from "../pages/doctor/DoctorListPage.jsx";
import DoctorAvailabilityPage from "../pages/doctor/DoctorAvailabilityPage.jsx";
import DoctorProfilePage from "../pages/dashboard/doctor/DoctorProfilePage.jsx"

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
import EditProfilePage from "../pages/dashboard/patient/EditProfilePage.jsx";
import ChangePasswordPage from "../pages/dashboard/patient/ChangePasswordPage.jsx";
import PatientTableColumns from "../pages/dashboard/patient/PatientTableColumnsComponent.jsx";

import NotFoundPage from "../pages/utils/NotFoundPage.jsx";
import ComingSoonPage from "../pages/utils/ComingSoonPage.jsx";
import MaintenancePage from "../pages/utils/MaintenancePage.jsx";
import ServerErrorPage from "../pages/utils/ServerErrorPage.jsx";


import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";
import authStore from '../stores/authStore.js';
import AdminDoctorDashboardMenagementPage from "../pages/dashboard/admin/AdminDoctorDashboardMenagementPage.jsx";
import AdminAppointmentDashboardManagementPage from "../pages/dashboard/admin/AdminAppointmentDashboardManagementPage.jsx";
import AboutUsPage from "../pages/AboutUsPage.jsx";
import FaqPage from "../pages/Faq/FaqPage.jsx";
import CategorySpecialtiesPage from "../pages/CategorySpecialtiesPage.jsx";


function AppRouter() {
  //   const { checkAuth, isLoggedIn, isLoading } = authStore((state) => state);

  // useEffect(() => {
  //   checkAuth(); // ตรวจสอบและโหลดข้อมูลผู้ใช้เมื่อหน้าเว็บถูกรีเฟรช
  // }, [checkAuth]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          {/* Auth */}
          <Route path="login" element={<LoginPage />} />
          <Route path="registerpatient" element={<RegisterPage />} />
          <Route path="registerdoctor" element={<RegisterDoctorPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="otp" element={<EmailOTPPage />} />
          <Route path="rolepick" element={<SignupRolePick />} />
          <Route path="auth/callback" element={<AuthCallbackPage />} />
          <Route path="faq" element={<FaqPage/>}/>
          <Route path="termsOfService" element={<TermOfService/>} />
          <Route path="privacyPolicy" element={<PrivacyPolicy/>} />

          {/* Public */}
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:id" element={<NewContentPage />} />
          <Route path="policy" element={<PolicyPage />} />
          <Route path="terms" element={<TermsConditionsPage />} />
          <Route path="contactus" element={<ContactUsPage />} />
          <Route path="aboutus" element={<AboutUsPage />} />
          <Route path="categoryspecialties" element={<CategorySpecialtiesPage />} />
          {/* Doctor */}
          <Route path="doctorlist" element={<DoctorListPage />} />
          <Route path="doctoravailability" element={<DoctorAvailabilityPage />} />
          <Route path="doctorprofile" element={<DoctorProfilePage />} />

          {/* Utils Page */}
          <Route path="comingsoon" element={<ComingSoonPage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
          <Route path="servererror" element={<ServerErrorPage />} />
        </Route>

        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/" element={<MainLayout />}>
          {/* Telecommunication */}
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
          {/* Patient Profile */}
          <Route path="patientprofile" element={<PatientProfilePage />} />
          <Route path="patientmanagement" element={<PatientManagementPage />} />
          <Route path="editprofile" element={<EditProfilePage />} />
          <Route path="changepassword" element={<ChangePasswordPage />} />
          <Route path="patienttable" element={<PatientTableColumns />} />
          </Route>
        {/* </Route> */}

        {/* <Route element={<AdminRoute />}> */}
          <Route path="/admin" element={<AdminLayout />}>
          <Route path="patientdashboard" element={<AdminPatientDashboardManagementPage />} />
          <Route path="doctordashboard" element={<AdminDoctorDashboardMenagementPage/>} />
          <Route path="appointmentdashboard" element={<AdminAppointmentDashboardManagementPage/>}/>
          </Route>
        {/* </Route> */}

        
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
