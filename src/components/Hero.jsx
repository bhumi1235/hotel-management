import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';
import BookingCard from './BookingCard';
import heroImg from '../assets/hero.png';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <div className="relative min-h-[95vh] pb-32 pt-28 bg-primary overflow-hidden flex items-center border-b border-white/5">
      
      {/* Tactical Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/80 to-primary pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full mt-10 md:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Text & CTAs */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start max-w-xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-text/50 font-bold tracking-[0.3em] uppercase text-[9px] border border-white/10 px-3 py-1 rounded bg-black">
                Clearance Level: Alpha
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-6 uppercase tracking-widest">
              Absolute <br />
              <span className="italic font-sans text-secondary capitalize font-light tracking-normal">Discretion.</span>
            </h1>
            <p className="text-text/50 text-sm leading-relaxed mb-10 font-bold uppercase tracking-wider max-w-md">
              A private enclave of unparalleled stealth. Delve into breathtaking horizons and uncompromising black-tie service.
            </p>
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              <button className="btn-primary w-full md:w-auto">Request Clearance</button>
              <button className="btn-outline w-full md:w-auto">View Briefing</button>
            </div>
          </motion.div>

          {/* RIGHT: Floating UI Layering */}
          <div className="relative h-[600px] hidden md:block">
            {/* Main Hotel Image */}
            <motion.div 
              style={{ y: y1 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-10 right-0 w-[450px] h-[550px] rounded-sm overflow-hidden shadow-[0_0_80px_rgba(0,0,0,1)] border border-white/10 filter grayscale mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal transition-all duration-1000"
            >
              <img src={heroImg} alt="Luxury Resort" className="w-full h-full object-cover" />
            </motion.div>

            {/* Small Floating Review Card */}
            <motion.div 
              style={{ y: y2 }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute top-32 right-[360px] glass-card p-5 w-64 border-l-2 border-l-secondary z-20 bg-[#050505]/90 backdrop-blur-2xl"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className="fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-text leading-relaxed mb-4">
                "Complete blackout. The extraction code was instantaneous."
              </p>
              <div className="text-[9px] uppercase tracking-[0.2em] text-text/40 font-bold">
                — ANONYMOUS ASSET
              </div>
            </motion.div>

            {/* Small Floating Available Rooms */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-20 right-10 z-20 glass-card bg-black/90 p-4 flex items-center gap-5 border border-white/10 rounded-sm"
            >
               <div className="w-12 h-12 rounded-sm bg-surface border border-white/5 flex items-center justify-center shadow-inner">
                 <span className="text-white font-serif font-bold text-lg">2</span>
               </div>
               <div>
                 <p className="text-xs font-bold uppercase tracking-widest text-secondary">Vacancies</p>
                 <p className="text-[10px] text-text/50 font-bold uppercase tracking-widest">Global Network</p>
               </div>
            </motion.div>
          </div>
        </div>
      </div>

      <BookingCard />
    </div>
  );
};

export default Hero;
