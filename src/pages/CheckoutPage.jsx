import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PortalContext } from '../context/PortalContext';
import { ChevronLeft, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import AuthCard from '../components/AuthCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { currentUser, createBooking } = useContext(PortalContext);
  
  const room = state?.room;
  
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [days, setDays] = useState(0);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [addMeals, setAddMeals] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!room) navigate('/rooms');
  }, [room, navigate]);

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      setDays(diffDays > 0 ? diffDays : 0);
    } else {
      setDays(0);
    }
  }, [checkIn, checkOut]);

  if (!room) return null;

  const handleConfirm = () => {
    if (days <= 0 || !checkIn || !checkOut) return alert('Invalid timeframe selected.');
    
    // Formatting the JS Date objects to Strings for display on the Dashboard
    const formatDate = (date) => date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    let finalPrice = room.price * days;
    if (addBreakfast) finalPrice += 5000 * days;
    if (addMeals) finalPrice += 15000 * days;

    createBooking({
      user_id: currentUser.user_id,
      room_id: room.room_id,
      room_name: room.name,
      check_in_date: formatDate(checkIn),
      check_out_date: formatDate(checkOut),
      total_price: finalPrice,
      addons: { breakfast: addBreakfast, meals: addMeals }
    });
    
    navigate('/customer/dashboard');
  };

  let calculatedTotal = room?.price * days || 0;
  if (addBreakfast) calculatedTotal += 5000 * days;
  if (addMeals) calculatedTotal += 15000 * days;

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col text-text font-sans relative">
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
      <div className="flex-grow max-w-4xl mx-auto px-6 pt-32 w-full">
        
        <button onClick={() => navigate(-1)} className="text-secondary flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest mb-8 hover:text-white transition-colors">
          <ChevronLeft size={14} /> Back to Rooms
        </button>

        <div className="bg-[#121212] border border-white/5 rounded-sm shadow-2xl p-8 md:p-12 mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
            <ShieldCheck size={20} className="text-secondary" />
            <h1 className="text-2xl font-serif text-white uppercase tracking-widest">Complete Your Booking</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase font-bold tracking-widest text-text-muted mb-4">Selected Room</h3>
                <p className="text-xl text-white font-serif tracking-wider uppercase mb-1">{room.name}</p>
                <p className="text-[10px] font-bold text-secondary tracking-widest uppercase">CLASS: {room.type} | GUESTS: 0{room.capacity}</p>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] w-full text-text-muted uppercase font-bold tracking-widest block mb-1">Select Dates</label>
                 <div className="custom-datepicker-wrapper w-full bg-black p-4 border border-white/10 rounded-sm flex justify-center">
                   <DatePicker 
                     selected={checkIn} 
                     onChange={(update) => {
                       const [start, end] = update;
                       setCheckIn(start);
                       setCheckOut(end);
                     }}
                     startDate={checkIn} 
                     endDate={checkOut} 
                     selectsRange
                     inline
                     minDate={new Date()}
                   />
                 </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/5">
                <label className="text-[10px] w-full text-text-muted uppercase font-bold tracking-widest block mb-2">Enhance Your Stay</label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={addBreakfast} onChange={e => setAddBreakfast(e.target.checked)} className="accent-secondary w-4 h-4" />
                  <span className="text-xs text-white font-medium group-hover:text-secondary transition-colors">Daily Breakfast (+₹5000/night)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={addMeals} onChange={e => setAddMeals(e.target.checked)} className="accent-secondary w-4 h-4" />
                  <span className="text-xs text-white font-medium group-hover:text-secondary transition-colors">Full Board Meals (+₹15000/night)</span>
                </label>
              </div>
            </div>

            <div className="bg-black p-6 border border-white/5 rounded-sm flex flex-col">
              <h3 className="text-xs uppercase font-bold tracking-widest text-white mb-6 border-b border-white/10 pb-4">Booking Summary</h3>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-text-muted tracking-widest uppercase">Room Rate</span>
                <span className="text-xs text-white">₹{room.price} / night</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-text-muted tracking-widest uppercase">Duration</span>
                <span className="text-xs text-white">{days} nights</span>
              </div>
              
              {addBreakfast && (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold text-text-muted tracking-widest uppercase">Breakfast</span>
                  <span className="text-xs text-white">+₹{5000 * days}</span>
                </div>
              )}

              {addMeals && (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold text-text-muted tracking-widest uppercase">Full Meals</span>
                  <span className="text-xs text-white">+₹{15000 * days}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center mt-auto border-t border-white/10 pt-4 mb-6">
                <span className="text-xs font-bold text-secondary tracking-widest uppercase">Total Price</span>
                <span className="text-lg text-white font-serif">₹{calculatedTotal}</span>
              </div>

              {currentUser ? (
                <button onClick={handleConfirm} disabled={days <= 0} className="w-full bg-secondary text-black py-4 text-[10px] uppercase font-bold tracking-widest rounded-sm hover:bg-white transition-colors disabled:opacity-50 disabled:bg-secondary">
                  Confirm Booking
                </button>
              ) : (
                <button onClick={() => setIsAuthOpen(true)} className="w-full bg-black border border-secondary text-secondary py-4 text-[10px] uppercase font-bold tracking-widest rounded-sm hover:bg-secondary hover:text-black transition-colors">
                  Log in to Book
                </button>
              )}
            </div>

          </div>
        </div>
        
      </div>

      <AuthCard isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default CheckoutPage;
