import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { BookingFormInput } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  audienceType: 'buyer' | 'landowner' | 'general';
}

export default function BookingModal({ isOpen, onClose, audienceType }: BookingModalProps) {
  const [formData, setFormData] = useState<BookingFormInput>({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '11:00',
    message: '',
    audienceType: audienceType || 'general',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury API response with slight delay
    setTimeout(() => {
      const generatedId = `AURA-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedId);

      // Save to localStorage
      const existingBookings = JSON.parse(localStorage.getItem('aura_bookings') || '[]');
      const newBooking = {
        ...formData,
        id: generatedId,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('aura_bookings', JSON.stringify([...existingBookings, newBooking]));

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '11:00',
      message: '',
      audienceType: audienceType || 'general',
    });
    setIsSuccess(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#2E3543]/40 backdrop-blur-md"
            id="modal-backdrop"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl bg-[#FDFCFC] rounded-3xl border border-[#5AC2EB]/20 shadow-2xl overflow-hidden z-10"
            id="modal-container"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-[#2E3543]/60 hover:text-[#2E3543] hover:bg-gray-100 transition-colors z-20"
              id="close-modal-button"
            >
              <X size={20} />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="p-8 sm:p-10" id="booking-form">
                <div className="mb-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#5AC2EB]">
                    {formData.audienceType === 'buyer' 
                      ? 'Private View Booking' 
                      : formData.audienceType === 'landowner' 
                        ? 'Joint Venture consultation' 
                        : 'Concierge Inquiry'}
                  </span>
                  <h3 className="text-3xl font-serif text-[#2E3543] mt-2">
                    {formData.audienceType === 'buyer'
                      ? 'Schedule a Private viewing'
                      : formData.audienceType === 'landowner'
                        ? 'Partner on Your Land'
                        : 'Begin the Conversation'}
                  </h3>
                  <p className="text-sm text-[#2E3543]/70 mt-2">
                    Experience Dhaka's most authentic luxury developments. Meet our elite consultants at your preferred time.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#2E3543]/80 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5AC2EB]">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-gray-200 focus:border-[#5AC2EB]/80 focus:ring-1 focus:ring-[#5AC2EB]/30 rounded-xl py-3 pl-10 pr-4 text-[#2E3543] text-sm transition-all outline-none"
                        placeholder="e.g. Farhan Rahman"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2E3543]/80 uppercase tracking-wider mb-2">
                      Contact Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5AC2EB]">
                        <Phone size={16} />
                      </span>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-gray-200 focus:border-[#5AC2EB]/80 focus:ring-1 focus:ring-[#5AC2EB]/30 rounded-xl py-3 pl-10 pr-4 text-[#2E3543] text-sm transition-all outline-none"
                        placeholder="e.g. +880 1712-XXXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2E3543]/80 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5AC2EB]">
                        <Mail size={16} />
                      </span>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-gray-200 focus:border-[#5AC2EB]/80 focus:ring-1 focus:ring-[#5AC2EB]/30 rounded-xl py-3 pl-10 pr-4 text-[#2E3543] text-sm transition-all outline-none"
                        placeholder="e.g. farhan@domain.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2E3543]/80 uppercase tracking-wider mb-2">
                      Purpose of Inquiry
                    </label>
                    <select
                      value={formData.audienceType}
                      onChange={(e) => setFormData({ ...formData, audienceType: e.target.value as any })}
                      className="w-full bg-white border border-gray-200 focus:border-[#5AC2EB]/80 focus:ring-1 focus:ring-[#5AC2EB]/30 rounded-xl py-3 px-4 text-[#2E3543] text-sm transition-all outline-none"
                    >
                      <option value="buyer">Buying an Ultra-Premium Residence</option>
                      <option value="landowner">Joint Venture (Landowner partnership)</option>
                      <option value="general">Boutique Commercial Space / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2E3543]/80 uppercase tracking-wider mb-2">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5AC2EB]">
                        <Calendar size={16} />
                      </span>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full bg-white border border-gray-200 focus:border-[#5AC2EB]/80 focus:ring-1 focus:ring-[#5AC2EB]/30 rounded-xl py-3 pl-10 pr-4 text-[#2E3543] text-sm transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2E3543]/80 uppercase tracking-wider mb-2">
                      Preferred Time Slot
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5AC2EB]">
                        <Clock size={16} />
                      </span>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full bg-white border border-gray-200 focus:border-[#5AC2EB]/80 focus:ring-1 focus:ring-[#5AC2EB]/30 rounded-xl py-3 pl-10 pr-4 text-[#2E3543] text-sm transition-all outline-none"
                      >
                        <option value="10:00">10:00 AM (Morning Air)</option>
                        <option value="11:30">11:30 AM (Midday Light)</option>
                        <option value="14:00">02:00 PM (Afternoon Study)</option>
                        <option value="16:00">04:00 PM (Sunset Viewing)</option>
                        <option value="18:00">06:00 PM (Evening Ambience)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-semibold text-[#2E3543]/80 uppercase tracking-wider mb-2">
                    Special Requests / Preferred Locations (Gulshan, Banani, Dhanmondi, Bashundhara)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-4 text-[#5AC2EB]">
                      <FileText size={16} />
                    </span>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-gray-200 focus:border-[#5AC2EB]/80 focus:ring-1 focus:ring-[#5AC2EB]/30 rounded-xl py-3 pl-10 pr-4 text-[#2E3543] text-sm transition-all outline-none h-20 resize-none"
                      placeholder="e.g. I am looking for a 4000+ sq ft apartment with minimum 4 bedrooms in Gulshan, or I wish to discuss land development."
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 mt-8">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-3 rounded-xl text-sm font-medium text-[#2E3543]/70 hover:text-[#2E3543] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#5AC2EB] text-[#2E3543] font-semibold text-sm tracking-wider uppercase px-6 py-3 rounded-xl shadow-lg shadow-[#5AC2EB]/20 hover:bg-[#5AC2EB]/95 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#2E3543] border-t-transparent rounded-full animate-spin"></span>
                        Securing Slot...
                      </>
                    ) : (
                      'Request Private Invitation'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 text-center flex flex-col items-center"
                id="booking-success-container"
              >
                <div className="w-16 h-16 bg-[#5AC2EB]/10 text-[#5AC2EB] rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={36} />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-[#5AC2EB] mb-2">
                  CONFUSION-FREE ACQUISITION
                </span>
                <h3 className="text-4xl font-serif text-[#2E3543] mb-4">
                  Invitation Confirmed
                </h3>
                <p className="text-base text-[#2E3543]/80 max-w-md mb-8">
                  Greetings, <strong className="text-[#2E3543]">{formData.name}</strong>. Your private luxury consultation is secured. Our Relationship Principal will connect within the hour.
                </p>

                {/* VIP Glassmorphic Pass Ticket */}
                <div className="w-full max-w-sm bg-gradient-to-br from-[#2E3543] to-[#1E232D] text-[#FDFCFC] p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden text-left mb-8">
                  {/* Watermark gradient */}
                  <div className="absolute right-0 bottom-0 w-32 h-32 bg-[#5AC2EB]/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5AC2EB]">
                        AURA PRIVÉ PASS
                      </span>
                      <h4 className="font-serif text-lg">Aura Developments</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase text-white/50 tracking-wider block">PASS ID</span>
                      <span className="font-mono text-xs text-[#5AC2EB]">{ticketId}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-4 text-xs">
                    <div>
                      <span className="text-white/40 block">CLIENT</span>
                      <span className="font-semibold">{formData.name}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">INQUIRY</span>
                      <span className="font-semibold capitalize">{formData.audienceType}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">DATE</span>
                      <span className="font-semibold">{formData.preferredDate}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">TIME SLOT</span>
                      <span className="font-semibold">{formData.preferredTime} PM/AM</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-white/40 font-mono">
                    <span>* EXCLUSIVE DHAKA CONCIERGE</span>
                    <span>ACTIVE VALID</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2 text-xs font-semibold text-[#5AC2EB] hover:underline"
                  >
                    Edit Submission
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-[#2E3543] hover:bg-[#2E3543]/90 text-white text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-xl"
                  >
                    Close Private Desk
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
