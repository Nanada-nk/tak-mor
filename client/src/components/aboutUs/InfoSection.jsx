import { PhoneEmergency } from "../icons/index.jsx";

function InfoSection() {
  return (
    <div className="flex gap-30 justify-center pt-10 h-150">
      <div className="flex flex-col w-1/4 relative">
        <div className="flex gap-2">
          <div className="w-50">
            <img
              src="../../public/DocImageAboutPage1.svg"
              alt="DocImageAboutPage1"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-50 h-30 bg-[#0E82FD] rounded-xl shadow-xl flex items-center text-center absolute top-10 left-54">
            <p className="text-white text-xl">
              แพทย์ของเรามีผู้เชี่ยวชาญเฉพาะทางมากกว่า 20 คน
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-50 absolute top-70">
            <img
              src="../../public/DocImageAboutPage2.svg"
              alt="DocImageAboutPage2"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-50 absolute top-50 left-54">
            <img
              src="../../public/DocImageAboutPage3.svg"
              alt="DocImageAboutPage3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-[550px]">
        <p className="font-bold text-[#0E82FD]">เกี่ยวกับบริษัทของเรา</p>
        <p className="font-bold text-2xl pt-2.5">
          เรามั่นใจเสมอว่าการรักษาทางการแพทย์ที่ดีที่สุดเพื่อสุขภาพของคุณ
        </p>
        <p className="text-gray-500">
          ที่ทักหมอ
          เราเข้าใจถึงความสำคัญของการดูแลสุขภาพที่เข้าถึงได้และสะดวกสบาย
          ภารกิจของเราคือการทำให้กระบวนการค้นหาและนัดหมายกับผู้เชี่ยวชาญด้านสุขภาพที่มีคุณสมบัติเหมาะสมเป็นเรื่องง่ายขึ้น
          เพื่อให้มั่นใจว่าคุณจะได้รับการดูแลที่คุณต้องการเมื่อคุณต้องการ
        </p>
        <p className="text-gray-500">
          เราจินตนาการถึงโลกที่ทุกคนสามารถเข้าถึงการดูแลสุขภาพได้อย่างง่ายดาย
          ไม่ว่าคุณจะกำลังมองหาการตรวจสุขภาพประจำปี
          การปรึกษาผู้เชี่ยวชาญเฉพาะทาง หรือการดูแลฉุกเฉิน
          เรามุ่งมั่นที่จะเชื่อมโยงคุณกับผู้เชี่ยวชาญทางการแพทย์ที่เหมาะสมได้อย่างง่ายดาย
        </p>
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-[#0E82FD] flex justify-center items-center">
            <PhoneEmergency />
          </div>
          <div className="flex flex-col gap-1 pt-1.5">
            <p className="text-gray-400 text-sm">ต้องการเหตุฉุกเฉินใช่ไหม?</p>
            <p className="font-bold text-lg">1669</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InfoSection;
