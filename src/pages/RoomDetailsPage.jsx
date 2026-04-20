import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PortalContext } from '../context/PortalContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, ArrowRight, Wifi, Tv, Coffee, Shield, Star, Crown, Lock, Camera } from 'lucide-react';
import roomImg from '../assets/room.png';

const RoomDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rooms } = useContext(PortalContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const room = rooms.find(r => r.room_id === id);

  if (!room) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col text-text items-center justify-center">
         <h2 className="text-white text-2xl font-serif uppercase tracking-widest mb-4">Suite Not Found</h2>
         <Link to="/rooms" className="text-secondary uppercase text-xs font-bold tracking-widest hover:text-white transition-colors">Return to Directory</Link>
      </div>
    );
  }

  // Content Generation Logic
  const generateDescription = (type) => {
    switch(type) {
      case 'Sanctuary': return "The absolute pinnacle of our offerings. The Sanctuary grants completely uncompromised privacy and sprawling, edge-to-edge panoramic vistas. Crafted for those who demand total seclusion, featuring bullet-resistant glass, an independent ventilation system, and private helipad access routes.";
      case 'Reserve': return "A masterclass in bespoke luxury. The Reserve tier offers immense square footage, hand-picked artisanal decor, and priority access to our Michelin-starred dining network. An elevated enclave designed around uncompromising comfort.";
      default: return "Our signature Suite class sets the baseline for luxury. Featuring custom-woven linens, a curated art collection, and seamless environmental controls. Floor-to-ceiling windows cast natural light over a deliberately crafted, ultra-modern aesthetic.";
    }
  }

  const generateAmenities = (type) => {
    if (type === 'Sanctuary') return [
      { icon: <Lock size={16} />, label: "Biometric Security" },
      { icon: <Crown size={16} />, label: "Dedicated Butler" },
      { icon: <Shield size={16} />, label: "Level 4 Armor Glass" },
      { icon: <Star size={16} />, label: "Private Helipad Routing" },
      { icon: <Camera size={16} />, label: "Sweeping Protocol" },
      { icon: <Wifi size={16} />, label: "Encrypted Network" },
    ];
    if (type === 'Reserve') return [
      { icon: <Crown size={16} />, label: "Priority Concierge" },
      { icon: <Star size={16} />, label: "Premium Champagne" },
      { icon: <Coffee size={16} />, label: "In-Suite Dining" },
      { icon: <Tv size={16} />, label: "85' OLED Matrix" },
      { icon: <Wifi size={16} />, label: "High-Speed FiOS" },
    ];
    return [
      { icon: <Wifi size={16} />, label: "High-Speed Wi-Fi" },
      { icon: <Tv size={16} />, label: "65' Smart TV" },
      { icon: <Coffee size={16} />, label: "Artisan Mini-Bar" },
      { icon: <Shield size={16} />, label: "Keycard Access" },
    ];
  };

  const amenities = generateAmenities(room.type);
  const description = generateDescription(room.type);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col text-text font-sans">
      <Navbar onOpenAuth={() => {}} />
      
      {/* Hero Header Section */}
      <div className="relative w-full h-[60vh] min-h-[500px] mt-20 border-b border-secondary/20">
         <img src={room.image || roomImg} alt={room.name} className="w-full h-full object-cover filter saturate-[.6] opacity-90" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
         
         <div className="absolute bottom-0 left-0 right-0 max-w-[1440px] mx-auto px-6 lg:px-8 pb-16 w-full">
            <button onClick={() => navigate('/rooms')} className="bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:text-secondary hover:bg-black/80 px-4 py-2 rounded-sm flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest transition-all mb-6 shadow-xl w-fit">
              <ArrowLeft size={14} /> Back to Directory
            </button>
            <div className="flex items-center gap-4 mb-4">
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] bg-black/80 backdrop-blur-md border border-secondary/30 text-secondary px-4 py-1.5 rounded-sm shadow-xl">{room.type} Class</span>
               {room.availability && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,1)]"></span>}
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white uppercase tracking-widest drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">{room.name}</h1>
         </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow max-w-[1440px] mx-auto px-6 lg:px-8 py-20 w-full grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Left: About */}
        <div className="col-span-1 lg:col-span-2 space-y-12">
           <div>
             <h3 className="text-2xl font-serif text-white uppercase tracking-wider mb-6">The Experience</h3>
             <p className="text-text-muted text-sm leading-relaxed tracking-wide font-medium">
               {description}
             </p>
           </div>
           
           <div>
             <h3 className="text-2xl font-serif text-white uppercase tracking-wider mb-8">Suite Specifics & Amenities</h3>
             
             <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mb-12">
               <div className="border-l border-secondary/30 pl-4">
                 <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-text-muted mb-1">Max Occupancy</p>
                 <p className="text-white text-sm font-bold uppercase tracking-wider">0{room.capacity} Guests</p>
               </div>
               <div className="border-l border-secondary/30 pl-4">
                 <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-text-muted mb-1">Beds</p>
                 <p className="text-white text-sm font-bold uppercase tracking-wider">0{room.beds || 1} Primary</p>
               </div>
               <div className="border-l border-secondary/30 pl-4">
                 <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-text-muted mb-1">Availability</p>
                 <p className={`${room.availability ? 'text-green-400' : 'text-red-400'} text-sm font-bold uppercase tracking-wider`}>
                   {room.availability ? 'Available Now' : 'Currently Booked'}
                 </p>
               </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {amenities.map((item, i) => (
                 <div key={i} className="bg-[#121212] border border-white/5 p-4 flex items-center gap-3 rounded-sm">
                   <div className="text-secondary">{item.icon}</div>
                   <span className="text-[10px] text-white/80 uppercase font-bold tracking-widest">{item.label}</span>
                 </div>
               ))}
             </div>
           </div>
        </div>

        {/* Right: Booking Card / Sticky */}
        <div className="col-span-1 relative">
           <div className="sticky top-32 bg-[#0a0a0a] border border-white/10 p-8 rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
             <div className="border-b border-white/5 pb-6 mb-6">
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em]">Daily Rate</span>
                <div className="text-3xl font-serif text-white uppercase tracking-widest mt-2 flex items-end gap-2">
                  ₹{room.price} <span className="text-xs text-text-muted mb-1">/ NIGHT</span>
                </div>
             </div>
             
             <p className="text-[10px] text-text-muted leading-relaxed uppercase tracking-wider font-bold mb-8">
               Rates are inclusive of base facility access. Add-ons such as private dining, VIP transfers, and curated experiences can be configured during the final checkout stage.
             </p>
             
             {room.availability ? (
               <button 
                 onClick={() => navigate(`/checkout`, { state: { room } })}
                 className="btn-primary w-full py-4 text-[10px] tracking-[0.3em] flex items-center justify-center gap-3"
               >
                 Reserve Suite <ArrowRight size={14} />
               </button>
             ) : (
               <button disabled className="w-full bg-white/5 text-white/30 border border-white/5 py-4 text-[10px] uppercase font-bold tracking-[0.3em] cursor-not-allowed">
                 Unavailable
               </button>
             )}
           </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default RoomDetailsPage;
