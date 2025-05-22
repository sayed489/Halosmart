import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, ShoppingCart, Timer, Users, Shield } from 'lucide-react';
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
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [unitsLeft, setUnitsLeft] = useState(500);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const colorNames: Record<RingColor, string> = {
    black: 'Black Flex Cable',
    green: 'Green Flex Cable',
    blue: 'Blue Flex Cable',
  };

  const handlePreorder = async () => {
    if (!selectedSize) {
      alert('Please select your ring size');
      return;
    }

    try {
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 8900, // $89 in cents
          color: activeColor,
          size: selectedSize,
        }),
      });

      const data = await response.json();
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "USD",
        name: "HALO Smart Ring",
        description: `${colorNames[activeColor]} - Size ${selectedSize}`,
        order_id: data.id,
        handler: function (response: any) {
          alert('Payment successful! Your HALO ring will ship soon.');
          setUnitsLeft(prev => prev - 1);
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        theme: {
          color: "#2196F3"
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment initialization failed:', error);
      alert('Unable to process payment. Please try again.');
    }
  };

  return (
    <section id="buy-now" className="section-spacing relative bg-gradient-premium">
      <div className="container mx-auto container-padding">
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-white/10 rounded-full mb-4">
            <span className="text-sm font-medium flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Limited Launch Edition
            </span>
          </div>
          <h2 className="heading-2 mb-4">Secure Your <span className="gradient-text">HALO</span></h2>
          <p className="text-halo-gray-300 max-w-2xl mx-auto">
            Only {unitsLeft} units available in this exclusive launch.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="glassmorphism p-8 rounded-3xl shadow-premium">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">HALO Smart Ring</h3>
                  <p className="text-halo-gray-300">{colorNames[activeColor]}</p>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-cta flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">Limited Release</h4>
                      <p className="text-sm text-halo-gray-300">First 500 units only</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-cta flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">Launch Price</h4>
                      <p className="text-sm text-halo-gray-300">40% off retail price</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="text-3xl font-bold mb-2">
                    $89 <span className="text-halo-gray-400 text-lg font-normal line-through ml-2">$149</span>
                  </div>
                  <p className="text-sm text-halo-gray-300">Includes free worldwide shipping</p>
                </div>

                <button 
                  onClick={handlePreorder}
                  className="w-full button-primary flex items-center justify-center gap-2 py-4"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Pre-order Now</span>
                </button>

                <p className="text-center text-sm text-halo-gray-400 mt-4">
                  Expected shipping in March 2024
                </p>
              </div>

              <div className="md:w-1/2">
                <h4 className="font-medium mb-4">Select Ring Size:</h4>
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12', 'US 13'].map((size) => (
                    <button 
                      key={size}
                      className={`p-3 rounded-xl transition-all ${
                        selectedSize === size 
                          ? 'bg-gradient-cta text-white' 
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <h4 className="font-medium mb-4">Select Color:</h4>
                <div className="flex gap-4 mb-8">
                  <button 
                    className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                      activeColor === 'black' 
                        ? 'glassmorphism scale-105' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => onColorChange('black')}
                  >
                    <div className="w-12 h-12 rounded-full bg-halo-black mb-2"></div>
                    <span className="text-sm">Black</span>
                  </button>
                  
                  <button 
                    className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                      activeColor === 'green' 
                        ? 'glassmorphism scale-105' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => onColorChange('green')}
                  >
                    <div className="w-12 h-12 rounded-full bg-halo-green mb-2"></div>
                    <span className="text-sm">Green</span>
                  </button>
                  
                  <button 
                    className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                      activeColor === 'blue' 
                        ? 'glassmorphism scale-105' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => onColorChange('blue')}
                  >
                    <div className="w-12 h-12 rounded-full bg-halo-blue mb-2"></div>
                    <span className="text-sm">Blue</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-success flex-shrink-0 mt-0.5" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-success flex-shrink-0 mt-0.5" />
                    <span>1-year hardware warranty</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent-success flex-shrink-0 mt-0.5" />
                    <span>Free worldwide shipping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuySection;