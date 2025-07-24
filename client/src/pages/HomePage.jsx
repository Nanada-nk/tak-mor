import CategorySection from "./landing/CategorySection.jsx";
import DocList from "./landing/DocList.jsx";
import FAQSection from "./landing/FAQSection.jsx";
import HeroSection from "./landing/HeroSection.jsx"
import NewSection from "./landing/NewSection.jsx";
import PromotionSection from "./landing/PromotionSection.jsx";
import ReviewSection from "./landing/ReviewSection.jsx";
import StepSection from "./landing/StepSection.jsx";



function HomePage() {
  return (
    <div className="bg-pri-wh">
      <main>
        <HeroSection />
        <CategorySection />
        <DocList />
        <PromotionSection />
        <StepSection />
        <NewSection />
        <FAQSection />
        <ReviewSection />
      </main>
     
    </div>
  );
}

export default HomePage;
