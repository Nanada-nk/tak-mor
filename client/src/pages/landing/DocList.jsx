import DoctorCardList from "../../components/DoctorList/DoctorCardList.jsx";

function DocList({title = "แพทย์", bgColor}) {
  const defaultBgColor = "bg-[#EEF7FB]";
  return (
    <div className={`flex flex-col items-center ${bgColor || defaultBgColor} gap-3 w-full h-110 pt-8 pb-2`}>
      <p className="font-bold text-2xl pb-3">{title}</p>
      <div className="flex gap-4">
        <DoctorCardList />
        <DoctorCardList />
        <DoctorCardList />
        <DoctorCardList />
      </div>
    </div>
  );
}
export default DocList;
