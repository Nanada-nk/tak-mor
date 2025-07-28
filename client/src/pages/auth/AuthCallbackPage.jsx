// // import { useEffect } from 'react';
// // import { useSearchParams, useNavigate, Navigate } from 'react-router';
// // import { toast } from 'react-toastify';
// // import authStore from '../../stores/authStore.js';
// // import authApi from '../../api/authApi.js';

// // function AuthCallbackPage() {
// //   const [searchParams] = useSearchParams();
// //   const navigate = useNavigate();
// //   console.log('testtt', searchParams.get('error'))


// //   // const { actionSocialLogin, user,setAuthSocialLogin } = authStore((state) => ({
// //   //   actionSocialLogin: state.actionSocialLogin,
// //   //   user: state.user,
// //   //   setAuthSocialLogin: state.setAuthSocialLogin
// //   // }));

// //   const actionSocialLogin = authStore((state)=> state.actionSocialLogin)
// //   const user = authStore((state)=> state.user)
// //   const setAuthSocialLogin = authStore((state)=> state.setAuthSocialLogin)


// //   useEffect(() => {

// //     const token = searchParams.get('token');
// //     console.log('token', token)

// //     const error = searchParams.get('error');
// //     console.log('error', error)

// //     if (error) {
// //       toast.error(error || 'Login failed.');
// //       // navigate('/login');
// //     } else if (token) {

// //       console.log('token test', token)

// //       const fetchUser = async () => {
// //         try {

// //           localStorage.setItem('accessToken', token);


// //           const response = await authApi.getMe();
// //           console.log('response test', response)

// //           setAuthSocialLogin(response.data.user,token)
// //           // actionSocialLogin({ accessToken: token, user: response.data.user });
// //           // navigate('/');
// //           // console.log('window.location', window.location)
// //           // window.location.href('/')


// //         } catch (fetchError) {
// //           toast.error('Could not fetch user data after login.');
// //           localStorage.removeItem('accessToken');
// //           navigate('/login');
// //         }
// //       };

// //       console.log('fetchUser', fetchUser)
// //       fetchUser();
// //     } else {

// //       toast.error('Invalid callback state.');
// //       // navigate('/login');
// //     }
// //   }, [searchParams, navigate, actionSocialLogin]); 


// //   useEffect(() => {

// //     if (user) {
// //       toast.success('Login successful! Redirecting...');

// //       navigate(user.role === 'DOCTOR' ? "/doctor/dashboard" : "/patient/dashboard", { replace: true });
// //     }
// //   }, [user, navigate]); 

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-50">
// //       <div className="text-center">
// //         <span className="loading loading-spinner loading-lg text-primary"></span>
// //         <p className="text-lg font-medium text-gray-700">Finalizing your login...</p>
// //         <p className="text-sm text-gray-500">Please wait a moment.</p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AuthCallbackPage;


// import { useEffect } from 'react';
// import { useSearchParams, useNavigate } from 'react-router';
// import { toast } from 'react-toastify';
// import authStore from '../../stores/authStore.js';
// import authApi from '../../api/authApi.js';

// function AuthCallbackPage() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   // ดึง action ที่จำเป็นมาจาก Zustand store
//   const { setAuth, logout } = authStore((state) => ({
//     setAuth: state.setAuth,
//     logout: state.logout,
//   }));

//   useEffect(() => {
//     // สร้างฟังก์ชัน async เพื่อจัดการ Logic ทั้งหมด
//     const processToken = async () => {
//       const token = searchParams.get('token');
//       const error = searchParams.get('error');

//       // กรณีที่ 1: Backend ส่ง error กลับมา
//       if (error) {
//         toast.error(decodeURIComponent(error) || 'Login failed.');
//         navigate('/login', { replace: true });
//         return;
//       }

//       // กรณีที่ 2: Backend ส่ง token กลับมาสำเร็จ
//       if (token) {
//         try {
//           // 2.1: ตั้งค่า token ใน store ชั่วคราวเพื่อให้ getMe() ทำงานได้
//           // axiosInstance จะดึง token นี้ไปใช้ใน header โดยอัตโนมัติ
//           authStore.setState({ token });

//           // 2.2: ใช้ token เพื่อดึงข้อมูล user ล่าสุด
//           const response = await authApi.getMe();
//           const { user } = response.data;

//           // 2.3: เมื่อได้ข้อมูลครบแล้ว ให้ตั้งค่า State ที่สมบูรณ์
//           setAuth({ user, accessToken: token });
//           toast.success('Login successful!');

//           if (user.role === 'DOCTOR') {
//             navigate('/doctorprofile', { replace: true });
//           } else if (user.role === 'ADMIN') {
//             navigate('/admin/patientdashboard', { replace: true });
//           }
//           else {
//             navigate('/patientprofile', { replace: true });
//           }

//         } catch (fetchError) {
//           // 2.4: หาก getMe() ไม่สำเร็จ (เช่น token ปลอม)
//           toast.error('Could not verify login session. Please try again.');
//           logout(); // ล้าง state ที่ไม่ถูกต้องทิ้ง
//           navigate('/login', { replace: true });
//         }
//       } else {
//         // กรณีที่ 3: ไม่มีทั้ง token และ error ใน URL
//         toast.error('Authentication callback is missing a token.');
//         navigate('/login', { replace: true });
//       }
//     };

//     processToken();

//     // dependency array ว่าง [] หมายถึงให้ useEffect นี้ทำงานแค่ "ครั้งเดียว" ตอน component โหลด
//   }, [searchParams, navigate, setAuth, logout]);

//   // แสดงหน้า Loading ขณะที่กำลังประมวลผล
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="text-center">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//         <p className="mt-4 text-lg font-medium text-gray-700">Finalizing login, please wait...</p>
//       </div>
//     </div>
//   );
// }

// export default AuthCallbackPage;

import { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import authStore from '../../stores/authStore.js';
import authApi from '../../api/authApi.js';

function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // NOTE: ดึง setAuth/logout แบบ static function แทนการ subscribe state
  const setAuth = authStore.getState().setAuth;
  const logout = authStore.getState().logout;
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; // กันซ้ำ (แก้ side effect จาก infinite rerender)
    hasRun.current = true;

    const processAuth = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (error) {
        toast.error(decodeURIComponent(error) || 'Login failed.');
        navigate('/login', { replace: true });
        return;
      }

      if (token) {
        try {
          authStore.setState({ token });

          const response = await authApi.getMe();
          const { user } = response.data;

          setAuth({ user, accessToken: token });
          toast.success('Login successful!');

          if (user.role === 'DOCTOR') {
            navigate('/doctorprofile', { replace: true });
          } else if (user.role === 'ADMIN') {
            navigate('/admin/patientdashboard', { replace: true });
          } else {
            navigate('/patientprofile', { replace: true });
          }

        } catch (fetchError) {
          toast.error('Could not verify login session. Please try again.');
          logout();
          navigate('/login', { replace: true });
        }
      } else {
        toast.error('Authentication callback is missing a token.');
        navigate('/login', { replace: true });
      }
    };

    processAuth();
  }, [searchParams, navigate]); // ไม่ต้องใส่ setAuth/logout ใน dependency!

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-lg font-medium text-gray-700">Finalizing login...</p>
      </div>
    </div>
  );
}

export default AuthCallbackPage;
