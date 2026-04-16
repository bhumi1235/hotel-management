import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Minimize, User, Coffee, Shield } from 'lucide-react';
import roomImg from '../assets/room.png';

const Rooms = () => {
  const rooms = [
    {
      title: "Alpha Blackout Suite",
      price: "$2,500",
      image: roomImg,
      features: ["2500 sqft", "4 Agents", "Encrypted Line"]
    },
    {
      title: "Ocean Sector Reserve",
      price: "$1,200",
      image: roomImg,
      features: ["1200 sqft", "2 Agents", "Private Extraction"]
    },
    {
      title: "Ghost Sanctuary",
      price: "$850",
      image: roomImg,
      features: ["900 sqft", "2 Agents", "Radar Evading"]
    }
  ];

  return (
    <section id="rooms" className="py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block"
          >
            Classified Zones
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-white uppercase tracking-widest"
          >
            Secured <span className="italic text-secondary font-sans normal-case tracking-normal font-light">Habitats</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-surface rounded-sm overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(217,160,91,0.15)] transition-all duration-500 ease-in-out hover:-translate-y-2 group cursor-pointer border border-white/5 relative"
            >
              <div className="absolute top-0 left-0 w-0 h-1 bg-secondary group-hover:w-full transition-all duration-700 ease-out z-10"></div>
              
              <div className="relative h-64 overflow-hidden border-b border-white/10">
                <img 
                  src={room.image} 
                  alt={room.title}
                  className="w-full h-full object-cover transition-all duration-[2s] ease-in-out group-hover:scale-110 filter grayscale mix-blend-luminosity group-hover:grayscale-[50%] opacity-80"
                />
                <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-md px-4 py-2 rounded-sm shadow-xl border border-white/10 flex items-center gap-2">
                  <span className="font-bold text-secondary text-sm tracking-wider">{room.price}</span>
                  <span className="text-[10px] text-text/40 font-bold uppercase tracking-widest">/ OP</span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-serif text-white mb-6 uppercase tracking-wider group-hover:text-secondary transition-colors">{room.title}</h3>
                
                <div className="flex flex-col gap-3 text-[10px] font-bold text-text-muted uppercase tracking-widest mb-8">
                  <div className="flex items-center gap-3">
                    <Minimize size={12} className="text-secondary opacity-70" /> {room.features[0]}
                  </div>
                  <div className="flex items-center gap-3">
                    <User size={12} className="text-secondary opacity-70" /> {room.features[1]}
                  </div>
                  <div className="flex items-center gap-3 border-t border-white/5 pt-3 mt-1">
                     <Shield size={12} className="text-secondary" /> <span className="text-secondary">{room.features[2]}</span>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/5">
                  <button className="text-text font-bold text-[10px] tracking-widest uppercase flex items-center group-hover:text-secondary transition-colors gap-3 justify-between w-full">
                    <span>Access Schematics</span>
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
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
