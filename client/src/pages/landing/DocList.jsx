import DoctorCardList from "../../components/DoctorList/DoctorCardList";

function DocList() {
  return (
    <div className="flex flex-col items-center bg-[#EEF7FB] gap-3 w-full h-110 pt-8 pb-2">
      <p className="font-bold text-2xl pb-3">แพทย์</p>
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
