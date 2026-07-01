import { NavBar } from "../Components/NavBar";
import { Cards } from "../Components/Cards";
import { Footer } from "../Components/Footer";
import { ShareSection } from "../Components/ShareSection";
import { CTA } from "../Components/CTA";  
import { HeroSection } from "../Components/HeroSection";
import { GalleryShowcase } from "../Components/GalleryShowcase";
export const LandingPage = () => {
  return (
    <>
      {/* <Footer /> */}
      <NavBar />
      <HeroSection />
      <Cards />
      <ShareSection />
      {/* <HowItWorks /> */}
      <GalleryShowcase />
      <CTA />
      <Footer />
    </>
  );
};
