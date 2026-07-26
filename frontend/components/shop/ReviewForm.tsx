'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useAddReviewMutation } from '@/lib/queries/reviews';
import { isApiError } from '@/lib/api/http';
import StarRating from './StarRating';

export default function ReviewForm({ productId }: { productId: string }) {
  const user = useAuthStore((s) => s.user);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const mutation = useAddReviewMutation(productId);

  if (!hasHydrated) return null;

  if (!user) {
    return (
      <p className="rounded-xl bg-ivory px-4 py-3 text-sm text-neutral-600">
        <Link href={`/login?returnTo=/products`} className="font-medium text-maroon underline">
          Log in
        </Link>{' '}
        to write a review.
      </p>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      toast.error('Please select a rating between 1 and 5 stars.');
      return;
    }
    mutation.mutate(
      { rating, comment: comment.trim() || undefined },
      {
        onSuccess: () => {
          toast.success('Thank you for your review!');
          setRating(0);
          setComment('');
        },
        onError: (err) => {
          toast.error(isApiError(err) ? err.message : 'Could not submit your review. Please try again.');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-neutral-100 p-5">
      <p className="text-sm font-medium text-neutral-800">Write a review</p>
      <StarRating rating={rating} interactive onChange={setRating} size={22} />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience (optional)"
        rows={3}
        className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-gold"
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className="rounded-full bg-maroon px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition hover:bg-maroon-dark active:scale-95 disabled:opacity-60"
      >
        {mutation.isPending ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  );
}
