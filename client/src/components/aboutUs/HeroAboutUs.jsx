import { Shapes2, Shapes3 } from "../icons/index.jsx";

function HeroAboutUs() {
  return (
    <div className="flex justify-center items-center  xl:h-100 pt-8">
      <div className="grid grid-cols-1 w-full sm:w-320 h-full sm:h-100 bg-[#0E82FD] rounded-2xl px-15 py-20 relative overflow-hidden">
        <div className="lg:w-1/2 h-full">
          <p className="text-xl sm:text-2xl lg:text-4xl text-white">
            ก้าวสู่ความรู้สึกที่ดีขึ้นด้วย ทักหมอ
          </p>
          <p className="sm:text-xs md:text-sm lg:text-xl text-gray-200 pt-10">
            ก้าวสู่ความรู้สึกที่ดีขึ้นของคุณ
            เมื่อเราให้ความสำคัญกับการดูแลสุขภาพของคุณด้วยบริการส่วนบุคคลและเข้าถึงได้
          </p>
          <button className="btn rounded-full h-8 mt-10">ติดต่อเรา</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 ">
          <div className="w-100 h-80 absolute top-20 right-12 z-30">
            <img
              src="../../public/DocImageLandingPage3.svg"
              alt="DocImageLandingPage3"
              className="w-full h-full object-contain transform -scale-x-100"
            />
          </div>
            <Shapes3 className="w-60 transform -scale-x-100 absolute -top-28 right-0" />
            <Shapes2 className="w-100 absolute top-55 right-0" />
        </div>
      </div>
    </div>
  );
}
export default HeroAboutUs;
