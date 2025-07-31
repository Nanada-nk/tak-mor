import DoctorCardList from "../../components/DoctorList/DoctorCardList";

const doctors = [
  {
    id: 1,
    name: "พญ.ดาวเนอร์",
    specialty: "แพทย์กระดูกและข้อ",
    rating: 4.5,
    reviews: 35,
    hospital: "โรงพยาบาลศิริราช",
    status: "ว่าง",
    price: 500,
    imgSrc: "../../public/DocContainer1.svg",
  },
  {
    id: 2,
    name: "นพ.เจมส์",
    specialty: "แพทย์ระบบประสาทและสมอง",
    rating: 3.8,
    reviews: 29,
    hospital: "โรงพยาบาลศิริราช",
    status: "ว่าง",
    price: 500,
    imgSrc: "../../public/DocContainer2.svg",
  },
  {
    id: 3,
    name: "พญ.โรส",
    specialty: "แพทย์กุมารเวช",
    rating: 4,
    reviews: 15,
    hospital: "โรงพยาบาลศิริราช",
    status: "ว่าง",
    price: 500,
    imgSrc: "../../public/DocContainer3.svg",
  },
  {
    id: 4,
    name: "พญ.เจมม่า",
    specialty: "แพทย์อายุรกรรม",
    rating: 5,
    reviews: 30,
    hospital: "โรงพยาบาลศิริราช",
    status: "ว่าง",
    price: 500,
    imgSrc: "../../public/DocContainer1.svg",
  },
];




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
          {doctors.map((doctor) => (
            <DoctorCardList
              key={doctor.id}
              showButton={true}
              name={doctor.name}
              specialty={doctor.specialty}
              rating={doctor.rating}
              reviews={doctor.reviews}
              hospital={doctor.hospital}
              status={doctor.status}
              price={doctor.price}
              imgSrc={doctor.imgSrc}
              linkPath={`/doctor/${doctor.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default DocListInternal;
