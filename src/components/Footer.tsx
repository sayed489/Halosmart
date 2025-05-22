import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin, Send } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-halo-dark pt-16 pb-8">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <a href="#home" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-halo-blue to-halo-green flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-white font-bold text-xl">HALO</span>
            </a>
            <p className="text-halo-gray-400 mb-6">
              Next-generation AI-powered smart ring for continuous health monitoring and insights.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full glassmorphism flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full glassmorphism flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full glassmorphism flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full glassmorphism flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-halo-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#features" className="text-halo-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#tech-specs" className="text-halo-gray-400 hover:text-white transition-colors">Tech Specs</a></li>
              <li><a href="#ai-insights" className="text-halo-gray-400 hover:text-white transition-colors">AI Insights</a></li>
              <li><a href="#community" className="text-halo-gray-400 hover:text-white transition-colors">Community</a></li>
              <li><a href="#buy-now" className="text-halo-gray-400 hover:text-white transition-colors">Buy Now</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-halo-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-halo-gray-400 hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-halo-gray-400 hover:text-white transition-colors">Warranty</a></li>
              <li><a href="#" className="text-halo-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-halo-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-halo-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Stay Updated</h3>
            <p className="text-halo-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="py-2 px-4 bg-halo-gray-800 border border-halo-gray-700 rounded-l-lg focus:outline-none focus:border-halo-blue flex-1"
              />
              <button className="py-2 px-4 bg-gradient-to-r from-halo-blue to-halo-green rounded-r-lg">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-halo-gray-800 pt-8 text-center text-halo-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} HALO Smart Ring. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;