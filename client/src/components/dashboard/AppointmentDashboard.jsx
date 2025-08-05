import DailyAppointmentsViewer from "../DailyAppointmentsViewer"
import DoctorAvailableSlotsViewer from "../DoctorAvailableSlotsViewer"

function AppointmentDashboard() {
    
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-gray-50 py-4 px-4 font-prompt">
      <div className='w-full bg-white h-20 p-6 text-center  text-3xl font-extrabold rounded-md shadow-sm border border-gray-200 '>ดูตารางนัดหมาย แพทย์</div>

    <div className="font-prompt flex flex-row gap-5 w-full ">

    <div className="w-full  ">
           <DailyAppointmentsViewer />
        </div>

        <div className="w-full">
    <div className="bg-lime-100 p-6 w-full rounded-md shadow-sm border  border-gray-200">
      <DoctorAvailableSlotsViewer />
    </div>
  </div>
</div>
        </div>
  )
}

export default AppointmentDashboard