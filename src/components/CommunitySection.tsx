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
  const [retryCount, setRetryCount] = useState(0);

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const MAX_RETRIES = 3;
  const RETRY_DELAY = 5000; // 5 seconds

  useEffect(() => {
    const checkSupabaseConnection = async () => {
      if (!supabaseUrl || !supabaseKey) {
        setError('Please connect to Supabase using the "Connect to Supabase" button in the top right corner.');
        setIsLoading(false);
        return false;
      }

      if (!navigator.onLine) {
        setError('You are currently offline. Please check your internet connection and try again.');
        setIsLoading(false);
        return false;
      }

      try {
        const { data, error: testError } = await supabase
          .from('posts')
          .select('count')
          .limit(1)
          .single();

        if (testError) {
          if (testError.code === 'PGRST301') {
            setError('Database tables not found. Please ensure your Supabase project is properly initialized.');
          } else if (testError.code === '401') {
            setError('Invalid Supabase credentials. Please check your connection settings.');
          } else {
            setError(`Unable to connect to Supabase: ${testError.message}`);
          }
          setIsLoading(false);
          return false;
        }

        return true;
      } catch (err) {
        console.error('Supabase connection test failed:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(`Connection failed: ${errorMessage}. Please verify your internet connection and Supabase configuration.`);
        setIsLoading(false);
        return false;
      }
    };

    const initializeData = async () => {
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) return;

      try {
        await Promise.all([fetchPosts(), fetchStats()]);
        setError(null);
      } catch (err) {
        console.error('Error initializing data:', err);
        if (retryCount < MAX_RETRIES) {
          console.log(`Retrying in ${RETRY_DELAY/1000} seconds... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            initializeData();
          }, RETRY_DELAY);
        } else {
          setError('Unable to load data after multiple attempts. Please try again later.');
          setIsLoading(false);
        }
      }
    };

    initializeData();
  }, [retryCount]);

  const fetchPosts = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*, user:users(*)')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      throw new Error('Unable to load posts. Please try again later.');
    }
  };

  const fetchStats = async () => {
    try {
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      
      const [usersResult, topicsResult, weeklyResult] = await Promise.all([
        supabase.from('users').select('count'),
        supabase.from('posts').select('count'),
        supabase.from('posts')
          .select('count')
          .gte('created_at', oneWeekAgo)
      ]);

      if (usersResult.error) throw usersResult.error;
      if (topicsResult.error) throw topicsResult.error;
      if (weeklyResult.error) throw weeklyResult.error;

      setUserCount(usersResult.data?.[0]?.count || 0);
      setTopicCount(topicsResult.data?.[0]?.count || 0);
      setWeeklyPosts(weeklyResult.data?.[0]?.count || 0);
    } catch (err) {
      console.error('Error fetching stats:', err);
      throw new Error('Unable to load community statistics. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderErrorState = () => (
    <div className="glassmorphism p-8 text-center bg-gradient-to-br from-purple-900/50 to-indigo-900/50">
      <Database className="w-12 h-12 text-purple-400 mx-auto mb-4" />
      <h4 className="text-xl font-semibold mb-2 text-white">Connection Error</h4>
      <p className="text-purple-200 mb-4">{error}</p>
      {(!supabaseUrl || !supabaseKey) ? (
        <p className="text-sm text-purple-300">
          Once connected, this section will display community discussions and statistics.
        </p>
      ) : (
        <button 
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          onClick={() => {
            setRetryCount(0);
            setIsLoading(true);
            setError(null);
          }}
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
            className="mb-8 p-4 glassmorphism bg-gradient-to-r from-purple-900/30 to-indigo-900/30 flex items-center justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 animate-pulse"></div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-purple-400 animate-pulse" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
              </div>
              <p className="text-white">
                Download the HALO App to unlock full features and real-time health monitoring
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2 animate-pulse"
                onClick={() => alert('App download coming soon!')}
              >
                <Download className="w-5 h-5" />
                <span>Download App</span>
              </button>
              <button 
                className="text-purple-300 hover:text-white"
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
          <h2 className="heading-2 mb-4">Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Community</span></h2>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Connect with other HALO users, share experiences, and get support from our growing community.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                <span>Recent Discussions</span>
              </h3>
              <button 
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
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
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-purple-200">Loading discussions...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="glassmorphism p-8 text-center bg-gradient-to-br from-purple-900/50 to-indigo-900/50">
                  <MessageSquare className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2 text-white">No Discussions Yet</h4>
                  <p className="text-purple-200 mb-4">
                    Be the first to start a discussion in our community!
                  </p>
                  <button 
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
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
            <div className="glassmorphism p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                <Users className="w-5 h-5 text-purple-400" />
                <span>Community Stats</span>
              </h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-purple-200">Active Members</span>
                  <span className="text-xl font-semibold text-white">{userCount}</span>
                </div>
                
                <div className="h-px bg-purple-800"></div>
                
                <div className="flex justify-between items-center">
                  <span className="text-purple-200">Topics Created</span>
                  <span className="text-xl font-semibold text-white">{topicCount}</span>
                </div>
                
                <div className="h-px bg-purple-800"></div>
                
                <div className="flex justify-between items-center">
                  <span className="text-purple-200">Posts This Week</span>
                  <span className="text-xl font-semibold text-white">{weeklyPosts}</span>
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
      className="glassmorphism p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30"
    >
      <div className="flex items-start gap-4">
        <img 
          src={post.user.avatar_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} 
          alt={post.user.name} 
          className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-white">{post.user.name}</span>
            <span className="text-xs text-purple-300">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-purple-200 mb-4">{post.content}</p>
          <div className="flex gap-4">
            <button className="flex items-center gap-1 text-sm text-purple-300 hover:text-white transition-colors">
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-purple-300 hover:text-white transition-colors">
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