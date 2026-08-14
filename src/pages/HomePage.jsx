import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoomCard } from '../components/RoomCard';
import { FAQS, TESTIMONIALS } from '../data/faqs';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import {
  Search,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Calendar,
  Lock,
  ChevronDown,
  ChevronUp,
  Star,
  Compass
} from 'lucide-react';

export const HomePage = ({
  rooms,
  wishlist,
  onToggleWishlist,
  onSelectRoom,
  onNavigate,
  onSearchWithFilter,
  onQuickView,
}) => {
  // Hero Search state
  const [heroCity, setHeroCity] = useState('');
  const [heroRoomType, setHeroRoomType] = useState('');
  const [heroSearchQuery, setHeroSearchQuery] = useState('');

  // FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState('faq-1');

  const featuredRooms = rooms.filter((r) => r.featured).slice(0, 6);

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    onSearchWithFilter({
      city: heroCity,
      roomType: heroRoomType,
      searchQuery: heroSearchQuery,
    });
    onNavigate('browse');
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* 2. Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:col-span-7 space-y-6"
            >
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-800 shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>The Minimalist Standard for Room Rentals</span>
              </motion.div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] font-sans">
                Curated spaces <br className="hidden sm:inline" />
                for <span className="text-blue-600">modern living.</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
                Discover verified minimalist studio lofts, private rooms, and penthouses in prime tech & creative capitals with transparent terms and flexible leases.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <motion.button
                  id="hero-primary-cta"
                  onClick={() => onNavigate('browse')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-xs flex items-center gap-2 group"
                >
                  <span>Browse Rooms</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  id="hero-secondary-cta"
                  onClick={() => onNavigate('about')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold text-sm rounded-xl transition-all border border-slate-200/60"
                >
                  How Nestora Works
                </motion.button>
              </div>

              {/* Search Bar Widget below Headline */}
              <form
                onSubmit={handleHeroSearchSubmit}
                className="pt-6"
              >
                <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-md flex flex-col md:flex-row items-stretch gap-2">
                  
                  {/* City Select */}
                  <div className="flex-1 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Location
                    </label>
                    <select
                      id="hero-search-city"
                      value={heroCity}
                      onChange={(e) => setHeroCity(e.target.value)}
                      className="bg-transparent text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
                    >
                      <option value="">Any City</option>
                      <option value="San Francisco">San Francisco, CA</option>
                      <option value="New York">New York, NY</option>
                      <option value="Austin">Austin, TX</option>
                      <option value="London">London, UK</option>
                      <option value="Tokyo">Tokyo, JP</option>
                      <option value="Berlin">Berlin, DE</option>
                    </select>
                  </div>

                  {/* Room Type */}
                  <div className="flex-1 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Category
                    </label>
                    <select
                      id="hero-search-type"
                      value={heroRoomType}
                      onChange={(e) => setHeroRoomType(e.target.value)}
                      className="bg-transparent text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
                    >
                      <option value="">All Types</option>
                      <option value="Studio">Studio</option>
                      <option value="1-Bedroom">1-Bedroom</option>
                      <option value="Private Room">Private Room</option>
                      <option value="Loft">Loft</option>
                      <option value="Penthouse Suite">Penthouse Suite</option>
                    </select>
                  </div>

                  {/* Search Query */}
                  <div className="flex-[1.5] px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Keyword
                    </label>
                    <input
                      type="text"
                      id="hero-search-keyword"
                      placeholder="e.g. SoMa, Balcony, Fiber..."
                      value={heroSearchQuery}
                      onChange={(e) => setHeroSearchQuery(e.target.value)}
                      className="bg-transparent text-xs font-semibold text-slate-900 focus:outline-none placeholder-slate-400"
                    />
                  </div>

                  {/* Submit Search Button */}
                  <motion.button
                    type="submit"
                    id="hero-search-submit-btn"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </motion.button>

                </div>
              </form>

            </motion.div>

            {/* Hero Right Showcase Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 aspect-[4/3] lg:aspect-[3/4] group">
                <motion.img
                  src={rooms[0]?.images[0]}
                  alt="Nestora Featured Studio"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float Badge 1 */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-slate-100 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">100% Physical Inspection</p>
                    <p className="text-[10px] text-slate-500">Verified by Nestora Curation</p>
                  </div>
                </motion.div>

                {/* Float Badge 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="absolute bottom-4 right-4 bg-slate-900/90 text-white backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-slate-800 flex items-center gap-3"
                >
                  <div className="text-left">
                    <p className="text-xs text-slate-400">Avg Tenant Satisfaction</p>
                    <p className="text-base font-bold text-white flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      4.96 / 5.0
                    </p>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. Featured Rooms */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Curated Spaces
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Rooms & Suites
            </h2>
          </div>
          <motion.button
            id="view-all-featured-btn"
            onClick={() => onNavigate('browse')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start md:self-auto"
          >
            <span>View All Available Rooms</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRooms.map((room) => (
            <StaggerItem key={room.id}>
              <RoomCard
                room={room}
                isWishlisted={wishlist.includes(room.id)}
                onToggleWishlist={onToggleWishlist}
                onSelectRoom={onSelectRoom}
                onQuickView={onQuickView}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 4. Why Choose Nestora */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Uncompromising Quality
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Urbanites Choose Nestora
            </h2>
            <p className="text-sm text-slate-600">
              We eliminated deceptive photos, hidden agency fees, and complicated lease paperwork.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <StaggerItem className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Verified Properties</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every listed room is physically inspected and measured by Nestora agents prior to approval.
              </p>
            </StaggerItem>

            <StaggerItem className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Escrow Security</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Security deposits are held in institutional escrow accounts and returned within 7 days.
              </p>
            </StaggerItem>

            <StaggerItem className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Flexible Leases</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Choose terms starting from 30 days to annual stays based on your remote mobility.
              </p>
            </StaggerItem>

            <StaggerItem className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Live Virtual Tours</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Schedule 1-on-1 walk-throughs with verified property owners without leaving your desk.
              </p>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </section>

      {/* 5. Statistics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
              
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-white">2,400+</p>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Rooms Available</p>
              </div>

              <div className="space-y-1 pt-6 lg:pt-0">
                <p className="text-3xl sm:text-4xl font-extrabold text-white">15,000+</p>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Happy Residents</p>
              </div>

              <div className="space-y-1 pt-6 lg:pt-0">
                <p className="text-3xl sm:text-4xl font-extrabold text-white">42+</p>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Metropolitan Hubs</p>
              </div>

              <div className="space-y-1 pt-6 lg:pt-0">
                <p className="text-3xl sm:text-4xl font-extrabold text-white">99.8%</p>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Verified Owners</p>
              </div>

            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Tenant Voice
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Loved by Designers, Engineers & Founders
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <StaggerItem
              key={t.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.author}</h4>
                  <p className="text-[11px] text-slate-500">{t.role} • {t.location}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 7. FAQ Section Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollReveal className="text-center space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Common Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </ScrollReveal>

        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <ScrollReveal
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  id={`faq-accordion-toggle-${faq.id}`}
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between font-semibold text-sm text-slate-900 hover:bg-slate-50/80 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

    </div>
  );
};
