import CategorySection from "./landing/CategorySection.jsx";
import DocList from "./landing/DocList.jsx";
import HeroSection from "./landing/HeroSection.jsx"



function HomePage() {
  return (
    <div className="bg-pri-wh">
      <main>
        <HeroSection />
        <CategorySection />
        <DocList />
      </main>
     
    </div>
  );
}

export default HomePage;
