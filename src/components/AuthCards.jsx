import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const AuthCards = () => {
  const [view, setView] = useState('login');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let interval;
    if (view === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [view, timer]);

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setView('portal');
    }, 2000);
  };

  const renderLogin = () => (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full relative z-10">
      <div className="text-center mb-10">
        <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Client Portal</span>
        <h2 className="text-4xl serif italic mb-2 text-text-main">Dossier Access</h2>
        <div className="w-12 h-[1px] bg-accent/30 mx-auto mt-6"></div>
      </div>
      
      <div className="mb-8">
        <label className="text-[9px] uppercase tracking-[0.2em] font-semibold text-text-muted mb-3 block">Identification ID</label>
        <input 
          type="email" 
          placeholder="Enter Email Address" 
          className="w-full bg-transparent border-b border-border py-4 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-text-muted/40"
        />
      </div>
      
      <div className="mb-10">
        <label className="text-[9px] uppercase tracking-[0.2em] font-semibold text-text-muted mb-3 block">Passcode</label>
        <input 
          type="password" 
          placeholder="Enter Passcode" 
          className="w-full bg-transparent border-b border-border py-4 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-text-muted/40"
        />
      </div>
      
      <button className="btn-primary w-full py-5 text-[10px] font-bold tracking-[0.3em] mb-6 flex justify-center items-center gap-3">
        AUTHORIZE <ArrowRight size={14} />
      </button>
      
      <div className="flex justify-between items-center text-[10px] tracking-wider uppercase font-semibold text-text-muted">
        <button onClick={() => setView('signup')} className="hover:text-accent transition-colors">Request Access</button>
        <button className="hover:text-accent transition-colors">Recover</button>
      </div>
    </motion.div>
  );

  const renderSignup = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full relative z-10">
       <div className="text-center mb-8">
        <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">New Entity</span>
        <h2 className="text-4xl serif italic mb-2 text-text-main">Registration</h2>
      </div>
      
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Full Name" 
          className="w-full bg-transparent border-b border-border py-3 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-text-muted/40"
        />
      </div>
      
      <div className="mb-6">
        <input 
          type="email" 
          placeholder="Secure Email" 
          className="w-full bg-transparent border-b border-border py-3 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-text-muted/40"
        />
      </div>
      
      <div className="mb-8">
        <input 
          type="password" 
          placeholder="Passcode" 
          className="w-full bg-transparent border-b border-border py-3 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-text-muted/40"
        />
      </div>
      
      <button onClick={() => setView('otp')} className="btn-primary w-full py-5 text-[10px] font-bold tracking-[0.3em] mb-6">
        SUBMIT DOSSIER
      </button>
      
      <button onClick={() => setView('login')} className="w-full text-center text-[10px] tracking-wider uppercase font-semibold text-text-muted hover:text-accent transition-colors">
        Return to login
      </button>
    </motion.div>
  );

  const renderOtp = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center w-full relative z-10">
      <h2 className="text-3xl serif italic mb-4 text-text-main">Verify Identity</h2>
      <p className="text-text-muted text-xs mb-10 tracking-wide leading-relaxed">Enter the 6-digit cryptographic code <br/>sent to your secure line.</p>
      
      <div className="flex justify-center gap-2 mb-12">
        {otp.map((digit, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            type="text"
            className="otp-input text-center"
            value={digit}
            onChange={(e) => handleOtpChange(i, e.target.value)}
            maxLength={1}
          />
        ))}
      </div>
      
      <button onClick={handleVerify} className="btn-primary w-full py-5 text-[10px] font-bold tracking-[0.3em] mb-8">
        VALIDATE
      </button>
      
      <p className="text-[10px] text-text-muted tracking-[0.1em] uppercase">
        Resend code in <span className="text-accent font-bold">0:{timer < 10 ? `0${timer}` : timer}</span>
      </p>
    </motion.div>
  );

  return (
    <div className="classified-card w-full max-w-md mx-auto min-h-[500px] flex items-center justify-center">
      {/* Decorative Stamps / Watermarks */}
      <div className="absolute top-6 right-6 text-[8px] uppercase tracking-widest text-text-muted/30 font-bold rotate-90 origin-right">
        CONFIDENTIAL
      </div>
      <div className="absolute bottom-6 left-6 text-[8px] uppercase tracking-widest text-text-muted/30 font-bold">
        DOC NO. 458-X
      </div>
      
      {isSuccess ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-12 relative z-10"
        >
          <CheckCircle2 size={48} className="text-accent mb-6" strokeWidth={1} />
          <h3 className="text-2xl serif italic mb-2 text-text-main">Access Granted</h3>
          <p className="text-text-muted text-xs tracking-wide">Welcome to the inner circle.</p>
        </motion.div>
      ) : view === 'portal' ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center text-center relative z-10"
        >
          <h3 className="text-3xl serif italic mb-4 text-text-main">Welcome back, Sir.</h3>
          <p className="text-text-muted text-xs tracking-wide mb-8">Your private suites are ready.</p>
          <button className="btn-outline px-8 py-3 text-[10px] uppercase tracking-widest font-bold">View Itinerary</button>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {view === 'login' && renderLogin()}
          {view === 'signup' && renderSignup()}
          {view === 'otp' && renderOtp()}
        </AnimatePresence>
      )}
    </div>
  );
};

export default AuthCards;
