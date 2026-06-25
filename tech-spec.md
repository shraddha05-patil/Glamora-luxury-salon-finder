# Glamora — Technical Specification

## Dependencies

### Production

| Package | Version | Purpose |
|---|---|---|
| react | ^19 | UI framework |
| react-dom | ^19 | DOM renderer |
| react-router-dom | ^7 | Client-side routing (Home, Explore, Salon Detail, About, Login, Profile) |
| three | ^0.172 | 3D engine for voxel attractor hero effect |
| gsap | ^3.12 | Core animation engine, ScrollTrigger, Flip plugin |
| lenis | ^1.2 | Smooth scroll with inertia |
| lucide-react | ^0.469 | Icon library (UI icons) |
| clsx | ^2.1 | Conditional className utility |
| tailwind-merge | ^2.6 | Merge Tailwind classes without conflicts |

### Development

| Package | Version | Purpose |
|---|---|---|
| vite | ^6 | Build tool |
| @vitejs/plugin-react | ^4 | React support for Vite |
| tailwindcss | ^4 | Utility-first CSS |
| @tailwindcss/vite | ^4 | Tailwind Vite plugin |
| typescript | ^5.7 | Type safety |
| @types/react | ^19 | React type definitions |
| @types/react-dom | ^19 | ReactDOM type definitions |
| @types/three | ^0.172 | Three.js type definitions |

### Fonts (loaded via Google Fonts link in index.html)

- Playfair Display: 400, 500, 600
- Inter: 300, 400, 500
- JetBrains Mono: 400

---

## Component Inventory

### Layout Components

| Component | Source | Notes |
|---|---|---|
| Navbar | Custom | Fixed top, glass → solid transition on scroll. Mobile hamburger overlay. |
| Footer | Custom | 4-column grid, newsletter form. |
| PageTransition | Custom | Wraps route outlet, fade out/in on navigation. |
| ScrollToTop | Custom | Resets scroll position on route change. |

### Reusable Components

| Component | Source | Used By |
|---|---|---|
| PillButton | Custom | Throughout — pill-shaped CTA (primary, secondary, ghost variants) |
| SalonCard | Custom | Home (Featured), Explore, Profile (Saved) — image, badge, info, CTA |
| CategoryCard | Custom | Home (Category section) — square image card with overlay text |
| ServiceTag | Custom | SalonCard, SalonDetail — small tag chips for services |
| StarRating | Custom | SalonCard, SalonDetail, Reviews — filled/empty star display |
| SectionHeader | Custom | All sections — label + headline + subhead pattern |
| Input | Custom | All forms — text, email, password, textarea variants with focus/error states |
| Select | Custom | AI Finder, Booking, Filters — custom dropdown |
| Slider | Custom | AI Finder budget — range input with styled track/thumb |
| Checkbox | Custom | Filters — custom styled checkbox group |
| RadioCard | Custom | AI Finder vibe — selectable card row |
| SkeletonCard | Custom | Explore loading state — shimmer animation |
| Toast | Custom | Global — success/error notifications |
| Modal | Custom | Booking flow, mobile filters — overlay with content |
| Breadcrumb | Custom | Explore, Salon Detail — navigation trail |

### Page Sections (Home)

| Section | Notes |
|---|---|
| HeroSection | Full-viewport, Three.js canvas background + gradient overlay + headline/CTAs |
| FeaturedSalonsSection | 3-column grid of SalonCards with staggered scroll reveal |
| CategorySection | 3x2 grid of CategoryCards, horizontal scroll on mobile |
| AIFinderSection | Interactive AI recommendation form with multi-step inputs |
| ScrollRevealGallery | Editorial image gallery with clip-path reveal animations |
| TestimonialsSection | Dark background, 3-column testimonial cards |
| CTABannerSection | Gold gradient banner with CTA |

### Page Sections (Explore)

| Section | Notes |
|---|---|
| ExploreHeader | Page title, subtitle, breadcrumb |
| FilterSidebar | Sticky sidebar with all filter controls |
| MobileFilterSheet | Bottom sheet modal for mobile filters |
| ResultsGrid | Salon cards grid with sort dropdown |
| Pagination | Page number pills |

### Page Sections (Salon Detail)

| Section | Notes |
|---|---|
| SalonHeroGallery | Full-width image gallery with thumbnails |
| SalonInfoBar | Location, rating, category, action buttons |
| SalonAbout | Description + specialties tags |
| ServicesTable | Service list with prices, durations, book buttons |
| ReviewsSection | Rating breakdown + review cards |
| BookingCard | Sticky sidebar — service, date, time, book CTA |
| BookingModal | Multi-step booking flow (4 steps) |

### Page Sections (About)

| Section | Notes |
|---|---|
| AboutHero | Headline + subtitle |
| StorySection | Two-column: image + text + stats counters |
| ValuesSection | 3-column value cards |
| SpatialTypographyGrid | GSAP Flip grid gallery with scroll-driven layout transition |

### Page Sections (Login/Register)

| Section | Notes |
|---|---|
| AuthLayout | Two-panel: image left, form right |
| LoginForm | Email, password, remember me, social login |
| RegisterForm | Name, email, phone, password, terms |

### Page Sections (Profile)

| Section | Notes |
|---|---|
| ProfileSidebar | Avatar, nav links |
| BookingsView | Upcoming/past tabs, booking cards |
| SavedSalonsView | Grid of salon cards |
| ProfileSettingsView | Editable profile form |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|---|---|---|---|
| Voxel Attractor (hero) | Three.js raw | InstancedMesh with De Jong attractor math, per-frame color updates, mouse-driven camera parallax | **High** 🔒 |
| Spatial Typography Grid (about) | GSAP Flip + ScrollTrigger | Capture switched/unswitched grid layout states, scrub between them on scroll | **High** 🔒 |
| Scroll-Driven Image Reveal | GSAP + ScrollTrigger | clip-path inset animations on gallery items, synced counter | **Medium** |
| Hero entrance sequence | GSAP | Timeline: headline fade+translateY, subtitle, CTAs with delays | **Low** |
| Section scroll reveals | GSAP + ScrollTrigger | Batch translateY+opacity reveals, staggered children | **Low** |
| Card hover effects | CSS + Tailwind | translateY, shadow, image scale transitions | **Low** |
| Navbar scroll transition | CSS + JS | Class toggle at 100px scroll, CSS transitions for bg/border/shadow | **Low** |
| Salon card stagger | GSAP + ScrollTrigger | Staggered fade-in on FeaturedSalons and Explore grids | **Low** |
| AI Finder result reveal | GSAP | translateY slide-up on result card appearance | **Low** |
| Booking modal | GSAP | Fade in/out overlay, content scale | **Low** |
| Page transitions | GSAP | Fade out current, route change, fade in new | **Low** |
| Button shimmer (AI submit) | CSS | Background gradient animation sweep | **Low** |
| Skeleton shimmer | CSS | Background gradient sweep animation | **Low** |
| Toast notifications | GSAP | Slide in from right, auto-dismiss slide out | **Low** |
| Mobile menu overlay | GSAP | Staggered link fade-in, overlay fade | **Low** |
| Mobile filter sheet | CSS/JS | translateY slide-up from bottom | **Low** |
| Booking step transitions | GSAP | Cross-fade between steps | **Low** |
| Scroll indicator pulse | CSS | Opacity keyframe animation | **Low** |
| Testimonial entrance | GSAP + ScrollTrigger | Staggered fade-in on scroll | **Low** |

---

## State & Logic Plan

### Routing (React Router v7)

Routes: `/` (Home), `/explore` (Explore), `/salon/:id` (Salon Detail), `/about` (About), `/login` (Login/Register), `/profile` (Profile).

### Global State (React Context)

**ToastContext**: Queue-based toast system. Components call `showToast(message, type)` which appends to queue. Toaster component renders active toast with auto-dismiss timer.

**AuthContext**: `user` object (null when logged out), `login()`, `logout()`, `register()` functions. For MVP, store in localStorage.

### Page-Level State

**Explore page**: Filter state (location[], type, rating, price[], services[], searchQuery, sortBy). URL-synced via query params for shareability. Computed: filtered + sorted salon list.

**AI Finder**: Form state (service, areas[], budget, vibe). Submission triggers simulated AI delay (1.5s), then displays result.

**Salon Detail Booking**: Selected service, date, time slot. Booking modal open/closed, current step (1-4). Form state for step 2 (name, phone, email, notes).

**Profile**: Active tab (bookings/saved/settings), booking filter (upcoming/past).

### Data Flow

- All salon data is static mock data defined in `src/data/salons.ts` (30+ salon objects with full details).
- Booking submissions are stored in localStorage under `glamora_bookings`.
- Saved salons stored in localStorage under `glamora_saved`.
- No backend API calls in MVP.

---

## Other Key Decisions

### Three.js Integration

The voxel attractor uses raw Three.js (not React Three Fiber) because:
1. It's a single self-contained canvas with imperative animation loop
2. No need for React component tree inside the 3D scene
3. Direct port of the design's vanilla WebGL algorithm to Three.js InstancedMesh

The canvas is wrapped in a React component that handles: mount/unmount lifecycle, resize observer, mousemove listener, and cleanup on unmount. All Three.js objects (renderer, scene, camera, geometry, material, instancedMesh) are stored in refs, not state.

### Mobile Voxel Attractor Optimization

On viewports < 768px, reduce VOXEL_COUNT to 6000 and disable mouse-follow camera parallax. Detect via `window.innerWidth` check on init (not responsive after init — acceptable tradeoff).

### GSAP Plugin Registration

All GSAP plugins (ScrollTrigger, Flip) are registered once at app entry. Lenis scroll is integrated with GSAP's ticker so ScrollTrigger updates sync with smooth scroll position.

### Image Asset Strategy

All images are generated AI assets placed in `/public/assets/`. Loaded via standard `<img>` with lazy loading (`loading="lazy"`) for below-fold images. The Three.js canvas starts rendering immediately, independent of image load state.
