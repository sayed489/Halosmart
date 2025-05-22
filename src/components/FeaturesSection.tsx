import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Activity, Battery, Bluetooth, Watch, Smartphone, Zap, BrainCircuit } from 'lucide-react';
import { FeatureCard } from '../types';

const features: FeatureCard[] = [
  {
    id: 1,
    title: 'Real-Time Heart Rate',
    description: 'Continuous monitoring of your heart rate with advanced BLE sensors.',
    icon: <Heart className="w-6 h-6 text-halo-green" />,
  },
  {
    id: 2,
    title: 'Stress Monitoring',
    description: 'Track your stress levels throughout the day with AI-powered insights.',
    icon: <Activity className="w-6 h-6 text-halo-blue" />,
  },
  {
    id: 3,
    title: 'Long Battery Life',
    description: 'Ultra-low power consumption with the Dialog DA14531 microcontroller.',
    icon: <Battery className="w-6 h-6 text-halo-green" />,
  },
  {
    id: 4,
    title: 'BLE 5.1 Support',
    description: 'Latest Bluetooth Low Energy technology for reliable connections.',
    icon: <Bluetooth className="w-6 h-6 text-halo-blue" />,
  },
  {
    id: 5,
    title: 'Subtle Notifications',
    description: 'Ring vibrates gently for alerts and notifications from your phone.',
    icon: <Watch className="w-6 h-6 text-halo-green" />,
  },
  {
    id: 6,
    title: 'Companion App',
    description: 'Android app for real-time data viewing and health insights.',
    icon: <Smartphone className="w-6 h-6 text-halo-blue" />,
  },
  {
    id: 7,
    title: 'Energy Efficient',
    description: 'Advanced power management for days of usage between charges.',
    icon: <Zap className="w-6 h-6 text-halo-green" />,
  },
  {
    id: 8,
    title: 'HALO AI System',
    description: 'Personalized health analytics and insights from your biometric data.',
    icon: <BrainCircuit className="w-6 h-6 text-halo-blue" />,
  },
];

const FeatureCardComponent: React.FC<{ feature: FeatureCard; index: number }> = ({ feature, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glassmorphism p-6 hover:shadow-lg hover:shadow-white/5 transition-all duration-300"
    >
      <div className="mb-4">{feature.icon}</div>
      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
      <p className="text-halo-gray-300">{feature.description}</p>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="section-spacing">
      <div className="container mx-auto container-padding">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Advanced <span className="gradient-text">Technology</span></h2>
          <p className="text-halo-gray-300 max-w-2xl mx-auto">
            HALO combines cutting-edge sensors, premium materials, and AI-driven analytics to deliver an unparalleled experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCardComponent key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;