import NewBoxSection from "../../components/NewsBox/NewBoxSection.jsx";

function NewSection() {
  return (
 
    <div className="flex flex-col items-center w-full py-10 px-4 sm:px-6 lg:px-8">

      <p className="font-bold text-2xl sm:text-3xl pb-6">บทความล่าสุด</p>

      <div className="flex flex-col justify-center items-center w-full">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
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
