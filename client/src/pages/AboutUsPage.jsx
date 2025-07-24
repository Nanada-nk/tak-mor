import HeroAboutUs from "../components/aboutUs/HeroAboutUs";
import InfoSection from "../components/aboutUs/InfoSection";
import WhyChooseUs from "../components/aboutUs/WhyChooseUs";
import Brandner  from "../components/Brandner";
import DocList from "../pages/landing/DocList"
import ReviewSection from "../pages/landing/ReviewSection"
import FAQSection from "../pages/landing/FAQSection"

function AboutUsPage() {
  return (
    <div>
      <Brandner title="เกี่ยวกับเรา" />

      <main>
        <InfoSection />
        <WhyChooseUs />
        <HeroAboutUs />
        <DocList title="หมอแนะนำ" bgColor="bg-white"/>
        <ReviewSection bgColor="#ffffff"/>
        <FAQSection />
      </main>

    </div>
  )
}
export default AboutUsPage