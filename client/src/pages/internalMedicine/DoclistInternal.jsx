import DoctorCardList from "../../components/DoctorList/DoctorCardList";
function DocListInternal() {
  return (
    <div className="relative w-full font-prompt -top-50">
      <div className="absolute inset-0 z-0">
        {/* ชั้น Gradient + Overlay Image */}
        <div className="w-full h-full bg-gradient-to-r from-[#2189d8] to-[#06AED4] opacity-90">
          <div
            className="hidden sm:block w-full h-full bg-[url('../../public/FAQbg.svg')] bg-cover bg-center opacity-10"
            style={{ backgroundBlendMode: "overlay" }}
          ></div>
        </div>
      </div>
      <div className="relative z-10 w-full mx-auto px-4 py-10 flex flex-col items-center text-white">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-5xl mt-10 sm:mt-12 px-4 sm:px-0">
          <div className="mt-4">
            <p className=" text-xl sm:text-3xl font-bold mb-4 sm:mb-0">
              นัดหมายกับแพทย์ชั้นนำของเรา
            </p>
            <p className="text-xl sm:text-lg mb-4 sm:mb-0 mt-0 sm:mt-3">
              พบกับผู้เชี่ยวชาญของเราและจองคิวออนไลน์
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-circle btn-sm hover:bg-[#6938EF] hover:text-white transition-colors">
              {"<"}
            </button>
            <button className="btn btn-circle btn-sm hover:bg-[#6938EF] hover:text-white transition-colors">
              {">"}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full h-full max-w-6xl mt-5 mb-8">
          <DoctorCardList showButton="true" />
          <DoctorCardList showButton="true" />
          <DoctorCardList showButton="true" />
          <DoctorCardList showButton="true" />
        </div>
      </div>
    </div>
  );
}
export default DocListInternal;
