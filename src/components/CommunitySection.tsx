import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, MessageSquare, Bell, Download } from 'lucide-react';

const CommunitySection: React.FC = () => {
  const [showAppNotification, setShowAppNotification] = useState(true);
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="community" className="relative py-32 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00e5ff]/10 via-transparent to-transparent opacity-20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBlNWZmIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10" />
      </div>

      <div className="container mx-auto px-6 relative">
        {showAppNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-6 rounded-2xl bg-white/5 backdrop-blur-[15px] border border-[#00e5ff]/30 shadow-[0_0_30px_rgba(0,229,255,0.1)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Bell className="w-6 h-6 text-[#00e5ff] animate-pulse" />
                <p className="text-white">
                  Download the HALO App to unlock full features and real-time health monitoring
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  className="px-6 py-2 bg-[#00e5ff]/20 hover:bg-[#00e5ff]/30 text-[#00e5ff] rounded-xl transition-all duration-300 flex items-center gap-2 group"
                  onClick={() => alert('App download coming soon!')}
                >
                  <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Download App</span>
                </button>
                <button 
                  className="text-white/60 hover:text-white transition-colors"
                  onClick={() => setShowAppNotification(false)}
                >
                  ×
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Join Our <span className="text-[#00e5ff]">Community</span>
          </h2>
          <p className="text-[#c0c0c0] max-w-2xl mx-auto text-lg">
            Connect with other HALO users, share experiences, and get support from our growing community.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
                <MessageSquare className="w-5 h-5 text-[#00e5ff]" />
                <span>Recent Discussions</span>
              </h3>
              <button 
                className="px-6 py-3 bg-[#00e5ff]/20 hover:bg-[#00e5ff]/30 text-[#00e5ff] rounded-xl transition-all duration-300 text-sm hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                onClick={() => alert('Sign in to start a discussion')}
              >
                Start a New Topic
              </button>
            </div>
            
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-[15px] border border-[#00e5ff]/30 shadow-[0_0_30px_rgba(0,229,255,0.1)]">
              <p className="text-center text-[#c0c0c0]">
                Be the first to start a discussion in our community!
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-[15px] border border-[#00e5ff]/30 shadow-[0_0_30px_rgba(0,229,255,0.1)]">
              <h3 className="text-xl font-semibold mb-8 flex items-center gap-2 text-white">
                <Users className="w-5 h-5 text-[#00e5ff]" />
                <span>Community Stats</span>
              </h3>
              
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-[#c0c0c0]">Active Members</span>
                  <span className="text-2xl font-semibold text-white">0</span>
                </div>
                
                <div className="h-px bg-white/10"></div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[#c0c0c0]">Topics Created</span>
                  <span className="text-2xl font-semibold text-white">0</span>
                </div>
                
                <div className="h-px bg-white/10"></div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[#c0c0c0]">Posts This Week</span>
                  <span className="text-2xl font-semibold text-white">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;