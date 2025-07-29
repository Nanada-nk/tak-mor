import DoctorCardList from "../../components/DoctorList/DoctorCardList.jsx";

function DocList({title = "แพทย์", bgColor}) {
  const defaultBgColor = "bg-[#EEF7FB]";
  return (

    <div className={`flex flex-col items-center ${bgColor || defaultBgColor} w-full py-10 px-4 sm:px-6 lg:px-8`}>
     
      <p className="font-bold text-2xl sm:text-3xl pb-6">{title}</p>
   
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        <DoctorCardList />
        <DoctorCardList />
        <DoctorCardList />
        <DoctorCardList />
      
      </div>
    </div>
  );
}
export default DocList;
