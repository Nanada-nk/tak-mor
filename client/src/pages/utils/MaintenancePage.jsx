import { Link } from "react-router";
function MaintenancePage() {
  return (
    <div className="flex min-h-screen items-center justify-center text-center">
      <div className="space-y-4">
        <img
          src="../../public/MaintenanceBG.svg"
          alt="MaintenanceBG"
          className="w-full h-full object-contain"
        />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            เราอยู่ระหว่างการบำรุงรักษา
          </h2>
          <p className="text-sm">
            ขณะนี้เว็บไซต์ของเรากำลังอยู่ระหว่างการบำรุงรักษาตามกำหนดการ
            และจะกลับมาใช้งานได้อีกครั้งภายในไม่กี่นาที
          </p>
        </div>
        <Link to="/" className="btn bg-[#0E82FD] text-white rounded-full mt-3">
          กลับสู่หน้าแรก
        </Link>
      </div>
    </div>
  );
}
export default MaintenancePage;
