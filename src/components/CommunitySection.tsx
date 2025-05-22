import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, MessageSquare, Heart, MessageCircleMore, Download, Bell, Database } from 'lucide-react';
import { ForumPost } from '../types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase client
const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || ''
);

const CommunitySection: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [topicCount, setTopicCount] = useState(0);
  const [weeklyPosts, setWeeklyPosts] = useState(0);
  const [showAppNotification, setShowAppNotification] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!supabaseUrl || !supabaseKey) {
      setError('Please connect to Supabase using the "Connect to Supabase" button in the top right corner.');
      setIsLoading(false);
      return;
    }
    fetchPosts();
    fetchStats();
  }, [supabaseUrl, supabaseKey]);

  const fetchPosts = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*, user:users(*)')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data: users } = await supabase
        .from('users')
        .select('count');
      setUserCount(users?.[0]?.count || 0);

      const { data: topics } = await supabase
        .from('posts')
        .select('count');
      setTopicCount(topics?.[0]?.count || 0);

      const { data: weekly } = await supabase
        .from('posts')
        .select('count')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
      setWeeklyPosts(weekly?.[0]?.count || 0);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };
  
  const renderErrorState = () => (
    <div className="glassmorphism p-8 text-center">
      <Database className="w-12 h-12 text-accent-error mx-auto mb-4" />
      <h4 className="text-xl font-semibold mb-2">Connection Error</h4>
      <p className="text-halo-gray-300 mb-4">{error}</p>
      {(!supabaseUrl || !supabaseKey) ? (
        <p className="text-sm text-halo-gray-400">
          Once connected, this section will display community discussions and statistics.
        </p>
      ) : (
        <button 
          className="button-primary"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      )}
    </div>
  );

  return (
    <section id="community" className="section-spacing">
      <div className="container mx-auto container-padding">
        {showAppNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 glassmorphism flex items-center justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-halo-blue via-halo-green to-halo-blue animate-pulse"></div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-halo-green animate-pulse" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
              </div>
              <p className="text-white">
                Download the HALO App to unlock full features and real-time health monitoring
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                className="button-primary flex items-center gap-2 animate-pulse"
                onClick={() => alert('App download coming soon!')}
              >
                <Download className="w-5 h-5" />
                <span>Download App</span>
              </button>
              <button 
                className="text-halo-gray-400 hover:text-white"
                onClick={() => setShowAppNotification(false)}
              >
                ×
              </button>
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
              <button 
                className="button-secondary py-2 text-sm"
                onClick={() => alert('Sign in to start a discussion')}
              >
                Start a New Topic
              </button>
            </div>
            
            <div className="space-y-6">
              {error ? (
                renderErrorState()
              ) : isLoading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-halo-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-halo-gray-300">Loading discussions...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="glassmorphism p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-halo-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">No Discussions Yet</h4>
                  <p className="text-halo-gray-300 mb-4">
                    Be the first to start a discussion in our community!
                  </p>
                  <button 
                    className="button-primary"
                    onClick={() => alert('Sign in to start a discussion')}
                  >
                    Start Discussion
                  </button>
                </div>
              ) : (
                posts.map((post, index) => (
                  <ForumPostCard key={post.id} post={post} index={index} />
                ))
              )}
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
                  <span className="text-xl font-semibold">{userCount}</span>
                </div>
                
                <div className="h-px bg-halo-gray-700"></div>
                
                <div className="flex justify-between items-center">
                  <span className="text-halo-gray-300">Topics Created</span>
                  <span className="text-xl font-semibold">{topicCount}</span>
                </div>
                
                <div className="h-px bg-halo-gray-700"></div>
                
                <div className="flex justify-between items-center">
                  <span className="text-halo-gray-300">Posts This Week</span>
                  <span className="text-xl font-semibold">{weeklyPosts}</span>
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
          src={post.user.avatar_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} 
          alt={post.user.name} 
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">{post.user.name}</span>
            <span className="text-xs text-halo-gray-400">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-halo-gray-300 mb-4">{post.content}</p>
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