import DoctorCardList from "../../components/DoctorList/DoctorCardList";
function DocListInternal() {
  return (
    <div className="font-prompt relative -top-50 h-150 container mx-auto px-4 py-10 flex flex-col items-center">
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
  );
}
export default DocListInternal;
