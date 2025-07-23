function NewsContentPage() {
  const post = {
  
    author: 'Arthur Hetzel',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-e69adba4c2d9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // URL รูปโปรไฟล์ผู้เขียนเล็กๆ
    views: 90,
    comments: 25,
    content: [
      `Maintaining a healthy lifestyle year-round is achievable with consistent habits that support your physical and mental well-being. One of the key pillars is staying hydrated, as water is essential for digestion, nutrient absorption, and overall bodily functions. Aim to drink at least eight glasses of water daily, adjusting for factors like weather and physical activity. A balanced diet is equally important, as it fuels your body with the nutrients it needs for energy, growth, and repair. Incorporate a variety of fruits, vegetables, lean proteins, and whole grains to ensure you’re getting a range of vitamins and minerals.`,
      `Regular physical activity is another cornerstone of a healthy lifestyle. Engaging in at least 150 minutes of moderate exercise per week, such as walking or cycling, can boost your cardiovascular health, strengthen muscles, and improve mood. Equally important is prioritizing sleep. Getting 7-9 hours of quality sleep each night helps regulate your mood, enhances mental clarity, and supports physical health. With these tips in mind, you’ll be on your way to maintaining a healthy lifestyle all year long.`,
    ],
    highlightedNote: `An extra important note to remember is that consistency is key. Small, sustainable changes in your daily habits will have a more lasting impact than short-term, extreme efforts. Prioritize gradual improvements in your routine and be patient with yourself - lasting health is a marathon, not a sprint.`,
    aboutAuthor: {
      name: 'Arthur Hetzel',
      avatar: 'https://images.unsplash.com/photo-1507003211169-e69adba4c2d9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // URL รูปโปรไฟล์ผู้เขียนใหญ่
      bio: `As a certified nutritionist and wellness coach, I’m passionate about helping others achieve a balanced lifestyle and lasting health. My journey into health started with my own desire to feel better physically and mentally, and along the way, I’ve learned the importance of consistency and small, sustainable changes. I love exploring new ways to stay active, experimenting with healthy meals, and sharing tips that are practical and realistic for people with busy lives.`,
    },
    tags: ['Health Tips', 'Awareness', 'Health', 'Wellness'],
  };
  return (
    <div>

      <div className="w-full h-40 bg-[#EEF7FB] flex items-center px-8 mb-8  justify-center flex-col">

        <p className="font-bold text-4xl text-black">ข่าวใหม่</p>
      </div>


      <div className="flex flex-2/3 gap-x-8 justify-center mx-30">
        <div>
          
          
          <div className="bg-gray-100 min-h-screen font-sans">
            {/* Header Section */}
            <header className="bg-white shadow-sm py-4">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
                    10 Tips for Maintaining a Healthy Lifestyle Year-Round
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
                      src='https://images.unsplash.com/photo-1533221430079-c70e2cc5140e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                      alt="10 Tips for Maintaining a Healthy Lifestyle Year-Round"
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
                      Health Tips
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
                      <span>03 Apr 2024</span>
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
                    <p className="font-semibold mb-2">An extra important note to remember is that consistency is key.</p>
                    <p>{post.highlightedNote}</p>
                  </div>

                  {/* About Author Section */}
                  <div className="bg-gray-50 p-6 sm:p-8 lg:p-10 border-t border-gray-200 rounded-b-lg -mx-6 sm:-mx-8 lg:-mx-10 mt-8">
                    <h2 className="text-gray-800 text-xl font-bold mb-4">About Author</h2>
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
                    <h3 className="text-gray-800 text-lg font-semibold mb-3">Tags</h3>
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

      </div>


    </div>
  )
}
export default NewsContentPage