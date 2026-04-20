import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Minimize, User, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import roomImg from '../assets/room.png';
import { PortalContext } from '../context/PortalContext';

const Rooms = () => {
  const { rooms } = useContext(PortalContext);

  return (
    <section id="rooms" className="py-32 bg-primary overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block"
          >
            Exclusive Stays
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-white uppercase tracking-widest"
          >
            Available <span className="italic text-secondary font-sans normal-case tracking-normal font-light">Rooms</span>
          </motion.h2>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar gap-8 pb-12 snap-x snap-mandatory cursor-grab active:cursor-grabbing">
          {rooms.map((room, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className="min-w-[85vw] md:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.333%-1.33rem)] shrink-0 snap-center bg-surface rounded-sm overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(217,160,91,0.15)] transition-all duration-500 ease-in-out hover:-translate-y-2 group border border-white/5 relative"
            >
              <div className="absolute top-0 left-0 w-0 h-1 bg-secondary group-hover:w-full transition-all duration-700 ease-out z-10"></div>
              
              <div className="relative h-64 overflow-hidden border-b border-white/10">
                <img 
                  src={room.image || roomImg} 
                  alt={room.name}
                  className="w-full h-full object-cover transition-all duration-[2s] ease-in-out group-hover:scale-110 filter saturate-[.35] opacity-80 group-hover:saturate-100 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-md px-4 py-2 rounded-sm shadow-xl border border-white/10 flex items-center gap-2">
                  <span className="font-bold text-secondary text-sm tracking-wider">₹{room.price}</span>
                  <span className="text-[10px] text-text/40 font-bold uppercase tracking-widest">/ NIGHT</span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="text-[9px] text-text-muted uppercase tracking-[0.2em] font-bold mb-1">{room.type} Class</div>
                <h3 className="text-xl font-serif text-white mb-6 uppercase tracking-wider group-hover:text-secondary transition-colors truncate">{room.name}</h3>
                
                <div className="flex flex-col gap-3 text-[10px] font-bold text-text-muted uppercase tracking-widest mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <User size={12} className="text-secondary opacity-70" /> {room.capacity} GUESTS
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Minimize size={12} className="text-secondary opacity-70" /> {room.beds} BEDS
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border-t border-white/5 pt-3 mt-1">
                     <Shield size={12} className="text-secondary" /> <span className="text-secondary">Secured Access</span>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/5">
                  <Link to={`/room/${room.room_id}`} className="text-text font-bold text-[10px] tracking-widest uppercase flex items-center group-hover:text-secondary transition-colors gap-3 justify-between w-full">
                    <span>View Details</span>
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
