import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../config/axios.js";
import useBookingStore from "../../stores/bookingStore.js";
import { Search, MapPin, Calendar, ChevronDown, BetweenHorizonalStart, LayoutTemplate } from "lucide-react";
import Brandner from "../../components/Brandner.jsx";
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
    imgSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362010/DocContainer1_ly8fj7.svg",
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
    imgSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362006/DocContainer2_cm5rkk.svg",
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
    imgSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362007/DocContainer3_iiveff.svg",
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
    imgSrc: "https://res.cloudinary.com/dhoyopcr7/image/upload/v1754362010/DocContainer1_ly8fj7.svg",
  },
];

function DoctorAvailabilityPage() {
  const navigate = useNavigate();
  // const [doctors, setDoctors] = useState([]);
  const [selectedDates, setSelectedDates] = useState({});
  const [slotsByDoctor, setSlotsByDoctor] = useState({});
  const [fixedByDoctor, setFixedByDoctor] = useState({});
  const setDoctorId = useBookingStore(state => state.setDoctorId);
  // Fetch all doctors on mount
  useEffect(() => {
    axiosInstance
      .get("/api/doctor")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Failed to fetch doctors:", err));
  }, []);



  const fetchSlotsAndAvailability = useRef(
    debounce((doctors, selectedDates, setSlotsByDoctor, setFixedByDoctor) => {
      Promise.all(
        doctors.map((doc) => {
          const dateObj = selectedDates[doc.id] || new Date();
          const d = dateObj.toISOString().split("T")[0];
          const dayOfWeek = dateObj.getDay();
          const slotsPromise = axiosInstance
            .get(`/api/doctor/${doc.id}/slots?date=${d}`)
            .then((res) => (Array.isArray(res.data) ? res.data : []))
            .catch(() => []);
          const fixedPromise = axiosInstance
            .get(`/api/doctor/${doc.id}/availability?dayOfWeek=${dayOfWeek}`)
            .then((res) => (Array.isArray(res.data) ? res.data : []))
            .catch(() => []);
          return Promise.all([slotsPromise, fixedPromise]).then(
            ([slots, fixed]) => ({
              doctorId: doc.id,
              slots,
              fixed,
            })
          );
        })
      ).then((results) => {
        const slotsObj = {};
        const fixedObj = {};
        results.forEach(({ doctorId, slots, fixed }) => {
          slotsObj[doctorId] = slots;
          fixedObj[doctorId] = fixed;
        });
        setSlotsByDoctor(slotsObj);
        setFixedByDoctor(fixedObj);
      });
    }, 500)
  ).current;

  useEffect(() => {
    if (doctors.length === 0) return;
    fetchSlotsAndAvailability(
      doctors,
      selectedDates,
      setSlotsByDoctor,
      setFixedByDoctor
    );
  }, [doctors, selectedDates]);

  return (
    <div>
      <div>
        <div className="mb-4">
          <Brandner title="ตารางจองนัดหมาย แพทย์" />
        </div>

       




        {/* <div className="flex  justify-between px-25">
          
          <div className="flex justify-between items-center">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1 bg-base-100 w-80 ">fornmatlayout<ChevronDown /></div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
            </div>
            <button className="btn btn-square">
              <BetweenHorizonalStart />
            </button>
            <button className="btn btn-square">
              <LayoutTemplate />
            </button>
            <button className="btn btn-square">
              <MapPin />
            </button>
          </div>
        </div> */}



        <div className="flex gap-5 px-25" >

          <div className=' w-2/3 '>
            {/* <div className="flex items-center justify-between">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1 bg-base-100 w-80 ">spaecialities<ChevronDown /></div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li><a>Item 1</a></li>
                  <li><a>Item 2</a></li>
                </ul>
              </div>
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1  bg-base-100 w-80">reviews<ChevronDown /></div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li><a>Item 1</a></li>
                  <li><a>Item 2</a></li>
                </ul>
              </div>
              <div className="dropdown ">
                <div tabIndex={0} role="button" className="btn m-1  bg-base-100 w-80">clinic<ChevronDown /></div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li><a>Item 1</a></li>
                  <li><a>Item 2</a></li>
                </ul>
              </div>
              <div>
                <a href="#" className="text-purple-600 font-semibold underline underline-offset-4 decoration-2 hover:text-purple-700 transition">Clear All</a>
              </div>
            </div> */}
            {/* <div className="flex justify-between">
              <div className="flex">
                <div>
                  Avaliation
                </div>
                <input type="checkbox" defaultChecked className="toggle" />
              </div>
              <div>
                <button className="btn btn-square">
                  <BetweenHorizonalStart />
                </button>
                <button className="btn btn-square">
                  <LayoutTemplate />
                </button>
              </div>
            </div> */}

            <div className="font-prompt space-y-8">
  {doctors.map((doctor) => (
    <div key={doctor.id} className="border border-gray-300 rounded-xl p-6 shadow-sm bg-white">
      {/* Doctor Header */}
      <h2 className="text-xl font-semibold bg-slate-100 p-3 rounded-lg mb-4">
        {'Dr. ' + doctor.firstName} {doctor.lastName} 
      </h2>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Doctor Card */}
        <DoctorCardList
          showButton={false}
          name={`Dr. ${doctor.firstName} ${doctor.lastName}`}
          specialty={doctor.specialty}
          rating={Math.floor(Math.random() * (5 - 3 + 1)) + 3}
          reviews={Math.floor(Math.random() * 500)}
          hospital={doctor.address}
          imgSrc={doctor.Account?.profilePictureUrl || "/default-doctor.jpg"}
          linkPath={'#'}
          doctorId={doctor.id}
        />

        {/* Date Picker */}
        <div className="bg-gray-50 p-4 w-fit rounded-lg border">
          <h3 className="text-sm font-medium mb-2 text-gray-700">เลือกวันที่</h3>
          <DatePicker
            inline
            selected={selectedDates[doctor.id] || new Date()}
            onChange={(date) =>
              setSelectedDates((prev) => ({
                ...prev,
                [doctor.id]: date,
              }))
            }
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
          />
        </div>

        {/* Slots & Booking */}
        <div className="bg-gray-50 ml-4 p-4 rounded-lg border border-gray-200">
          <h3 className="font-bold text-sm mb-2 text-gray-700">ช่วงเวลาที่สามารถจองได้</h3>

          {/* Manual/Generated Slots */}
          {slotsByDoctor[doctor.id]?.length > 0 ? (
            <>
             {selectedDates[doctor.id] && (
  <p className="text-sm text-blue-700 font-medium mb-2">
    วันที่เลือก: {selectedDates[doctor.id].toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
  </p>
)}
              <div className="flex flex-wrap gap-2 mb-4">
                {slotsByDoctor[doctor.id].map((slot) => (
                  <span
                    key={slot.startTime + slot.endTime}
                    className="px-3 py-1 rounded bg-blue-100 border border-blue-300 text-sm"
                  >
                    {slot.startTime} - {slot.endTime}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-400 mb-4">ยังไม่มีช่วงเวลาให้บริการ</p>
          )}

          <button
            onClick={() => {
              navigate("/appointment");
              setDoctorId(doctor.id);
            }}
            className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            จองเลย
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

            <div className="flex items-center justify-center">

              <button className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out w-full sm:w-auto">

                Load More 425 Doctors
              </button>
            </div>
          </div>
          <div className="w1/3 max-h-auto">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.070631817529!2d100.48673287519549!3d13.714171898163421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e298f4a5c4ab13%3A0xfdc33c6b95c4d77!2z4LmC4Lij4LiH4Lie4Lii4Liy4Lia4Liy4Lil4Liq4Lih4Li04LiV4Li04LmA4Lin4LiKIOC4mOC4meC4muC4uOC4o-C4tQ!5e0!3m2!1sth!2sth!4v1753858320977!5m2!1sth!2sth" width="600" height="1500" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className=""></iframe>

          </div>

        </div>



      </div>

    </div>
  );
}

export default DoctorAvailabilityPage;