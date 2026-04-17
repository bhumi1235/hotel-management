import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, ChevronDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const BookingCard = () => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(2);
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/rooms`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative w-full max-w-6xl mx-auto z-40 px-6 lg:px-8"
    >
      <div className="glass-card border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-2xl p-6 md:p-8 flex flex-col md:flex-row gap-4 items-end shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-md">
        
        <div className="flex-1 w-full relative">
          <label className="block text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-3 ml-1">Check-in Date</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Calendar size={14} className="text-secondary" />
            </div>
            <DatePicker 
              selected={checkIn} 
              onChange={date => setCheckIn(date)} 
              selectsStart 
              startDate={checkIn} 
              endDate={checkOut} 
              minDate={new Date()}
              placeholderText="SELECT TIMEFRAME"
              className="w-full bg-[#121212] border border-white/5 focus:bg-black focus:border-secondary focus:ring-1 focus:ring-secondary/50 rounded-sm py-4 pl-12 pr-4 outline-none transition-all duration-300 font-bold text-xs uppercase tracking-widest text-white placeholder:text-text/30 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <label className="block text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-3 ml-1">Check-out Date</label>
          <div className="relative z-20">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Calendar size={14} className="text-secondary" />
            </div>
            <DatePicker 
              selected={checkOut} 
              onChange={date => setCheckOut(date)} 
              selectsEnd 
              startDate={checkIn} 
              endDate={checkOut} 
              minDate={checkIn || new Date()}
              placeholderText="SELECT TIMEFRAME"
              className="w-full bg-[#121212] border border-white/5 focus:bg-black focus:border-secondary focus:ring-1 focus:ring-secondary/50 rounded-sm py-4 pl-12 pr-4 outline-none transition-all duration-300 font-bold text-xs uppercase tracking-widest text-white placeholder:text-text/30 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <label className="block text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-3 ml-1">Guests / Rooms</label>
          <div className="relative z-10">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Users size={14} className="text-secondary" />
            </div>
            <select 
              value={guests} 
              onChange={(e) => setGuests(e.target.value)} 
              className="w-full bg-[#121212] border border-white/5 focus:bg-black focus:border-secondary focus:ring-1 ring-secondary/50 rounded-sm py-4 pl-12 pr-4 transition-all duration-300 font-bold text-xs uppercase tracking-widest text-white cursor-pointer appearance-none outline-none"
            >
              <option value={1} className="bg-[#121212]">01 GUEST - 01 ROOM</option>
              <option value={2} className="bg-[#121212]">02 GUESTS - 01 ROOM</option>
              <option value={3} className="bg-[#121212]">03 GUESTS - 02 ROOMS</option>
              <option value={4} className="bg-[#121212]">04 GUESTS - 02 ROOMS</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <ChevronDown size={14} className="text-secondary" />
            </div>
          </div>
        </div>

        <button onClick={handleBookNow} className="btn-primary w-full md:w-auto px-10 py-4 md:mb-0 shadow-[0_0_20px_rgba(217,160,91,0.2)] rounded-sm">
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

export default BookingCard;
