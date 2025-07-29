import FAQCollapseComponent from "../../components/FAQ/FAQCollapseComponent.jsx";

function FAQSection() {
  return (
 
    <div>
      <div className="relative flex flex-col lg:flex-row w-full max-w-6xl mx-auto items-center lg:items-start gap-8 lg:gap-20 py-10 px-4 sm:px-6 lg:px-8">
       
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2">
          <p className="font-bold text-2xl sm:text-3xl pb-4">คำถามที่พบบ่อย</p>
         
          <div className="hidden lg:block">
            <div className="border-2 border-[#e2edff] w-[25%] h-[50%] absolute bottom-36 left-25 -z-10"></div>
            <div className="border-2 border-[#e2edff] w-[25%] h-[50%] absolute bottom-38 left-23 -z-10"></div>
            <div className="border-2 border-[#e2edff] w-[25%] h-[50%] absolute bottom-40 left-20 -z-10"></div>
          </div>
          <img
            src="../../public/FAQbg.svg"
            alt="FAQbg"
            className="w-60 h-60 sm:w-80 sm:h-80 object-contain mt-10 lg:mt-0"
          />
        </div>
 
        <div className="flex flex-col gap-4 w-full lg:w-1/2 mt-8 lg:mt-0">
          <FAQCollapseComponent />
          <FAQCollapseComponent />
          <FAQCollapseComponent />
          <FAQCollapseComponent />
          <FAQCollapseComponent />
        </div>
      </div>
    </div>
  );
}
export default FAQSection;
