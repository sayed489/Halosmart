import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, MessageSquare, Heart, MessageCircleMore } from 'lucide-react';
import { ForumPost } from '../types';

const forumPosts: ForumPost[] = [
  {
    id: 1,
    user: {
      name: 'Alex Johnson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    content: 'Just got my HALO ring today in the blue color. The build quality is exceptional, and the app setup was a breeze. Already tracking my heart rate patterns!',
    date: '2 hours ago',
    likes: 24,
    replies: 5,
  },
  {
    id: 2,
    user: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    content: 'Has anyone figured out how to optimize battery life? I\'m getting about 5 days, but I\'ve heard others are stretching to 7 days with some settings adjustments.',
    date: '5 hours ago',
    likes: 18,
    replies: 12,
  },
  {
    id: 3,
    user: {
      name: 'Michael Rivera',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    content: 'The stress detection feature has been eye-opening. I never realized how much my afternoon meetings were affecting my stress levels until HALO started showing the patterns.',
    date: '1 day ago',
    likes: 36,
    replies: 8,
  },
];

const CommunitySection: React.FC = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <section id="community" className="section-spacing">
      <div className="container mx-auto container-padding">
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Join Our <span className="gradient-text">Community</span></h2>
          <p className="text-halo-gray-300 max-w-2xl mx-auto">
            Connect with other HALO users, share experiences, and get support from our growing community.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span>Recent Discussions</span>
              </h3>
              <button className="button-secondary py-2 text-sm">Start a New Topic</button>
            </div>
            
            <div className="space-y-6">
              {forumPosts.map((post, index) => (
                <ForumPostCard key={post.id} post={post} index={index} />
              ))}
            </div>
            
            <div className="text-center mt-8">
              <button className="button-secondary">View All Discussions</button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="glassmorphism p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Community Stats</span>
              </h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-halo-gray-300">Active Members</span>
                  <span className="text-xl font-semibold">12,458</span>
                </div>
                
                <div className="h-px bg-halo-gray-700"></div>
                
                <div className="flex justify-between items-center">
                  <span className="text-halo-gray-300">Topics Created</span>
                  <span className="text-xl font-semibold">3,872</span>
                </div>
                
                <div className="h-px bg-halo-gray-700"></div>
                
                <div className="flex justify-between items-center">
                  <span className="text-halo-gray-300">Posts This Week</span>
                  <span className="text-xl font-semibold">684</span>
                </div>
              </div>
              
              <div className="mt-8 space-y-6">
                <h4 className="font-medium">Top Contributors</h4>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="User avatar" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>Emma Watson</span>
                  </div>
                  <span className="text-halo-gray-400">124 posts</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="User avatar" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>David Kim</span>
                  </div>
                  <span className="text-halo-gray-400">98 posts</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="User avatar" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>Sophia Martinez</span>
                  </div>
                  <span className="text-halo-gray-400">87 posts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ForumPostCard: React.FC<{ post: ForumPost; index: number }> = ({ post, index }) => {
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
      className="glassmorphism p-6 rounded-2xl"
    >
      <div className="flex items-start gap-4">
        <img 
          src={post.user.avatar} 
          alt={post.user.name} 
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">{post.user.name}</span>
            <span className="text-xs text-halo-gray-400">{post.date}</span>
          </div>
          <p className="text-sm text-halo-gray-300 mb-4">
            {post.content}
          </p>
          <div className="flex gap-4">
            <button className="flex items-center gap-1 text-sm text-halo-gray-400 hover:text-white transition-colors">
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-halo-gray-400 hover:text-white transition-colors">
              <MessageCircleMore className="w-4 h-4" />
              <span>{post.replies}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunitySection;