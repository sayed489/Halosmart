import React, { useState } from 'react';
import { RingColor } from './types';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TechSpecsSection from './components/TechSpecsSection';
import AIInsightsSection from './components/AIInsightsSection';
import CommunitySection from './components/CommunitySection';
import BuySection from './components/BuySection';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';

function App() {
  const [activeRingColor, setActiveRingColor] = useState<RingColor>('black');
  
  const handleColorChange = (color: RingColor) => {
    setActiveRingColor(color);
  };
  
  // Map colors to hex values for particles
  const colorMap: Record<RingColor, string> = {
    black: '#111111',
    green: '#1DB954',
    blue: '#0070F3',
  };

  return (
    <div className="min-h-screen">
      <ParticlesBackground color={colorMap[activeRingColor]} />
      <Navbar />
      <HeroSection onColorChange={handleColorChange} />
      <FeaturesSection />
      <TechSpecsSection />
      <AIInsightsSection />
      <CommunitySection />
      <BuySection activeColor={activeRingColor} onColorChange={handleColorChange} />
      <Footer />
    </div>
  );
}

export default App;