import { User, Calendar } from "lucide-react";

function NewBoxSection() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 w-110 h-50 flex gap-4">
      {/* Image and Tag Section */}
      <div className="relative p-2 w-[50%] h-auto overflow-hidden">
        
          <img src="#" className="w-full h-full object-contain rounded-sm" />
        
      </div>

      {/* Content Section */}
      <div className="p-4 w-2/3 flex flex-col">
        <div className="flex items-center gap-2 mb-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span className="text-xs">นพ. ปาล์มมอร</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span className="text-xs">22 ก.ย 2024</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xs font-bold text-gray-900 mb-2">
          โซลูชันการนอนหลับ: เปิดเผยเคล็ดลับเพื่อการนอนหลับที่ผ่อนคลาย
        </h3>

        {/* Description */}
        <p className="text-gray-700 text-[10px] line-clamp-2">
          สำรวจความสำคัญของการนอนหลับที่มีคุณภาพและเรียนรู้เคล็ดลับเพื่อปรับปรุงการนอนหลับของคุณ
          เพื่อให้คุณตื่นขึ้นมาอย่างสดชื่น
        </p>
        <button className="btn h-[28px] rounded-full border-[#0E82FD] text-[#0E82FD] hover:bg-gray-200 hover:text-black mt-6 self-baseline">อ่านเพิ่มเติม</button>
      </div>
    </div>
  );
}
export default NewBoxSection;
