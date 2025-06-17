import ArGeFeaturesSection from '@/components/staj-programi/ArGeFeaturesSection';
import InternshipApplicationForm from '@/components/staj-programi/InternshipApplicationForm';
import InternshipForm from '@/components/staj-programi/InternshipApplicationForm';
import InternshipSection from '@/components/staj-programi/InternshipSection';

export default function Page() {
  return (
    <>
      <InternshipSection />
      <InternshipApplicationForm />
      <ArGeFeaturesSection />
    </>
  );
}