
import NewsBox from "../../components/NewsBox/NewsBox"
function NewsPage() {
  return (
    <div>

      <div className="w-full h-40 bg-[#EEF7FB] flex items-center px-8 mb-8  justify-center flex-col">

        <p className="font-bold text-4xl text-black">ข่าวใหม่</p>
      </div>

      <div className="flex flex-2/3 gap-x-8 justify-center mx-30">
        <div className="grid grid-cols-2 gap-8  ">
          <NewsBox />
          <NewsBox />
          <NewsBox />
          <NewsBox />
          <NewsBox />
          <NewsBox />
          <NewsBox />
          <NewsBox />
        </div>
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

                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-4.35-4.35m1.47-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>



          <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-300 w-[400px]">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">หมวดหมู่</h2>
            <ul class="space-y-2 text-gray-700">
              <li class="flex justify-between">
                <span>Health Care</span>
                <span class="text-gray-500">(2)</span>
              </li>
              <li class="flex justify-between">
                <span>Health Tips</span>
                <span class="text-gray-500">(5)</span>
              </li>
              <li class="flex justify-between">
                <span>Medical Research</span>
                <span class="text-gray-500">(4)</span>
              </li>
              <li class="flex justify-between">
                <span>Health Treatment</span>
                <span class="text-gray-500">(6)</span>
              </li>
              <li class="flex justify-between">
                <span>Nutrition</span>
                <span class="text-gray-500">(8)</span>
              </li>
            </ul>

          </div>

          <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-300 w-[400px]">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">ข่าวก่อนนหน้า</h2>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <img src="https://via.placeholder.com/60" alt="news" class="w-14 h-14 object-cover rounded-md" />
                <div>
                  <p class="text-xs text-gray-500">06 Nov 2024</p>
                  <p class="text-sm text-gray-800 font-medium leading-snug">
                    Managing Chronic Conditions: Expert Advice for Better Living
                  </p>
                </div>
              </li>

              <li class="flex items-start gap-3">
                <img src="https://via.placeholder.com/60" alt="news" class="w-14 h-14 object-cover rounded-md" />
                <div>
                  <p class="text-xs text-gray-500">15 Nov 2024</p>
                  <p class="text-sm text-gray-800 font-medium leading-snug">
                    Understanding Common Symptoms: When to See a Doctor
                  </p>
                </div>
              </li>

              <li class="flex items-start gap-3">
                <img src="https://via.placeholder.com/60" alt="news" class="w-14 h-14 object-cover rounded-md" />
                <div>
                  <p class="text-xs text-gray-500">08 Dec 2024</p>
                  <p class="text-sm text-gray-800 font-medium leading-snug">
                    Nutrition and Wellness: A Guide to Balanced Eating
                  </p>
                </div>
              </li>

              <li class="flex items-start gap-3">
                <img src="https://via.placeholder.com/60" alt="news" class="w-14 h-14 object-cover rounded-md" />
                <div>
                  <p class="text-xs text-gray-500">17 Dec 2024</p>
                  <p class="text-sm text-gray-800 font-medium leading-snug">
                    Top Preventive Health Measures Everyone Should Take
                  </p>
                </div>
              </li>
            </ul>

          </div>



          <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow border border-gray-300 w-[400px]">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">แท๊ก</h2>

            <div className="filter">
              <input className="btn btn-soft btn-error filter-reset" type="radio" name="metaframeworks" aria-label="All" />
              <input className="btn btn-soft btn-info" type="radio" name="metaframeworks" aria-label="Health Tips" />
              <input className="btn btn-soft btn-info" type="radio" name="metaframeworks" aria-label="Awareness" />
              <input className="btn btn-soft btn-info" type="radio" name="metaframeworks" aria-label="Health" />
              <input className="btn btn-soft btn-info" type="radio" name="metaframeworks" aria-label="Wellness" />
              <input className="btn btn-soft btn-info" type="radio" name="metaframeworks" aria-label="Treatment" />
              <input className="btn btn-soft btn-info" type="radio" name="metaframeworks" aria-label="Checkup" />
              <input className="btn btn-soft btn-info" type="radio" name="metaframeworks" aria-label="Prevention" />

            </div>
          </div>
          <div>

          </div>

        </div>
      </div>
      <div className="join flex justify-center my-5">
        <nav aria-label="Pagination" class="flex justify-center items-center space-x-2">
          <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">Prev</button>

          <ul class="flex space-x-2">
            <li>
              <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">1</button>
            </li>
            <li>
              <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">
                2
              </button>
            </li>
            <li>
              <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">3</button>
            </li>
            <li>
              <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">4</button>
            </li>
            <li>
              <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">5</button>
            </li>
          </ul>

          <button class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100">Next</button>
        </nav>
      </div>


    </div>

  )
}
export default NewsPage