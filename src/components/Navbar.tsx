import React, { useState, useEffect } from 'react';
import { Menu, X, CircleUserRound } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'AI Insights', href: '#ai-insights' },
  { label: 'Community', href: '#community' },
  { label: 'Buy Now', href: '#buy-now' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glassmorphism py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto container-padding flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-halo-blue to-halo-green flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="text-white font-bold text-xl">HALO</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <a key={index} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="#account" className="nav-link flex items-center gap-2">
            <CircleUserRound size={20} />
            <span>Account</span>
          </a>
          <a href="#buy-now" className="button-primary">Buy Now</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glassmorphism mt-2 mx-4 py-4 rounded-xl">
          <nav className="flex flex-col">
            {navItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                className="nav-link px-6 py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#account" 
              className="nav-link px-6 py-3 flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <CircleUserRound size={20} />
              <span>Account</span>
            </a>
            <div className="px-6 pt-3">
              <a href="#buy-now" className="button-primary inline-block w-full text-center">
                Buy Now
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;