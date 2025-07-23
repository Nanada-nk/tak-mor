import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center text-center">
      <div className="space-y-4">
        <img
          src="../../public/404BG.svg"
          alt="404BG"
          className="w-full h-full object-contain"
        />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            อุ๊ย! ไม่พบหน้านี้
          </h2>
          <p className="text-sm">
            หน้าที่คุณกำลังมองหาไม่เคยปรากฏอยู่
          </p>
        </div>
        <Link to="/" className="btn bg-[#0E82FD] text-white rounded-full mt-3">
          กลับสู่หน้าแรก
        </Link>
      </div>
    </div>
  );
}
export default NotFoundPage;
