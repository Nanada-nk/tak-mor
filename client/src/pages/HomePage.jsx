import HeroSection from "./landing/HeroSection.jsx"
import Footer from "../components/footer/Footer.jsx"
import HeroSection from "./home/HeroSection.jsx"





function HomePage() {
  return (
    <div className="bg-pri-wh">
      <main>
        <div>HomePage</div>
        <HeroSection />
        <CategorySection />
        <FeaturedProduct />
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
