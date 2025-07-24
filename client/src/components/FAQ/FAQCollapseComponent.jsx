function FAQCollapseComponent() {
  return (
      <div
        tabIndex={0}
        className="collapse collapse-plus bg-base-100 border-base-300 border"
      >
        <div className="collapse-title font-semibold">
          ฉันจะนัดหมายกับแพทย์ได้อย่างไร?
        </div>
        <div className="collapse-content text-sm">
          เพียงเข้าไปที่เว็บไซต์ของเราและเข้าสู่ระบบหรือสร้างบัญชี
          ค้นหาแพทย์ตามความเชี่ยวชาญ และยืนยันการจองของคุณ
        </div>
      </div>

  );
}
export default FAQCollapseComponent;
