import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';

const AuthCard = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [isOtpStep, setIsOtpStep] = useState(false);

  if (!isOpen) return null;

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setIsOtpStep(true);
  };

  const handleClose = () => {
    setIsOtpStep(false);
    setActiveTab('login');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={handleClose}
          ></motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-surface border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-md overflow-hidden"
          >
            {/* Top Security Banner */}
            <div className="w-full bg-black border-b border-white/5 py-2 px-4 flex items-center justify-between">
               <div className="flex items-center gap-2 text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold">
                 <ShieldCheck size={12} className="text-secondary" /> Secure Transmission Line
               </div>
            </div>

            <button 
              onClick={handleClose}
              className="absolute top-10 right-4 text-text/30 hover:text-secondary transition-colors p-2 z-10"
            >
              <X size={20} />
            </button>
            
            <div className="p-8 md:p-12">
              {!isOtpStep ? (
                <>
                  <h2 className="text-3xl font-serif text-white tracking-wide mb-2 uppercase">Client Portal</h2>
                  <p className="text-sm text-text-muted mb-8 font-medium">Verify your credentials to access the reserve.</p>
                  
                  <div className="flex bg-black border border-white/10 rounded-md p-1 mb-8 relative">
                    <div 
                      className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-surface border border-white/5 shadow-md rounded-sm transition-all duration-300 ease-in-out ${activeTab === 'signup' ? 'translate-x-full' : 'translate-x-0'}`}
                    ></div>
                    
                    <button 
                      onClick={() => setActiveTab('login')}
                      className={`flex-1 py-2 text-xs uppercase tracking-widest font-bold z-10 transition-colors ${activeTab === 'login' ? 'text-secondary' : 'text-text-muted'}`}
                    >
                      Authentication
                    </button>
                    <button 
                      onClick={() => setActiveTab('signup')}
                      className={`flex-1 py-2 text-xs uppercase tracking-widest font-bold z-10 transition-colors ${activeTab === 'signup' ? 'text-secondary' : 'text-text-muted'}`}
                    >
                      New Dossier
                    </button>
                  </div>

                  <form className="space-y-4" onSubmit={activeTab === 'signup' ? handleSignupSubmit : (e) => e.preventDefault()}>
                    <AnimatePresence>
                      {activeTab === 'signup' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden space-y-4"
                        >
                          <input type="text" placeholder="Full Name" required className="input-field mt-1" />
                          <input type="tel" placeholder="Secure Phone Number" required className="input-field" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <input type="email" placeholder="Encrypted Email Address" required className="input-field" />
                    <input type="password" placeholder="Passcode" required className="input-field" />
                    
                    <AnimatePresence>
                      {activeTab === 'signup' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <input type="text" placeholder="Access Code (Optional)" className="input-field mt-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {activeTab === 'login' && (
                      <div className="text-right">
                        <a href="#" className="text-[10px] uppercase tracking-wider text-text-muted hover:text-secondary transition-colors">Recover Access</a>
                      </div>
                    )}

                    <button type={activeTab === 'signup' ? 'submit' : 'button'} className="w-full mt-6 bg-secondary text-black font-bold uppercase tracking-widest text-xs py-4 rounded-md hover:bg-white transition-colors duration-300">
                      {activeTab === 'login' ? 'Initiate Link' : 'Generate Dossier'}
                    </button>
                  </form>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-center py-6"
                >
                  <ShieldCheck size={40} className="mx-auto text-secondary mb-6" />
                  <h2 className="text-2xl font-serif text-white tracking-wide mb-2 uppercase">Verify Transmission</h2>
                  <p className="text-sm text-text-muted mb-8 font-medium">A cryptographic sequence has been sent to your device.</p>
                  
                  <div className="flex justify-center gap-2 mb-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input 
                        key={i}
                        type="text" 
                        maxLength={1} 
                        className="w-12 h-14 bg-black border border-white/20 text-white text-center text-xl font-bold focus:border-secondary focus:ring-1 focus:ring-secondary outline-none rounded-sm transition-all"
                      />
                    ))}
                  </div>

                  <button className="w-full bg-secondary text-black font-bold uppercase tracking-widest text-xs py-4 rounded-md hover:bg-white transition-colors duration-300">
                    Confirm Sequence
                  </button>
                  <button 
                    onClick={() => setIsOtpStep(false)}
                    className="mt-6 text-[10px] uppercase tracking-wider text-text-muted hover:text-white transition-colors"
                  >
                    Abort & Return
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthCard;
