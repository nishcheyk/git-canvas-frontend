import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import DemoSection from '../components/landing/DemoSection';
import HowItWorks from '../components/landing/HowItWorks';
import EmbedSection from '../components/landing/EmbedSection';
import AboutSection from '../components/landing/AboutSection';
import Footer from '../components/landing/Footer';

import ScrollAnimateWrapper from '../components/landing/ScrollAnimateWrapper';

/**
 * Redesigned Home component. Renders a full-scrollable, responsive landing page
 * that functions as a launchable marketing website for CodeCanvas.
 * Supports searching and displays profile retrieval errors when navigating.
 */
export default function Home({ onSearch, isLoading, error }) {
  const navigate = useNavigate();

  // Fallback search navigation if onSearch is not explicitly passed as a prop
  const handleSearch = onSearch || ((username) => {
    navigate(`/universe/${username}`);
  });

  return (
    <div className="relative w-full h-full min-h-screen bg-space-bg overflow-y-auto overflow-x-hidden scroll-smooth">
      <Helmet>
        <title>CodeCanvas | Your GitHub Activity as a Living Universe</title>
        <meta name="description" content="Transform your GitHub profile into an interactive 3D universe. Explore repositories, stars, and languages in real-time." />
      </Helmet>
      {/* Scroll Progress Bar */}
      <ScrollAnimateWrapper 
        animationType="scroll-progress" 
        className="fixed top-0 left-0 right-0 h-[2px] bg-indigo-500 z-[100]" 
      />

      {/* Background Floating Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-indigo-500 opacity-[0.06] blur-[120px] animate-float-1" />
        <div className="absolute top-[40%] right-[10%] w-[250px] h-[250px] rounded-full bg-[#0ea5e9] opacity-[0.08] blur-[120px] animate-float-2" />
        <div className="absolute bottom-[20%] left-[30%] w-[350px] h-[350px] rounded-full bg-[#a855f7] opacity-[0.06] blur-[120px] animate-float-3" />
        <div className="absolute top-[60%] left-[5%] w-[200px] h-[200px] rounded-full bg-indigo-500 opacity-[0.07] blur-[120px] animate-float-4" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection onSearch={handleSearch} isLoading={isLoading} error={error} />
        <DemoSection />
        <HowItWorks />
        <EmbedSection />
        <AboutSection />
        <Footer />
      </div>
    </div>
  );
}
