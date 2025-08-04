// import { Shapes, Shapes2, Shapes3, Shapes4 } from "./icons/index.jsx";

// function Brandner({ title = "ข่าวใหม่" }) {
//   return (
//     <div className="font-prompt w-full h-40 bg-[#EEF7FB] flex items-center px-8 justify-center flex-col relative overflow-hidden">
//       <p className="font-bold text-4xl text-black z-30">{title}</p>
//       <Shapes className="absolute bottom-0 right-0" />
//       <Shapes2 className="absolute -bottom-10 right-0" />
//       <Shapes3 className="absolute top-10 -left-220" />
//       <Shapes4 className="w-50 h-50 absolute -top-15 left-0" />
//     </div>
//   );
// }
// export default Brandner;



import { Shapes, Shapes2, Shapes3, Shapes4 } from "./icons/index.jsx";

function Brandner({ title = "ข่าวใหม่" }) {
  return (
    <div className="font-prompt w-full h-40 bg-[#EEF7FB] flex items-center px-8 justify-center flex-col relative overflow-hidden">
      <p className="font-bold text-4xl text-black z-30">{title}</p>
      <Shapes className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 text-blue-200 opacity-50" />
      <Shapes2 className="absolute -bottom-10 right-10 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 text-green-200 opacity-50" />
      <Shapes3 className="absolute top-10 left-0 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 text-yellow-200 opacity-50" />
      <Shapes4 className="absolute -top-15 left-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 text-purple-200 opacity-50" />
    </div>
  );
}
export default Brandner;
