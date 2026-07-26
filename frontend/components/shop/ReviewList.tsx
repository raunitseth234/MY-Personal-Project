'use client';

import { useReviewsQuery } from '@/lib/queries/reviews';
import { formatDate } from '@/lib/utils/format';
import StarRating from './StarRating';

export default function ReviewList({ productId }: { productId: string }) {
  const { data: reviews, isLoading } = useReviewsQuery(productId);

  if (isLoading) {
    return <p className="text-sm text-neutral-400">Loading reviews…</p>;
  }

  if (!reviews || reviews.length === 0) {
    return <p className="text-sm text-neutral-500">No reviews yet — be the first to share your experience.</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-neutral-100 pb-6 last:border-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-800">{review.user_name}</p>
            <span className="text-xs text-neutral-400">{formatDate(review.created_at)}</span>
          </div>
          <div className="mt-1.5">
            <StarRating rating={review.rating} size={14} />
          </div>
          {review.comment && <p className="mt-2 text-sm leading-relaxed text-neutral-600">{review.comment}</p>}
          {review.is_verified_purchase && (
            <span className="mt-2 inline-block text-[10px] uppercase tracking-wide text-gold-dark">
              Verified Purchase
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
