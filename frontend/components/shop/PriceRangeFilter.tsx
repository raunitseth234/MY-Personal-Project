'use client';

import { useState } from 'react';

interface Props {
  minPrice?: number;
  maxPrice?: number;
  onApply: (min: number | undefined, max: number | undefined) => void;
}

export default function PriceRangeFilter({ minPrice, maxPrice, onApply }: Props) {
  const [min, setMin] = useState(minPrice?.toString() ?? '');
  const [max, setMax] = useState(maxPrice?.toString() ?? '');

  const apply = () => {
    onApply(min ? Number(min) : undefined, max ? Number(max) : undefined);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        min={0}
        placeholder="Min ₹"
        value={min}
        onChange={(e) => setMin(e.target.value)}
        onBlur={apply}
        onKeyDown={(e) => e.key === 'Enter' && apply()}
        className="w-24 rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-gold"
      />
      <span className="text-neutral-400">–</span>
      <input
        type="number"
        min={0}
        placeholder="Max ₹"
        value={max}
        onChange={(e) => setMax(e.target.value)}
        onBlur={apply}
        onKeyDown={(e) => e.key === 'Enter' && apply()}
        className="w-24 rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-gold"
      />
    </div>
  );
}
