'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import type { ProductDetail } from '@/lib/api/types';
import { formatPrice, toNumber } from '@/lib/utils/format';
import { useUnifiedWishlist } from '@/lib/hooks/useUnifiedWishlist';
import ShimmerImage from '@/components/ui/ShimmerImage';
import StarRating from '@/components/shop/StarRating';
import ReviewList from '@/components/shop/ReviewList';
import ReviewForm from '@/components/shop/ReviewForm';
import RelatedProducts from './RelatedProducts';

export default function ProductDetailClient({ product }: { product: ProductDetail }) {
  const images = product.images.length > 0 ? product.images : product.primary_image ? [{
    id: 'primary', image_url: product.primary_image, display_order: 0, is_primary: true,
  }] : [];

  const [activeImage, setActiveImage] = useState(0);

  // carat variants (e.g. 18K/22K/24K) — sorted ascending, default = product's own purity
  const karat = (v: { purity: string | null }) => parseInt(v.purity ?? '', 10) || 0;
  const sortedVariants = [...product.variants].sort((a, b) => karat(a) - karat(b));
  const defaultVariantId =
    product.variants.find((v) => v.purity === product.purity)?.id ??
    product.variants[0]?.id ??
    null;
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(defaultVariantId);

  const wishlist = useUnifiedWishlist();
  const inWishlist = wishlist.isInWishlist(product.id);

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) ?? null;
  // server-computed price (live gold rate × weight + making + GST); switches with carat
  const price = toNumber(selectedVariant ? selectedVariant.price : product.price);
  const currentPurity = selectedVariant?.purity ?? product.purity;
  const stockAvailable = selectedVariant ? selectedVariant.stock_quantity : product.stock_quantity;
  const outOfStock = stockAvailable <= 0;

  const handleWishlistToggle = () => {
    wishlist.toggle({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.primary_image,
      basePrice: price,
      discountPrice: null,
    });
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <>
      <div className="container grid gap-10 py-10 md:grid-cols-2 md:py-14">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-ivory ring-1 ring-neutral-200/70">
            {images.length > 0 ? (
              <ShimmerImage
                src={images[activeImage]?.image_url ?? images[0].image_url}
                alt={product.name}
                sizes="(min-width: 768px) 45vw, 90vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-400">No image available</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-2 transition ${
                    i === activeImage ? 'ring-maroon' : 'ring-transparent hover:ring-gold/50'
                  }`}
                >
                  <ShimmerImage src={img.image_url} alt={`${product.name} ${i + 1}`} sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {(product.category_name ?? product.category?.name) && (
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold-dark">
              {product.category_name ?? product.category?.name}
            </p>
          )}
          <h1 className="mt-2 font-serif text-3xl text-maroon md:text-4xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={product.average_rating ?? 0} size={16} />
            <span className="text-sm text-neutral-500">
              {product.review_count > 0 ? `${product.review_count} review${product.review_count === 1 ? '' : 's'}` : 'No reviews yet'}
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-maroon">{formatPrice(price)}</span>
            {product.discount_price && !selectedVariant && (
              <span className="text-base text-neutral-400 line-through">
                {formatPrice(product.base_price)}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-neutral-500">Inclusive of GST · price as per current metal rate</p>

          <div className="mt-5 flex flex-wrap gap-2 text-sm text-neutral-600">
            <span className="rounded-full bg-ivory px-3 py-1 capitalize">Material: {product.material}</span>
            {currentPurity && <span className="rounded-full bg-ivory px-3 py-1">Purity: {currentPurity}</span>}
            {product.weight_grams && <span className="rounded-full bg-ivory px-3 py-1">Weight: {toNumber(product.weight_grams)} g</span>}
          </div>

          {product.variants.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-neutral-700">
                Purity{currentPurity ? `: ${currentPurity}` : ''}
              </p>
              <div className="flex flex-wrap gap-2">
                {sortedVariants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantId(v.id)}
                    disabled={v.stock_quantity <= 0}
                    className={`rounded-full border px-4 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      selectedVariantId === v.id
                        ? 'border-maroon bg-maroon text-white'
                        : 'border-neutral-200 text-neutral-700 hover:border-maroon'
                    }`}
                  >
                    {v.purity ?? v.variant_name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.description && (
            <p className="mt-6 text-sm leading-relaxed text-neutral-600">{product.description}</p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={handleWishlistToggle}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition hover:border-maroon hover:text-maroon active:scale-90"
            >
              <Heart className={`h-5 w-5 ${inWishlist ? 'fill-maroon text-maroon' : ''}`} />
            </button>
          </div>

          {outOfStock ? (
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-neutral-500">Out of Stock</p>
          ) : (
            stockAvailable <= 5 && (
              <p className="mt-3 text-xs text-maroon">Only {stockAvailable} left in stock</p>
            )
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="container border-t border-neutral-100 py-12">
        <h2 className="font-serif text-2xl text-maroon">Customer Reviews</h2>
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <ReviewList productId={product.id} />
          <ReviewForm productId={product.id} />
        </div>
      </div>

      <RelatedProducts productId={product.id} />
    </>
  );
}
