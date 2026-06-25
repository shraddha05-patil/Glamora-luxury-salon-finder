from pathlib import Path

content = r'''export interface Salon {
  id: string;
  name: string;
  location: string;
  area: string;
  rating: number;
  reviewCount: number;
  category: string;
  type: string;
  description: string;
  specialties: string[];
  services: Service[];
  image: string;
  images: string[];
  priceRange: string;
  startingPrice: number;
  aiMatch?: number;
  badges: string[];
  contact: {
    phone: string;
    website?: string;
  };
  hours: string;
  availability: string;
  vibe: string;
  coords: {
    lat: number;
    lng: number;
  };
}

export interface Service {
  name: string;
  price: number;
  duration: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  service: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
  slug: string;
  description: string;
  priceRange: string;
  popularServices: string[];
  icon?: string;
}

const coordsByArea: Record<string, { lat: number; lng: number }> = {
  Indiranagar: { lat: 12.9719, lng: 77.6410 },
  Koramangala: { lat: 12.9351, lng: 77.6248 },
  Whitefield: { lat: 12.9698, lng: 77.7500 },
  "HSR Layout": { lat: 12.9116, lng: 77.6476 },
  "Electronic City": { lat: 12.8456, lng: 77.6628 },
  Jayanagar: { lat: 12.9260, lng: 77.5852 },
  "JP Nagar": { lat: 12.9061, lng: 77.5832 },
  "MG Road": { lat: 12.9754, lng: 77.6067 },
  Marathahalli: { lat: 12.9592, lng: 77.6974 },
  Bellandur: { lat: 12.9308, lng: 77.6782 },
};

export const areas = [
  "Indiranagar",
  "Koramangala",
  "Whitefield",
  "HSR Layout",
  "Electronic City",
  "Jayanagar",
  "JP Nagar",
  "MG Road",
  "Marathahalli",
  "Bellandur",
];

export const salonTypes = ["Luxury Salon", "Spa", "Hair Studio", "Makeup Studio", "Nail Studio"];
export const serviceCategories = ["Hair", "Spa", "Facial", "Makeup", "Nails", "Bridal"];

export const categories: Category[] = [
  {
    id: "1",
    name: "Hair Studio",
    image: "/assets/img-category-hair.jpg",
    count: 50,
    slug: "hair",
    description: "Precision cuts, luxury colour and signature blowouts for polished women.",
    priceRange: "₹1,000 - ₹5,000",
    popularServices: ["Haircut", "Color", "Blowout", "Keratin"],
  },
  {
    id: "2",
    name: "Skin & Facial",
    image: "/assets/img-category-skin.jpg",
    count: 50,
    slug: "skin",
    description: "Glow-boosting facials and skin rituals tailored for your tone.",
    priceRange: "₹1,500 - ₹4,500",
    popularServices: ["Facial", "Glow Peel", "Skin Therapy"],
  },
  {
    id: "3",
    name: "Spa & Wellness",
    image: "/assets/img-category-spa.jpg",
    count: 50,
    slug: "spa",
    description: "Relaxing spa rituals and wellness therapies for complete restoration.",
    priceRange: "₹2,000 - ₹6,000",
    popularServices: ["Massage", "Spa Ritual", "Body Polish"],
  },
  {
    id: "4",
    name: "Bridal Beauty",
    image: "/assets/img-category-bridal.jpg",
    count: 50,
    slug: "bridal",
    description: "Elegant bridal styling, makeup and hair for your most memorable day.",
    priceRange: "₹5,000 - ₹15,000",
    popularServices: ["Bridal Makeup", "Hair Styling", "Trial"],
  },
  {
    id: "5",
    name: "Nail Studio",
    image: "/assets/img-category-nail.jpg",
    count: 50,
    slug: "nails",
    description: "Luxury manicures, pedicures and artistic nail design.",
    priceRange: "₹800 - ₹3,000",
    popularServices: ["Gel Nails", "Manicure", "Pedicure"],
  },
  {
    id: "6",
    name: "Makeup Studio",
    image: "/assets/img-salon-5.jpg",
    count: 50,
    slug: "makeup",
    description: "Soft glam, editorial looks and event makeup for every occasion.",
    priceRange: "₹1,500 - ₹8,000",
    popularServices: ["Party Makeup", "Wedding Makeup", "Airbrush"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya S.",
    avatar: "/assets/img-testimonial-1.jpg",
    rating: 5,
    comment: "The recommendation engine found a salon that matched my bridal brief perfectly and the experience felt luxurious from start to finish.",
    service: "Bridal Makeup",
  },
  {
    id: "2",
    name: "Nisha P.",
    avatar: "/assets/img-testimonial-3.jpg",
    rating: 5,
    comment: "The visuals, filters and booking flow made it simple to find a premium salon in Indiranagar in minutes.",
    service: "Hair Styling",
  },
  {
    id: "3",
    name: "Meera R.",
    avatar: "/assets/img-testimonial-3.jpg",
    rating: 5,
    comment: "I loved how every salon listing included pricing, rating, services and availability in one polished card.",
    service: "Spa Ritual",
  },
];

function createSalonImage(name: string, index: number): string {
  const palette = [
    ["#1f1a16", "#d7b36b", "#f6efe2", "#a45e2a"],
    ["#2d2438", "#d6a85f", "#f9f2e7", "#8a5a3a"],
    ["#1c2a2f", "#c59b63", "#f7f0e6", "#6c4931"],
    ["#2f2722", "#e0bf72", "#f8efe2", "#8e6143"],
    ["#232b33", "#d7b36b", "#f5e8d2", "#7b4f2e"],
  ][index % 5];
  const [bg, gold, cream, accent] = palette;
  const accent2 = index % 2 === 0 ? "#ffffff" : "#f2dbc0";
  const title = name.replace(/&/g, "and").slice(0, 24);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <rect width="1200" height="800" rx="40" fill="${bg}" />
      <rect x="70" y="80" width="1060" height="640" rx="32" fill="${cream}" />
      <rect x="120" y="150" width="240" height="260" rx="24" fill="${accent2}" />
      <rect x="390" y="150" width="320" height="260" rx="24" fill="${accent}" />
      <rect x="740" y="150" width="340" height="260" rx="24" fill="${accent2}" />
      <rect x="120" y="450" width="960" height="220" rx="28" fill="#ffffff" opacity="0.9" />
      <rect x="170" y="490" width="220" height="140" rx="20" fill="${bg}" />
      <rect x="420" y="490" width="260" height="140" rx="20" fill="${gold}" />
      <rect x="710" y="490" width="260" height="140" rx="20" fill="${bg}" />
      <circle cx="190" cy="280" r="70" fill="${gold}" opacity="0.95" />
      <circle cx="190" cy="280" r="38" fill="${cream}" />
      <rect x="150" y="330" width="90" height="60" rx="16" fill="${accent}" />
      <rect x="438" y="180" width="200" height="110" rx="18" fill="${cream}" />
      <rect x="780" y="185" width="180" height="140" rx="20" fill="${bg}" />
      <path d="M830 300h90" stroke="${gold}" stroke-width="10" stroke-linecap="round" />
      <path d="M870 185l60 36" stroke="${accent}" stroke-width="10" stroke-linecap="round" />
      <path d="M180 650h820" stroke="${gold}" stroke-width="8" stroke-linecap="round" opacity="0.3" />
      <text x="170" y="722" fill="${bg}" font-size="40" font-family="Segoe UI, Arial, sans-serif" font-weight="700">${title}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildServices(serviceTags: string[], basePrice: number): Service[] {
  const services: Service[] = [];
  if (serviceTags.includes("Hair")) {
    services.push({ name: "Signature Hair Service", price: basePrice + 260, duration: "45 min", category: "Hair" });
  }
  if (serviceTags.includes("Facial")) {
    services.push({ name: "Glow Facial", price: basePrice + 650, duration: "60 min", category: "Facial" });
  }
  if (serviceTags.includes("Spa")) {
    services.push({ name: "Relaxing Spa Ritual", price: basePrice + 1100, duration: "75 min", category: "Spa" });
  }
  if (serviceTags.includes("Nails")) {
    services.push({ name: "Premium Nail Care", price: basePrice + 220, duration: "45 min", category: "Nails" });
  }
  if (serviceTags.includes("Makeup")) {
    services.push({ name: "Soft Glam Makeup", price: basePrice + 1600, duration: "90 min", category: "Makeup" });
  }
  if (serviceTags.includes("Bridal")) {
    services.push({ name: "Bridal Styling", price: basePrice + 3600, duration: "120 min", category: "Bridal" });
  }
  return services;
}

const salonBlueprints = [
  { name: "Bodycraft Salon & Spa", area: "Indiranagar", location: "100 Feet Road, Indiranagar", rating: 4.8, reviewCount: 318, price: 1500, services: ["Hair", "Facial", "Spa", "Nails"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Spa Luxury" },
  { name: "Dessange Paris", area: "Indiranagar", location: "12th Main, Indiranagar", rating: 4.7, reviewCount: 292, price: 1800, services: ["Hair", "Facial", "Spa"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Spa Luxury" },
  { name: "SCENT Salon Spa", area: "Indiranagar", location: "90 Feet Road, Indiranagar", rating: 4.6, reviewCount: 265, price: 1400, services: ["Hair", "Facial", "Spa"], type: "Spa", category: "Women's Luxury Salon", vibe: "Relaxed" },
  { name: "Jean-Claude Biguine", area: "Koramangala", location: "Church Street, Koramangala", rating: 4.7, reviewCount: 278, price: 1700, services: ["Hair", "Makeup", "Facial"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Boutique" },
  { name: "Lakmé Salon", area: "Indiranagar", location: "CMH Road, Indiranagar", rating: 4.5, reviewCount: 245, price: 1600, services: ["Hair", "Makeup", "Bridal"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Elegant" },
  { name: "Toni & Guy", area: "HSR Layout", location: "HSR Layout Main Road", rating: 4.6, reviewCount: 252, price: 1750, services: ["Hair"], type: "Hair Studio", category: "Women's Luxury Salon", vibe: "Trendy" },
  { name: "BBlunt Salon", area: "Indiranagar", location: "12th Main, Indiranagar", rating: 4.7, reviewCount: 238, price: 1500, services: ["Hair", "Makeup"], type: "Hair Studio", category: "Women's Luxury Salon", vibe: "Trendy" },
  { name: "Bounce Salon", area: "Koramangala", location: "5th Block, Koramangala", rating: 4.5, reviewCount: 228, price: 1400, services: ["Hair", "Facial", "Spa"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Relaxed" },
  { name: "YLG Salon", area: "Jayanagar", location: "Jayanagar 9th Block", rating: 4.6, reviewCount: 240, price: 1550, services: ["Hair", "Facial", "Nails"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Professional" },
  { name: "Naturals Salon", area: "Electronic City", location: "Electronic City Phase 1", rating: 4.4, reviewCount: 214, price: 1200, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Friendly" },
  { name: "Green Trends", area: "Whitefield", location: "Whitefield Main Road", rating: 4.4, reviewCount: 208, price: 1150, services: ["Hair", "Facial"], type: "Hair Studio", category: "Women's Luxury Salon", vibe: "Classic" },
  { name: "Bounce Beauty Bar", area: "Koramangala", location: "1st Block, Koramangala", rating: 4.5, reviewCount: 219, price: 1300, services: ["Hair", "Nails"], type: "Nail Studio", category: "Women's Luxury Salon", vibe: "Trendy" },
  { name: "The Blow Room", area: "Indiranagar", location: "100 Feet Road, Indiranagar", rating: 4.6, reviewCount: 226, price: 1450, services: ["Hair"], type: "Hair Studio", category: "Women's Luxury Salon", vibe: "Contemporary" },
  { name: "Blush & Blow", area: "Whitefield", location: "Whitefield Airfield Road", rating: 4.5, reviewCount: 221, price: 1600, services: ["Hair", "Makeup", "Facial"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Boutique" },
  { name: "Sparsh Salon", area: "Jayanagar", location: "Jayanagar 4th Block", rating: 4.5, reviewCount: 216, price: 1350, services: ["Hair", "Facial", "Spa"], type: "Spa", category: "Women's Luxury Salon", vibe: "Relaxed" },
  { name: "Aveda Salon", area: "Indiranagar", location: "Lavelle Road, Indiranagar", rating: 4.6, reviewCount: 233, price: 1850, services: ["Hair", "Spa"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Spa Luxury" },
  { name: "Zido Salon", area: "Koramangala", location: "7th Block, Koramangala", rating: 4.4, reviewCount: 205, price: 1250, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Contemporary" },
  { name: "YLG Bridal Studio", area: "HSR Layout", location: "HSR Sector 2", rating: 4.6, reviewCount: 242, price: 2100, services: ["Bridal", "Makeup", "Hair"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Elegant" },
  { name: "Fresche Salon", area: "MG Road", location: "MG Road", rating: 4.5, reviewCount: 224, price: 1450, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Professional" },
  { name: "MyGlamm Salon", area: "Koramangala", location: "Koramangala 5th Block", rating: 4.4, reviewCount: 212, price: 1350, services: ["Makeup", "Hair"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Boutique" },
  { name: "Salon Nayana", area: "Jayanagar", location: "Jayanagar 3rd Block", rating: 4.5, reviewCount: 220, price: 1280, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Modern" },
  { name: "Aura Salon", area: "Indiranagar", location: "Indiranagar 100 Feet Road", rating: 4.4, reviewCount: 206, price: 1320, services: ["Hair", "Spa"], type: "Spa", category: "Women's Luxury Salon", vibe: "Relaxed" },
  { name: "Lavender Salon", area: "Marathahalli", location: "Marathahalli Outer Ring Road", rating: 4.4, reviewCount: 201, price: 1240, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Elegant" },
  { name: "Aaina Salon", area: "Bellandur", location: "Bellandur Main Road", rating: 4.4, reviewCount: 199, price: 1325, services: ["Hair", "Makeup"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Modern" },
  { name: "Mirror Mirror Salon", area: "JP Nagar", location: "JP Nagar 3rd Phase", rating: 4.5, reviewCount: 217, price: 1380, services: ["Hair", "Makeup", "Nails"], type: "Nail Studio", category: "Women's Luxury Salon", vibe: "Classic" },
  { name: "The Vanity Room", area: "MG Road", location: "MG Road, Bengaluru", rating: 4.7, reviewCount: 236, price: 1680, services: ["Hair", "Facial", "Makeup"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Boutique" },
  { name: "Glam Studios", area: "Whitefield", location: "Whitefield Garden City", rating: 4.6, reviewCount: 229, price: 1620, services: ["Hair", "Makeup", "Bridal"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Elegant" },
  { name: "Studio 11 Salon", area: "Bellandur", location: "Bellandur Service Road", rating: 4.5, reviewCount: 211, price: 1480, services: ["Hair", "Nails"], type: "Hair Studio", category: "Women's Luxury Salon", vibe: "Contemporary" },
  { name: "Lakme Luxe", area: "MG Road", location: "MG Road Junction", rating: 4.6, reviewCount: 223, price: 1720, services: ["Hair", "Makeup", "Bridal"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Elegant" },
  { name: "Glow Beauty Lounge", area: "Electronic City", location: "Electronic City Phase 2", rating: 4.5, reviewCount: 210, price: 1390, services: ["Facial", "Spa", "Hair"], type: "Spa", category: "Women's Luxury Salon", vibe: "Relaxed" },
  { name: "Blush Beauty Lounge", area: "Marathahalli", location: "Marathahalli Market Road", rating: 4.4, reviewCount: 203, price: 1275, services: ["Hair", "Makeup"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Trendy" },
  { name: "The Beauty Lab", area: "JP Nagar", location: "JP Nagar 7th Phase", rating: 4.6, reviewCount: 231, price: 1580, services: ["Hair", "Facial", "Nails"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Professional" },
  { name: "Pearl Salon", area: "HSR Layout", location: "HSR Sector 6", rating: 4.4, reviewCount: 204, price: 1260, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Friendly" },
  { name: "Sapphire Salon", area: "Whitefield", location: "Whitefield Varthur Road", rating: 4.7, reviewCount: 239, price: 1660, services: ["Hair", "Spa", "Nails"], type: "Spa", category: "Women's Luxury Salon", vibe: "Sophisticated" },
  { name: "Elite Salon", area: "Koramangala", location: "3rd Block, Koramangala", rating: 4.5, reviewCount: 218, price: 1440, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Professional" },
  { name: "Urban Beauty Studio", area: "Bellandur", location: "Bellandur Outer Ring Road", rating: 4.5, reviewCount: 214, price: 1420, services: ["Hair", "Makeup", "Nails"], type: "Nail Studio", category: "Women's Luxury Salon", vibe: "Modern" },
  { name: "The Glam Room", area: "Indiranagar", location: "Indiranagar 80 Feet Road", rating: 4.6, reviewCount: 227, price: 1540, services: ["Hair", "Makeup"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Boutique" },
  { name: "Femina Salon", area: "Jayanagar", location: "Jayanagar 11th Main", rating: 4.4, reviewCount: 207, price: 1290, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Classic" },
  { name: "Aura Luxe Salon", area: "MG Road", location: "MG Road, Bengaluru", rating: 4.7, reviewCount: 234, price: 1710, services: ["Hair", "Spa", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Spa Luxury" },
  { name: "Lavish Salon", area: "Electronic City", location: "Electronic City, Phase 3", rating: 4.5, reviewCount: 213, price: 1370, services: ["Hair", "Spa"], type: "Spa", category: "Women's Luxury Salon", vibe: "Relaxed" },
  { name: "The Hair Story", area: "Marathahalli", location: "Marathahalli NH 44", rating: 4.6, reviewCount: 225, price: 1490, services: ["Hair", "Nails"], type: "Hair Studio", category: "Women's Luxury Salon", vibe: "Contemporary" },
  { name: "Serenity Salon", area: "JP Nagar", location: "JP Nagar 2nd Phase", rating: 4.5, reviewCount: 215, price: 1410, services: ["Hair", "Facial", "Spa"], type: "Spa", category: "Women's Luxury Salon", vibe: "Relaxed" },
  { name: "Belle Beauty Salon", area: "HSR Layout", location: "HSR Sector 4", rating: 4.4, reviewCount: 202, price: 1250, services: ["Hair", "Makeup"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Friendly" },
  { name: "The Beauty Square", area: "Whitefield", location: "Whitefield Hope Farm", rating: 4.5, reviewCount: 209, price: 1460, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Professional" },
  { name: "Royal Touch Salon", area: "Koramangala", location: "6th Block, Koramangala", rating: 4.6, reviewCount: 230, price: 1590, services: ["Hair", "Bridal", "Makeup"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Elegant" },
  { name: "Grace Salon", area: "Bellandur", location: "Bellandur Green View", rating: 4.4, reviewCount: 200, price: 1245, services: ["Hair", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Classic" },
  { name: "Divine Salon", area: "Indiranagar", location: "Indiranagar 12th Main", rating: 4.5, reviewCount: 222, price: 1430, services: ["Hair", "Spa", "Nails"], type: "Spa", category: "Women's Luxury Salon", vibe: "Sophisticated" },
  { name: "Beauty Bliss", area: "Jayanagar", location: "Jayanagar 10th Main", rating: 4.6, reviewCount: 232, price: 1510, services: ["Hair", "Facial", "Makeup"], type: "Makeup Studio", category: "Women's Luxury Salon", vibe: "Boutique" },
  { name: "Signature Salon", area: "MG Road", location: "MG Road, Bengaluru", rating: 4.7, reviewCount: 243, price: 1690, services: ["Hair", "Bridal", "Facial"], type: "Luxury Salon", category: "Women's Luxury Salon", vibe: "Elegant" },
];

export const salons: Salon[] = salonBlueprints.map((salon, index) => {
  const image = createSalonImage(salon.name, index);
  const priceRange = salon.price < 2000 ? "₹1,000 - ₹2,000" : salon.price < 5000 ? "₹2,000 - ₹5,000" : salon.price < 10000 ? "₹5,000 - ₹10,000" : "₹10,000+";
  const startingPrice = salon.price;
  const coords = coordsByArea[salon.area] ?? { lat: 12.9719, lng: 77.6410 };
  const availability = index % 3 === 0 ? "Open today · 10 AM - 9 PM" : index % 3 === 1 ? "Open today · 11 AM - 8 PM" : "Open today · 9 AM - 10 PM";

  return {
    id: `${index + 1}`,
    name: salon.name,
    location: salon.location,
    area: salon.area,
    rating: salon.rating,
    reviewCount: salon.reviewCount,
    category: salon.category,
    type: salon.type,
    description: `${salon.name} brings a polished luxury experience to Bangalore with expert styling, skin rituals and elevated beauty care tailored for modern women.`,
    specialties: [salon.type, "Luxury Care", "Personalized Styling"],
    services: buildServices(salon.services, startingPrice),
    image,
    images: [image, createSalonImage(`${salon.name} Interior`, index + 1), createSalonImage(`${salon.name} Studio`, index + 2)],
    priceRange,
    startingPrice,
    aiMatch: Math.max(88, Math.min(99, 90 + (index % 6))),
    badges: ["Premium", "Women Only"],
    contact: { phone: `+91 80 4${(index + 1).toString().padStart(3, "0")} ${5000 + index * 37}` },
    hours: "10:00 AM - 9:00 PM",
    availability,
    vibe: salon.vibe,
    coords,
  };
});

export function getSalonById(id: string): Salon | undefined {
  return salons.find((salon) => salon.id === id);
}

export function filterSalons(filters: {
  areas?: string[];
  types?: string[];
  rating?: number;
  priceRange?: string[];
  services?: string[];
  searchQuery?: string;
  sortBy?: string;
}): Salon[] {
  let result = [...salons];

  if (filters.areas && filters.areas.length > 0) {
    result = result.filter((salon) => filters.areas!.includes(salon.area));
  }

  if (filters.types && filters.types.length > 0) {
    result = result.filter((salon) => filters.types!.includes(salon.type));
  }

  if (filters.rating) {
    result = result.filter((salon) => salon.rating >= filters.rating!);
  }

  if (filters.priceRange && filters.priceRange.length > 0) {
    result = result.filter((salon) =>
      filters.priceRange!.some((range) => {
        if (range === "₹10,000+") return salon.startingPrice >= 10000;
        const [min, max] = range.replace("₹", "").split("-").map((part) => Number(part.replace(/,/g, "").trim()));
        return salon.startingPrice >= min && salon.startingPrice <= max;
      })
    );
  }

  if (filters.services && filters.services.length > 0) {
    result = result.filter((salon) => salon.services.some((service) => filters.services!.includes(service.category)));
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    result = result.filter((salon) =>
      salon.name.toLowerCase().includes(query) ||
      salon.location.toLowerCase().includes(query) ||
      salon.services.some((service) => service.category.toLowerCase().includes(query))
    );
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        result.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case "price-high":
        result.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      default:
        break;
    }
  }

  return result;
}
'''

output_path = Path(__file__).resolve().parent.parent / "src" / "data" / "salons.ts"
output_path.write_text(content, encoding="utf-8")
print(output_path)
