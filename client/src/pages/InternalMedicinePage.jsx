import DocListInternal from "./internalMedicine/DocListInternal";
import InternalHeroSection from "./internalMedicine/InternalHeroSection";
import NewBlogInternal from "./internalMedicine/NewBlogInternal";
import ServiceInternalSection from "./internalMedicine/ServiceInternalSection";
import ReviewSection from "./landing/ReviewSection"

function InternalMedicinePage() {
  return (
    <div className="bg-pri-wh">
      <main className="space-y-16 sm:space-y-20 lg:space-y-24">
        <InternalHeroSection />
        <ServiceInternalSection />
        <DocListInternal />
        <NewBlogInternal />
        <ReviewSection/>
      </main>
    </div>
  );
}
export default InternalMedicinePage;
