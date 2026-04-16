import React, { useState } from 'react';
import { motion, useScroll } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Rooms from './components/Rooms';
import Experiences from './components/Experiences';
import Footer from './components/Footer';
import AuthCard from './components/AuthCard';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-[#050505] text-text flex flex-col relative w-full">
      {/* Scroll Progress Indicator - Stealth Amber */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-secondary origin-left z-[60] shadow-[0_0_10px_rgba(217,160,91,0.5)]"
        style={{ scaleX: scrollYProgress }}
      />

      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
      
      <main className="flex-grow flex flex-col w-full relative">
        <Hero />
        
        {/* Animated stats banner / Threat Board */}
        <div className="bg-black text-white py-12 relative z-30 shadow-[0_30px_50px_rgba(0,0,0,0.8)] border-y border-white/5 hidden md:block">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-4 gap-8 divide-x divide-white/10">
            <div className="text-center">
               <h4 className="text-4xl font-serif text-white mb-2">500+</h4>
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-secondary">Secured Assets</p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl font-serif text-white mb-2">3</h4>
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-secondary">Michelin Stars</p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl font-serif text-white mb-2">40k</h4>
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-secondary">Extracted VIPs</p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl font-serif text-white mb-2">24/7</h4>
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-secondary">Global Command</p>
            </div>
          </div>
        </div>

        <div className="w-full relative z-10 bg-primary">
           <Rooms />
        </div>
        <div className="w-full relative z-10 bg-primary">
           <Experiences />
        </div>
      </main>

      <Footer />

      <AuthCard 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
    </div>
  );
}

export default App;
