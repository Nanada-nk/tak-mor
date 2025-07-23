import { Link } from "react-router"
function ServerErrorPage() {
  return (
   <div className="flex min-h-screen items-center justify-center text-center">
      <div className="space-y-4">
        <img
          src="../../public/ErrServerBG.svg"
          alt="ErrServerBG"
          className="w-full h-full object-contain"
        />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            อุ๊ย! ข้อผิดพลาดเซิร์ฟเวอร์ภายใน
          </h2>
          <p className="text-sm">
            เซิร์ฟเวอร์ขัดข้องโปรดรอสักครู่หรือลองใหม่อีกครั้งในภายหลัง
          </p>
        </div>
        <Link to="/" className="btn bg-[#0E82FD] text-white rounded-full mt-3">
          กลับสู่หน้าแรก
        </Link>
      </div>
    </div>
  )
}
export default ServerErrorPage