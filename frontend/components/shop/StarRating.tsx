'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

interface ReadOnlyProps {
  rating: number;
  size?: number;
  interactive?: false;
}

interface InteractiveProps {
  rating: number;
  size?: number;
  interactive: true;
  onChange: (rating: number) => void;
}

export default function StarRating(props: ReadOnlyProps | InteractiveProps) {
  const { rating, size = 16 } = props;
  const [hover, setHover] = useState<number | null>(null);
  const display = props.interactive && hover !== null ? hover : rating;

  return (
    <div className="flex gap-0.5 text-gold">
      {Array.from({ length: 5 }).map((_, i) => {
        const value = i + 1;
        const filled = value <= Math.round(display);
        const star = (
          <Star
            key={i}
            style={{ width: size, height: size }}
            className={filled ? 'fill-current' : 'fill-none text-neutral-300'}
          />
        );
        if (!props.interactive) return star;
        return (
          <button
            key={i}
            type="button"
            aria-label={`Rate ${value} star${value > 1 ? 's' : ''}`}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(null)}
            onClick={() => props.onChange(value)}
          >
            {star}
          </button>
        );
      })}
    </div>
  );
}
