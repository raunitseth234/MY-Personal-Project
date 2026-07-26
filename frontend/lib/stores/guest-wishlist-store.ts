import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GuestWishlistItem {
  productId: string;
  name: string;
  slug: string;
  image: string | null;
  basePrice: number;
  discountPrice: number | null;
}

interface GuestWishlistState {
  items: GuestWishlistItem[];
  hasHydrated: boolean;
  toggle: (item: GuestWishlistItem) => boolean; // returns new in_wishlist state
  isInWishlist: (productId: string) => boolean;
  remove: (productId: string) => void;
  clear: () => void;
  setHasHydrated: () => void;
}

export const useGuestWishlistStore = create<GuestWishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      toggle: (item) => {
        const exists = get().items.some((i) => i.productId === item.productId);
        if (exists) {
          set({ items: get().items.filter((i) => i.productId !== item.productId) });
          return false;
        }
        set({ items: [...get().items, item] });
        return true;
      },
      isInWishlist: (productId) => get().items.some((i) => i.productId === productId),
      remove: (productId) => set({ items: get().items.filter((i) => i.productId !== productId) }),
      clear: () => set({ items: [] }),
      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: 'rj-guest-wishlist',
      skipHydration: true,
    }
  )
);
