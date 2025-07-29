import { User, Calendar } from "lucide-react";

function NewBoxSection() {
  return (

    <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-full flex flex-col sm:flex-row gap-4 overflow-hidden">
    
      <div className="relative p-2 w-full sm:w-1/2 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
        <img src="#" className="w-full h-full object-cover rounded-sm" /> 
      </div>

    
      <div className="p-4 w-full sm:w-1/2 flex flex-col justify-between">
     
        <div className="flex items-center gap-2 mb-4 text-gray-600 text-sm flex-wrap">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span className="text-xs">นพ. ปาล์มมอร</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span className="text-xs">22 ก.ย 2024</span>
          </div>
        </div>

       
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          โซลูชันการนอนหลับ: เปิดเผยเคล็ดลับเพื่อการนอนหลับที่ผ่อนคลาย
        </h3>

     
        <p className="text-gray-700 text-xs sm:text-sm line-clamp-3 mb-4">
          สำรวจความสำคัญของการนอนหลับที่มีคุณภาพและเรียนรู้เคล็ดลับเพื่อปรับปรุงการนอนหลับของคุณ
          เพื่อให้คุณตื่นขึ้นมาอย่างสดชื่น
        </p>

     
        <button className="btn h-9 rounded-full border-2 border-t-[#0E82FD] border-l-[#0E82FD] border-b-[#06aed4] border-r-[#06aed4] text-[#0E82FD] hover:bg-gray-200 hover:text-black mt-auto self-start px-4 py-2 text-sm font-semibold">
          อ่านเพิ่มเติม
        </button>
      </div>
    </div>
  );
}
export default NewBoxSection;
