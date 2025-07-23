import { Link } from "react-router";

function ComingSoonPage() {
  return (
    <div className="flex min-h-screen items-center justify-center text-center">
      <div className="space-y-4">
        <img
          src="../../public/ComingSoonBG.svg"
          alt="ComingSoonBG"
          className="w-full h-full object-contain"
        />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            เรากำลังเตรียมพร้อมที่จะเปิดตัว
          </h2>
          <p className="text-sm">
            เราจะมาพบกับเว็บไซต์ใหม่สุดเจ๋งของเราเร็วๆ นี้ สมัครรับการแจ้งเตือน
          </p>
        </div>
        <div className="flex justify-center gap-5 space-x-1">
          <div className="bg-gray-200 w-20 h-20 rounded-xl flex flex-col">
            <p className="text-2xl font-bold mt-3">30</p>
            <p className="text-sm">วัน</p>
          </div>
          <div className="bg-gray-200 w-20 h-20 rounded-xl flex flex-col">
            <p className="text-2xl font-bold mt-3">30</p>
            <p className="text-sm">ชั่วโมง</p>
          </div>
          <div className="bg-gray-200 w-20 h-20 rounded-xl flex flex-col">
            <p className="text-2xl font-bold mt-3">30</p>
            <p className="text-sm">นาที</p>
          </div>
          <div className="bg-gray-200 w-20 h-20 rounded-xl flex flex-col">
            <p className="text-2xl font-bold mt-3">30</p>
            <p className="text-sm">วินาที</p>
          </div>
        </div>
        <Link to="/" className="btn bg-[#0E82FD] text-white rounded-full mt-3">
          กลับสู่หน้าแรก
        </Link>
      </div>
    </div>
  );
}
export default ComingSoonPage;
