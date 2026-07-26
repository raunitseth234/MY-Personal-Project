import { useQueryClient } from '@tanstack/react-query';
import { wishlistApi } from '@/lib/api/endpoints/wishlist';
import { useGuestWishlistStore } from '@/lib/stores/guest-wishlist-store';

/**
 * Fires right after login/register stores tokens. Wishlist merge is NOT idempotent —
 * POST /wishlist/toggle flips state — so we fetch the server wishlist first and only toggle
 * items the server doesn't already have.
 */
export function useGuestWishlistMerge() {
  const queryClient = useQueryClient();

  return async function mergeGuestData() {
    const guestWishlistItems = useGuestWishlistStore.getState().items;

    if (guestWishlistItems.length > 0) {
      try {
        const serverWishlist = await wishlistApi.get();
        const existingIds = new Set(serverWishlist.map((i) => i.product_id));
        const toAdd = guestWishlistItems.filter((i) => !existingIds.has(i.productId));
        await Promise.allSettled(toAdd.map((i) => wishlistApi.toggle(i.productId)));
      } catch {
        // if the wishlist fetch itself fails, skip the merge rather than risk toggling
        // items that might already exist server-side
      }
      useGuestWishlistStore.getState().clear();
    }

    queryClient.invalidateQueries({ queryKey: ['wishlist'] });
  };
}
