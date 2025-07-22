import MainLayout from "./layouts/MainLayout"
import { BrowserRouter } from "react-router"
import AppRouter from "./router/AppRouter"
function App() {
  return (
    <div>
       {/* <BrowserRouter> */}
      <AppRouter />
       {/* </BrowserRouter> */}
    </div>
  )
}
export default App