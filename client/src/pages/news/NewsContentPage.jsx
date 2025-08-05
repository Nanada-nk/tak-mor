import { Search } from "lucide-react";
import Brandner from "../../components/Brandner.jsx";
import NewBoxBarComponent from "../../components/NewsBox/NewBoxBarComponent.jsx";

function NewsContentPage() {
  const post = {

    author: 'นายสมพง ทองคุ้ม',
    authorAvatar: 'https://www.kinrehab.com/upload/images/%E0%B8%A3%E0%B8%B9%E0%B8%9B%20Staff%20New/%E0%B8%99%E0%B8%9E.%E0%B8%81%E0%B8%A4%E0%B8%A9%E0%B8%93%E0%B8%B0%20%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B8%A2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B9%82%E0%B8%8A%E0%B8%84%E0%B8%A7%E0%B8%B4%E0%B8%A7%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B9%8C%20%E0%B9%81%E0%B8%9E%E0%B8%97%E0%B8%A2%E0%B9%8C%E0%B9%80%E0%B8%89%E0%B8%9E%E0%B8%B2%E0%B8%B0%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%94%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%80%E0%B8%A7%E0%B8%8A%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C%E0%B8%9F%E0%B8%B7%E0%B9%89%E0%B8%99%E0%B8%9F%E0%B8%B9.png', // URL รูปโปรไฟล์ผู้เขียนเล็กๆ
    views: 90,
    comments: 25,
    content: ["การผ่าตัดมะเร็งต่อมลูกหมาก (Radical Prostatectomy) เป็นหนึ่งในการรักษาหลักสำหรับมะเร็งต่อมลูกหมากเฉพาะที่ ภาวะหย่อนสมรรถภาพทางเพศ (Erectile Dysfunction: ED) จึงเป็นหนึ่งในผลข้างเคียงที่พบได้บ่อยในผู้ป่วยหลังได้รับการรักษานายแพทย์สกานต์ บุนนาค รองอธิบดีกรมการแพทย์ กล่าวว่า ปัจจุบันแนวคิดในการ “ฟื้นฟูสมรรถภาพทางเพศ” สำหรับผู้ได้รับการผ่าตัดมะเร็งต่อมลูกหมาก คือ ให้การรักษาตั้งแต่เนิ่น ๆ หลังการผ่าตัด เพื่อป้องกันการเสื่อมสภาพของเนื้อเยื่อองคชาตจากการขาดออกซิเจน และส่งเสริมการฟื้นตัวของเส้นประสาทและหลอดเลือด โดยมีเป้าหมายเพื่อเพิ่มโอกาสการกลับมาแข็งตัวได้เองอีกครั้งในระยะยาว ในปัจจุบันยังไม่มีแนวทางการรักษาที่เป็นมาตรฐานเพียงวิธีเดียว แต่ใช้วิธีการรักษาแบบผสมผสานเรืออากาศเอกนายแพทย์สมชาย ธนะสิทธิชัย ผู้อำนวยการสถาบันมะเร็งแห่งชาติ กล่าวว่า วิธีการรักษาผู้ป่วยภาวะหย่อนสมรรถภาพหลังการผ่าตัดมะเร็งต่อมลูกหมาก ใช้วิธีการรักษาแบบผสมผสาน โดยมีทางเลือกต่าง ๆ ได้แก่ การใช้ยา ได้แก่ ยากลุ่ม PDE5 Inhibitorsที่ใช้ในการรักษาภาวะหย่อนสมรรถภาพทางเพศ การฉีดยาเข้าองคชาตโดยตรงก่อนการมีเพศสัมพันธ์ การใช้อุปกรณ์ช่วย ซึ่งเป็นอุปกรณ์สุญญากาศที่ช่วยดึงเลือดมาคั่งที่องคชาตเพื่อให้เกิดการแข็งตัว การรักษาเสริมและแนวทางการรักษาเพิ่มเติม ได้แก่ การใช้คลื่นกระแทกความเข้มต่ำ(Low - Intensity Extracorporeal Shockwave Therapy - LI - ESWT) เทคโนโลยีที่ใช้คลื่นเสียงความเข้มต่ำมากระตุ้นที่องคชาต โดยเชื่อว่าจะช่วยกระตุ้นให้เกิดการสร้างหลอดเลือดใหม่ และอาจส่งเสริมการซ่อมแซมของเส้นประสาท การบริหารกล้ามเนื้ออุ้งเชิงกราน(Pelvic Floor Muscle Training) และ การออกกำลังกายแบบแอโรบิก(Aerobic Training)"
      ,
    ],
    highlightedNote: ` บทสรุปและคำแนะนำ การฟื้นฟูสมรรถภาพทางเพศหลังการผ่าตัดมะเร็งต่อมลูกหมากเป็น "การวิ่งมาราธอน ไม่ใช่การวิ่งระยะสั้น" การฟื้นตัวของเส้นประสาทอาจใช้เวลาตั้งแต่ 1-2 ปี หรือนานถึง 4 ปี สิ่งสำคัญคือ ทำความเข้าใจว่าการฟื้นตัวต้องใช้ระยะเวลาและความอดทน และปรึกษาแพทย์ประจำตัวของท่าน เพื่อวางแผนการฟื้นฟูที่เหมาะสมและหากมีอาการผิดปกติให้รีบปรึกษาแพทย์โดยเร็ว หากท่านมีข้อสงสัย สามารถศึกษาเพิ่มเติมได้จากสถาบันมะเร็งแห่งชาติผ่านทาง Facebook : สถาบันมะเร็งแห่งชาติ National Cancer Institute และ LINE : NCI รู้สู้มะเร็ง`,
    aboutAuthor: {
      name: 'นายสมพง ทองคุ้ม',
      avatar: 'https://www.kinrehab.com/upload/images/%E0%B8%A3%E0%B8%B9%E0%B8%9B%20Staff%20New/%E0%B8%99%E0%B8%9E.%E0%B8%81%E0%B8%A4%E0%B8%A9%E0%B8%93%E0%B8%B0%20%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B8%A2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B9%82%E0%B8%8A%E0%B8%84%E0%B8%A7%E0%B8%B4%E0%B8%A7%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B9%8C%20%E0%B9%81%E0%B8%9E%E0%B8%97%E0%B8%A2%E0%B9%8C%E0%B9%80%E0%B8%89%E0%B8%9E%E0%B8%B2%E0%B8%B0%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%94%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%80%E0%B8%A7%E0%B8%8A%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C%E0%B8%9F%E0%B8%B7%E0%B9%89%E0%B8%99%E0%B8%9F%E0%B8%B9.png', // URL รูปโปรไฟล์ผู้เขียนใหญ่
      bio: `บทสรุปและคำแนะนำ การฟื้นฟูสมรรถภาพทางเพศหลังการผ่าตัดมะเร็งต่อมลูกหมากเป็น "การวิ่งมาราธอน ไม่ใช่การวิ่งระยะสั้น" การฟื้นตัวของเส้นประสาทอาจใช้เวลาตั้งแต่ 1-2 ปี หรือนานถึง 4 ปี สิ่งสำคัญคือ ทำความเข้าใจว่าการฟื้นตัวต้องใช้ระยะเวลาและความอดทน และปรึกษาแพทย์ประจำตัวของท่าน เพื่อวางแผนการฟื้นฟูที่เหมาะสมและหากมีอาการผิดปกติให้รีบปรึกษาแพทย์โดยเร็ว หากท่านมีข้อสงสัย สามารถศึกษาเพิ่มเติมได้จากสถาบันมะเร็งแห่งชาติผ่านทาง Facebook : สถาบันมะเร็งแห่งชาติ National Cancer Institute และ LINE : NCI รู้สู้มะเร็ง`,
    },
    tags: ['สุขภาพทั่วไป', 'วิจัยทางการแพทย์', 'โรงพยาบาลและสารธรณสุข', 'ประกาศและกิจกรรม'],
  };
  return (
    <div className="font-prompt mb-6">

      <Brandner title="ข่าว" />


      <div className="flex flex-2/3 gap-x-8 justify-center mx-30 mt-5">
        <div>


          <div className="bg-gray-100 min-h-screen font-sans">
            {/* Header Section */}
            <header className="bg-white shadow-sm py-4">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
                  การดูแลสุขภาพทางเพศชายหลังผ่าตัดมะเร็งต่อมลูกหมาก
                </h1>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="">
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Hero Image */}
                {'https://images.unsplash.com/photo-1533221430079-c70e2cc5140e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' && (
                  <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden">
                    <img
                      src='https://www.dms.go.th/backend//Content//Content_File/Hot_News/Img/25680804130531PM_1754287232442.jpg'
                      alt="การดูแลสุขภาพทางเพศชายหลังผ่าตัดมะเร็งต่อมลูกหมาก"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Post Content Wrapper */}
                <div className="p-6 sm:p-8 lg:p-10">
                  {/* Title */}


                  {/* Post Meta Info (Health Tips, Date, Author, Views, Comments) */}
                  <div className="flex items-center text-sm text-gray-500 mb-6 flex-wrap gap-y-2">
                    {/* Health Tips Tag */}
                    <span className="bg-gray-900 text-white text-xs font-medium mr-3 px-3 py-1 rounded-full flex items-center whitespace-nowrap">
                      สุขภาพทั่วไป
                    </span>

                    {/* Date */}
                    <div className="flex items-center mr-4 whitespace-nowrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>04 ส.ค. 2568</span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center mr-auto whitespace-nowrap">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="w-5 h-5 rounded-full mr-1 object-cover"
                      />
                      <span>{post.author}</span>
                    </div>

                    {/* Comments */}
                    <div className="flex items-center text-gray-700 border border-gray-300 rounded-full px-3 py-1 mr-2 whitespace-nowrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                      <span>{post.comments}</span>
                    </div>

                    {/* Views */}
                    <div className="flex items-center text-blue-700 bg-blue-100 rounded-full px-3 py-1 whitespace-nowrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>{post.views}</span>
                    </div>
                  </div>

                  {/* Main Content Paragraphs */}
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4 mb-6">
                    {post.content.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Highlighted Note */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-md italic mb-8">
                    <p className="font-semibold mb-2">สรุป</p>
                    <p>{post.highlightedNote}</p>
                  </div>

                  {/* About Author Section */}
                  <div className="bg-gray-50 p-6 sm:p-8 lg:p-10 border-t border-gray-200 rounded-b-lg -mx-6 sm:-mx-8 lg:-mx-10 mt-8">
                    <h2 className="text-gray-800 text-xl font-bold mb-4">คำแนะนำจากแพทย์</h2>
                    <div className="flex items-start md:items-center flex-col md:flex-row">
                      {post.aboutAuthor.avatar && (
                        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                          <img
                            src={post.aboutAuthor.avatar}
                            alt={post.aboutAuthor.name}
                            className="w-24 h-24 rounded-full object-cover shadow-md"
                          />
                        </div>
                      )}
                      <div className="flex-grow">
                        <h3 className="text-gray-900 text-lg font-semibold mb-1">
                          {post.aboutAuthor.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {post.aboutAuthor.bio}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tags Section */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-gray-800 text-lg font-semibold mb-3">แท๊ก</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-3 py-1 rounded-full transition duration-300 ease-in-out cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </main>


          </div>
        </div>


        <NewBoxBarComponent />
      </div>


    </div>
  )
}
export default NewsContentPage