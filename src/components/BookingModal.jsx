import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';

export const BookingModal = ({
  room,
  onClose,
  onSubmitApplication,
}) => {
  if (!room) return null;

  const [moveInDate, setMoveInDate] = useState('2026-08-15');
  const [leaseMonths, setLeaseMonths] = useState(room.minLeaseMonths || 3);
  const [occupants, setOccupants] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [submittedRef, setSubmittedRef] = useState(null);

  const totalFirstMonth = room.rentPerMonth + room.deposit;

  const handleSubmit = (e) => {
    e.preventDefault();
    const refCode = 'NES-' + Math.floor(100000 + Math.random() * 900000);
    
    onSubmitApplication({
      roomId: room.id,
      roomTitle: room.title,
      roomImage: room.images[0],
      moveInDate,
      leaseDurationMonths: leaseMonths,
      monthlyRent: room.rentPerMonth,
      deposit: room.deposit,
    });

    setSubmittedRef(refCode);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Rental Application</h3>
                <p className="text-xs text-slate-500">100% Free Verification Guarantee</p>
              </div>
            </div>
            <motion.button
              id="close-booking-modal"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-full hover:bg-slate-200/60 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            {submittedRef ? (
              /* Success View */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-slate-900">Application Submitted!</h4>
                  <p className="text-xs text-slate-500">
                    Reference Code: <span className="font-mono font-bold text-slate-800">{submittedRef}</span>
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  Your application for <span className="font-semibold">{room.title}</span> has been sent directly to Superhost <span className="font-semibold">{room.host.name}</span>. Expect a response within {room.host.responseTime}.
                </p>

                <motion.button
                  id="booking-success-done-btn"
                  onClick={onClose}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2.5 bg-blue-600 text-white font-semibold text-xs rounded-xl hover:bg-blue-700 transition-colors shadow-xs"
                >
                  Return to Rooms
                </motion.button>
              </motion.div>
            ) : (
              /* Application Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Target Room Preview */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <img
                    src={room.images[0]}
                    alt={room.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 truncate">{room.title}</h4>
                    <p className="text-xs text-slate-500">{room.neighborhood}, {room.city}</p>
                    <p className="text-xs font-bold text-blue-600 mt-0.5">${room.rentPerMonth.toLocaleString()} / mo</p>
                  </div>
                </div>

                {/* Move-in & Lease Inputs */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Move-in Date
                    </label>
                    <input
                      type="date"
                      required
                      value={moveInDate}
                      onChange={(e) => setMoveInDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Lease Duration
                    </label>
                    <select
                      value={leaseMonths}
                      onChange={(e) => setLeaseMonths(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500"
                    >
                      <option value={1}>1 Month (Flexible)</option>
                      <option value={3}>3 Months</option>
                      <option value={6}>6 Months</option>
                      <option value={12}>12 Months (Annual)</option>
                    </select>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="space-y-3 pt-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Applicant Details
                  </h5>

                  <div className="space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="Full Legal Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Introduce yourself to the host (profession, move timeline)..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* Cost Summary Breakdown */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>First Month Rent</span>
                    <span className="font-semibold text-slate-900">${room.rentPerMonth.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Refundable Escrow Deposit</span>
                    <span className="font-semibold text-slate-900">${room.deposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Nestora Verification & Lease Fee</span>
                    <span className="font-semibold text-emerald-600">$0 (Free)</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                    <span>Total Due at Move-In</span>
                    <span>${totalFirstMonth.toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    id="submit-rental-application-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Submit Verified Application
                  </motion.button>
                  <p className="text-[10px] text-center text-slate-400 mt-2">
                    No payment required today. Application is subject to host review.
                  </p>
                </div>

              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
