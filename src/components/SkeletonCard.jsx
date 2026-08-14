import React from 'react';
import { motion } from 'motion/react';

export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] w-full bg-slate-200" />

      {/* Content Skeleton */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow space-y-3">
        <div className="space-y-2">
          {/* Title & Rating */}
          <div className="flex items-center justify-between gap-2">
            <div className="h-5 bg-slate-200 rounded-md w-3/4" />
            <div className="h-5 bg-slate-200 rounded-md w-12" />
          </div>

          {/* Location */}
          <div className="h-4 bg-slate-100 rounded-md w-1/2 mt-1" />
        </div>

        {/* Specs Pills */}
        <div className="flex items-center gap-2 pt-1">
          <div className="h-6 bg-slate-100 rounded-md w-20" />
          <div className="h-6 bg-slate-100 rounded-md w-28" />
        </div>

        {/* Footer Price & Details */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="h-6 bg-slate-200 rounded-md w-24" />
          <div className="h-4 bg-slate-200 rounded-md w-16" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: i * 0.05 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </div>
  );
};
