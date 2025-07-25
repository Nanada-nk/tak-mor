function FAQCollapseComponent({question = "ฉันจะนัดหมายกับแพทย์ได้อย่างไร?" , answer = `เพียงเข้าไปที่เว็บไซต์ของเราและเข้าสู่ระบบหรือสร้างบัญชี
          ค้นหาแพทย์ตามความเชี่ยวชาญ และยืนยันการจองของคุณ`}) {
  return (
      <div
        tabIndex={0}
        className="collapse collapse-plus bg-base-100 border-base-300 border"
      >
        <div className="collapse-title font-semibold">
          {question}
        </div>
        <div className="collapse-content text-sm">
          {answer}
        </div>
      </div>

  );
}
export default FAQCollapseComponent;
