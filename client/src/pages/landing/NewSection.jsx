import NewBoxSection from "../../components/NewsBox/NewBoxSection.jsx";

function NewSection() {
  return (
    <div className="flex flex-col items-center gap-3 w-full h-130 pt-8 pb-2">
      <p className="font-bold text-2xl pb-4">บทความล่าสุด</p>

      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap gap-4 justify-center w-[60%] ">
         <NewBoxSection />
         <NewBoxSection />
         <NewBoxSection />
         <NewBoxSection />
        </div>
      </div>
    </div>
  );
}
export default NewSection;
