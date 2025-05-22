import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BrainCircuit, LineChart, Heart, Zap, Activity } from 'lucide-react';

const AIInsightsSection: React.FC = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [chartRef, chartInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <section id="ai-insights" className="section-spacing relative bg-gradient-to-b from-halo-gray-900 to-halo-gray-800">
      <div className="container mx-auto container-padding">
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4"><span className="gradient-text">AI-Powered</span> Insights</h2>
          <p className="text-halo-gray-300 max-w-2xl mx-auto">
            HALO's advanced AI system analyzes your biometric data to provide personalized health insights and recommendations.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            ref={contentRef}
            initial={{ opacity: 0, x: -50 }}
            animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 glassmorphism rounded-full mt-1 flex-shrink-0">
                <BrainCircuit className="w-6 h-6 text-halo-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Personalized Health Analytics</h3>
                <p className="text-halo-gray-300">
                  HALO AI continuously learns from your daily patterns to provide tailored health recommendations that evolve with you.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 glassmorphism rounded-full mt-1 flex-shrink-0">
                <Heart className="w-6 h-6 text-halo-green" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Heart Health Monitoring</h3>
                <p className="text-halo-gray-300">
                  Receive detailed insights about your heart rate patterns, potential anomalies, and suggested actions to optimize heart health.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 glassmorphism rounded-full mt-1 flex-shrink-0">
                <Activity className="w-6 h-6 text-halo-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Stress Pattern Recognition</h3>
                <p className="text-halo-gray-300">
                  Identify stress triggers and patterns with HALO's advanced stress detection system, helping you manage your mental wellbeing.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 glassmorphism rounded-full mt-1 flex-shrink-0">
                <Zap className="w-6 h-6 text-halo-green" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Energy Optimization</h3>
                <p className="text-halo-gray-300">
                  Learn your peak performance times and receive suggestions for optimizing your daily schedule based on your natural energy cycles.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            ref={chartRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={chartInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className="glassmorphism p-6 rounded-2xl relative"
          >
            <div className="absolute -top-6 -right-6 p-4 glassmorphism rounded-2xl">
              <LineChart className="w-8 h-8 text-halo-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-6">Your Health Dashboard</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-halo-gray-400">Heart Rate</span>
                  <span className="text-sm font-medium text-white">72 bpm</span>
                </div>
                <div className="h-2 w-full bg-halo-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-halo-green to-halo-blue rounded-full"
                  ></motion.div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-halo-gray-400">Stress Level</span>
                  <span className="text-sm font-medium text-white">Low</span>
                </div>
                <div className="h-2 w-full bg-halo-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '30%' }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full bg-gradient-to-r from-halo-green to-halo-blue rounded-full"
                  ></motion.div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-halo-gray-400">Energy Level</span>
                  <span className="text-sm font-medium text-white">85%</span>
                </div>
                <div className="h-2 w-full bg-halo-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="h-full bg-gradient-to-r from-halo-green to-halo-blue rounded-full"
                  ></motion.div>
                </div>
              </div>
              
              <div className="border border-halo-gray-700 rounded-lg p-4 mt-4">
                <h4 className="text-lg font-medium mb-2">AI Insight</h4>
                <p className="text-sm text-halo-gray-300">
                  Your heart rate variability has improved by 12% this week. Continue your morning meditation practice for optimal stress management.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <BrainCircuit className="w-4 h-4 text-halo-blue" />
                  <span className="text-xs text-halo-gray-400">Generated by HALO AI — 2 hours ago</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIInsightsSection;