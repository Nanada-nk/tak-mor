// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import authApi from "../api/authApi.js";

// const authStore = create(
//   persist(
//     (set, get) => ({
//       user: null,
//       token: null,
//       isLoading: true,
//       isLoggedIn: false,

//       // setToken:(token) => {
//       //   set(() => ({token: token}))
//       // },

//       // setAuthSocialLogin: (user,token) => {
//       //   // console.log("setAuthUser: Updating user state.", user);
//       //   set(() => ({ user: user, isLoggedIn: !!user, token }));
//       // },

//       setAuth: (data) => {
//         const { user, accessToken } = data;
//         set({ user, token: accessToken, isLoggedIn: true, isLoading: false });
//       },

//       setAuthUser: (user) => {
//         // console.log("setAuthUser: Updating user state.", user);
//         set({ user: user, isLoggedIn: !!user });
//       },


//       checkAuth: async () => {
//         console.log("1. checkAuth action STARTING...")

//         const currentToken = get().token;

//         console.log("2. Token from store is:", currentToken);

//         if (currentToken) {
//           try {
//             const resp = await authApi.getMe();
//             console.log("3. getMe API call SUCCEEDED.");
//             set({ user: resp.data.user, isLoggedIn: true, isLoading: false });
//           } catch (error) {
//             console.error("4. getMe API call FAILED.", error);
//             set({ user: null, token: null, isLoggedIn: false, isLoading: false })
//             throw error;
//           }
//         } else {
//           set({ isLoading: false });
//         }
//       },


//       actionRegister: async (registerData) => {
//         try {
//           const response = await authApi.registerPatient(registerData);
//           return response;
//         } catch (error) {
//           throw error;
//         }
//       },

//       actionLogin: async (loginData) => {
//         set({ isLoading: true })
//         try {
//           const response = await authApi.login(loginData);
//           const { accessToken, user } = response.data;
//           // console.log("actionLogin: Login successful, accessToken =", accessToken, "user =", user)
//           set({ token: accessToken, user: user, isLoggedIn: true, isLoading: false });
//           console.log('response', response)
//           return response
//         } catch (error) {
//           console.error("Login action failed:", error);
//           set({ isLoading: false });
//           throw error;
//         }
//       },

//       actionSocialLogin: (data) => {
//         const { accessToken, user } = data;
//         console.log('data', data)
//         set({ token: accessToken, user: user, isLoggedIn: true, isLoading: false });
//       },

//       actionLogout: () => {
//         // console.log("actionLogout: Logging out user.");
//         // console.trace("Call stack:")

//         set({ user: null, token: null, isLoggedIn: false });
//       },
//     }),
//     {
//       name: "auth-storage",
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({
//         token: state.token,
//         // user: state.user,
//         // isLoggedIn: state.isLoggedIn
//       }),
//     }
//   )
// );
// authStore.getState().checkAuth();
// export default authStore;


import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import authApi from "../api/authApi.js";

const authStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null, // นี่คือ Access Token
      isLoggedIn: false,
      isLoading: true, // เริ่มต้นเป็น true เพื่อรอ checkAuth

      // ✅ Action หลักสำหรับตั้งค่า State หลัง Login/Register สำเร็จ
      setAuth: (data) => {
        const { user, accessToken } = data;
        set({ user, token: accessToken, isLoggedIn: true, isLoading: false });
      },
      
      // ✅ Action สำหรับ Logout
      logout: () => {
        set({ user: null, token: null, isLoggedIn: false, isLoading: false });
      },

      // ✅ Action สำหรับตรวจสอบสถานะ Login ตอนเปิดแอป
      checkAuth: async () => {
        const token = get().token;
        if (token) {
          try {
            // ใช้ token ที่มีอยู่ไปขอข้อมูล user ล่าสุด
            const resp = await authApi.getMe();
            set({ user: resp.data.user, isLoggedIn: true, isLoading: false });
          } catch (error) {
            // ถ้า token ไม่ผ่าน (เช่น หมดอายุ) ให้ logout
            console.error("checkAuth failed, logging out.", error);
            set({ user: null, token: null, isLoggedIn: false, isLoading: false });
          }
        } else {
          // ถ้าไม่มี token ก็ไม่ต้องทำอะไร แค่หยุด loading
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage", // Key ที่จะใช้ใน localStorage
      storage: createJSONStorage(() => localStorage),
      // ✅ เราจะเก็บแค่ Access Token ลง localStorage ก็พอ
      // ข้อมูล user จะถูกดึงมาใหม่เสมอผ่าน checkAuth() เพื่อความสดใหม่และปลอดภัย
      partialize: (state) => ({ token: state.token }),
    }
  )
);

// สั่งให้ checkAuth ทำงานทันทีที่แอปเริ่มทำงาน
// authStore.getState().checkAuth();

export default authStore;

