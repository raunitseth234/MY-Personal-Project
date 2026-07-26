'use client';

import Link from 'next/link';
import { Heart, X } from 'lucide-react';
import { useUnifiedWishlist } from '@/lib/hooks/useUnifiedWishlist';
import { useGuestWishlistStore } from '@/lib/stores/guest-wishlist-store';
import { useAuthStore } from '@/lib/stores/auth-store';
import { formatPrice } from '@/lib/utils/format';
import ShimmerImage from '@/components/ui/ShimmerImage';
import EmptyState from '@/components/shop/EmptyState';
import SectionHeading from '@/components/ui/SectionHeading';

export default function WishlistPage() {
  const wishlist = useUnifiedWishlist();
  const isLoggedIn = useAuthStore((s) => !!s.user && s.hasHydrated);
  const guestRemove = useGuestWishlistStore((s) => s.remove);

  const handleRemove = (productId: string) => {
    if (!isLoggedIn) {
      guestRemove(productId);
    } else {
      wishlist.toggle({ productId, name: '', slug: '', image: null, basePrice: 0, discountPrice: null });
    }
  };

  return (
    <div className="container py-10 md:py-14">
      <SectionHeading eyebrow="Saved For Later" title="Your Wishlist" />

      {wishlist.isLoading ? (
        <p className="text-center text-sm text-neutral-400">Loading your wishlist…</p>
      ) : wishlist.items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          message="Tap the heart icon on any piece to save it here."
          actionLabel="Explore Jewellery"
          actionHref="/products"
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {wishlist.items.map((item) => (
            <div key={item.productId} className="group relative">
              <Link href={`/products/${item.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-ivory ring-1 ring-neutral-200/70">
                  {item.image ? (
                    <ShimmerImage src={item.image} alt={item.name} sizes="(min-width: 1024px) 23vw, 45vw" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-400">No image</div>
                  )}
                </div>
                <p className="mt-3 truncate text-sm font-medium text-neutral-800 group-hover:text-maroon">{item.name}</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-maroon">
                    {formatPrice(item.discountPrice ?? item.basePrice)}
                  </span>
                  {item.discountPrice && (
                    <span className="text-xs text-neutral-400 line-through">{formatPrice(item.basePrice)}</span>
                  )}
                </div>
              </Link>

              <div className="mt-2 flex gap-2">
                <button
                  aria-label="Remove from wishlist"
                  onClick={() => handleRemove(item.productId)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-neutral-200 py-2 text-[11px] font-medium uppercase tracking-wide text-neutral-500 transition hover:border-red-300 hover:text-red-600"
                >
                  <X className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
