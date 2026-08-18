import React from 'react';

export const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between animate-shimmer relative overflow-hidden h-[380px]">
      <div>
        <div className="w-full h-44 bg-slate-100 rounded-xl mb-3" />
        <div className="h-3.5 bg-slate-100 rounded-md w-24 mb-2" />
        <div className="h-4 bg-slate-200 rounded-md w-full mb-1" />
        <div className="h-4 bg-slate-200 rounded-md w-3/4 mb-3" />
        <div className="h-3 bg-slate-100 rounded-md w-20 mb-3" />
      </div>
      
      <div className="pt-2 border-t border-slate-50">
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 bg-slate-200 rounded w-16" />
          <div className="h-4 bg-slate-100 rounded w-12" />
        </div>
        <div className="h-9 bg-slate-100 rounded-xl w-full" />
      </div>
    </div>
  );
};

export const CategorySkeleton = () => {
  return (
    <div className="flex flex-col items-center p-4 rounded-2xl bg-white border border-slate-100 shadow-sm animate-shimmer">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 mb-3" />
      <div className="h-3.5 bg-slate-200 rounded w-20 mb-1" />
      <div className="h-2.5 bg-slate-100 rounded w-12" />
    </div>
  );
};
