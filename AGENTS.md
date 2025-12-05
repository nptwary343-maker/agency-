# AGENTS.md - System Agent (Jules) Operating Manual

## 1. Project Overview
- **Name:** Asthar Hat E-Commerce Platform
- **Type:** Mobile-first, High-performance E-commerce Web App
- **Primary Goal:** Ultra-fast load times (< 0.5s first paint), real-time order tracking, pixel-perfect UI

---

## 2. Tech Stack (Strictly Enforced)
- **Frontend:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (JIT mode only). No custom CSS files.
- **Icons:** lucide-react (thin-stroke icons only)
- **Backend:** Next.js Server Actions & API Routes (Node.js)
- **Database:** PostgreSQL via Prisma ORM
- **Caching:** Redis (5-minute TTL)
- **State Management:** Zustand
- **Validation:** Zod

Constraints:
- Do not import or use other icon packs (no react-icons, no fontawesome).
- Never hardcode API keys or secrets. Use environment variables.
- Prefer server actions for mutations when possible, otherwise API routes.

---

## 3. UI/UX Specification

### App Shell Layout (Responsive)
- **Mobile:**
  - Show a fixed Bottom Navigation Bar with 4 items: Home, Categories, Cart, Profile
  - Hide top Sidebar/Menu
- **Desktop:**
  - Show a Left Sidebar or Mega Menu for Categories
  - Hide Bottom Navigation Bar

### Homepage Sections Order
1. Header: Logo + Search Bar + Cart Count
2. Hero Slider: Banner carousel with autoplay
3. Quick Categories: Circular icons with horizontal scrolling
4. Flash Sale: Countdown timer + Horizontal product scroll
5. "Just For You": Infinite scroll product grid (lazy loading required)

### Product Card Design
- **Aspect Ratio:** Image must be square (1:1) using next/image
- **Typography:**
  - Title: Truncate to max 2 lines
  - Price: Original price (strikethrough/gray), Discounted price (bold/primary)
- **Badges:** Show "% OFF" badge top-left if discount exists
- **Action:** "Add to Cart" button, icon button on mobile

---

## 4. Data Models (Prisma Schema Contract)

### Product
- id: String (UUID)
- title: String
- slug: String (Unique)
- price: Float
- discount_price: Float (Nullable)
- stock_status: Enum (IN_STOCK, OUT_OF_STOCK)
- thumbnail: String (URL)
- category_id: String (Foreign Key)

### OrderTracking
- order_id: String
- rider_id: String
- gps_lat: Float
- gps_lng: Float
- timestamp: DateTime
- status: Enum (PENDING, ACCEPTED, PICKED, DELIVERED)

---

## 5. Coding Standards
- **Performance:**
  - Use next/image for all images
  - Implement lazy loading for the "Just For You" grid
  - Memoize heavy components, use React Server Components by default
  - Prefer edge runtime where feasible; cache with Redis (5-minute TTL)
- **Typing:** Strict TypeScript. Define interfaces/types for data models and component props. Derive types from Prisma where possible.
- **Styling:** Tailwind utility classes only. Consistent spacing, colors, variants.
- **Security:** Validate all inputs with Zod (server and client boundaries). No secrets in code.
- **Accessibility:**
  - Provide aria-labels for icon-only buttons
  - Use semantic landmarks (header/nav/main/footer)
  - Keyboard focus-visible styles on interactive controls

---

## 6. Jules Workflow (Enforced)

### Before Writing Code
1. Re-read this AGENTS.md to align on specs
2. Identify the target route/component and confirm layout rules (mobile/desktop)
3. Plan state and data flows (Zustand slices, server actions, Redis cache keys)
4. Define/confirm TypeScript types and Zod schemas

### While Implementing
- Use lucide-react only for icons
- Use next/image for images with correct aspect ratio
- Validate all input with Zod (forms, API routes, server actions)
- Connect cart and session state via Zustand selectors
- Use async/await, handle errors with typed error responses

### After Implementing
- Add/Update unit tests for price calculation logic
- Ensure Lighthouse pass: performance, accessibility
- Check responsive behavior (mobile/desktop shell rules)
- Ensure no unused imports, no dead code

---

## 7. Definition of Done (DoD) Checklist
- [ ] UI matches the App Shell rules for the viewport (mobile vs desktop)
- [ ] Product cards follow the specified typography, badges, and 1:1 images
- [ ] Search is accessible (form role=search, label/aria-label)
- [ ] Cart count wired to Zustand store (no hard-coded numbers in UI components)
- [ ] All forms/inputs validated with Zod
- [ ] next/image used for all images
- [ ] Components keyboard accessible (focus-visible styles present)
- [ ] Types are strict and explicit for props and data
- [ ] Unit tests added/updated for price calculation logic
- [ ] No forbidden libraries (only lucide-react for icons)
- [ ] No secrets in code

---

## 8. Testing Requirements
- Unit tests for price calculation:
  - Correct final price when discount_price exists
  - Correct % OFF badge calculation and formatting
  - Edge cases: free item (0), negative/invalid discount (guarded), high precision floats (rounding)
- Optional: Component tests for ProductCard rendering states (in stock/out of stock, with/without discount)

Pseudo interface for price logic:
```ts
export function computePrice({ price, discount_price }: { price: number; discount_price?: number | null }) {
  const hasDiscount = typeof discount_price === 'number' && discount_price > 0 && discount_price < price;
  const final = hasDiscount ? discount_price! : price;
  const percentOff = hasDiscount ? Math.round(((price - final) / price) * 100) : 0;
  return { final, hasDiscount, percentOff };
}
```

---

## 9. State Management (Zustand) Conventions
- Place slices under `store/` (e.g., `store/cart.ts`)
- Expose selectors to avoid re-renders
- Example shape:
```ts
import { create } from 'zustand';

export type CartItem = { id: string; title: string; price: number; qty: number; thumbnail: string };

type CartState = {
  items: CartItem[];
  count: () => number;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  count: () => get().items.reduce((acc, it) => acc + it.qty, 0),
  add: (item) => set((s) => ({ items: [...s.items, item] })),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
}));
```

---

## 10. API and Server Actions
- Validate incoming payloads with Zod
- Return typed JSON responses
- Apply Redis caching (5m TTL) for read-heavy endpoints
- Avoid over-fetching; paginate where applicable

---

## 11. Performance Budget
- First paint < 0.5s on modern mobile
- Ship minimal JS; prefer RSC where possible
- Avoid large client bundles; code-split per route/feature

---

## 12. Tooling and Enforcement (Suggested)
- ESLint with Next.js + Tailwind plugins
- Prettier formatting
- TypeScript strict mode
- Optional pre-commit hooks (Husky) for lint, type-check, and tests
- CI: build, lint, type-check, run tests on PRs

---

## 13. PR Review Checklist (For Reviewers)
- [ ] UI shell behavior matches viewport rules
- [ ] ProductCard conformance (image ratio, truncation, badges, CTA)
- [ ] Strict typing and Zod validation coverage
- [ ] State wired through Zustand (no hard-coded display state)
- [ ] Only lucide-react icons used
- [ ] A11y: labels, landmarks, focus-visible
- [ ] Performance: next/image, lazy grids, minimal client-side JS
- [ ] Tests: price calculation updated/added

---

## 14. Do / Don’t
- **Do:** Use server actions, Zod, Zustand, lucide-react, next/image
- **Don’t:** Use other icon libraries, write custom CSS files, bypass type-safety, hardcode secrets

This document defines the single source of truth for the system agent (Jules). All implementations must adhere to these rules and checklists to be accepted.
