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
];

function ReviewSection({ bgColor }) {
  const defaultBgColor = "#EEF7FB";
  const visibleCount = 1;
  const [review, setReview] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? review.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === review.length - 1 ? 0 : prev + 1
    );
  };

    const currentReview = patientReviews[review];

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
        <button className="btn btn-circle btn-sm hover:bg-[#0E82FD] hover:text-white transition-colors hidden lg:block" onClick={handlePrev}>
          {"<"}
        </button>

        {patientReviews.map((item) => (
          <PatientReview
            key={item.id}
            id={item.id}
            imageSrc={item.imageSrc}
            name={item.name}
            location={item.location}
            review={item.review}
          />
        ))}

        <button className="btn btn-circle btn-sm hover:bg-[#0E82FD] hover:text-white transition-colors hidden lg:block" onClick={handleNext}>
          {">"}
        </button>
      </div>
    </div>
  );
}
export default ReviewSection;
