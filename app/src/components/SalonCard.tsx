import { Link } from "react-router-dom";
import { Bookmark, MapPin, Sparkles, Star, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Salon } from "@/data/salons";
import { useAuth } from "@/hooks/useAuth";

interface SalonCardProps {
  salon: Salon;
  index?: number;
  onToggleSave?: (salonId: string) => void;
}

export default function SalonCard({ salon, index = 0, onToggleSave }: SalonCardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  const storageKey = `glamora_saved_${user?.id ?? user?.email ?? "guest"}`;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      setIsSaved(saved.includes(salon.id));
    } catch {
      setIsSaved(false);
    }
  }, [salon.id, storageKey]);

  const handleSaveSalon = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      const isCurrentlySaved = saved.includes(salon.id);
      const updated = isCurrentlySaved
        ? saved.filter((id: string) => id !== salon.id)
        : [...saved, salon.id];

      localStorage.setItem(storageKey, JSON.stringify(updated));
      setIsSaved(!isCurrentlySaved);

      if (onToggleSave) {
        onToggleSave(salon.id);
        return;
      }

      if (!isCurrentlySaved) {
        navigate("/saved-salons");
      }
    } catch {
      setIsSaved(false);
    }
  };

  return (
    <div
      className="group relative overflow-hidden rounded-[24px] border border-[#e5d6ad] bg-white/80 shadow-[0_20px_60px_rgba(40,31,18,0.08)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(40,31,18,0.16)]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={salon.image}
          alt={salon.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17120d]/70 via-transparent to-transparent" />
        {salon.badges.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {salon.badges.slice(0, 2).map((badge) => (
              <span
                key={badge}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                  badge.includes("Premium") ? "bg-gold text-charcoal" : "bg-white/85 text-charcoal"
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-h2 text-charcoal group-hover:underline decoration-gold decoration-2 underline-offset-4 transition-all">
              {salon.name}
            </h3>
            <p className="mt-1 text-sm text-sage">{salon.category}</p>
          </div>
          <button
            onClick={handleSaveSalon}
            className={`rounded-full border p-2 transition hover:bg-cream/70 ${
              isSaved
                ? "border-gold/60 bg-[#fff7d6] text-gold shadow-sm"
                : "border-light-sage bg-white/90 text-charcoal"
            }`}
            aria-label={isSaved ? `Remove ${salon.name}` : `Save ${salon.name}`}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? "fill-gold stroke-gold" : "fill-none stroke-current"}`} />
          </button>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-sage">
          <MapPin className="h-3.5 w-3.5" />
          <span className="text-sm">{salon.location}</span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-sage">
          <span className="rounded-full bg-cream px-2.5 py-1">{salon.type}</span>
          <span className="rounded-full bg-cream px-2.5 py-1">{salon.availability}</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(salon.rating) ? "fill-gold text-gold" : "text-light-sage"}`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-charcoal">{salon.rating}</span>
          <span className="text-xs text-sage">({salon.reviewCount} reviews)</span>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-2xl bg-[#fffaf0] px-3 py-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-sage">Starting from</p>
            <p className="text-sm font-semibold text-charcoal">₹{salon.startingPrice.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-1 text-gold">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI match</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            to={`/salon/${salon.id}`}
            className="flex-1 rounded-full border border-gold/30 bg-gradient-to-r from-gold via-soft-gold to-gold px-4 py-3 text-center text-sm font-semibold text-charcoal transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            style={{ backgroundSize: "200% auto", animation: "shimmer-btn 3s infinite linear" }}
          >
            Book Appointment
          </Link>
          <Link
            to={`/salon/${salon.id}`}
            className="flex items-center justify-center rounded-full border border-[#e5d6ad] bg-white px-3 py-3 text-charcoal transition hover:bg-cream"
            aria-label={`View details for ${salon.name}`}
          >
            <CalendarDays className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
