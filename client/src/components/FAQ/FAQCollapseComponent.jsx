function FAQCollapseComponent({question = "ฉันจะนัดหมายกับแพทย์ได้อย่างไร?" , answer = `เพียงเข้าไปที่เว็บไซต์ของเราและเข้าสู่ระบบหรือสร้างบัญชี
          ค้นหาแพทย์ตามความเชี่ยวชาญ และยืนยันการจองของคุณ`}) {
  return (
      <div
        tabIndex={0}
      
        className="collapse collapse-plus bg-base-100 border-base-300 border w-full px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-[#e2edff] "
      >
        <input type="checkbox" tabIndex={0} className="peer" /> 
        <div className="collapse-title font-semibold text-base sm:text-lg peer-checked:text-[#0E82FD]">
          {question}
        </div>
        
        <div className="collapse-content text-sm sm:text-base">
          {answer}
        </div>
      </div>
  );
}
export default FAQCollapseComponent;
