import React from 'react'
import DoctorManagementPage from '../../../components/DoctorManagement'
import DoctorFixedAvailabilityPage from '../../../components/DoctorFixedAvailabilityPage'
import DoctorSlotDeletion from '../../../components/DoctorSlotDeletion'
import DoctorAvailableSlotsViewer from '../../../components/DoctorAvailableSlotsViewer'

function AddDoctorDashboard() {
  return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-[#a7d1f8] min-h-screen">
  <div className="lg:col-span-2 space-y-6">
<div className='w-full bg-white h-20 p-6 text-center text-3xl font-extrabold rounded-md shadow-sm border border-gray-200 '>จัดการตารางนัดหมาย แพทย์</div>
    <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
     
     <DoctorManagementPage />
      
    </div>

    <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
    
      <DoctorFixedAvailabilityPage />
    </div>

    <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
   
      <DoctorSlotDeletion />
    </div>
  </div>

  <div className="space-y-6">
    <div className="bg-lime-100 p-6 rounded-md shadow-sm border  border-gray-200">
      <DoctorAvailableSlotsViewer />
    </div>
  </div>

</div>

    </div>
  )
}

export default AddDoctorDashboard