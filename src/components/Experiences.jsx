import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';

const Experiences = () => {
  const experiences = [
    { title: "Private Spa", desc: "Absolute privacy and world-class relaxation treatments.", img: heroImg },
    { title: "Fine Dining", desc: "Michelin-grade culinary experiences delivered to you.", img: heroImg },
    { title: "Infinity Pool", desc: "Breathtaking ocean views from our temperature regulated pools.", img: heroImg },
    { title: "Event Halls", desc: "Secure environments for summits and private gatherings.", img: heroImg }
  ];

  return (
    <section id="experiences" className="py-32 bg-primary overflow-hidden border-t border-white/5 relative z-10 shadow-[0_-30px_50px_rgba(0,0,0,0.5)]">
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-xl">
             <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-text/40 font-bold tracking-[0.4em] uppercase text-[9px] mb-4 block border border-white/10 inline-block px-3 py-1 bg-black rounded"
            >
              Amenities
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif text-white uppercase tracking-widest"
            >
              Premium <span className="italic text-secondary font-sans normal-case tracking-normal font-light">Experiences</span>
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/rooms" className="text-center block btn-outline">
              Book Now
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="w-full flex overflow-x-auto hide-scrollbar snap-x snap-mandatory py-8 px-6 lg:px-8 max-w-[1400px] mx-auto gap-8 relative z-10">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex-none w-[85vw] sm:w-[400px] aspect-[4/5] relative rounded-sm overflow-hidden snap-center group cursor-pointer border border-white/10"
          >
            <img 
              src={exp.img} 
              alt={exp.title} 
              className="absolute inset-0 w-full h-full object-cover transition-all duration-[3s] ease-out group-hover:scale-110 group-hover:rotate-1 filter saturate-[.35] opacity-60 group-hover:saturate-100 group-hover:opacity-100"
            />
            
            {/* Severe stealth gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-300"></div>
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end border border-white/0 group-hover:border-secondary/20 transition-colors">
               <div className="transform transition-transform duration-500 ease-out translate-y-4 group-hover:translate-y-0">
                  <div className="text-[9px] uppercase tracking-widest text-secondary font-bold mb-3 opactiy-0 group-hover:opacity-100 transition-opacity">Amenity {i+1}</div>
                  <h3 className="text-2xl font-serif text-white mb-2 uppercase tracking-wide">{exp.title}</h3>
                  <p className="text-text/50 font-bold uppercase tracking-wider text-[10px] leading-relaxed mb-6">{exp.desc}</p>
                  <div className="w-12 h-1 bg-white/20 rounded-sm group-hover:w-24 group-hover:bg-secondary transition-all duration-500"></div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experiences;
