'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

export default function ShimmerImage({
  src,
  alt,
  sizes,
  className = '',
  priority = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div
        aria-hidden
        className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute inset-0 bg-[#241A11]" />
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      </div>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-[opacity,transform] duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </>
  );
}
