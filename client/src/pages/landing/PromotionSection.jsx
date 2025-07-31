import PromotionCard from "../../components/Promotion/PromotionCard.jsx";

function PromotionSection() {
  return (
    <div className="flex flex-col items-center w-full py-10 px-4 sm:px-6 lg:px-8">
      <p className="font-bold text-2xl sm:text-3xl pb-6">โปรโมชั่น</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        <PromotionCard
          title="แพ็กเกจรายครั้ง"
          price=" 500"
          features={[
            "การสร้างโปรไฟล์",
            "การจองนัดหมาย",
            "การแจ้งเตือน",
            "การเข้าประวัติการรักษาทางไกล",
          ]}
        />
        <PromotionCard
          title="แพ็กเกจราย 5 ครั้ง"
          price=" 2250"
          features={[
            "การสร้างโปรไฟล์",
            "การจองนัดหมาย",
            "การแจ้งเตือน",
            "การเข้าประวัติการรักษาทางไกล",
            "ส่วนลดพิเศษ",
            "ประวัติการนัดหมาย",
            "การสนับสนุนผู้ป่วยหลังจบการปรึกษา",
          ]}
          showPopular="true"
        />
        <PromotionCard
          title="แพ็กเกจราย 10 ครั้ง"
          price=" 4500"
          features={[
            "คุณสมบัติแผนพื้นฐานทั้งหมด",
            "ฟีเจอร์แผนพรีเมียมทั้งหมด",
            "ข้อมูลเชิงลึกด้านสุขภาพส่วนบุคคล",
            "การจัดการเอกสารทางการแพทย์ โดยไม่มีค่าใช้จ่าย",
          ]}
        />
      </div>
    </div>
  );
}
export default PromotionSection;
