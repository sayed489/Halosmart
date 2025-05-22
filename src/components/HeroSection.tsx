import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { RingColor } from '../types';
import RingAnimation from './RingAnimation';

interface HeroSectionProps {
  onColorChange: (color: RingColor) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onColorChange }) => {
  const [activeRingColor, setActiveRingColor] = useState<RingColor>('black');
  
  const handleColorChange = (color: RingColor) => {
    setActiveRingColor(color);
    onColorChange(color);
  };
  
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden section-spacing pt-24">
      <div className="container mx-auto container-padding flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 z-10">
          <motion.h1 
            className="heading-1 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="gradient-text">HALO</span> — The Next Generation <br /> AI-Powered Smart Ring
          </motion.h1>
          
          <motion.p 
            className="text-lg text-halo-gray-300 mb-8 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the future of health monitoring powered by the Apollo4 Lite processor. Premium design meets cutting-edge technology in three stunning finishes.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="#buy-now" className="button-primary">
              Pre-order Now
            </a>
            <a href="#features" className="button-secondary">
              Discover Features
            </a>
          </motion.div>
          
          <motion.div 
            className="flex gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              className={`w-8 h-8 rounded-full transition-all duration-300 ${
                activeRingColor === 'black' 
                  ? 'ring-2 ring-white scale-110' 
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: '#111111' }}
              onClick={() => handleColorChange('black')}
            />
            <button 
              className={`w-8 h-8 rounded-full transition-all duration-300 ${
                activeRingColor === 'green' 
                  ? 'ring-2 ring-white scale-110' 
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: '#1DB954' }}
              onClick={() => handleColorChange('green')}
            />
            <button 
              className={`w-8 h-8 rounded-full transition-all duration-300 ${
                activeRingColor === 'blue' 
                  ? 'ring-2 ring-white scale-110' 
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: '#0070F3' }}
              onClick={() => handleColorChange('blue')}
            />
          </motion.div>
        </div>
        
        <div className="w-full lg:w-1/2 flex justify-center relative z-10">
          <motion.div
            className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full glassmorphism flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <RingAnimation color={activeRingColor} onColorChange={handleColorChange} />
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-12 left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <a 
          href="#features" 
          className="animate-bounce flex items-center justify-center w-10 h-10 rounded-full glassmorphism"
        >
          <ArrowDown size={20} />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;