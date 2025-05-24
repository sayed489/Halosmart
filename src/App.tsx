import React, { useState, lazy, Suspense } from 'react';
import { RingColor } from './types';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
const TechSpecsSection = lazy(() => import('./components/TechSpecsSection'));
const AIInsightsSection = lazy(() => import('./components/AIInsightsSection'));
const BuySection = lazy(() => import('./components/BuySection'));
const Footer = lazy(() => import('./components/Footer'));
import ParticlesBackground from './components/ParticlesBackground';

function App() {
  const [activeRingColor, setActiveRingColor] = useState<RingColor>('black');
  
  const handleColorChange = (color: RingColor) => {
    setActiveRingColor(color);
  };
  
  const colorMap: Record<RingColor, string> = {
    black: '#111111',
    green: '#00ff00',
    blue: '#00b7eb',
  };

  return (
    <div className="min-h-screen bg-halo-black">
      <ParticlesBackground color={colorMap[activeRingColor]} />
      <Navbar />
      <HeroSection onColorChange={handleColorChange} />
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <TechSpecsSection />
        <AIInsightsSection />
        <BuySection activeColor={activeRingColor} onColorChange={handleColorChange} />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App