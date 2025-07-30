import {Search} from "lucide-react"
import PatientDashboard from "../../../components/dashboard/PatientDashboard.jsx"

function AdminPatientDashboardManagementPage() {
  return (
    <div className="font-prompt">
      <h3>AdminDashBoard</h3>

      <div className="join my-7">
        <div>
          <label className="input validator join-item w-100 ">
            <Search />
            <input type="email" placeholder="Searc ..." required />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
        </div>
        <button className="btn btn-neutral join-item">+ Add </button>
      </div>
      <div>
        <PatientDashboard/>
      </div>

    </div>
  )
}
export default AdminPatientDashboardManagementPage