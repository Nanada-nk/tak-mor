import { useEffect } from 'react';
import { fetchCsrfToken } from "./config/axios.js"
import AppRouter from "./router/AppRouter"
import { Slide, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {

  useEffect(() => {
    // เรียกฟังก์ชันนี้เพื่อขอ CSRF Token มาเก็บไว้
    // โดย useEffect ที่มี dependency array ว่าง [] จะทำงานแค่ครั้งเดียวตอน component โหลด
    fetchCsrfToken();
  }, []);


  return (
    <>
      <AppRouter />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </>
  )
}
export default App