// Force HMR refresh
import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PortalContext } from '../context/PortalContext';

const Navbar = ({ onOpenAuth }) => {
  const { currentUser, logout } = useContext(PortalContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled || location.pathname !== '/'
          ? 'bg-[#050505]/95 backdrop-blur-xl shadow-2xl border-white/10 py-5' 
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="cursor-pointer flex items-center gap-4">
          <div className="w-2 h-2 bg-secondary animate-pulse rounded-full hidden md:block"></div>
          <span className={`text-xl font-serif font-bold tracking-[0.3em] uppercase ${isScrolled || location.pathname !== '/' ? 'text-white' : 'text-white drop-shadow-md'}`}>
            GRAND <span className={`font-sans font-light italic normal-case tracking-normal ${isScrolled || location.pathname !== '/' ? 'text-secondary' : 'text-secondary'}`}>Aura</span>
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <Link 
              key={link.name} 
              to={link.href}
              className={`nav-link text-[10px] font-bold tracking-[0.2em] uppercase ${isScrolled || location.pathname !== '/' ? 'text-text/70' : 'text-white/80'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-8">
          {currentUser ? (
            <>
              <Link 
                to="/customer/dashboard"
                className={`font-bold text-[10px] tracking-[0.2em] uppercase transition-colors flex items-center gap-2 ${isScrolled || location.pathname !== '/' ? 'text-secondary hover:text-white' : 'text-white hover:text-secondary'}`}
              >
                Dashboard
              </Link>
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className={`font-bold text-[10px] tracking-[0.2em] uppercase transition-colors flex items-center gap-2 ${isScrolled || location.pathname !== '/' ? 'text-white/50 hover:text-red-500' : 'text-white/70 hover:text-red-400'}`}
              >
                Log Out
              </button>
            </>
          ) : (
            <button 
              onClick={onOpenAuth}
              className={`font-bold text-[10px] tracking-[0.2em] uppercase transition-colors flex items-center gap-2 ${isScrolled || location.pathname !== '/' ? 'text-secondary hover:text-white' : 'text-white hover:text-secondary'}`}
            >
              Log In / Sign Up
            </button>
          )}
          <Link to="/rooms" className="block text-center bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white/20 transition-all duration-300 px-6 py-3 text-[10px] uppercase font-bold tracking-widest rounded-sm">
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2 text-white hover:text-secondary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <Link 
                key={link.name} 
                to={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-widest text-text/80 hover:text-secondary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-white/10" />
            {currentUser ? (
              <>
                <Link to="/customer/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-sm font-bold uppercase tracking-widest text-secondary hover:text-white w-full">
                  Dashboard
                </Link>
                <button onClick={() => { setIsMobileMenuOpen(false); logout(); navigate('/'); }} className="text-left text-sm font-bold uppercase tracking-widest text-white/50 hover:text-red-500 w-full">
                  Log Out
                </button>
              </>
            ) : (
              <button onClick={() => { setIsMobileMenuOpen(false); onOpenAuth(); }} className="text-left text-sm font-bold uppercase tracking-widest text-secondary hover:text-white w-full">
                Log In / Sign Up
              </button>
            )}
            <Link to="/rooms" onClick={() => setIsMobileMenuOpen(false)} className="block text-center bg-white text-black border border-white transition-all duration-300 px-6 py-4 text-[10px] uppercase font-bold tracking-widest rounded-sm w-full mt-2">
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
