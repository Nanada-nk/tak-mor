import DoctorCardList from "../../components/DoctorList/DoctorCardList.jsx";

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

function DocList({ title = "แพทย์", bgColor }) {
  const defaultBgColor = "bg-[#EEF7FB]";
  return (
    <div
      className={`flex flex-col items-center ${
        bgColor || defaultBgColor
      } w-full py-10 px-4 sm:px-6 lg:px-8`}
    >
      <p className="font-bold text-2xl sm:text-3xl pb-6">{title}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {doctors.map((doctor) => (
          <DoctorCardList
            key={doctor.id}
            showButton={false}
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
  );
}
export default DocList;
