import { useState, useCallback, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import ServiceTimes from "@/components/ServiceTimes";
import Shepherd from "@/components/Shepherd";
import LiveService from "@/components/LiveService";
import DonationSystem from "@/components/DonationSystem";
import Events from "@/components/Events";
import SermonsGrid from "@/components/SermonsGrid";
import ChoirSection from "@/components/ChoirSection";
import NewsletterSignup from "@/components/NewsletterSignup";
import Testimonials from "@/components/Testimonials";
import NextSteps from "@/components/NextSteps";
import Footer from "@/components/Footer";
import ProgressIndicator from "@/components/ProgressIndicator";
import SEO from "@/components/SEO";
import PullToRefresh from "@/components/PullToRefresh";
import CelestialBackground from "@/components/CelestialBackground";
import SectionDivider from "@/components/SectionDivider";
import FeaturedVideoSpotlight from "@/components/FeaturedVideoSpotlight";
import FAQ from "@/components/FAQ";
import HarvestCelebration from "@/components/HarvestCelebration";

import PageLoader from "@/components/PageLoader";
import FloatingActionMenu from "@/components/FloatingActionMenu";
import FloatingChoirButton from "@/components/FloatingChoirButton";

const Index = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  // Show floating buttons after minimal scroll (10px) - visible throughout entire homepage
  useEffect(() => {
    const handleScroll = () => {
      // Show immediately once any scroll starts (after just 10px)
      setShowFloatingButtons(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRefresh = useCallback(async () => {
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <>
      <PageLoader />
      <HarvestCelebration />
      
      <SEO
        title="Glade Cathedral | Celestial Church of Christ Akoka Parish" 
        description="Experience the divine presence at Celestial Church of Christ, Akoka Parish — where heaven meets earth in sacred worship and celestial celebration." 
        url="/" 
      />
      <CelestialBackground />
      <ProgressIndicator />
      <Navigation />
      <PullToRefresh onRefresh={handleRefresh}>
        <main id="main-content" className="bg-background min-h-screen relative z-10" key={refreshKey}>
          <Hero />
          <Welcome />
          <SectionDivider variant="celestial" />
          <ServiceTimes />
          <SectionDivider variant="gold" />
          <Shepherd />
          <SectionDivider variant="teal" showCross={false} />
          <LiveService />
          <SectionDivider variant="gold" />
          <FeaturedVideoSpotlight />
          <SectionDivider variant="celestial" showCross={false} />
          <SermonsGrid />
          <SectionDivider variant="teal" />
          <ChoirSection />
          <SectionDivider variant="gold" showCross={false} />
          <Events />
          <SectionDivider variant="celestial" />
          <DonationSystem />
          <SectionDivider variant="teal" showCross={false} />
          <NewsletterSignup />
          <SectionDivider variant="gold" />
          <Testimonials />
          <SectionDivider variant="celestial" showCross={false} />
          <NextSteps />
          <SectionDivider variant="gold" />
          <FAQ />
        </main>
      </PullToRefresh>
      <Footer />
      {/* Floating buttons with scroll-triggered visibility */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 items-end">
        <FloatingChoirButton isVisible={showFloatingButtons} hideForMenu={actionMenuOpen} />
        <FloatingActionMenu isVisible={showFloatingButtons} onOpenChange={setActionMenuOpen} />
      </div>
    </>
  );
};

export default Index;
