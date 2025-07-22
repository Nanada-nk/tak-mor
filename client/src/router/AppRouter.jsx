
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import MainLayout from '../layouts/MainLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';

import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage.jsx';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage.jsx';



// import ChangePasswordPage from '../pages/users/ChangePasswordPage.jsx';
// import UserReviewHistoryPage from '../pages/reviews/UserReviewHistoryPage.jsx';

import NotFoundPage from '../pages/utils/NotFoundPage.jsx';
import HomePage from '../pages/HomePage.jsx';
// import authStore from '../stores/authStore.js';

// import AdminReviewManagementPage from '../pages/admin/AdminReviewManagementPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import AdminRoute from './AdminRoute.jsx';


function AppRouter() {
  // const checkAuth = authStore((state) => state.checkAuth)
  // useEffect(() => {
  //   checkAuth();
  // }, [])

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
           <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='forgot-password' element={<ForgotPasswordPage />} />
          <Route path='reset-password' element={<ResetPasswordPage />} /> 
         
        </Route>

         <Route element={<ProtectedRoute />}>
          <Route path='/' element={<MainLayout />}>
    
             {/* <Route path='reviews/history' element={<UserReviewHistoryPage />} />  */}
          </Route>
        </Route> 
 
        <Route element={<AdminRoute />}>
          <Route path='/admin' element={<AdminLayout />}>
            {/* <Route path='reviews' element={<AdminReviewManagementPage />} />  */}
          </Route>
        </Route> 


        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;