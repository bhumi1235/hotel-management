import React from 'react';
import { Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-text pt-24 pb-12 mt-auto relative border-t-2 border-secondary shadow-[0_-20px_60px_rgba(0,0,0,0.8)] z-50">
      
      {/* Decorative inner border line */}
      <div className="absolute top-2 left-4 right-4 h-px bg-white/5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-text/80">
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-serif text-white mb-6 uppercase tracking-[0.2em]">
              GRAND <span className="font-light italic text-secondary text-xl font-sans normal-case">Aura</span>
            </h2>
            <p className="text-sm leading-relaxed mb-6 font-medium">
              Confidential, high-tier hospitality. Experience the pinnacle of privacy and absolute control over your environment.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-white mb-8 border-b border-white/10 pb-4">Secure Links</h3>
            <ul className="space-y-4">
              {['Home', 'Private Suites', 'Confidential Dining', 'Support Team'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="hover:text-secondary transition-colors text-xs font-bold tracking-wider uppercase">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-white mb-8 border-b border-white/10 pb-4">Contact Info</h3>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
              <li className="flex items-start gap-4">
                <span className="text-secondary opacity-50">#</span>
                124 Prestige Way, Azure Coast
              </li>
              <li className="flex items-start gap-4">
                <span className="text-secondary opacity-50">#</span>
                +1 (800) ROYAL-AURA
              </li>
              <li className="flex items-start gap-4">
                <span className="text-secondary opacity-50">#</span>
                reservations@grandaura.com
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-white mb-8 border-b border-white/10 pb-4">Exclusive Emails</h3>
            <p className="text-xs space-y-4 mb-4 font-medium leading-relaxed">
              Subscribe to secure channels for exclusive booking updates.
            </p>
            <div className="flex items-center -ml-1 border border-white/10 rounded-sm bg-[#0a0a0a] overflow-hidden focus-within:border-secondary transition-colors">
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="w-full bg-transparent px-4 py-3 text-xs uppercase tracking-widest text-white placeholder:text-white/20 focus:outline-none"
              />
              <button className="bg-white/5 hover:bg-secondary hover:text-black transition-colors p-[13px] border-l border-white/10">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-text/40 font-bold">
             2026 Grand Aura Private Holdings
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-bold text-[10px] text-text/40 hover:text-secondary transition-colors uppercase tracking-widest">Facebook</a>
            <a href="#" className="font-bold text-[10px] text-text/40 hover:text-secondary transition-colors uppercase tracking-widest">Twitter</a>
            <a href="#" className="font-bold text-[10px] text-text/40 hover:text-secondary transition-colors uppercase tracking-widest">Instagram</a>
            <a href="#" className="font-bold text-[10px] text-text/40 hover:text-secondary transition-colors uppercase tracking-widest">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
