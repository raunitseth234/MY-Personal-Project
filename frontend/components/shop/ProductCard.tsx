'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import type { ProductListItem } from '@/lib/api/types';
import { formatPrice, toNumber } from '@/lib/utils/format';
import { useUnifiedWishlist } from '@/lib/hooks/useUnifiedWishlist';
import ShimmerImage from '@/components/ui/ShimmerImage';

export default function ProductCard({ product }: { product: ProductListItem }) {
  const wishlist = useUnifiedWishlist();
  const inWishlist = wishlist.isInWishlist(product.id);
  const price = toNumber(product.price);
  const outOfStock = product.stock_quantity <= 0;
  const weight = product.weight_grams ? toNumber(product.weight_grams) : null;
  const specLine = [product.purity, weight ? `${weight} g` : null].filter(Boolean).join(' · ');

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    wishlist.toggle({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.primary_image,
      basePrice: toNumber(product.price),
      discountPrice: null,
    });
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-ivory ring-1 ring-neutral-200/70 transition duration-500 group-hover:shadow-gold-glow group-hover:ring-gold/60">
        {product.primary_image ? (
          <ShimmerImage
            src={product.primary_image}
            alt={product.name}
            sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
            className="group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-400">No image</div>
        )}

        <button
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={handleWishlistToggle}
          className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-2 text-neutral-600 shadow-sm backdrop-blur transition duration-200 hover:text-maroon active:scale-90"
        >
          <Heart className={`h-4 w-4 ${inWishlist ? 'fill-maroon text-maroon' : ''}`} />
        </button>

        {product.discount_price && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-maroon px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white">
            Sale
          </span>
        )}

        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-neutral-800">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="mt-3">
        {product.category_name && (
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold-dark">{product.category_name}</p>
        )}
        <p className="mt-1 truncate text-sm font-medium text-neutral-800 transition group-hover:text-maroon">
          {product.name}
        </p>
        {specLine && (
          <p className="mt-0.5 text-[11px] text-neutral-500">{specLine}</p>
        )}
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-maroon">{formatPrice(price)}</span>
          {product.discount_price && (
            <span className="text-xs text-neutral-400 line-through">{formatPrice(product.base_price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
