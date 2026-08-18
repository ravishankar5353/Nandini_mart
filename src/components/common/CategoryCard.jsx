import React from 'react';
import { Link } from 'react-router-dom';

export const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className="group flex flex-col items-center p-3.5 md:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-500/50 hover:shadow-card transition-all duration-300 transform hover:-translate-y-1 text-center"
    >
      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${category.color || 'from-emerald-50 to-emerald-100'} flex items-center justify-center text-2xl md:text-3xl mb-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300 border border-slate-100`}>
        <span>{category.icon}</span>
      </div>
      <h3 className="font-bold text-xs md:text-sm text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
        {category.shortName || category.name}
      </h3>
      <span className="text-[11px] text-slate-400 font-medium mt-0.5">
        {category.itemCount || '10+'} items
      </span>
    </Link>
  );
};
