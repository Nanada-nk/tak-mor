import CategorySection from "./landing/CategorySection.jsx";
import HeroSection from "./landing/HeroSection.jsx"



function HomePage() {
  return (
    <div className="bg-pri-wh">
      <main>
        <HeroSection />
        <CategorySection />
      </main>
     
    </div>
  );
}

export default HomePage;
