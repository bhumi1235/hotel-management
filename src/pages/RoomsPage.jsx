// Force HMR refresh
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PortalContext } from '../context/PortalContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import roomImg from '../assets/room.png';

const RoomsPage = () => {
  const { rooms } = useContext(PortalContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [filterType, setFilterType] = useState('All');
  const [maxPrice, setMaxPrice] = useState(500000);
  const [minGuests, setMinGuests] = useState(1);
  const [minBeds, setMinBeds] = useState(1);

  const filtered = rooms.filter(r => 
    r.availability && 
    (filterType === 'All' || r.type === filterType) && 
    r.price <= maxPrice &&
    r.capacity >= minGuests &&
    (r.beds ? r.beds >= minBeds : true)
  );

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col text-text font-sans">
      <Navbar onOpenAuth={() => {}} />
      <div className="flex-grow max-w-[1440px] mx-auto px-6 pt-32 pb-20 w-full flex flex-col">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-light-graphite pb-8 gap-6 border-white/10">
          <div>
            <span className="text-secondary font-bold tracking-[0.3em] uppercase text-[10px] mb-2 block">Find Your Stay</span>
            <h1 className="text-4xl font-serif text-white uppercase tracking-widest">Available Rooms</h1>
          </div>
          
          <div className="flex overflow-x-auto hide-scrollbar gap-2 items-center bg-[#121212] p-2 border border-white/5 rounded-sm">
            <div className="flex items-center gap-3 px-4 border-r border-white/5 whitespace-nowrap">
              <SlidersHorizontal size={14} className="text-secondary" />
              <select className="bg-transparent text-xs text-white uppercase tracking-widest font-bold outline-none cursor-pointer py-2" onChange={e => setFilterType(e.target.value)}>
                <option className="bg-[#121212]" value="All">All Types</option>
                <option className="bg-[#121212]" value="Suite">Suite</option>
                <option className="bg-[#121212]" value="Reserve">Reserve</option>
                <option className="bg-[#121212]" value="Sanctuary">Sanctuary</option>
              </select>
            </div>
            
            <div className="flex items-center gap-3 px-4 border-r border-white/5 hidden sm:flex">
              <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Guests</span>
              <select className="bg-transparent text-xs text-white uppercase tracking-widest font-bold outline-none cursor-pointer py-2" onChange={e => setMinGuests(Number(e.target.value))}>
                <option className="bg-[#121212]" value={1}>1+ Guests</option>
                <option className="bg-[#121212]" value={2}>2+ Guests</option>
                <option className="bg-[#121212]" value={4}>4+ Guests</option>
                <option className="bg-[#121212]" value={6}>6+ Guests</option>
              </select>
            </div>

            <div className="flex items-center gap-3 px-4 border-r border-white/5 whitespace-nowrap">
              <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Beds</span>
              <select className="bg-transparent text-xs text-white uppercase tracking-widest font-bold outline-none cursor-pointer py-2" onChange={e => setMinBeds(Number(e.target.value))}>
                <option className="bg-[#121212]" value={1}>1+ Beds</option>
                <option className="bg-[#121212]" value={2}>2+ Beds</option>
                <option className="bg-[#121212]" value={3}>3+ Beds</option>
              </select>
            </div>

            <div className="flex items-center gap-3 px-4 whitespace-nowrap">
              <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Max Price</span>
              <input type="range" min="50000" max="500000" step="10000" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="accent-secondary h-1 w-24 bg-white/10 rounded-lg appearance-none cursor-pointer" />
              <span className="text-secondary text-xs font-bold w-12">₹{maxPrice}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(room => (
            <div key={room.room_id} className="bg-surface rounded-sm border border-white/5 overflow-hidden group hover:border-secondary/30 transition-colors">
              <div className="h-48 relative overflow-hidden">
                <img src={roomImg} alt={room.name} className="w-full h-full object-cover filter saturate-[.35] opacity-60 group-hover:saturate-100 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute top-2 right-2 bg-black/80 px-3 py-1 border border-white/10 text-secondary text-xs font-bold tracking-widest uppercase">
                  ₹{room.price} / NIGHT
                </div>
              </div>
              <div className="p-6">
                <div className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold mb-1">{room.type} Class</div>
                <h3 className="text-xl font-serif text-white uppercase tracking-wider mb-6">{room.name}</h3>
                
                <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
                  <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest hidden sm:block">
                    GUESTS: 0{room.capacity} | BEDS: 0{room.beds || 1}
                  </span>
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <button 
                      onClick={() => navigate(`/room/${room.room_id}`)}
                      className="text-white/60 hover:text-white flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest transition-colors"
                    >
                      Details
                    </button>
                    <button 
                      onClick={() => navigate(`/checkout`, { state: { room } })}
                      className="text-secondary hover:text-white flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest transition-colors"
                    >
                      Book Now <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center border border-white/5 bg-[#121212]">
              <Search size={32} className="mx-auto text-white/20 mb-4" />
              <p className="text-text-muted uppercase tracking-widest text-xs font-bold">No rooms match your search filters.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RoomsPage;
