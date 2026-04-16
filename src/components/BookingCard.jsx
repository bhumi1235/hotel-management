import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, ChevronDown } from 'lucide-react';

const BookingCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="absolute -bottom-16 left-0 right-0 z-40 px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto glass-card border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-2xl p-6 md:p-8 flex flex-col md:flex-row gap-4 items-end shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-md">
        
        <div className="flex-1 w-full relative">
          <label className="block text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-3 ml-1">Arrival Coordinates</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Calendar size={14} className="text-secondary" />
            </div>
            <input 
              type="text" 
              placeholder="SELECT TIMEFRAME" 
              className="w-full bg-[#121212] border border-white/5 focus:bg-black focus:border-secondary focus:ring-1 focus:ring-secondary/50 rounded-sm py-4 pl-12 pr-4 outline-none transition-all duration-300 font-bold text-xs uppercase tracking-widest text-text placeholder:text-text/30 cursor-pointer"
              readOnly
            />
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <label className="block text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-3 ml-1">Departure Sequence</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Calendar size={14} className="text-secondary" />
            </div>
            <input 
              type="text" 
              placeholder="SELECT TIMEFRAME" 
              className="w-full bg-[#121212] border border-white/5 focus:bg-black focus:border-secondary focus:ring-1 focus:ring-secondary/50 rounded-sm py-4 pl-12 pr-4 outline-none transition-all duration-300 font-bold text-xs uppercase tracking-widest text-text placeholder:text-text/30 cursor-pointer"
              readOnly
            />
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <label className="block text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-3 ml-1">Personnel / Sectors</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Users size={14} className="text-secondary" />
            </div>
            <div className="w-full bg-[#121212] border border-white/5 focus-within:bg-black focus-within:border-secondary focus-within:ring-1 ring-secondary/50 rounded-sm py-4 pl-12 pr-4 transition-all duration-300 font-bold text-xs uppercase tracking-widest text-text cursor-pointer flex justify-between items-center">
              <span>02 AGENTS - 01 SUITE</span>
              <ChevronDown size={14} className="text-secondary" />
            </div>
          </div>
        </div>

        <button className="btn-primary w-full md:w-auto px-10 py-4 md:mb-0 shadow-[0_0_20px_rgba(217,160,91,0.2)] rounded-sm">
          Run Query
        </button>
      </div>
    </motion.div>
  );
};

export default BookingCard;
