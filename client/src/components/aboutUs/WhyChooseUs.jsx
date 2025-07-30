import { DocFemaleIcon, HourIcon, ConsultationIcon, LabIcon } from "../icons/index.jsx";

function WhyChooseUs() {
  return (
    <div className="flex flex-col justify-center items-center md:h-100 w-full">
      <p className="font-bold text-lg md:text-xl lg:text-3xl text-center">
        ทำไมต้องเลือกใช้บริการของเรา
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 sm:gap-4 md:gap-6 justify-items-center">
        <div className="w-60 h-60 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center mt-15 px-1.5">
          <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#0E82FD]">
            <DocFemaleIcon className="w-7" />
          </div>
          <div className="px-2.5">
            <p className="text-sm mt-1 font-bold text-center">
              บุคลากรทางการแพทย์ที่มีคุณวุฒิ
            </p>
            <p className="text-xs text-gray-400 mt-2">
              แพลตฟอร์มของเราเป็นพันธมิตรเฉพาะกับแพทย์ที่มีคุณวุฒิสูงซึ่งมีความเชี่ยวชาญและความมุ่งมั่นในการมอบการดูแลสุขภาพระดับสูงสุด
            </p>
          </div>
        </div>
        <div className="w-60 h-60 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center mt-15 px-1.5">
          <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#0E82FD]">
            <HourIcon className="w-8" />
          </div>
          <div className="px-2.5">
            <p className="text-sm mt-1 font-bold text-center">
              บริการตลอด 24 ชั่วโมง
            </p>
            <p className="text-xs text-gray-400 mt-2">
              สัมผัสประสบการณ์การเข้าถึงบริการด้านสุขภาพด้วยบริการตลอด 24
              ชั่วโมงทุกวันของเรา ไม่ว่าจะเป็นกลางวันหรือกลางคืน
              คุณสามารถค้นหาและจองนัดหมายได้
            </p>
          </div>
        </div>
        <div className="w-60 h-60 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center mt-15 px-1.5">
          <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#0E82FD]">
            <LabIcon className="w-8" />
          </div>
          <div className="px-2.5">
            <p className="text-sm mt-1 font-bold text-center">
              บริการห้องปฏิบัติการจากโรงพยาบาล
            </p>
            <p className="text-xs text-gray-400 mt-2">
              สุขภาพของคุณคือสิ่งสำคัญที่สุดสำหรับเรา
              และบริการของเราสะท้อนให้เห็นถึงความมุ่งมั่นของเราเพื่อความเป็นเลิศ
            </p>
          </div>
        </div>
        <div className="w-60 h-60 rounded-xl shadow-xl flex flex-col gap-4 justify-center items-center mt-15 px-1.5">
          <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#0E82FD]">
            <ConsultationIcon className="w-8" />
          </div>
          <div className="px-2.5">
            <p className="text-sm mt-1 font-bold text-center">ปรึกษาฟรี</p>
            <p className="text-xs text-gray-400 mt-2">
              ความเป็นอยู่ที่ดีของคุณมีความสำคัญ
              และความมุ่งมั่นของเราในการให้การดูแลที่เข้าถึงได้เริ่มต้นด้วยการให้คำปรึกษาเบื้องต้นฟรี
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WhyChooseUs;
