import PatientReview from "../../components/review/PatientReview.jsx";

function ReviewSection({bgColor}) {
  const defaultBgColor = "bg-[#EEF7FB]";
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
        className="absolute bottom-0 right-0 w-[200px] sm:w-[300px] lg:w-[400px] transform scale-x-[-1] pointer-events-none z-0"
      />
      
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center w-full max-w-6xl">
      
        <button className="btn btn-circle btn-sm hover:bg-[#0E82FD] hover:text-white transition-colors hidden lg:block">
          {"<"}
        </button>

        <PatientReview />

        <button className="btn btn-circle btn-sm hover:bg-[#0E82FD] hover:text-white transition-colors hidden lg:block">
          {">"}
        </button>
      </div>
    </div>
  );
}
export default ReviewSection;