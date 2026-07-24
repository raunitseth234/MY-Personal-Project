# Rajesh Jewellers — Frontend ↔ Backend Integration Guide

Copy `api-client.ts` to your Next.js project at `src/lib/api-client.ts`.
Add to `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

## Each Frontend Section → API Endpoint

### 1. Announcement Bar (rotating top messages)
```ts
const announcements = await api.homepage.announcements();
// Returns: [{ id, message, link_url, display_order }]
// Rotate with setInterval every 4000ms
```

### 2. Hero Banner Carousel
```ts
const banners = await api.homepage.heroBanners();
// Returns: [{ id, title, subtitle, image_url, cta_text, cta_url }]
// Sort by display_order, auto-slide every 5s
```

### 3. Category Horizontal Scroll Row
```ts
const categories = await api.products.categories();
// Returns nested tree. Use top-level items for the row icons.
// Each icon links to: /products?category_slug=${cat.slug}
```

### 4. Search Bar (typewriter placeholder)
```ts
// On submit or debounced input:
const results = await api.products.search(query);
// results.items = ProductListItem[]
// Log each search to MongoDB happens automatically server-side
```

### 5. Header Cart Badge Count
```ts
// Call on mount + after any cart mutation:
const { count } = await api.cart.count();
// Shows the "2" badge on the bag icon
```

### 6. Header Wishlist Icon
```ts
// Heart icon toggle on product card:
const { in_wishlist } = await api.wishlist.toggle(productId);
// Fill heart if in_wishlist === true
```

### 7. Featured Products Section
```ts
const featured = await api.products.featured(12);
// ProductListItem[] — use for homepage grid cards
```

### 8. Category Grid (Rings, Earrings, Bangles... etc.)
```ts
const categories = await api.products.categories();
// Same call as #3, use image_url for the card images
```

### 9. Collection Cards (Bangles Collection, Earrings Collection...)
```ts
// These link to filtered product lists:
// "Bangles Collection" → /products?category_slug=bangles
// "Earrings Collection" → /products?category_slug=earrings
// No separate API call needed — just link with category slug
```

### 10. Trust Counters (50+ Years, 10,000+ Customers)
```ts
const stats = await api.homepage.trustStats();
// { years_of_trust: 50, happy_customers: 10000, purity_guarantee: "100%" }
// Animate count-up with IntersectionObserver
```

### 11. Testimonials Carousel
```ts
const testimonials = await api.homepage.testimonials();
// [{ customer_name, customer_location, rating, comment }]
// Auto-slide every 5s with dot indicators
```

### 12. Footer — Store Info
```ts
const locations = await api.homepage.storeLocations();
// [{ name, address, city, phone, opening_hours, map_link }]
```

### 13. Product Listing Page (/products)
```ts
// Read URL params → pass to api.products.list()
const results = await api.products.list({
  category_slug: searchParams.get('category_slug'),
  material: searchParams.get('material'),
  sort: searchParams.get('sort') || 'newest',
  page: Number(searchParams.get('page')) || 1,
  limit: 20,
});
// results.items, results.total, results.pages
```

### 14. Product Detail Page (/products/[slug])
```ts
const product = await api.products.detail(slug);
const related  = await api.products.related(product.id);
// Show images[], variants[], description, price, reviews
```

### 15. Cart Page
```ts
const cart = await api.cart.get();
// cart.items[], cart.subtotal, cart.total_items

// Add button on product page:
await api.cart.add(productId, 1, variantId);

// Qty change:
await api.cart.update(itemId, newQty);

// Remove:
await api.cart.remove(itemId);
```

### 16. Checkout Flow
```ts
// Step 1: Validate coupon (optional)
const couponResult = await api.orders.validateCoupon(code, cartTotal);

// Step 2: Place order
const checkoutResult = await api.orders.checkout(addressId, couponCode);

// Step 3: Open Razorpay modal
const options = {
  key: checkoutResult.razorpay_key,
  amount: checkoutResult.payment_info.amount,
  currency: 'INR',
  order_id: checkoutResult.payment_info.id,
  name: 'Rajesh Jewellers',
  // handler: function(response) { /* payment success */ }
};
// const rzp = new Razorpay(options); rzp.open();
// Razorpay will call your webhook → order auto-confirms
```

### 17. Chat Widget (floating button)
```ts
import { v4 as uuid } from 'uuid';
const sessionId = localStorage.getItem('chat_session') || uuid();
localStorage.setItem('chat_session', sessionId);

const { reply } = await api.chat.send(sessionId, userMessage);
// reply is a string — display in chat bubble
```

### 18. Drawer Menu (hamburger) — Categories
```ts
// Same call as #3:
const categories = await api.products.categories();
// Render list: Rings, Earrings, Chain, Bangles, Stud, Pendants...
```

---

## Razorpay Frontend Setup (when keys are ready)

Add to your `app/layout.tsx`:
```tsx
<Script src="https://checkout.razorpay.com/v1/checkout.js" />
```

After checkout API call:
```tsx
const rzp = new (window as any).Razorpay({
  key: checkoutResult.razorpay_key,
  amount: checkoutResult.payment_info.amount,
  currency: 'INR',
  name: 'Rajesh Jewellers',
  description: 'A unit of Shree Vishwanath Prasad Seth',
  order_id: checkoutResult.payment_info.id,
  handler: (response: any) => {
    // Payment done — backend webhook auto-confirms order
    router.push(`/orders/${checkoutResult.order.order_number}?paid=true`);
  },
  prefill: { name: user.name, email: user.email, contact: user.phone },
  theme: { color: '#7B1E3B' },
});
rzp.open();
```
