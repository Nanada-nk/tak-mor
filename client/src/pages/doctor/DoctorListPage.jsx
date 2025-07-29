
import { useNavigate } from "react-router";
import DoctorCardDynamic from "../../components/booking/DoctorCardDynamic.jsx";
import { useCallback } from "react";

// Mock data based on Prisma Doctor model, now with multiple specialties
const doctorList = [
  {
    id: 1,
    firstName: "John",
    lastName: "Nontakaeng",
    bio: "Experienced psychologist with 10+ years in mental health.",
    specialties: ["Psychologist", "General Practitioner", "Therapist"],
    rating: 5.0,
    address: "742 Evergreen Terrace, Springfield",
    img: "https://www.future-doctor.de/wp-content/uploads/2024/08/shutterstock_2480850611.jpg.webp"
  },
  {
    id: 2,
    firstName: "Lisa",
    lastName: "Simpson",
    bio: "Cardiologist passionate about preventive care.",
    specialties: ["Cardiologist", "Pediatrician"],
    rating: 4.8,
    address: "123 Main St, Springfield",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    firstName: "Homer",
    lastName: "Simpson",
    bio: "General practitioner with a focus on family medicine.",
    specialties: ["General Practitioner", "Family Medicine"],
    rating: 4.5,
    address: "456 Elm St, Springfield",
    img: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: 4,
    firstName: "Marge",
    lastName: "Bouvier",
    bio: "Dermatologist with expertise in skin care.",
    specialties: ["Dermatologist", "Cosmetic Surgeon"],
    rating: 4.9,
    address: "789 Oak St, Springfield",
    img: "https://randomuser.me/api/portraits/women/46.jpg"
  }
];

function DoctorListPage() {
  const navigate = useNavigate();

  const handleBooking = useCallback((doctor) => {
    // Pass doctor data via state
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
                  {doc.specialties.map((spec) => (
                    <span key={spec} className="badge badge-primary badge-sm daisyui-badge">{spec}</span>
                  ))}
                </div>
              }
              rating={doc.rating}
              address={doc.address}
              img={doc.img}
            />
            <div className="flex justify-end">
              <button
                className="btn btn-primary"
                onClick={() => {
                  // Pass doctor object with specialties to appointment page
                  handleBooking(doc);
                }}
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