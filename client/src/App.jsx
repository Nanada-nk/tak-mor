import AppRouter from "./router/AppRouter"
import { Slide, ToastContainer } from "react-toastify"


function App() {

  return (
    <>
      <AppRouter />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        transition={Slide}
      />
    </>
  )
}
export default App