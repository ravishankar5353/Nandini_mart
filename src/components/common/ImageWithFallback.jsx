import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';

export const ImageWithFallback = ({
  src,
  alt = 'Grocery product',
  className = '',
  category = 'Grocery',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100/60 text-emerald-700 p-4 select-none ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-emerald-200/70 flex items-center justify-center mb-1">
          <ShoppingBag className="w-6 h-6 text-emerald-800" />
        </div>
        <span className="text-[11px] font-semibold text-emerald-850 text-center line-clamp-1">
          {alt}
        </span>
        <span className="text-[9px] text-emerald-600 font-medium tracking-wide uppercase">
          {category}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
      {...props}
    />
  );
};
