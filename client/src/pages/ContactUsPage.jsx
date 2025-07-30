import { AudioCallIcon, EmailIcon, PinIcon } from "../components/icons/index.jsx";
import Brandner from "../components/Brandner.jsx";

function ContactUsPage() {
  return (
    <div className="flex flex-col h-260 font-prompt">
      <Brandner title="ติดต่อเรา" />
      <div className="flex justify-evenly items-center py-8">
        <div className="flex flex-col gap-4">
          <p className="text-[#0E82FD]">ติดต่อเรา</p>
          <p className="font-bold text-2xl">มีคำถามใด ๆ ไหม? ติดต่อ ทักหมอ</p>
          <div className="flex flex-col gap-4 py-3.5">
            <div className="w-120 h-20 bg-[#F6FAFF] shadow-lg rounded-lg flex items-center px-4 py-2.5 gap-5">
              <div className="w-15 h-15 bg-[#E2EDFF] rounded-sm flex justify-center items-center">
                <PinIcon className="w-10 text-[#0E82FD]" />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-bold">ที่ตั้ง</p>
                <p className="text-sm">
                  35 อาคารวรรณสรณ์ แขวงพญาไท เขตราชเทวี กทม. 10400
                </p>
              </div>
            </div>
            <div className="w-120 h-20 bg-[#F6FAFF] shadow-lg rounded-lg flex items-center px-4 py-2.5 gap-5">
              <div className="w-15 h-15 bg-[#E2EDFF] rounded-sm flex justify-center items-center">
                <AudioCallIcon className="w-6 text-[#0E82FD]" />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-bold">เบอร์ติดต่อ</p>
                <p className="text-sm">08-xxxx-xxxx</p>
              </div>
            </div>
            <div className="w-120 h-20 bg-[#F6FAFF] shadow-lg rounded-lg flex items-center px-4 py-2.5 gap-5">
              <div className="w-15 h-15 bg-[#E2EDFF] rounded-sm flex justify-center items-center">
                <EmailIcon className="w-8 text-[#0E82FD]" />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-bold">อีเมล</p>
                <p className="text-sm">tak-mor@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <fieldset className="fieldset bg-[#F6FAFF] border-base-300 rounded-box w-lg h-100 border p-4 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="label py-1.5">ชื่อ - นามสกุล</label>
              <input
                type="text"
                className="input w-full focus:border-none focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="label py-1.5">อีเมล</label>
              <input
                type="email"
                className="input w-full focus:border-none focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="label py-1.5">เบอร์ติดต่อ</label>
              <input
                type="tel"
                className="input w-full focus:border-none focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="label py-1.5">บริการที่สนใจ</label>
              <input
                type="text"
                className="input w-full focus:border-none focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="label">ข้อความเพิ่มเติม</label>
            <textarea
              className="textarea w-full focus:border-none focus:outline-none"
              placeholder="รายละเอียดเพิ่มเติม..."
              rows={4}
            ></textarea>
          </div>

          <button className="btn bg-[#0E82FD] text-white w-25 rounded-full">
            ส่ง
          </button>
        </fieldset>
      </div>
      <div className="w-full h-[400px] py-2 px-3.5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.3404435017774!2d100.53239597586516!3d13.758331697140768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29eca0a4dc2e7%3A0x944f80c1e57b451e!2z4Lit4Liy4LiE4Liy4Lij4Lin4Lij4Lij4LiT4Liq4Lij4LiT4LmM!5e0!3m2!1sth!2sth!4v1753668833235!5m2!1sth!2sth"
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
export default ContactUsPage;
