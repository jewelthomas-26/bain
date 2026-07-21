import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ChampionSection from "./components/ChampionSection";
import ClientSuccess from "./components/ClientSuccess";
import AIEvolutionSection from "./components/AIEvolutionSection";
import LatestInsights from "./components/LatestInsights";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Navbar />
        <Hero />

        <div id="next-section">
          <ChampionSection />
        </div>

        <ClientSuccess />
        <AIEvolutionSection />
        <LatestInsights />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}