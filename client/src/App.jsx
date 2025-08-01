import { useEffect } from 'react';
import { fetchCsrfToken } from "./config/axios.js"
import AppRouter from "./router/AppRouter.jsx"
import { Slide, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {

  //rutclose
  // useEffect(() => {
  //   fetchCsrfToken();
  // }, []);


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