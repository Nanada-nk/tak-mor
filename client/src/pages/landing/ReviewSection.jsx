import PatientReview from "../../components/review/PatientReview";
function ReviewSection() {
  return (
    <div
      className="relative flex justify-center items-center gap-3 w-full h-95 pt-8 pb-2 overflow-hidden"
      style={{
        backgroundImage: "url('public/BgGraphics.svg')",
        backgroundColor: "#EEF7FB",
        backgroundRepeat: "no-repeat",
        backgroundSize: "300px",
        backgroundPosition: "top left",
      }}
    >
      <img
        src="/BgGraphics.svg"
        alt="decor mirror"
        className="absolute bottom-0 right-0 w-[400px] transform scale-x-[-1] pointer-events-none z-0"
      />
      <div className="flex gap-20 items-center w-[80%]">
        <button className="btn rounded-full hover:bg-[#0E82FD] hover:text-white">
          {"<"}
        </button>

        <PatientReview />

        <button className="btn bg- rounded-full hover:bg-[#0E82FD] hover:text-white">
          {">"}
        </button>
      </div>
    </div>
  );
}
export default ReviewSection;
