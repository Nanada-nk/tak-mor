import FAQCollapseComponent from "../../components/FAQ/FAQCollapseComponent.jsx";

function FAQSection() {
  return (
    <div>
      <div className="relative flex flex-row w-full h-130 pt-8 pb-2">
        <div className="ml-60 mt-6 w-[50%]">
          <p className="font-bold text-2xl pb-4">คำถามที่พบบ่อย</p>
          <div className="border-2 border-gray-400 w-[18%] h-[50%] absolute bottom-22 left-74 -z-10"></div>
          <div className="border-2 border-gray-400 w-[18%] h-[50%] absolute bottom-24 left-76 -z-10"></div>
          <div className="border-2 border-gray-400 w-[18%] h-[50%] absolute bottom-26 left-78 -z-10"></div>
          <img
            src="../../public/FAQbg.svg"
            alt="FAQbg"
            className="w-80 h-80 object-contain mt-10"
          />
        </div>
        <div className="flex flex-col gap-4 justify-start w-[38%] mt-20 -ml-90">
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
