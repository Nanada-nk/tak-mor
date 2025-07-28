import AppointmentDashboard from '../../../components/dashboard/AppointmentDashboard.jsx'
import { Search } from 'lucide-react'

function AdminAppointmentDashboardManagementPage() {
   
  return (
     <div>
         <h3>AppointmentDashBoard</h3>

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
        <AppointmentDashboard/>
    </div>
  )
}

export default AdminAppointmentDashboardManagementPage