import PatientReview from "../../components/review/PatientReview.jsx";
import { useState } from "react";

const patientReviews = [
  {
    id: 1,
    imageSrc: "/patient1.svg",
    name: "จอร์น สมิท",
    location: "เชียงใหม่",
    review: `ทักหมอ ทำได้เกินความคาดหมาย...`,
  },
  {
    id: 2,
    imageSrc: "/patient2.svg",
    name: "ศิริพร แสงทอง",
    location: "กรุงเทพฯ",
    review: `บริการดีมาก คุณหมอให้คำปรึกษาอย่างละเอียด...`,
  },
    {
    id: 3,
    imageSrc: "/patient3.svg",
    name: "ณัฐวุฒิ วงศ์ทอง",
    location: "ขอนแก่น",
    review: `ใช้งานง่ายและสะดวกมากครับ ไม่ต้องรอนาน คุณหมอให้คำแนะนำที่ชัดเจนและตรงประเด็น รู้สึกประทับใจมากกับบริการนี้`,
  },
  {
    id: 4,
    imageSrc: "/patient4.svg",
    name: "มาลี สวัสดิ์",
    location: "เชียงราย",
    review: `แอปใช้งานง่าย สามารถจองเวลาพบแพทย์ได้รวดเร็วและสะดวกมาก แพทย์มีความเป็นมืออาชีพและตอบคำถามได้ละเอียดทุกเรื่องค่ะ`,
  },
  {
    id: 5,
    imageSrc: "/patient5.svg",
    name: "ปกรณ์ วัฒนา",
    location: "นครราชสีมา",
    review: `ประสบการณ์ดีมากครับ การติดต่อสื่อสารกับแพทย์รวดเร็วและชัดเจน ทำให้การรักษาเป็นไปอย่างราบรื่นและมั่นใจ`,
  },
];

function ReviewSection({ bgColor }) {
  const defaultBgColor = "#EEF7FB";
  const visibleCount = 1;
  const [review, setReview] = useState(0);
  const visibleReviews = [
    ...patientReviews.slice(review, review + visibleCount),
    ...patientReviews.slice(
      0,
      Math.max(0, review + visibleCount - patientReviews.length)
    ),
  ];

  const handlePrev = () => {
    setReview((prev) => (prev === 0 ? patientReviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setReview((prev) => (prev === patientReviews.length - 1 ? 0 : prev + 1));
  };

  
  return (
    <div
      className="relative flex flex-col items-center w-full py-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundImage: "url('public/BgGraphics.svg')",
        backgroundColor: bgColor || defaultBgColor,
        backgroundRepeat: "no-repeat",
        backgroundSize: "300px",
        backgroundPosition: "top left",
      }}
    >
      <img
        src="/BgGraphics.svg"
        alt="decor mirror"
        className="absolute bottom-28 -right-10 w-[200px] sm:w-[300px] lg:w-[400px] transform scale-x-[-1] pointer-events-none z-0"
      />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center w-full max-w-6xl">
        <button
          className="btn btn-circle btn-sm hover:bg-[#0E82FD] hover:text-white transition-colors hidden lg:block"
          onClick={handlePrev}
        >
          {"<"}
        </button>
        {visibleReviews?.map((item) => (
          <PatientReview
            key={item.id}
            id={item.id}
            imageSrc={item.imageSrc}
            name={item.name}
            location={item.location}
            review={item.review}
          />
        ))}

        <button
          className="btn btn-circle btn-sm hover:bg-[#0E82FD] hover:text-white transition-colors hidden lg:block"
          onClick={handleNext}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
export default ReviewSection;
