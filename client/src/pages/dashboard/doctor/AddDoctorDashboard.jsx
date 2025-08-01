import React from 'react'

function AddDoctorDashboard() {
  return (
    <div>
        <form class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-[#fefae0] min-h-screen">
  <div class="lg:col-span-2 space-y-6">

    <div class="bg-white p-6 rounded-md shadow-sm border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">General Information</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">ชื่อจริง</label>
          <input type="text" name="firstName" placeholder="กรอกชื่อจริง..." required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">นามสกุล</label>
          <input type="text" name="lastName" placeholder="กรอกนามสกุล..." required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">รหัสประจำตัวแพทย์</label>
          <input type="text" name="licenseNumber" placeholder="กรอกรหัสแพทย์..." required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500" />
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-md shadow-sm border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Address</h2>
      <textarea name="address" placeholder="กรอกที่อยู่..." rows="4" required
        class="block w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"></textarea>
    </div>

    <div class="bg-white p-6 rounded-md shadow-sm border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Birth Date</h2>
      <input type="date" name="birthDate" required
        class="block w-full border border-gray-300 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500" />
    </div>
  </div>

  <div class="space-y-6">
    <div class="bg-white p-6 rounded-md shadow-sm border border-gray-200">
      <label class="block text-sm font-medium text-gray-700 mb-2">ความเชี่ยวชาญ</label>
      <select name="specialtyId" class="w-full border border-gray-300 rounded-md p-2">
        <option value="">เลือกความเชี่ยวชาญ</option>
        <option value="1">อายุรกรรม</option>
        <option value="2">ศัลยกรรม</option>
      </select>
    </div>

    <div class="bg-white p-6 rounded-md shadow-sm border border-gray-200">
      <label class="block text-sm font-medium text-gray-700 mb-2">สถานะ</label>
      <select name="status" class="w-full border border-gray-300 rounded-md p-2">
        <option value="active">ใช้งาน</option>
        <option value="inactive">ไม่ใช้งาน</option>
      </select>
    </div>

    <div class="pt-2">
      <button type="submit"
        class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition">
        บันทึกข้อมูลแพทย์
      </button>
    </div>
  </div>
</form>

    </div>
  )
}

export default AddDoctorDashboard