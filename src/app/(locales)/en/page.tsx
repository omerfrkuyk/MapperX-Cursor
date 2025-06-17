import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ThermalInspectionSection from "@/components/ThermalInspectionSection";
import DigitalTwinSection from "@/components/DigitalTwinSection";
import RealTimePlantSection from "@/components/RealTimePlantSection";
import CompatibleDroneSection from "@/components/CompatibleDroneSection";
import PricingSection from "@/components/PricingSection";
import PartnershipSection from "@/components/PartnershipSection";
import FAQSection from "@/components/FAQSection";
import ReportDownloadSection from "@/components/ReportDownloadSection";

export default function EnHomePage() {
  return (
    <main className="bg-white">
      <HeroSection />
      <FeaturesSection />
      <ThermalInspectionSection />
      <DigitalTwinSection />
      <RealTimePlantSection />
      <CompatibleDroneSection />
      <PricingSection />
      <PartnershipSection />
      <FAQSection />
      <ReportDownloadSection />
    </main>
  );
} 