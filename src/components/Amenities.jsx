import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Coffee, Waves, Wifi, Shield, Tv } from 'lucide-react';

const Amenities = () => {
  const list = [
    { icon: <Waves />, title: "Infinity Pool", desc: "Regulated temperature overlooking the azure horizons." },
    { icon: <Coffee />, title: "Artisan Cafe", desc: "Hand-crafted delicacies by Michelin starters." },
    { icon: <Wind />, title: "Zen Wellness", desc: "A holistic sanctuary for your mind, body and soul." },
    { icon: <Wifi />, title: "Ultra Fast WiFi", desc: "Seamless connectivity across the entire estate." },
    { icon: <Shield />, title: "Elite Security", desc: "Discrete white-glove protection for esteemed guests." },
    { icon: <Tv />, title: "Private Cinema", desc: "Exclusive screening rooms with luxury seating." },
  ];

  return (
    <section id="wellness" className="py-32 bg-primary relative overflow-hidden">
      {/* Decorative Golden Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-24">
          <span className="text-accent uppercase tracking-[0.5em] text-[9px] font-bold mb-6 block">World Class Luxury</span>
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-text-main">Refined <span className="italic serif gold-text">Amenities</span></h2>
          <div className="w-16 h-[1px] bg-accent mx-auto"></div>
        </div>

        <div className="md:grid md:grid-cols-3 gap-6">
          {list.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white p-12 hover:-translate-y-2 transition-all duration-500 group relative border border-border/50 shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
            >
              {/* Subtle top border accent on hover */}
              <div className="absolute top-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-700 ease-out"></div>
              
              <div className="text-accent mb-8 group-hover:scale-110 transform origin-left transition-transform duration-500 bg-primary inline-flex p-4 rounded-full">
                {React.cloneElement(item.icon, { size: 28, strokeWidth: 1.5 })}
              </div>
              <h3 className="text-xl serif italic font-bold text-text-main mb-4 tracking-wide">{item.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
