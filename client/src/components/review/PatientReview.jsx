function PatientReview() {
  return (
    <div className="overflow-hidden w-full h-80 flex items-center justify-center gap-20">
      {/* Image and Tag Section */}
      <div className="avatar">
        <div className="w-80 h-80 rounded-full border-none">
          <img
            src="../../public/patient7.svg"
            alt="Patient1"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 w-2/3 flex flex-col">
        <div className="flex items-center gap-2 mb-4 text-gray-600 text-sm"></div>

        {/* Title */}
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          รีวิวจากคนไข้ของเรา
        </h3>

        {/* Description */}
        <p className="text-lg mt-2 text-gray-500">
          ทักหมอ ทำได้เกินความคาดหมายในด้านการดูแลสุขภาพ กระบวนการจองที่ราบรื่น
          ประกอบกับความเชี่ยวชาญของแพทย์ ทำให้ประสบการณ์ของฉันยอดเยี่ยม
          ความมุ่งมั่นในการดูแลที่มีคุณภาพและความสะดวกสบายของพวกเขาทำให้พวกเขาโดดเด่นอย่างแท้จริง
          ฉันขอแนะนำ ทักหมอ
          อย่างยิ่งสำหรับทุกคนที่กำลังมองหาบริการด้านสุขภาพที่เชื่อถือได้และเข้าถึงได้
        </p>

        <div className="mt-10">
          <p className="font-bold text-m">จอร์น สมิท</p>
          <p className="text-sm mt-2 text-gray-500">เชียงใหม่</p>
        </div>
      </div>
    </div>
  );
}
export default PatientReview;
