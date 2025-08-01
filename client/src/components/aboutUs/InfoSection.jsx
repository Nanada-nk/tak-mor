import { PhoneEmergency } from "../icons/index.jsx";

function InfoSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-30 justify-center pt-10 lg:h-[600px] mb-10 md:mb-0">
      <div className="flex flex-col w-1/4 relative">
        <div className="flex gap-2">
          <div className="hidden lg:block w-50">
            <img
              src="../../public/DocImageAboutPage1.svg"
              alt="DocImageAboutPage1"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-50 h-30 bg-primary-gradient rounded-xl shadow-xl lg:flex items-center text-center absolute top-10 left-54 hidden">
            <p className="text-white text-xl">
              แพทย์ของเรามีผู้เชี่ยวชาญเฉพาะทางมากกว่า 20 คน
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-50 absolute top-70 hidden lg:block">
            <img
              src="../../public/DocImageAboutPage2.svg"
              alt="DocImageAboutPage2"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-50 absolute top-50 left-54 hidden lg:block">
            <img
              src="../../public/DocImageAboutPage3.svg"
              alt="DocImageAboutPage3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full lg:w-[550px] px-4">
        <p className="font-bold text-[#0E82FD] text-base lg:text-lg">
          เกี่ยวกับบริษัทของเรา
        </p>
        <p className="font-bold text-2xl pt-2.5">
          เรามั่นใจเสมอว่าการรักษาทางการแพทย์ที่ดีที่สุดเพื่อสุขภาพของคุณ
        </p>
        <p className="text-gray-500 text-sm lg:text-base">
          ที่ทักหมอ
          เราเข้าใจถึงความสำคัญของการดูแลสุขภาพที่เข้าถึงได้และสะดวกสบาย...
        </p>
        <p className="text-gray-500 text-sm lg:text-base">
          เราจินตนาการถึงโลกที่ทุกคนสามารถเข้าถึงการดูแลสุขภาพได้อย่างง่ายดาย...
        </p>
        <div className="flex gap-3 items-center mt-2">
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
