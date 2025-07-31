import NewBoxSection from "../../components/NewsBox/NewBoxSection.jsx";
const newsList = [
  {
    id: 1,
    doctorName: "นพ. สาธิต สุขใจ",
    date: "30 ก.ค 2025",
    title: "เคล็ดลับสุขภาพหัวใจ",
    description: "วิธีการดูแลหัวใจของคุณให้แข็งแรงและมีความสุขในทุกๆ วัน",
    image: "/images/heart-health.jpg",
  },
  {
    id: 2,
    doctorName: "พญ. พิชญา แสงสว่าง",
    date: "28 ก.ค 2025",
    title: "ออกกำลังกายให้ปลอดภัย",
    description: "เรียนรู้วิธีออกกำลังกายที่ถูกต้องสำหรับทุกเพศทุกวัย",
    image: "/images/exercise.jpg",
  },
  {
    id: 3,
    doctorName: "นพ. ชวินทร์ แพทย์ดี",
    date: "25 ก.ค 2025",
    title: "การนอนหลับกับสุขภาพจิต",
    description: "สำรวจความสัมพันธ์ของการนอนหลับและอารมณ์ในแต่ละวัน",
    image: "/images/sleep-mental.jpg",
  },
  {
    id: 4,
    doctorName: "พญ. อรุณี ใจดี",
    date: "20 ก.ค 2025",
    title: "การดูแลสุขภาพผู้สูงอายุในบ้าน",
    description:
      "แนวทางการดูแลผู้สูงอายุให้มีคุณภาพชีวิตที่ดีภายในบ้านและครอบครัว",
    image: "/images/elderly-care.jpg",
  },
];
function NewSection() {
  return (
    <div className="flex flex-col items-center w-full py-10 px-4 sm:px-6 lg:px-8">
      <p className="font-bold text-2xl sm:text-3xl pb-6">บทความล่าสุด</p>

      <div className="flex flex-col justify-center items-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {newsList.map((item) => (
            <NewBoxSection
              key={item.id}
              id={item.id}
              doctorName={item.doctorName}
              date={item.date}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default NewSection;
