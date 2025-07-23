import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

<<<<<<< HEAD
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import DoctorRegisterPage from "../pages/auth/doctor/DoctorRegisterPage.jsx";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.jsx";
import EmailOTPPage from "../pages/auth/EmailOTPPage.jsx";

import NewsPage from "../pages/news/NewsPage.jsx";
import NewContentPage from "../pages/news/NewsContentPage.jsx";
import PolicyPage from "../pages/PolicyPage.jsx";
import TermsConditionsPage from "../pages/TermsConditionsPage.jsx";
import ContactUsPage from "../pages/ContactUsPage.jsx";

import DoctorListPage from "../pages/doctor/DoctorListPage.jsx";
import DoctorAvailabilityPage from "../pages/doctor/DoctorAvailabilityPage.jsx";

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

import AdminDashboardManagementPage from "../pages/dashboard/admin/AdminDashboardManagementPage.jsx";
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

=======
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.jsx";
import NewsPage from "../pages/news/NewsPage.jsx";
import NewContentPage from "../pages/news/NewsContentPage.jsx";

// import ChangePasswordPage from '../pages/users/ChangePasswordPage.jsx';
// import UserReviewHistoryPage from '../pages/reviews/UserReviewHistoryPage.jsx';

import HomePage from "../pages/HomePage.jsx";
// import authStore from '../stores/authStore.js';

// import AdminReviewManagementPage from '../pages/admin/AdminReviewManagementPage.jsx';
import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";
import ComingSoonPage from "../pages/utils/ComingSoonPage.jsx"
import MaintenancePage from "../pages/utils/MaintenancePage.jsx"
import ServerErrorPage from "../pages/utils/ServerErrorPage.jsx";
import NotFoundPage from "../pages/utils/NotFoundPage.jsx";
>>>>>>> a293c6f5aa673509d214e0cbbbd92bc4c6ac3c25

function AppRouter() {
  const checkAuth = authStore((state) => state.checkAuth)
  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
<<<<<<< HEAD
          {/* Auth */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="registerdoctor" element={<DoctorRegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="otp" element={<EmailOTPPage />} />

          {/* Public */}
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:id" element={<NewContentPage />} />
          <Route path="policy" element={<PolicyPage />} />
          <Route path="terms" element={<TermsConditionsPage />} />
          <Route path="contactus" element={<ContactUsPage />} />
          {/* Doctor */}
          <Route path="doctorlist" element={<DoctorListPage />} />
          <Route path="doctoravailability" element={<DoctorAvailabilityPage />} />
          {/* Utils Page */}
          <Route path="comingsoon" element={<ComingSoonPage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
          <Route path="servererror" element={<ServerErrorPage />} />
=======
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:id" element={<NewContentPage />} />
>>>>>>> a293c6f5aa673509d214e0cbbbd92bc4c6ac3c25
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
<<<<<<< HEAD
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
=======
            {/* <Route path='reviews/history' element={<UserReviewHistoryPage />} />  */}
>>>>>>> a293c6f5aa673509d214e0cbbbd92bc4c6ac3c25
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
<<<<<<< HEAD
          <Route path="dashboard" element={<AdminDashboardManagementPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />

=======
            {/* <Route path='reviews' element={<AdminReviewManagementPage />} />  */}
          </Route>
        </Route>

        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/server-error" element={<ServerErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
>>>>>>> a293c6f5aa673509d214e0cbbbd92bc4c6ac3c25
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
