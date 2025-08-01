import FAQCollapseComponent from "../../components/FAQ/FAQCollapseComponent.jsx";
import { useMemo } from "react";

function FAQSection() {
  const faqList = [
    {
      question: "ฉันจะจองนัดหมายได้อย่างไร?",
      answer:
        "คุณสามารถจองนัดหมายได้โดยเลือกแพทย์ที่ต้องการ, เลือกวันที่และช่วงเวลาที่ว่าง, จากนั้นยืนยันการจอง คุณจะได้รับอีเมลยืนยันเมื่อการนัดหมายของคุณได้รับการจัดตารางเรียบร้อยแล้ว",
    },
    {
      question: "ฉันสามารถยกเลิกหรือเลื่อนนัดหมายได้หรือไม่?",
      answer:
        "ได้ค่ะ คุณสามารถยกเลิกหรือเลื่อนนัดหมายได้ผ่านแดชบอร์ดผู้ป่วยของคุณ โปรดทราบว่าการยกเลิกหรือเลื่อนนัดหมายอาจอยู่ภายใต้นโยบายของคลินิก และอาจต้องแจ้งล่วงหน้าตามระยะเวลาที่กำหนด (เช่น 24 ชั่วโมง)",
    },
    {
      question: "ฉันต้องให้ข้อมูลอะไรบ้างในการจองนัดหมาย?",
      answer:
        "โดยทั่วไปแล้ว คุณจะต้องระบุชื่อ-นามสกุล, เบอร์โทรศัพท์, ที่อยู่อีเมล และเหตุผลสั้นๆ สำหรับการเข้าพบแพทย์ คลินิกบางแห่งอาจขอวันเกิดหรือรหัสผู้ป่วยหากคุณเป็นผู้ป่วยเก่า",
    },
    {
      question: "ข้อมูลส่วนตัวและข้อมูลทางการแพทย์ของฉันปลอดภัยหรือไม่?",
      answer:
        "ปลอดภัยอย่างแน่นอนค่ะ เราให้ความสำคัญกับความเป็นส่วนตัวและความปลอดภัยของข้อมูลของคุณ ข้อมูลส่วนตัวและข้อมูลทางการแพทย์ทั้งหมดจะถูกเข้ารหัสและจัดเก็บตามข้อกำหนดการปกป้องข้อมูลที่เข้มงวด (เช่น HIPAA, GDPR) เพื่อให้มั่นใจในความลับของข้อมูล",
    },
    {
      question: "ฉันจะค้นหาแพทย์เฉพาะทางได้อย่างไร?",
      answer:
        'คุณสามารถใช้แถบค้นหาบนหน้าแรกของเรา หรือในส่วน "แพทย์" เพื่อค้นหาแพทย์ตามชื่อ, ความเชี่ยวชาญ, คลินิก หรือสถานที่ตั้ง มีตัวกรองต่างๆ เพื่อช่วยให้คุณปรับปรุงผลการค้นหาให้ละเอียดยิ่งขึ้น',
    },
    {
      question: "มีบริการปรึกษาออนไลน์ (Telemedicine) ด้วยหรือไม่?",
      answer:
        'แพทย์หลายท่านของเรามีบริการปรึกษาออนไลน์ (Telemedicine) คุณสามารถสังเกตได้จากป้าย "Telemedicine" หรือ "ปรึกษาออนไลน์" บนโปรไฟล์ของแพทย์ คุณจะได้รับลิงก์สำหรับห้องปรึกษาเสมือนจริงก่อนถึงเวลานัดหมาย',
    },
    {
      question: "มีวิธีการชำระเงินแบบใดบ้างที่ยอมรับ?",
      answer:
        "วิธีการชำระเงินจะแตกต่างกันไปในแต่ละคลินิก คลินิกส่วนใหญ่รับบัตรเครดิต/เดบิตหลักๆ, การโอนเงินผ่านธนาคาร, และบางแห่งอาจรับการชำระเงินโดยตรงที่คลินิก โปรดตรวจสอบโปรไฟล์ของคลินิก หรือติดต่อคลินิกโดยตรงสำหรับรายละเอียดการชำระเงินที่เฉพาะเจาะจง",
    },
    {
      question: "ถ้าฉันต้องการการรักษาพยาบาลเร่งด่วนควรทำอย่างไร?",
      answer:
        "แพลตฟอร์มของเราออกแบบมาสำหรับการนัดหมายตามกำหนดเวลา หากคุณต้องการการรักษาพยาบาลเร่งด่วนหรือกำลังประสบภาวะฉุกเฉินทางการแพทย์ โปรดอย่าใช้บริการนี้ ให้โทรเบอร์ฉุกเฉินในพื้นที่ของคุณ หรือไปที่ห้องฉุกเฉินที่ใกล้ที่สุดทันที",
    },
  ];

  function getRandomItems(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  const randomFaqs = useMemo(() => getRandomItems(faqList, 5), []);
  return (
    <div>
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto items-center lg:items-start gap-8 lg:gap-20 py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 relative h-100">
          <p className="font-bold text-2xl sm:text-3xl pb-4">คำถามที่พบบ่อย</p>

          <div className="hidden lg:block">
            <div className="border-2 border-[#e2edff] w-[60%] h-[70%] absolute bottom-16 left-15 -z-10"></div>
            <div className="border-2 border-[#e2edff] w-[60%] h-[70%] absolute bottom-13 left-12 -z-10"></div>
            <div className="border-2 border-[#e2edff] w-[60%] h-[70%] absolute bottom-10 left-9 -z-10"></div>
          </div>
          <img
            src="../../public/FAQbg.svg"
            alt="FAQbg"
            className="w-60 h-60 sm:w-80 sm:h-80 object-contain mt-10 lg:mt-0"
          />
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-1/2 mt-8 lg:mt-0">
          {randomFaqs.map((item, index) => (
            <FAQCollapseComponent
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default FAQSection;
