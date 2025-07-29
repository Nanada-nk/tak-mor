import { useNavigate } from "react-router";
import DoctorCardDynamic from "../../components/booking/DoctorCardDynamic.jsx";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../config/axios.js";

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
        {doctorList.map((doc) => (
          <div key={doc.id} className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
            <DoctorCardDynamic
              name={`Dr. ${doc.firstName} ${doc.lastName}`}
              title={
                <div className="flex flex-wrap gap-1">
                  {Array.isArray(doc.specialties) && doc.specialties.map((spec) => (
                    <span key={spec} className="badge badge-primary badge-sm daisyui-badge">{spec}</span>
                  ))}
                </div>
              }
              rating={doc.rating}
              address={doc.address}
              img={doc.img && doc.img.trim() !== "" ? doc.img : "https://ui-avatars.com/api/?name=Doctor&background=random"}
            />
            <div className="flex justify-end">
              <button
                className="btn btn-primary"
                onClick={() => handleBooking(doc)}
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorListPage;