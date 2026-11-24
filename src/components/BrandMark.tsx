import React from 'react';

interface BrandMarkProps {
  compact?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ compact = false }) => {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 text-zinc-900 dark:text-zinc-100 shrink-0"
        aria-hidden="true"
      >
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeOpacity="0.85"
        />
        <path
          d="M10.5 21V13L13.5 9.5L16 12.2L18.5 9.5L21.5 13V21"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="16.5" r="1.4" fill="currentColor" />
      </svg>
      {!compact && (
        <div className="leading-none text-left">
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-zinc-950 dark:text-white whitespace-nowrap">
            Manikineko
          </div>
          <div className="text-[10px] font-medium tracking-[0.12em] uppercase text-zinc-500 dark:text-zinc-400 whitespace-nowrap mt-0.5">
            Netherlands R&amp;D
          </div>
        </div>
      )}
    </div>
  );
};
