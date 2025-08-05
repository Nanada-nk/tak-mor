import { Search } from 'lucide-react'
import React from 'react'

function NewBoxBarComponent() {
  return (
    <div>
        <div className="flex flex-col gap-6" >

          <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-300 w-[400px]">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">ค้นหา</h2>

            <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden join-mb3">

              <input
                type="text"
                placeholder="ค้นหา"
                className="input input-bordered join-item ]"
              />


              <button className="btn btn-primary join-item bg-[#3B80F5]">
                <Search />
              </button>
            </div>
          </div>



          <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-300 w-[400px]">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">หมวดหมู่</h2>
            <ul class="space-y-2 text-gray-700">
              <li class="flex justify-between">
                <span className="text-gray-900 mb-2 line-clamp-2 hover:underline hover:font-extrabold transition duration-150 cursor-pointer">ข่าวสุขภาพทั่วไป</span>
                <span class="text-gray-500">(2)</span>
              </li>
              <li class="flex justify-between">
                <span className="text-gray-900 mb-2 line-clamp-2 hover:underline hover:font-extrabold transition duration-150 cursor-pointer">ข่าววิจัยทางการแพทย์</span>
                <span class="text-gray-500">(5)</span>
              </li>
              <li class="flex justify-between">
                <span className="text-gray-900 mb-2 line-clamp-2 hover:underline hover:font-extrabold transition duration-150 cursor-pointer">ข่าวโรคระบาดและการควบคุมโรค</span>
                <span class="text-gray-500">(4)</span>
              </li>
              <li class="flex justify-between">
                <span className="text-gray-900 mb-2 line-clamp-2 hover:underline hover:font-extrabold transition duration-150 cursor-pointer">ข่าวโรงพยาบาลและสารธรณสุข</span>
                <span class="text-gray-500">(6)</span>
              </li>
              <li class="flex justify-between">
                <span className="text-gray-900 mb-2 line-clamp-2 hover:underline hover:font-extrabold transition duration-150 cursor-pointer">ประกาศและกิจกรรม</span>
                <span class="text-gray-500">(8)</span>
              </li>
            </ul>

          </div>

          <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-300 w-[400px]">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">ข่าวก่อนนหน้า</h2>
            <ul class="space-y-4">
              <li class="flex items-start gap-3 hover:scale-[1.02] cursor-pointer">
                <img src="https://www.dms.go.th/backend//Content//Content_File/Hot_News/Img/25680804130531PM_1754287232442.jpg" alt="news" class="w-14 h-14 object-cover rounded-md" />
                <div>
                  <p class="text-xs text-gray-500">4 ส.ค. 2568</p>
                  <p class="text-sm text-gray-800 font-medium leading-snug">
                    การดูแลสุขภาพทางเพศชายหลังผ่าตัดมะเร็งต่อมลูกหมาก
                  </p>
                </div>
              </li>

              <li class="flex items-start gap-3 hover:scale-[1.02] cursor-pointer">
                <img src="https://www.dms.go.th/backend//Content//Content_File/Hot_News/Img/25680801160605PM_1754038901241.jpg" alt="news" class="w-14 h-14 object-cover rounded-md" />
                <div>
                  <p class="text-xs text-gray-500">1 ส.ค. 2568</p>
                  <p class="text-sm text-gray-800 font-medium leading-snug">
                    สถาบันประสาทวิทยา กรมการแพทย์ จัดพิธีลงนามความร่วมมือ..
                  </p>
                </div>
              </li>

              <li class="flex items-start gap-3 hover:scale-[1.02] cursor-pointer">
                <img src="https://www.dms.go.th/backend//Content//Content_File/Hot_News/Img/25680731175522PM_1753958823524.jpg" alt="news" class="w-14 h-14 object-cover rounded-md" />
                <div>
                  <p class="text-xs text-gray-500">31 ก.ค. 2568</p>
                  <p class="text-sm text-gray-800 font-medium leading-snug">
                    โรงพยาบาลเมตตาประชารักษ์(วัดไร่ขิง) กรมการแพทย์ ชูความสำเร็จศูนย์โรคตาฯ สาขาสุขุมวิท

                  </p>
                </div>
              </li>

              <li class="flex items-start gap-3 hover:scale-[1.02] cursor-pointer">
                <img src="https://www.dms.go.th/backend//Content//Content_File/Hot_News/Img/25680730105037AM_1753846794493.jpg" alt="news" class="w-14 h-14 object-cover rounded-md" />
                <div>
                  <p class="text-xs text-gray-500">30 ก.ค. 2568</p>
                  <p class="text-sm text-gray-800 font-medium leading-snug">
                    ศัลยกรรมทารกแรกเกิด สถาบันเด็ก ฯ โชว์นวัตกรรมการผ่าตัดส่องกล้องขั้นสูงในทารกแรกเกิด

                  </p>
                </div>
              </li>
            </ul>

          </div>



          <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-300 w-[400px]">
            <h2 class="text-2xl font-bold text-gray-800 mb-4"></h2>

            <div className="filter">
              <input className="btn btn-soft btn-error filter-reset" type="radio" name="metaframeworks" aria-label="ทั้งหมด" />
              <input className="btn btn-soft btn-info" type="radio" name="metaframeworks" aria-label="ทั่วไป" />
              <input className="btn btn-soft btn-info" type="radio" name="metaframeworks" aria-label="วิจัยทางการแพทย์" />
              <input className="btn btn-soft btn-info" type="radio" name="metaframeworks" aria-label="สุขภาพ" />
              <input className="btn btn-soft btn-info" type="radio" name="metaframeworks" aria-label="โรงพยาบาลและสาธารณสุข" />
              <input className="btn btn-soft btn-info" type="radio" name="metaframeworks" aria-label="ประกาศและกิจกรรม" />

            </div>
          </div>
          <div>

          </div>

        </div>
    </div>
  )
}

export default NewBoxBarComponent