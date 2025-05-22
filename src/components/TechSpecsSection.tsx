import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Bluetooth, Battery, Vibrate, Smartphone, Heart, Droplets, Watch } from 'lucide-react';

const TechSpecsSection: React.FC = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [specsRef, specsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const specs = [
    {
      icon: <Watch className="w-8 h-8 text-halo-blue" />,
      title: "0.42\" AMOLED Display",
      description: "High-contrast display for clear visibility"
    },
    {
      icon: <Bluetooth className="w-8 h-8 text-halo-green" />,
      title: "Bluetooth Low Energy",
      description: "DA14531 SoC for efficient connectivity"
    },
    {
      icon: <Heart className="w-8 h-8 text-halo-blue" />,
      title: "Health Monitoring",
      description: "Heart rate and stress detection"
    },
    {
      icon: <Battery className="w-8 h-8 text-halo-green" />,
      title: "5-Day Battery Life",
      description: "Extended use between charges"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-halo-blue" />,
      title: "Wireless Charging",
      description: "Convenient magnetic charging"
    },
    {
      icon: <Droplets className="w-8 h-8 text-halo-green" />,
      title: "Water Resistant",
      description: "Protected against splashes"
    }
  ];

  return (
    <section id="tech-specs" className="section-spacing relative bg-gradient-premium">
      <div className="container mx-auto container-padding">
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Technical <span className="gradient-text">Excellence</span></h2>
          <p className="text-halo-gray-300 max-w-2xl mx-auto">
            Cutting-edge technology meets elegant design in every HALO ring.
          </p>
        </motion.div>
        
        <motion.div
          ref={specsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {specs.map((spec, index) => (
            <motion.div
              key={spec.title}
              className="glassmorphism p-6 rounded-2xl hover:shadow-premium-hover transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={specsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4">{spec.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{spec.title}</h3>
              <p className="text-halo-gray-300">{spec.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechSpecsSection;