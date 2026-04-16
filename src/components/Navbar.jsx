import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ onOpenAuth }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Headquarters', href: '#' },
    { name: 'Sectors', href: '#rooms' },
    { name: 'Briefings', href: '#experiences' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled 
          ? 'bg-[#050505]/95 backdrop-blur-xl shadow-2xl border-white/10 py-5' 
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="cursor-pointer flex items-center gap-4"
        >
          <div className="w-2 h-2 bg-secondary animate-pulse rounded-full hidden md:block"></div>
          <span className={`text-xl font-serif font-bold tracking-[0.3em] uppercase ${isScrolled ? 'text-white' : 'text-white drop-shadow-md'}`}>
            GRAND <span className={`font-sans font-light italic normal-case tracking-normal ${isScrolled ? 'text-secondary' : 'text-secondary'}`}>Aura</span>
          </span>
        </motion.div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <motion.a 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={link.name} 
              href={link.href}
              className={`nav-link text-[10px] font-bold tracking-[0.2em] ${isScrolled ? 'text-text/70' : 'text-white/80'}`}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Right CTA */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-8"
        >
          <button 
            onClick={onOpenAuth}
            className={`font-bold text-[10px] tracking-[0.2em] uppercase transition-colors flex items-center gap-2 ${isScrolled ? 'text-secondary hover:text-white' : 'text-white hover:text-secondary'}`}
          >
            Terminal Access
          </button>
          <button className="bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white/20 transition-all duration-300 px-6 py-3 text-[10px] uppercase font-bold tracking-widest rounded-sm">
            Execute Order
          </button>
        </motion.div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2 text-white hover:text-secondary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#050505] border-b border-secondary shadow-2xl md:hidden">
          <div className="flex flex-col p-6 gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-bold uppercase tracking-widest text-text/80 hover:text-secondary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <hr className="border-white/10" />
            <button onClick={onOpenAuth} className="text-left text-sm font-bold uppercase tracking-widest text-secondary hover:text-white w-full">
              Terminal Access
            </button>
            <button className="bg-white text-black border border-white transition-all duration-300 px-6 py-4 text-[10px] uppercase font-bold tracking-widest rounded-sm w-full mt-2">
              Execute Order
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
