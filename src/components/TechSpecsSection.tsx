import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Bluetooth, Battery, Vibrate } from 'lucide-react';

const TechSpecsSection: React.FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [specsRef, specsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <section id="tech-specs" className="section-spacing relative" ref={sectionRef}>
      <div className="container mx-auto container-padding">
        <motion.div 
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Technical <span className="gradient-text">Specifications</span></h2>
          <p className="text-halo-gray-300 max-w-2xl mx-auto">
            Powered by the Apollo4 Lite processor, HALO sets a new standard for wearable health devices.
          </p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ opacity, y }}
          ref={specsRef}
        >
          <motion.div 
            className="glassmorphism p-8 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={specsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute -top-6 -left-6 p-4 glassmorphism rounded-2xl">
              <Cpu className="w-8 h-8 text-halo-green" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 pt-4">Processor & Power</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1.5 bg-halo-green rounded-full mr-3"></span>
                <div>
                  <strong className="text-white block">Apollo4 Lite Processor</strong>
                  <span className="text-halo-gray-300">Ultra-efficient processing for advanced health monitoring</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1.5 bg-halo-blue rounded-full mr-3"></span>
                <div>
                  <strong className="text-white block">Advanced Power Management</strong>
                  <span className="text-halo-gray-300">Smart sleep modes and dynamic power scaling</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1.5 bg-halo-green rounded-full mr-3"></span>
                <div>
                  <strong className="text-white block">Extended Battery Life</strong>
                  <span className="text-halo-gray-300">Up to 7 days of continuous use</span>
                </div>
              </li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="glassmorphism p-8 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={specsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute -top-6 -right-6 p-4 glassmorphism rounded-2xl">
              <Bluetooth className="w-8 h-8 text-halo-blue" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 pt-4">Connectivity</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1.5 bg-halo-blue rounded-full mr-3"></span>
                <div>
                  <strong className="text-white block">Bluetooth 5.1</strong>
                  <span className="text-halo-gray-300">Low energy, reliable connection with extended range</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1.5 bg-halo-green rounded-full mr-3"></span>
                <div>
                  <strong className="text-white block">Seamless Pairing</strong>
                  <span className="text-halo-gray-300">One-touch connection with companion app</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1.5 bg-halo-blue rounded-full mr-3"></span>
                <div>
                  <strong className="text-white block">Secure Data Transfer</strong>
                  <span className="text-halo-gray-300">End-to-end encryption for all health data</span>
                </div>
              </li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="glassmorphism p-8 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={specsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="absolute -bottom-6 -left-6 p-4 glassmorphism rounded-2xl">
              <Battery className="w-8 h-8 text-halo-green" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Sensors & Monitoring</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1.5 bg-halo-green rounded-full mr-3"></span>
                <div>
                  <strong className="text-white block">Advanced Heart Rate Sensor</strong>
                  <span className="text-halo-gray-300">Continuous monitoring with high accuracy</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1.5 bg-halo-blue rounded-full mr-3"></span>
                <div>
                  <strong className="text-white block">Stress Detection</strong>
                  <span className="text-halo-gray-300">Real-time stress monitoring via HRV analysis</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1.5 bg-halo-green rounded-full mr-3"></span>
                <div>
                  <strong className="text-white block">Temperature Sensor</strong>
                  <span className="text-halo-gray-300">Accurate body temperature readings</span>
                </div>
              </li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="glassmorphism p-8 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={specsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute -bottom-6 -right-6 p-4 glassmorphism rounded-2xl">
              <Vibrate className="w-8 h-8 text-halo-blue" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Design & Materials</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1.5 bg-halo-blue rounded-full mr-3"></span>
                <div>
                  <strong className="text-white block">Flex Cable Design</strong>
                  <span className="text-halo-gray-300">Comfortable fit for all-day wear</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1.5 bg-halo-green rounded-full mr-3"></span>
                <div>
                  <strong className="text-white block">Premium Colors</strong>
                  <span className="text-halo-gray-300">Available in Black, Green, and Blue</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1.5 bg-halo-blue rounded-full mr-3"></span>
                <div>
                  <strong className="text-white block">Haptic Feedback</strong>
                  <span className="text-halo-gray-300">Subtle vibration for notifications</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechSpecsSection;