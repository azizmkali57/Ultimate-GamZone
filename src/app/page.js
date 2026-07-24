import Header from "@/components/layout/header";
import HeroSection from "@/components/home/herosection";
import ChooseGame from "@/components/home/ChooseGame";
import PricingPlans from "@/components/home/PricingPlans";
import OurSetups from "@/components/home/Oursetups";
import Footer from "@/components/layout/footer";
import Contact from "@/components/home/contact";
import Testimonials from "@/components/home/testimonial";
export const metadata = {
  title: "UGZ — Ultimate Game Zone",
  description:
    "Your ultimate gaming destination. Choose your game, pick your hours and play your way!",
};
 
export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      <HeroSection />
      <ChooseGame />
      <PricingPlans />
      <OurSetups />
      <Contact />
      <Testimonials />
      <Footer />
    </main>
  );
}
 