import NewBoxSection from "../../components/NewsBox/NewBoxSection.jsx";
const newsList = [
  {
    id: 1,
    doctorName: "นพ. สาธิต สุขใจ",
    date: "30 ก.ค 2025",
    title: "เคล็ดลับสุขภาพหัวใจ",
    description: "วิธีการดูแลหัวใจของคุณให้แข็งแรงและมีความสุขในทุกๆ วัน",
<<<<<<< HEAD
    image: "https://static.naewna.com/uploads/news/source/786515.jpg",
=======
    image: "https://www.blackmores.co.th/media/article/dtl1-105.jpg?v=2568071811",
>>>>>>> origin
  },
  {
    id: 2,
    doctorName: "พญ. พิชญา แสงสว่าง",
    date: "28 ก.ค 2025",
    title: "ออกกำลังกายให้ปลอดภัย",
    description: "เรียนรู้วิธีออกกำลังกายที่ถูกต้องสำหรับทุกเพศทุกวัย",
<<<<<<< HEAD
    image: "https://oneandallthailand.com/wp-content/uploads/2021/12/Exercise02-1024x683.jpg",
=======
    image: "https://inwfile.com/s-fl/ir11cw.jpg",
>>>>>>> origin
  },
  {
    id: 3,
    doctorName: "นพ. ชวินทร์ แพทย์ดี",
    date: "25 ก.ค 2025",
    title: "การนอนหลับกับสุขภาพจิต",
    description: "สำรวจความสัมพันธ์ของการนอนหลับและอารมณ์ในแต่ละวัน",
<<<<<<< HEAD
    image: "https://www.stkc.go.th/sites/default/files/infographic/1602645916.png",
=======
    image: "https://dz.lnwfile.com/299paz.jpg",
>>>>>>> origin
  },
  {
    id: 4,
    doctorName: "พญ. อรุณี ใจดี",
    date: "20 ก.ค 2025",
    title: "การดูแลสุขภาพผู้สูงอายุในบ้าน",
    description:
      "แนวทางการดูแลผู้สูงอายุให้มีคุณภาพชีวิตที่ดีภายในบ้านและครอบครัว",
<<<<<<< HEAD
    image: "https://modernformhealthcare.co.th/wp-content/uploads/2024/02/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B9%E0%B9%81%E0%B8%A5%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%AA%E0%B8%B9%E0%B8%87%E0%B8%AD%E0%B8%B2%E0%B8%A2%E0%B8%B8-%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%94%E0%B8%B9%E0%B9%81%E0%B8%A5%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%AA%E0%B8%B9%E0%B8%87%E0%B8%AD%E0%B8%B2%E0%B8%A2%E0%B8%B8-%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B9%81%E0%B8%82%E0%B9%87%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%87%E0%B8%97%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%A3%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A2%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88-.webp",
=======
    image: "https://static.wixstatic.com/media/a09e0a_7f86c5e49bc2440092ed7391a4698368~mv2.jpg/v1/fill/w_980,h_654,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/a09e0a_7f86c5e49bc2440092ed7391a4698368~mv2.jpg",
>>>>>>> origin
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
