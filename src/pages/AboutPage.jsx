import React from 'react';
import { ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Compass } from 'lucide-react';

export const AboutPage = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Our Vision</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Renting, reimagined for <br className="hidden sm:inline" />
          the <span className="text-blue-600">modern aesthetic standard.</span>
        </h1>
        <p className="text-base text-slate-600 leading-relaxed font-normal">
          Nestora was founded to eliminate clutter, deceptive listings, and artificial noise from urban room leasing. We pair architectural curation with transparent escrow technology.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">100% Physical Inspection</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We do not accept automated stock photographs. Every room is visited by a Nestora curator who measures floor plans and inspects noise insulation.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Zero Hidden Broker Fees</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Standard renting platforms add 12-15% middleman commission. Nestora connects verified tenants with property owners directly with zero markup.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Digital Mobility</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Flexibility matters. Whether you require a 30-day studio during a product launch or an annual penthouse, our digital escrow leases adapt.
          </p>
        </div>

      </div>

      {/* Founder / Brand Note */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
            Behind Nestora
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Designed with the precision of Linear and the warmth of a curated home.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            "When we looked at existing apartment portals, we saw overcrowded banner ads, confusing pricing, and noisy layouts. We built Nestora to be clean, calm, and trustworthy."
          </p>
        </div>

        <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
          <button
            id="about-cta-browse"
            onClick={() => onNavigate('browse')}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-2"
          >
            <span>Explore Nestora Rooms</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
