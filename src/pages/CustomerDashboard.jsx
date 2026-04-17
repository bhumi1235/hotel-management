import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PortalContext } from '../context/PortalContext';
import Navbar from '../components/Navbar';
import { Power, FileText, Ban, CalendarDays, Star, Coffee, Settings, Utensils, Bell } from 'lucide-react';

const CustomerDashboard = () => {
  const { currentUser, logout, bookings, cancelBooking, rooms } = useContext(PortalContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stays');

  if (!currentUser) return null;

  const myBookings = bookings.filter(b => b.user_id === currentUser.user_id).reverse();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col text-text font-sans">
      <Navbar onOpenAuth={() => {}} />
      <div className="flex-grow max-w-6xl mx-auto px-6 pt-32 pb-20 w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-[#121212] border border-white/5 rounded-sm p-6 sticky top-32 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
             <div className="mb-8 border-b border-white/5 pb-6">
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-secondary mb-1 block">Welcome Back</span>
                <h2 className="text-xl font-serif text-white uppercase break-words">{currentUser.name}</h2>
                <p className="text-xs text-text-muted mt-2 truncate">{currentUser.email}</p>
             </div>

             <div className="mb-6 p-4 rounded-sm border border-secondary/20 bg-secondary/5">
                <span className="text-[10px] text-secondary font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Star size={12} className="fill-secondary text-secondary" /> Elite Member
                </span>
                <p className="text-white text-xl font-serif">12,450</p>
                <p className="text-[9px] text-text-muted uppercase tracking-[0.2em] font-bold">Reward Points</p>
             </div>

             <nav className="space-y-2 mb-8 border-t border-white/5 pt-6">
               <button onClick={() => setActiveTab('stays')} className={`w-full flex items-center gap-3 text-xs uppercase font-bold tracking-widest p-3 rounded-sm transition-colors ${activeTab === 'stays' ? 'bg-white/5 text-secondary' : 'text-text-muted hover:text-white'}`}>
                 <FileText size={14} /> Upcoming Stays
               </button>
               <button onClick={() => setActiveTab('dining')} className={`w-full flex items-center gap-3 text-xs uppercase font-bold tracking-widest p-3 rounded-sm transition-colors ${activeTab === 'dining' ? 'bg-white/5 text-secondary' : 'text-text-muted hover:text-white'}`}>
                 <Coffee size={14} /> Dining Reservations
               </button>
               <button onClick={() => setActiveTab('preferences')} className={`w-full flex items-center gap-3 text-xs uppercase font-bold tracking-widest p-3 rounded-sm transition-colors ${activeTab === 'preferences' ? 'bg-white/5 text-secondary' : 'text-text-muted hover:text-white'}`}>
                 <Settings size={14} /> Preferences
               </button>
             </nav>

             <button onClick={handleLogout} className="flex items-center gap-3 text-xs uppercase font-bold tracking-widest text-white/40 hover:text-red-500 transition-colors p-3 w-full border border-transparent hover:border-red-500/20 rounded-sm">
               <Power size={14} /> Log Out
             </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
           <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
             <h1 className="text-3xl font-serif text-white uppercase tracking-widest">My Bookings</h1>
           </div>
           
           {activeTab === 'stays' && (
             <div className="space-y-4">
               {myBookings.length === 0 ? (
                 <div className="text-center py-24 bg-[#0a0a0a] border border-white/5 shadow-2xl rounded-sm flex flex-col items-center">
                   <CalendarDays strokeWidth={1} size={48} className="text-secondary mb-6 opacity-80" />
                   <h3 className="text-2xl font-serif text-white uppercase tracking-widest mb-4">Your Journey Awaits</h3>
                   <p className="text-[10px] max-w-sm mx-auto leading-relaxed uppercase font-bold tracking-[0.2em] text-text-muted mb-10">You currently have no active reservations. Explore our exclusive collection of luxury suites and properties.</p>
                   <Link to="/rooms" className="bg-secondary text-black px-10 py-4 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-white transition-colors rounded-sm shadow-[0_0_30px_rgba(217,160,91,0.15)] inline-flex items-center gap-3">
                     Discover Rooms
                   </Link>
                 </div>
               ) : (
                 myBookings.map(b => (
                   <div key={b.booking_id} className="bg-[#121212] border border-white/5 rounded-sm p-6 flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center hover:border-white/10 transition-colors">
                     
                     <div className="flex-grow">
                       <div className="flex items-center gap-3 mb-2">
                         <span className={`text-[9px] uppercase font-bold tracking-[0.2em] px-2 py-1 rounded-sm border ${b.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : b.status === 'Approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                           {b.status}
                         </span>
                         <span className="text-[10px] text-text-muted font-bold tracking-widest uppercase">ID: {b.booking_id.slice(-6)} • Booked: {new Date(parseInt(b.booking_id)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                       </div>
                       <h3 className="text-lg font-serif text-white uppercase tracking-wider">{b.room_name}</h3>
                       
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5 border-y border-white/5 py-4 my-4">
                         <div>
                           <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest mb-1">Check-in</p>
                           <p className="text-xs text-white font-bold">{b.check_in_date}</p>
                         </div>
                         <div>
                           <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest mb-1">Check-out</p>
                           <p className="text-xs text-white font-bold">{b.check_out_date}</p>
                         </div>
                         <div>
                           <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest mb-1">Room Class</p>
                           <p className="text-xs text-white font-bold">{rooms.find(r => r.room_id === b.room_id)?.type || 'Standard'} Class</p>
                         </div>
                         <div>
                           <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest mb-1">Capacity</p>
                           <p className="text-xs text-white font-bold">Up to {rooms.find(r => r.room_id === b.room_id)?.capacity || 2} Guests</p>
                         </div>
                       </div>
                       
                       {b.addons && (b.addons.breakfast || b.addons.meals) && (
                         <div className="flex flex-wrap gap-3">
                           {b.addons.breakfast && (
                             <span className="inline-flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase border border-white/10 px-3 py-1.5 rounded-sm text-white/80 bg-white/5">
                               <Coffee size={10} className="text-secondary" /> Breakfast Included
                             </span>
                           )}
                           {b.addons.meals && (
                             <span className="inline-flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase border border-white/10 px-3 py-1.5 rounded-sm text-white/80 bg-white/5">
                               <Utensils size={10} className="text-secondary" /> Full Board Meals
                             </span>
                           )}
                         </div>
                       )}
                     </div>
  
                     <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-4">
                        <div className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Total Stay</div>
                        <div className="text-xl font-serif text-white">₹{b.total_price}</div>
                        {b.status === 'Pending' && (
                          <button onClick={() => cancelBooking(b.booking_id)} className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-text-muted hover:text-red-500 transition-colors">
                            <Ban size={12} /> Cancel Booking
                          </button>
                        )}
                     </div>
  
                   </div>
                 ))
               )}
             </div>
           )}

           {activeTab === 'dining' && (
             <div className="text-center py-24 bg-[#0a0a0a] border border-white/5 shadow-2xl rounded-sm flex flex-col items-center">
                <Utensils strokeWidth={1} size={48} className="text-secondary mb-6 opacity-80" />
                <h3 className="text-2xl font-serif text-white uppercase tracking-widest mb-4">No Table Reservations</h3>
                <p className="text-[10px] max-w-sm mx-auto leading-relaxed uppercase font-bold tracking-[0.2em] text-text-muted mb-10">You have no upcoming dining reservations. Secure a table at our award-winning restaurants.</p>
                <button className="bg-transparent border border-white/20 text-white px-10 py-4 text-[10px] uppercase font-bold tracking-[0.2em] hover:border-secondary hover:text-secondary rounded-sm transition-colors inline-flex items-center gap-3">
                  Under Construction
                </button>
             </div>
           )}

           {activeTab === 'preferences' && (
             <div className="bg-[#121212] border border-white/5 rounded-sm p-6 shadow-2xl">
               <h3 className="text-lg font-serif text-white uppercase tracking-wider mb-8 border-b border-white/5 pb-4">Account Settings</h3>
               
               <div className="space-y-6">
                 <div>
                   <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted block mb-2">Display Name</label>
                   <input type="text" readOnly value={currentUser.name} className="w-full bg-black border border-white/10 rounded-sm p-4 text-xs font-bold text-white uppercase tracking-wider outline-none" />
                 </div>
                 <div>
                   <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted block mb-2">Registered Email</label>
                   <input type="text" readOnly value={currentUser.email} className="w-full bg-black border border-white/10 rounded-sm p-4 text-xs font-bold text-white uppercase tracking-wider outline-none" />
                 </div>
                 
                 <div className="pt-6 border-t border-white/5 mt-8">
                   <h4 className="text-[10px] uppercase font-bold tracking-widest text-secondary mb-4 flex items-center gap-2"><Bell size={12} /> Notification Preferences</h4>
                   <label className="flex items-center gap-3 cursor-pointer group">
                     <input type="checkbox" defaultChecked className="accent-secondary w-4 h-4" />
                     <span className="text-xs text-white font-medium group-hover:text-secondary transition-colors uppercase tracking-widest">Receive Promotional Offers</span>
                   </label>
                 </div>
               </div>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default CustomerDashboard;
