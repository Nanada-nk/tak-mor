import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const NewContent = [
    { id: 1, tag: "สุขภาพทั่วไป", ownerPost: "นายสมพง ทองคุ้ม", date: "04 ส.ค. 2568", head: "การดูแลสุขภาพทางเพศชายหลังผ่าตัดมะเร็งต่อมลูกหมาก", title: "การผ่าตัดมะเร็งต่อมลูกหมาก (Radical Prostatectomy) เป็นหนึ่งในการรักษาหลักสำหรับมะเร็งต่อมลูกหมากเฉพาะที่ ภาวะหย่อนสมรรถภาพทางเพศ (Erectile Dysfunction: ED) จึงเป็นหนึ่งในผลข้างเคียงที่พบได้บ่อยในผู้ป่วยหลังได้รับการรักษา", img: "https://www.dms.go.th/backend//Content//Content_File/Hot_News/Img/25680804130531PM_1754287232442.jpg" },
    { id: 2, tag: "วิจัยทางการแพทย์", ownerPost: "นายสมหมาย ทองแท้", date: "01 ส.ค. 2568", head: "สถาบันประสาทวิทยา กรมการแพทย์ จัดพิธีลงนามความร่วมมือ พร้อมมอบโล่และใบรับรองแก่โรงพยาบาลผ่านการรับรองด้านโรคหลอดเลือดสมอง", title: "นายแพทย์ทวีศิลป์ วิษณุโยธิน อธิบดีกรมการแพทย์ กล่าวว่า โรคหลอดเลือดสมองเป็นสาเหตุการเสียชีวิตและพิการอันดับต้น ๆ ของประเทศไท ยในปีที่ผ่านมาโรคหลอดเลือดสมองคร่าชีวิตคนไทยถึง 36,000 ราย ", img: "https://www.dms.go.th/backend//Content//Content_File/Hot_News/Img/25680801160605PM_1754038901241.jpg" },
    { id: 3, tag: "โรคระบาดและการควบคุมโรค", ownerPost: "นายสมชาย ทองเก้า", date: "31 ก.ค. 2568", head: "โรงพยาบาลเมตตาประชารักษ์(วัดไร่ขิง) กรมการแพทย์ ชูความสำเร็จศูนย์โรคตาฯ สาขาสุขุมวิท", title: "โรงพยาบาลเมตตาประชารักษ์ (วัดไร่ขิง) กรมการแพทย์ เผยความสำเร็จ ศูนย์โรคตาฯ สาขาสุขุมวิท ด้วยนโยบายคลินิกพิเศษหรือคลินิกพรีเมียม ในโรงพยาบาลรัฐบาล เป็นนโยบายที่มุ่งเน้นการเพิ่มทางเลือกในการรับบริการทางการแพทย์สำหรับผู้ที่มีรายได้", img: "https://www.dms.go.th/backend//Content//Content_File/Hot_News/Img/25680731175522PM_1753958823524.jpg" },
    { id: 4, tag: "โรงพยาบาลและสารธรณสุข", ownerPost: "นายสมทรง ทองเอก", date: "30 ก.ค. 2568", head: "ศัลยกรรมทารกแรกเกิด สถาบันเด็ก ฯ โชว์นวัตกรรมการผ่าตัดส่องกล้องขั้นสูงในทารกแรกเกิด", title: "กรมการแพทย์ โดยสถาบันสุขภาพเด็กแห่งชาติมหาราชินี มุ่งเน้นการพัฒนาสู่ความเป็นเลิศด้านศัลยกรรมทารกแรกเกิดรวมใช้ทั้งเทคโนโลยีขั้นสูง ทำให้การผ่าตัดมีประสิทธิภาพ แม่นยำและปลอดภัย", img: "https://www.dms.go.th/backend//Content//Content_File/Hot_News/Img/25680730105037AM_1753846794493.jpg" },
    { id: 5, tag: "ประกาศและกิจกรรม", ownerPost: "นายสมส่วน ทองหยอด", date: "28 ก.ค. 2568", head: "สธ.สั่งการจังหวัดที่ได้รับผลกระทบในพื้นที่ชายแดนเตรียมแผนรองรับหากได้รับผลกระทบจากอาวุธพิสัยไกล", title: "รัฐมนตรีว่าการกระทรวงสาธารณสุข เผย เหตุความไม่สงบชายแดนไทย-กัมพูชา ล่าสุด มีประชาชนเสียชีวิตเพิ่มเป็น 14 ราย บาดเจ็บ 38 ราย ยังรักษาในโรงพยาบาล 16 ราย โรงพยาบาลต้องปิดบริการ 12 แห่ง", img: "https://www.dms.go.th/backend//Content//Content_File/Hot_News/Img/25680728154817PM_0a7957323071aa3610c6488ed435e35e.jpg" },
    { id: 6, tag: "สุขภาพทั่วไป", ownerPost: "นายสมสิงค์ ทองเสือ", date: "26 ก.ค. 2568", head: "สธ. เผย มีผู้บาดเจ็บจากเหตุชายแดนไทย-กัมพูชาเพิ่ม 2 ราย รพ.ต้องลดบริการเหลือเฉพาะฉุกเฉินเพิ่มอีก 5 แห่ง ส่งรถล้างไตเคลื่อนที่และรถโรคหลอดเลือดสมองเคลื่อนที่ถึงอุบลฯ เย็นนี้", title: "ศูนย์ปฏิบัติการฯ กระทรวงสาธารณสุข รายงานเหตุปะทะชายแดนกัมพูชาส่งผลกระทบสถานบริการสาธารณสุขเพิ่มเป็น 6 จังหวัด ต้องปิดบริการ 7 แห่ง ลดการบริการเหลือเฉพาะฉุกเฉิน 10 แห่ง เคลื่อนย้ายผู้ป่วยในออกไปยังโรงพยาบาลในพื้นที่ปลอดภัย 583 ราย ", img: "https://www.dms.go.th/backend//Content//Content_File/Hot_News/Img/25680726195609PM_391e76a15951a1af388c58731a9f108d.jpg" },
    { id: 7, tag: "วิจัยทางการแพทย์", ownerPost: "นายสมแฮม ทองจ๊อบ", date: "25 ก.ค. 2568", head: "กรมการแพทย์ขับเคลื่อนนโยบายคนไทยห่างไกลโรค NCDs Heart, DM, HT เป็นวาระแห่งชาติ Rajavithi Model :Cardio-Renal-Metabolic Center พร้อมขานรับจัดทำโครงการนำร่อง “มินิคลินิกเทเลเมดิซีน”", title: "นายแพทย์ทวีศิลป์ วิษณุโยธิน อธิบดีกรมการแพทย์ กล่าวว่า ปัจจุบันกลุ่มโรคไม่ติดต่อ หรือ โรค NCDs (Noncommunicable Diseases) เป็นปัญหาสุขภาพอันดับ 1 ของโลก และประเทศไทย โดยเป็นสาเหตุของการเสียชีวิตมากกว่า 70% ", img: "https://www.dms.go.th/backend//Content//Content_File/Hot_News/Img/25680725104359AM_1753409474871.jpg" },
    { id: 8, tag: "โรคระบาดและการควบคุมโรค", ownerPost: "นายสมเจ ทองทน", date: "23 ก.ค. 2568", head: "สมศักดิ์ ประกาศ 5 ความสำเร็จ กรมการแพทย์ ๑๐+ หัวใจที่รอคอย ๑๐๐+ คืนลมหายใจ ๑,๐๐๐+ สมองฟื้น ๑๐,๐๐๐+ แสวงบุญบนเส้นทางศรัทธา", title: "รัฐมนตรีว่าการกระทรวงสาธารณสุข ประกาศ 5 ความสำเร็จ กรมการแพทย์ ใช้เทคโนโลยีการแพทย์ขั้นสูงและศรัทธา ดูแลผู้ป่วยโรคซับซ้อนรุนแรง ช่วยเพิ่มการเข้าถึงบริการ เพิ่มโอกาสรอดชีวิตและลดความพิการ ทั้งกรอหินปูนเกาะหลอดเลือดหัวใจ 10 ราย เปลี่ยนลิ้นหัวใจโดยสายสวน ", img: "https://www.dms.go.th/backend//Content//Content_File/Hot_News/Img/25680724222607PM_S__150380563.jpg" },
]
function NewsBox({ className = "", limit = 8 }) {
    return (
        <div className={className} limit={limit}>
            {NewContent.slice(0, limit).map((content) =>
                <Link to={`/news/${content.id}`}>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 w-full transition-transform duration-200 hover:scale-[1.02] hover:cursor-pointer">

                        <div className="relative">
                            <div className='m-3 h-48 overflow-hidden rounded-md'>
                                <img
                                    src={content.img}
                                    alt="News Thumbnail"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="absolute top-6 left-6 bg-[#3B80F5] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                {content.tag}
                            </span>
                        </div>


                        <div className="p-4 sm:p-6 flex flex-col">

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 text-gray-600 text-sm">
                                <div className="flex items-center mb-2 sm:mb-0">
                                    <img
                                        src="https://placehold.co/32x32/E2EDFF/0E82FD?text=GJ"
                                        alt="Gregory Johnson"
                                        className="w-8 h-8 rounded-full mr-2 object-cover"
                                    />
                                    <span className="text-sm">{content.ownerPost}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                                    <span className="text-sm">{content.date}</span>
                                </div>
                            </div>


                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                {content.head}
                            </h3>


                            <p className="text-gray-700 text-sm sm:text-base line-clamp-3">
                                {content.title}
                            </p>
                        </div>
                    </div>
                </Link>
            )}
        </div>




    )
}

export default NewsBox
