import { Shapes2, Shapes3 } from "../icons/index.jsx";

function HeroAboutUs() {
  return (
    <div className="flex justify-center items-center xl:h-100 pt-8">
      <div className="grid grid-cols-1 w-full sm:w-280 md:w-320 h-full sm:h-80 bg-[#0E82FD] rounded-2xl px-15 py-20 relative overflow-hidden">
        <div className="lg:w-1/2 h-full">
          <p className="text-lg sm:text-2xl lg:text-4xl text-white">
            ก้าวสู่ความรู้สึกที่ดีขึ้นด้วย 
            <br className="block sm:hidden" />
            {" "}ทักหมอ
          </p>
          <p className="sm:text-xs md:text-sm lg:text-lg xl:text-xl text-gray-200 pt-10">
            ก้าวสู่ความรู้สึกที่ดีขึ้นของคุณ
            <br  className="md:block lg:hidden"/>
            เมื่อเราให้ความสำคัญกับการดูแลสุขภาพของคุณด้วยบริการส่วนบุคคลและเข้าถึงได้
          </p>
          <button className="btn rounded-full h-8 mt-10">ติดต่อเรา</button>
        </div>
        <div className="hidden md:grid grid-cols-1">
          <div className="md:w-80 lg:w-100 md:h-60 lg:h-80 absolute md:top-25 md:-right-10 lg:top-20 lg:right-12 z-30">
            <img
              src="../../public/DocImageLandingPage3.svg"
              alt="DocImageLandingPage3"
              className="w-full h-full object-contain transform -scale-x-100"
            />
          </div>
            <Shapes3 className="md:w-50 lg:w-60 transform -scale-x-100 absolute md:-top-35 lg:-top-28 md:right-0 lg:right-0" />
            <Shapes2 className="md:w-80 lg:w-100 absolute md:top-45 lg:top-55 md:right-0 lg:right-0" />
        </div>
      </div>
    </div>
  );
}
export default HeroAboutUs;
