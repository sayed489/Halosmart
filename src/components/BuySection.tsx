import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, ShoppingCart } from 'lucide-react';
import { RingColor } from '../types';

interface BuySectionProps {
  activeColor: RingColor;
  onColorChange: (color: RingColor) => void;
}

const BuySection: React.FC<BuySectionProps> = ({ activeColor, onColorChange }) => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const colorNames: Record<RingColor, string> = {
    black: 'Obsidian Black',
    green: 'Emerald Green',
    blue: 'Azure Blue',
  };
  
  return (
    <section id="buy-now" className="section-spacing">
      <div className="container mx-auto container-padding">
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Get Your <span className="gradient-text">HALO</span></h2>
          <p className="text-halo-gray-300 max-w-2xl mx-auto">
            Choose your preferred color and join the next generation of health monitoring.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-6 mb-12"
          ref={cardsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <button 
            className={`flex flex-col items-center p-4 rounded-xl transition-all ${
              activeColor === 'black' 
                ? 'glassmorphism scale-105' 
                : 'opacity-70 hover:opacity-100'
            }`}
            onClick={() => onColorChange('black')}
          >
            <div className="w-16 h-16 rounded-full bg-halo-black mb-4"></div>
            <span className="text-sm font-medium">Obsidian Black</span>
          </button>
          
          <button 
            className={`flex flex-col items-center p-4 rounded-xl transition-all ${
              activeColor === 'green' 
                ? 'glassmorphism scale-105' 
                : 'opacity-70 hover:opacity-100'
            }`}
            onClick={() => onColorChange('green')}
          >
            <div className="w-16 h-16 rounded-full bg-halo-green mb-4"></div>
            <span className="text-sm font-medium">Emerald Green</span>
          </button>
          
          <button 
            className={`flex flex-col items-center p-4 rounded-xl transition-all ${
              activeColor === 'blue' 
                ? 'glassmorphism scale-105' 
                : 'opacity-70 hover:opacity-100'
            }`}
            onClick={() => onColorChange('blue')}
          >
            <div className="w-16 h-16 rounded-full bg-halo-blue mb-4"></div>
            <span className="text-sm font-medium">Azure Blue</span>
          </button>
        </motion.div>
        
        <div className="max-w-3xl mx-auto glassmorphism p-8 rounded-2xl">
          <h3 className="text-2xl font-semibold mb-6">HALO Smart Ring - {colorNames[activeColor]}</h3>
          
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="md:w-1/2">
              <div className="text-3xl font-bold mb-2">$299 <span className="text-halo-gray-400 text-lg font-normal line-through ml-2">$349</span></div>
              <p className="text-sm text-halo-gray-300 mb-6">Pre-order special price. Limited time offer.</p>
              
              <button className="button-primary flex items-center justify-center gap-2 w-full">
                <ShoppingCart className="w-5 h-5" />
                <span>Pre-order Now</span>
              </button>
              
              <div className="mt-4 text-center text-sm text-halo-gray-400">
                Expected shipping in 3-4 weeks
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h4 className="font-medium mb-4">What's Included:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent-success flex-shrink-0 mt-0.5" />
                  <span>HALO Smart Ring in {colorNames[activeColor]}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent-success flex-shrink-0 mt-0.5" />
                  <span>Wireless charging dock</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent-success flex-shrink-0 mt-0.5" />
                  <span>Free access to HALO AI insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent-success flex-shrink-0 mt-0.5" />
                  <span>1-year hardware warranty</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-accent-success flex-shrink-0 mt-0.5" />
                  <span>30-day money-back guarantee</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-halo-gray-700 pt-6">
            <h4 className="font-medium mb-4">Size Selection:</h4>
            <div className="flex flex-wrap gap-3">
              {['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12', 'US 13'].map((size) => (
                <button 
                  key={size}
                  className="px-4 py-2 rounded-lg border border-halo-gray-700 hover:border-white transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="text-sm text-halo-gray-400 mt-3">
              Not sure about your size? Use our <a href="#" className="underline">ring size guide</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuySection;