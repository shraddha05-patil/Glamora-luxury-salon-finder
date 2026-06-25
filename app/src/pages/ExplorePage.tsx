import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SalonCard from "@/components/SalonCard";
import {
  areas,
  salonTypes,
  serviceCategories,
  filterSalons,
} from "@/data/salons";

gsap.registerPlugin(ScrollTrigger);

/* ─── Filter Sidebar ─── */
function FilterSidebar({
  filters,
  onChange,
  onClear,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  onClear: () => void;
}) {
  const hasFilters =
    filters.areas.length > 0 ||
    filters.types.length > 0 ||
    filters.rating ||
    filters.priceRange.length > 0 ||
    filters.services.length > 0;

  const toggleArray = (key: keyof Filters, value: string) => {
    const arr = (filters[key] as string[]) || [];
    onChange({
      ...filters,
      [key]: arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value],
    });
  };

  return (
    <div className="bg-white rounded-card shadow-subtle p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-h3 text-charcoal">Filters</h3>
        {hasFilters && (
          <button
            onClick={onClear}
            className="text-xs text-gold font-medium hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
          <input
            type="text"
            placeholder="Search salons..."
            value={filters.searchQuery}
            onChange={(e) =>
              onChange({ ...filters, searchQuery: e.target.value })
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-input border border-light-sage text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h4 className="text-label text-sage mb-3">Location</h4>
        <div className="space-y-2">
          {areas.map((area) => (
            <label key={area} className="flex items-center gap-2.5 cursor-pointer">
              <div
                className={`w-[18px] h-[18px] rounded border-2 flex items-center justify-center transition-colors ${
                  filters.areas.includes(area)
                    ? "bg-gold border-gold"
                    : "border-light-sage"
                }`}
                onClick={() => toggleArray("areas", area)}
              >
                {filters.areas.includes(area) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-charcoal">{area}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salon Type */}
      <div className="mb-6">
        <h4 className="text-label text-sage mb-3">Salon Type</h4>
        <div className="space-y-2">
          {salonTypes.map((type) => (
            <label key={type} className="flex items-center gap-2.5 cursor-pointer">
              <div
                className={`w-[18px] h-[18px] rounded border-2 flex items-center justify-center transition-colors ${
                  filters.types.includes(type)
                    ? "bg-gold border-gold"
                    : "border-light-sage"
                }`}
                onClick={() => toggleArray("types", type)}
              >
                {filters.types.includes(type) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-charcoal">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="text-label text-sage mb-3">Rating</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "5\u2605", value: 5 },
            { label: "4\u2605+", value: 4 },
            { label: "3\u2605+", value: 3 },
          ].map((r) => (
            <button
              key={r.value}
              onClick={() =>
                onChange({
                  ...filters,
                  rating: filters.rating === r.value ? undefined : r.value,
                })
              }
              className={`px-3 py-1.5 rounded-pill text-xs font-medium transition-all ${
                filters.rating === r.value
                  ? "bg-gold text-white"
                  : "bg-cream text-sage border border-light-sage"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-label text-sage mb-3">Price Range</h4>
        <div className="space-y-2">
          {["\u20B91,000-\u20B92,000", "\u20B92,000-\u20B93,000", "\u20B93,000-\u20B95,000", "\u20B95,000+"].map(
            (range) => (
              <label
                key={range}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div
                  className={`w-[18px] h-[18px] rounded border-2 flex items-center justify-center transition-colors ${
                    filters.priceRange.includes(range)
                      ? "bg-gold border-gold"
                      : "border-light-sage"
                  }`}
                  onClick={() => toggleArray("priceRange", range)}
                >
                  {filters.priceRange.includes(range) && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-charcoal">{range}</span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Services */}
      <div>
        <h4 className="text-label text-sage mb-3">Services</h4>
        <div className="space-y-2">
          {serviceCategories.map((service) => (
            <label
              key={service}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div
                className={`w-[18px] h-[18px] rounded border-2 flex items-center justify-center transition-colors ${
                  filters.services.includes(service)
                    ? "bg-gold border-gold"
                    : "border-light-sage"
                }`}
                onClick={() => toggleArray("services", service)}
              >
                {filters.services.includes(service) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-charcoal">{service}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Filter Sheet ─── */
function MobileFilterSheet({
  open,
  onClose,
  filters,
  onChange,
  onClear,
}: {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  onChange: (f: Filters) => void;
  onClear: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[998] md:hidden">
      <div className="absolute inset-0 bg-charcoal/50" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-light-sage flex items-center justify-between z-10">
          <h3 className="font-display text-h3">Filters</h3>
          <button onClick={onClose} aria-label="Close">
            <X className="w-5 h-5 text-charcoal" />
          </button>
        </div>
        <div className="p-6">
          <FilterSidebar filters={filters} onChange={onChange} onClear={onClear} />
        </div>
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-light-sage flex gap-3">
          <button
            onClick={onClear}
            className="flex-1 py-3 rounded-pill border border-light-sage text-charcoal text-sm font-medium"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-pill bg-gold text-white text-sm font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Skeleton Card ─── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-card shadow-card overflow-hidden">
      <div className="aspect-[16/9] skeleton-shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-2/3 skeleton-shimmer rounded" />
        <div className="h-4 w-1/2 skeleton-shimmer rounded" />
        <div className="h-4 w-1/3 skeleton-shimmer rounded" />
        <div className="h-10 w-full skeleton-shimmer rounded-pill mt-4" />
      </div>
    </div>
  );
}

interface Filters {
  areas: string[];
  types: string[];
  rating?: number;
  priceRange: string[];
  services: string[];
  searchQuery: string;
  sortBy: string;
}

const defaultFilters: Filters = {
  areas: [],
  types: [],
  priceRange: [],
  services: [],
  searchQuery: "",
  sortBy: "recommended",
};

/* ─── Explore Page ─── */
export default function ExplorePage() {
  const location = useLocation();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const filteredSalons = useMemo(() => filterSalons(filters), [filters]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchValue = params.get("search") || "";
    setFilters((prev) => (prev.searchQuery === searchValue ? prev : { ...prev, searchQuery: searchValue }));
  }, [location.search]);

  useEffect(() => {
    if (resultsRef.current) {
      const cards = resultsRef.current.querySelectorAll(".salon-result-card");
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
    }
  }, [filteredSalons]);

  return (
    <main className="min-h-screen bg-ivory pt-[72px]">
      {/* Header */}
      <div className="bg-cream pt-12 pb-10 page-padding">
        <div className="max-content">
          <div className="flex items-center gap-2 text-xs text-sage mb-3">
            <Link to="/" className="hover:text-charcoal transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gold">Explore</span>
          </div>
          <h1 className="text-display-l font-display text-charcoal">
            Bangalore Luxury Salon Marketplace
          </h1>
          <p className="mt-2 text-base text-sage">
            50 Bangalore women-only luxury salons with AI-assisted discovery, instant booking, and refined luxury experiences.
          </p>
          <div className="mt-6 rounded-[24px] border border-gold/20 bg-white/80 p-4 shadow-[0_12px_45px_rgba(40,31,18,0.08)] backdrop-blur-xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sage" />
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                  placeholder="Search by salon, area, or service"
                  className="w-full rounded-full border border-light-sage bg-white py-3 pl-10 pr-4 text-sm text-charcoal outline-none transition focus:border-gold"
                />
              </div>
              <div className="rounded-full bg-cream px-4 py-2 text-sm text-sage">
                50 curated salons • AI matching • Book now
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="page-padding py-8">
        <div className="max-content flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block w-[280px] flex-shrink-0">
            <div className="sticky top-[100px]">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onClear={() => setFilters(defaultFilters)}
              />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-sage">
                {filteredSalons.length} salon{filteredSalons.length !== 1 ? "s" : ""} found
              </p>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters({ ...filters, sortBy: e.target.value })
                    }
                    className="appearance-none pl-4 pr-10 py-2 rounded-input border border-light-sage text-sm bg-white focus:outline-none focus:border-gold cursor-pointer"
                  >
                    <option value="recommended">Sort by: Recommended</option>
                    <option value="rating">Rating</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage pointer-events-none" />
                </div>
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="md:hidden flex items-center gap-2 px-4 py-2 rounded-pill bg-gold text-white text-sm font-medium"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredSalons.length > 0 ? (
              <div
                ref={resultsRef}
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredSalons.map((salon) => (
                  <div key={salon.id} className="salon-result-card">
                    <SalonCard salon={salon} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
                  <Search className="w-8 h-8 text-sage" />
                </div>
                <h3 className="font-display text-h2 text-charcoal">
                  No salons match your filters
                </h3>
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="mt-4 px-6 py-2.5 rounded-pill bg-gold text-white text-sm font-medium hover:bg-gold/90 transition-all"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <MobileFilterSheet
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(defaultFilters)}
      />
    </main>
  );
}
