import HeroAboutUs from "../components/aboutUs/HeroAboutUs.jsx";
import InfoSection from "../components/aboutUs/InfoSection.jsx";
import WhyChooseUs from "../components/aboutUs/WhyChooseUs.jsx";
import Brandner from "../components/Brandner.jsx";
import DocList from "../pages/landing/DocList.jsx";
import ReviewSection from "../pages/landing/ReviewSection.jsx";
import FAQSection from "../pages/landing/FAQSection.jsx";

function AboutUsPage() {
  return (
    <div className="font-prompt">
      <Brandner title="เกี่ยวกับเรา" />

      <main>
        <InfoSection />
        <WhyChooseUs />
        <HeroAboutUs />
        <div className="pt-10">
          <DocList title="หมอแนะนำ" bgColor="bg-white" />
        </div>
        <ReviewSection bgColor="#ffffff" />
        <FAQSection />
      </main>
    </div>
  );
}
export default AboutUsPage;
