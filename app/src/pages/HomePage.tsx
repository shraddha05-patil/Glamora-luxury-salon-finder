import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Quote, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VoxelAttractor from "@/components/VoxelAttractor";
import SectionHeader from "@/components/SectionHeader";
import SalonCard from "@/components/SalonCard";
import AIRecommender from "@/components/AiRecommender";
import AIChat from "@/components/AIChat";
import { salons, categories, testimonials } from "@/data/salons";
import type { Category } from "@/data/salons";

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(".hero-headline", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(".hero-subtitle", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.6")
        .fromTo(".hero-ctas", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 z-0 hero-background"
        style={{ backgroundImage: 'url(/assets/img-hero-salon.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="absolute inset-0 z-[0] opacity-15">
        <VoxelAttractor />
      </div>
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)', animation: 'shine-effect 8s linear infinite' }} />
      <div ref={contentRef} className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-6">
        <h1 className="hero-headline text-display-xl font-display text-white text-center max-w-[700px] opacity-0 drop-shadow-2xl">Discover Bangalore's Luxury Beauty Experience</h1>
        <p className="hero-subtitle mt-4 text-xl text-white/90 text-center max-w-lg opacity-0 font-medium">Find the perfect salon, personalized for you with AI</p>
        <div className="hero-ctas flex items-center gap-5 mt-8 opacity-0">
          <Link to="/explore" className="px-12 py-4 rounded-pill bg-gradient-to-r from-gold via-soft-gold to-gold text-charcoal text-base font-bold">Explore Salons</Link>
        </div>
      </div>
    </section>
  );
}

function AIToolsSection() {
  return (
    <section className="section-gap page-padding">
      <div className="max-content grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIRecommender />
        <AIChat />
      </div>
    </section>
  );
}

function FeaturedSection() {
  return (
    <section className="section-dark section-gold-accent section-gap page-padding">
      <div className="max-content">
        <SectionHeader label="FEATURED" headline="Curated for You" subhead="Handpicked luxury salons across Bangalore's finest neighborhoods" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mt-12">
          {salons.slice(0, 6).map((salon, i) => (
            <div key={salon.id} className="featured-card hover-lift">
              <SalonCard salon={salon} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategorySection() {
  return (
    <section className="section-gap page-padding">
      <div className="max-content">
        <SectionHeader label="BROWSE BY CATEGORY" headline="Find Your Perfect Service" subhead="From hair transformations to spa retreats" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-8">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ cat }: { cat: Category }) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLButtonElement | null>(null);
  const [imgStyle, setImgStyle] = useState<React.CSSProperties>({ transform: "scale(1)", transition: "transform 300ms ease" });

  const categorySubtitle =
    cat.slug === "hair"
      ? "Expert cuts, colour, and styling for every look"
      : cat.slug === "skin"
      ? "Glow-focused facials and skin treatments"
      : cat.slug === "spa"
      ? "Relaxing massages and wellness rituals"
      : cat.slug === "bridal"
      ? "Bridal beauty crafted for your special day"
      : cat.slug === "nails"
      ? "Trendy nail art and premium nail care"
      : "Polished makeup for every occasion";

  function handleMove(e: React.MouseEvent) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const moveX = x * 8;
    const moveY = y * 6;
    setImgStyle({ transform: `scale(1.08) translate(${moveX}px, ${moveY}px)`, transition: "transform 120ms linear" });
  }

  function handleLeave() {
    setImgStyle({ transform: "scale(1)", transition: "transform 300ms ease" });
  }

  function handleEnter() {
    setImgStyle({ transform: "scale(1.08)", transition: "transform 200ms ease" });
  }

  return (
    <button
      type="button"
      ref={containerRef}
      onClick={() => navigate("/explore")}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
      className="group relative overflow-hidden rounded-card text-left transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-soft"
    >
      <div className="aspect-square overflow-hidden">
        <img src={cat.image} alt={cat.name} style={imgStyle} className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent p-4 sm:p-5">
        <h3 className="text-xl font-display text-white">{cat.name}</h3>
        <p className="mt-1 text-sm text-white/80">{categorySubtitle}</p>
      </div>
    </button>
  );
}

function ScrollRevealGallery() {
  const images = ["/assets/img-gallery-1.jpg", "/assets/img-gallery-3.jpg", "/assets/img-category-skin.jpg"];
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full overflow-hidden py-[10vh] bg-gradient-to-r from-ivory via-champagne to-ivory">
      <div className="max-content">
        <div className="gallery-item relative w-full overflow-hidden rounded-card shadow-soft">
          <div
            className="img-inner w-full h-[28rem] md:h-[34rem] bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
            style={{ backgroundImage: `url(${images[activeImage]})`, backgroundSize: "100% 100%" }}
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="relative section-light section-gold-accent section-gap page-padding overflow-hidden">
      <div className="max-content relative z-10">
        <SectionHeader label="TESTIMONIALS" headline="Loved by Women" subhead="Real stories from women who found their beauty match" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-12">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-card p-6 bg-white/90 border border-charcoal/10 shadow-sm transition duration-300 ease-out hover:-translate-y-2 hover:shadow-soft hover:bg-white cursor-pointer"
            >
              <Quote className="w-6 h-6 text-gold mb-3" />
              <p className="text-base text-charcoal mb-6">{t.comment}</p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className={`w-4 h-4 ${index < t.rating ? "text-gold fill-gold" : "text-charcoal/30"}`} />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-charcoal/10">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="text-sm font-semibold text-charcoal">{t.name}</div>
                  <div className="text-xs text-sage">{t.service}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AIToolsSection />
      <FeaturedSection />
      <CategorySection />
      <ScrollRevealGallery />
      <TestimonialsSection />
    </main>
  );
}


