import React, { useState } from 'react';
import { Building2, ArrowRight, Check } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Building2 className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Nestora
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Curated, verified room rentals designed for modern urban dwellers. Minimal aesthetic, transparent terms, and effortless booking.
            </p>
            <div className="pt-2 flex items-center gap-4 text-slate-400">
              <span className="text-xs bg-slate-800/80 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                100% Verified Listings
              </span>
              <span className="text-xs bg-slate-800/80 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                Zero Hidden Fees
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-browse"
                  onClick={() => onNavigate('browse')}
                  className="hover:text-white transition-colors"
                >
                  Browse Rooms
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-contact"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Nestora respects your privacy. All user data is encrypted.'); }} className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); alert('Nestora Terms of Service: Fair leasing guidelines for tenants and hosts.'); }} className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#trust" onClick={(e) => { e.preventDefault(); alert('Nestora Trust & Guarantee: 100% physically verified properties.'); }} className="hover:text-white transition-colors">Trust & Guarantee</a></li>
              <li><a href="#careers" onClick={(e) => { e.preventDefault(); alert('Careers at Nestora: We are expanding in SF, NYC, and London!'); }} className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Curated Digest
            </h4>
            <p className="text-xs text-slate-400">
              Get notified when new verified minimalist spaces open in your target city.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-slate-800/80 text-white text-sm placeholder-slate-500 rounded-xl px-3.5 py-2.5 border border-slate-700 focus:outline-none focus:border-blue-500 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center justify-center"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                  <Check className="w-3.5 h-3.5" /> Subscribed to Nestora digest.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Nestora Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>San Francisco</span>
            <span>•</span>
            <span>New York</span>
            <span>•</span>
            <span>London</span>
            <span>•</span>
            <span>Tokyo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
