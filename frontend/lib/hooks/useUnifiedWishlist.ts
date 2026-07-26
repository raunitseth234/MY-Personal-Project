import { useAuthStore } from '@/lib/stores/auth-store';
import { useGuestWishlistStore, type GuestWishlistItem } from '@/lib/stores/guest-wishlist-store';
import { useToggleWishlistMutation, useWishlistQuery } from '@/lib/queries/wishlist';
import { toNumber } from '@/lib/utils/format';

export interface UnifiedWishlistItem {
  productId: string;
  name: string;
  slug: string;
  image: string | null;
  basePrice: number;
  discountPrice: number | null;
}

export function useUnifiedWishlist() {
  const user = useAuthStore((s) => s.user);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const isLoggedIn = hasHydrated && !!user;

  const guestItems = useGuestWishlistStore((s) => s.items);
  const guestToggle = useGuestWishlistStore((s) => s.toggle);
  const guestIsInWishlist = useGuestWishlistStore((s) => s.isInWishlist);

  const wishlistQuery = useWishlistQuery(isLoggedIn);
  const toggleMutation = useToggleWishlistMutation();

  const items: UnifiedWishlistItem[] = isLoggedIn
    ? (wishlistQuery.data ?? []).map((i) => ({
        productId: i.product_id,
        name: i.name,
        slug: i.slug,
        image: i.primary_image,
        basePrice: toNumber(i.base_price),
        discountPrice: i.discount_price ? toNumber(i.discount_price) : null,
      }))
    : guestItems;

  return {
    items,
    isLoggedIn,
    isLoading: isLoggedIn ? wishlistQuery.isLoading : !useGuestWishlistStore.getState().hasHydrated,
    isInWishlist: (productId: string) =>
      isLoggedIn ? items.some((i) => i.productId === productId) : guestIsInWishlist(productId),
    toggle: (item: GuestWishlistItem) => {
      if (isLoggedIn) {
        toggleMutation.mutate(item.productId);
      } else {
        guestToggle(item);
      }
    },
  };
}
