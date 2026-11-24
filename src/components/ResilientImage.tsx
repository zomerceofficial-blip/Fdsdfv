import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  aspectClassName = 'aspect-video',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-xl bg-zinc-200/70 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 p-8 ${aspectClassName} ${className}`}
        role="img"
        aria-label={alt}
      >
        <Layers className="w-6 h-6 mb-2 stroke-[1.25] text-zinc-400 dark:text-zinc-500" />
        <span className="text-xs text-center max-w-[26ch] text-zinc-600 dark:text-zinc-400">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-900 ${aspectClassName} ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover grayscale contrast-[1.03]"
      />
    </div>
  );
};
