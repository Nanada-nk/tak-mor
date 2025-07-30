import DoctorDashboard from '../../../components/dashboard/DoctorDashboard.jsx'
import { Search } from 'lucide-react'

function AdminDoctorDashboardMenagementPage() {
  return (
    <div className='font-prompt'>
         <h3>AdminDoctorDashBoard</h3>

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
        <DoctorDashboard/>
    </div>
  )
}

export default AdminDoctorDashboardMenagementPage