import { LanguageProvider } from "./components/landing/LanguageProvider";
import TopBar from "./components/landing/TopBar";
import Navbar from "./components/landing/Navbar";
import HeroSlider from "./components/landing/HeroSlider";
import TrustZone from "./components/landing/TrustZone";
import Problems from "./components/landing/Problems";
import Benefits from "./components/landing/Benefits";
import Modules from "./components/landing/Modules";
import HowItWorks from "./components/landing/HowItWorks";
import Pricing from "./components/landing/Pricing";
import DemoForm from "./components/landing/DemoForm";
import FAQ from "./components/landing/FAQ";
import IBIGPartners from "./components/landing/IBIGPartners";
import FinalCTA from "./components/landing/FinalCTA";
import Footer from "./components/landing/Footer";
import SaraChat from "./components/landing/SaraChat";
import WhatsAppButton from "./components/landing/WhatsAppButton";
import PWABanner from "./components/landing/PWABanner";
import CookieBanner from "./components/landing/CookieBanner";

export default function LandingPage() {
  return (
    <LanguageProvider>
      <TopBar />
      <Navbar />
      <main>
        <HeroSlider />
        <TrustZone />
        <Problems />
        <Benefits />
        <Modules />
        <HowItWorks />
        <Pricing />
        <DemoForm />
        <FAQ />
        <IBIGPartners />
        <FinalCTA />
      </main>
      <Footer />
      <SaraChat />
      <WhatsAppButton />
      <PWABanner />
      <CookieBanner />
    </LanguageProvider>
  );
}
