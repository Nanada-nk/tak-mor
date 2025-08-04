import { useNavigate } from "react-router";
import DoctorCardDynamic from "../../components/booking/DoctorCardDynamic.jsx";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../config/axios.js";
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

function DoctorListPage() {
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/doctor")
      .then(res => {
        setDoctorList(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("Failed to fetch doctors:", err);
        setDoctorList([]);
      });
  }, []);

  const handleBooking = useCallback((doctor) => {
    navigate("/appointment", { state: { doctor } });
  }, [navigate]);

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-6">Doctor List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
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
                          linkPath={`/doctor/${doctor.id}`}/>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorListPage;