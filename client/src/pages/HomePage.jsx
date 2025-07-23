import CategorySection from "./landing/CategorySection.jsx";
import DocList from "./landing/DocList.jsx";
import HeroSection from "./landing/HeroSection.jsx"
import PromotionSection from "./landing/PromotionSection.jsx";



function HomePage() {
  return (
    <div className="bg-pri-wh">
      <main>
        <HeroSection />
        <CategorySection />
        <DocList />
        <PromotionSection />
      </main>
     
    </div>
  );
}

export default HomePage;
