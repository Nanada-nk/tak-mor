import { Shapes, Shapes2, Shapes3, Shapes4 } from "./icons/index.jsx";

function Brandner({ title = "ข่าวใหม่" }) {
  return (
    <div className="font-prompt w-full h-40 bg-[#EEF7FB] flex items-center px-8 justify-center flex-col relative overflow-hidden">
      <p className="font-bold text-4xl text-black z-30">{title}</p>
      <Shapes className="absolute bottom-0 right-0" />
      <Shapes2 className="absolute -bottom-10 right-0" />
      <Shapes3 className="absolute top-10 -left-220" />
      <Shapes4 className="w-50 h-50 absolute -top-15 left-0" />
    </div>
  );
}
export default Brandner;
