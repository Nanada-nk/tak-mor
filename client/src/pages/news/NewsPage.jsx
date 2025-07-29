import Brandner from "../../components/Brandner.jsx";
import NewsBox from "../../components/NewsBox/NewsBox.jsx";
import Pagination from "../../components/Pagination.jsx"; 

function NewsPage() {
 
  const totalNewsItems = 50; 
  const itemsPerPage = 8; 
  const currentPage = 1; 
  const handlePageChange = (page) => {
    console.log("Changing to page:", page);
   
  };

 
  const recentPosts = [
    { id: 1, date: "06 Nov 2024", title: "Managing Chronic Conditions: Expert Advice for Better Living", img: "https://placehold.co/60x60/E0F2F7/0E82FD?text=News1" },
    { id: 2, date: "15 Nov 2024", title: "Understanding Common Symptoms: When to See a Doctor", img: "https://placehold.co/60x60/E0F2F7/0E82FD?text=News2" },
    { id: 3, date: "08 Dec 2024", title: "Nutrition and Wellness: A Guide to Balanced Eating", img: "https://placehold.co/60x60/E0F2F7/0E82FD?text=News3" },
    { id: 4, date: "17 Dec 2024", title: "Top Preventive Health Measures Everyone Should Take", img: "https://placehold.co/60x60/E0F2F7/0E82FD?text=News4" },
  ];

 
  const tags = ["All", "Health Tips", "Awareness", "Health", "Wellness", "Treatment", "Checkup", "Prevention"];

  return (
    <div>
      <Brandner title="ข่าวสาร" /> 

   
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full lg:w-2/3"> 
          <NewsBox />
          <NewsBox />
          <NewsBox />
          <NewsBox />
          <NewsBox />
          <NewsBox />
          <NewsBox />
          <NewsBox />
      
        </div>

       
        <div className="flex-col gap-6 w-full lg:w-1/3 hidden md:block"> 
       
          <div className="bg-white p-6 rounded-lg shadow border border-gray-300 w-full mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">ค้นหา</h2>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="ค้นหา"
                className="input input-bordered flex-grow border-none focus:outline-none" 
              />
              <button className="btn btn-primary bg-[#3B80F5] rounded-l-none"> 
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m1.47-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

         
          <div className="bg-white p-6 rounded-lg shadow border border-gray-300 w-full mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">หมวดหมู่</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex justify-between">
                <span>Health Care</span>
                <span className="text-gray-500">(2)</span>
              </li>
              <li className="flex justify-between">
                <span>Health Tips</span>
                <span className="text-gray-500">(5)</span>
              </li>
              <li className="flex justify-between">
                <span>Medical Research</span>
                <span className="text-gray-500">(4)</span>
              </li>
              <li className="flex justify-between">
                <span>Health Treatment</span>
                <span className="text-gray-500">(6)</span>
              </li>
              <li className="flex justify-between">
                <span>Nutrition</span>
                <span className="text-gray-500">(8)</span>
              </li>
            </ul>
          </div>

         
          <div className="bg-white p-6 rounded-lg shadow border border-gray-300 w-full mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">ข่าวก่อนหน้า</h2>
            <ul className="space-y-4">
              {recentPosts.map(post => (
                <li key={post.id} className="flex items-start gap-3">
                  <img src={post.img} alt="news" className="w-14 h-14 object-cover rounded-md flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">{post.date}</p>
                    <p className="text-sm text-gray-800 font-medium leading-snug">
                      {post.title}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-300 w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">แท็ก</h2> 
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <input
                  key={index}
                  className="btn btn-sm btn-outline btn-info" 
                  type="radio"
                  name="tags" 
                  aria-label={tag}
                  value={tag}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

    
      <div className="flex justify-center my-8"> 
        <Pagination totalItems={totalNewsItems} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
export default NewsPage;
