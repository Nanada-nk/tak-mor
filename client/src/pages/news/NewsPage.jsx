import Brandner from "../../components/Brandner.jsx";
import NewBoxBarComponent from "../../components/NewsBox/NewBoxBarComponent.jsx";
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
    { id: 1, date: "06 Nov 2024", title: "Managing Chronic Conditions: Expert Advice for Better Living", img: "https://static.spacecrafted.com/e43a68bb33424cab9465c5c63a973fc8/i/cdc7bdd57d7a452aac26a48d66e2bc9c/1/4SoifmQp45JMgBnHp7ed2/Health%20News.jpg" },
    { id: 2, date: "15 Nov 2024", title: "Understanding Common Symptoms: When to See a Doctor", img: "https://www.shutterstock.com/image-photo/health-medical-news-technology-concept-260nw-714501403.jpg" },
    { id: 3, date: "08 Dec 2024", title: "Nutrition and Wellness: A Guide to Balanced Eating", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfgYeUwQ-49z77ZcqmILgwfUJqBnrEZ2puqQ&s" },
    { id: 4, date: "17 Dec 2024", title: "Top Preventive Health Measures Everyone Should Take", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJCaDyT_6ECRePJpeIMsy3rrEBuLMPSuQuZg&s" },
  ];


  const tags = ["ทั้งหมด", "ทั่วไป", "วิจัยทางการแพทย์", "สุขภาพ", "โรงพยาบาลแลพสารธารณสุข", "ประกาศและกิจกรรม",];

  return (
    <div className="font-prompt">
      <Brandner title="ข่าวสาร" />


      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        <div className=" lg:w-2/3 ">
          
            <NewsBox className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full" />


        </div>


        <NewBoxBarComponent />
      </div>


      <div className="flex justify-center my-8">
        <Pagination totalItems={totalNewsItems} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
export default NewsPage;
