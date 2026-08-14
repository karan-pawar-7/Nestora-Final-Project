import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, X, Map, LayoutGrid, RotateCcw } from 'lucide-react';

const CITIES = ['All Cities', 'San Francisco', 'New York', 'Austin', 'London', 'Tokyo', 'Berlin'];
const ROOM_TYPES = ['All Types', 'Studio', '1-Bedroom', 'Private Room', 'Loft', 'Penthouse Suite'];
const AMENITY_OPTIONS = [
  'High-Speed Fiber WiFi',
  'En-suite Bathroom',
  'Dedicated Ergonomic Workspace',
  'In-Unit Washer & Dryer',
  'Private Balcony',
  'Garage Parking',
  'Pet Friendly'
];

export const SearchFilterBar = ({
  filters,
  onChangeFilters,
  viewMode,
  onChangeViewMode,
  totalResultsCount,
}) => {
  const [expandedFilters, setExpandedFilters] = useState(false);

  const handleCityChange = (city) => {
    onChangeFilters({
      ...filters,
      city: city === 'All Cities' ? '' : city,
    });
  };

  const handleTypeChange = (type) => {
    onChangeFilters({
      ...filters,
      roomType: type === 'All Types' ? '' : type,
    });
  };

  const handleAmenityToggle = (amenity) => {
    const exists = filters.amenities.includes(amenity);
    const newAmenities = exists
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];

    onChangeFilters({
      ...filters,
      amenities: newAmenities,
    });
  };

  const handleReset = () => {
    onChangeFilters({
      searchQuery: '',
      city: '',
      roomType: '',
      minPrice: 0,
      maxPrice: 5000,
      minLeaseMonths: 1,
      amenities: [],
      verifiedOnly: false,
      sortBy: 'recommended',
    });
  };

  const activeFiltersCount =
    (filters.city ? 1 : 0) +
    (filters.roomType ? 1 : 0) +
    (filters.searchQuery ? 1 : 0) +
    filters.amenities.length +
    (filters.verifiedOnly ? 1 : 0) +
    (filters.maxPrice < 5000 ? 1 : 0);

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-4">
      {/* Top Main Search Bar Row */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            id="search-input"
            value={filters.searchQuery}
            onChange={(e) => onChangeFilters({ ...filters, searchQuery: e.target.value })}
            placeholder="Search by neighborhood, street, or keyword..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
          />
          {filters.searchQuery && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onChangeFilters({ ...filters, searchQuery: '' })}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {/* City Select Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
          {CITIES.map((c) => {
            const isSelected = (c === 'All Cities' && !filters.city) || filters.city === c;
            return (
              <motion.button
                key={c}
                id={`city-filter-${c.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleCityChange(c)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {c}
              </motion.button>
            );
          })}
        </div>

        {/* Action Toggle Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
          
          {/* More Filters Modal/Drawer Toggle */}
          <motion.button
            id="toggle-filters-btn"
            onClick={() => setExpandedFilters(!expandedFilters)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
              activeFiltersCount > 0
                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 bg-blue-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </motion.button>

          {/* Grid vs Map View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            <motion.button
              id="view-mode-grid"
              onClick={() => onChangeViewMode('grid')}
              whileTap={{ scale: 0.92 }}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </motion.button>
            <motion.button
              id="view-mode-map"
              onClick={() => onChangeViewMode('map')}
              whileTap={{ scale: 0.92 }}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'map' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Map View"
            >
              <Map className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Expanded Filters Drawer Section with Motion Slide Animation */}
      <AnimatePresence>
        {expandedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Room Type */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Room Category
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ROOM_TYPES.map((t) => {
                    const isSelected = (t === 'All Types' && !filters.roomType) || filters.roomType === t;
                    return (
                      <motion.button
                        key={t}
                        onClick={() => handleTypeChange(t)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {t}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Max Rent Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold uppercase tracking-wider text-slate-500">
                    Max Monthly Rent
                  </label>
                  <span className="font-bold text-slate-900">${filters.maxPrice}/mo</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="5000"
                  step="100"
                  value={filters.maxPrice}
                  onChange={(e) => onChangeFilters({ ...filters, maxPrice: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>$1,000</span>
                  <span>$5,000+</span>
                </div>
              </div>

              {/* Amenities & Verified Switch */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Key Amenities
                </label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {AMENITY_OPTIONS.slice(0, 4).map((amenity) => {
                    const checked = filters.amenities.includes(amenity);
                    return (
                      <label
                        key={amenity}
                        className="flex items-center gap-2 text-slate-700 cursor-pointer hover:text-slate-900"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="truncate">{amenity}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Footer of Expanded Filter */}
              <div className="md:col-span-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={filters.verifiedOnly}
                      onChange={(e) => onChangeFilters({ ...filters, verifiedOnly: e.target.checked })}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    Show Only Verified Properties
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    id="reset-filters-btn"
                    onClick={handleReset}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </motion.button>
                  <motion.button
                    onClick={() => setExpandedFilters(false)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-medium hover:bg-slate-800"
                  >
                    Apply Filters
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Bar & Sort Control */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <p>
          Showing <span className="font-semibold text-slate-900">{totalResultsCount}</span> verified room{totalResultsCount === 1 ? '' : 's'}
        </p>

        <div className="flex items-center gap-2">
          <span>Sort by:</span>
          <select
            id="sort-select"
            value={filters.sortBy}
            onChange={(e) => onChangeFilters({ ...filters, sortBy: e.target.value })}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-medium text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
};
