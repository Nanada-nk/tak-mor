import DocListInternal from "./internalMedicine/DocListInternal";
import InternalHeroSection from "./internalMedicine/InternalHeroSection";
import ServiceInternalSection from "./internalMedicine/ServiceInternalSection";

function InternalMedicinePage() {
  return (
    <div className="bg-pri-wh">
      <main className="space-y-16 sm:space-y-20 lg:space-y-24">
        <InternalHeroSection />
        <ServiceInternalSection />
        <DocListInternal />
      </main>
    </div>
  );
}
export default InternalMedicinePage;
