import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import SalonCard from "@/components/SalonCard";
import { salons } from "@/data/salons";

export default function SavedSalonsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const saved = localStorage.getItem(`glamora_saved_${user?.id ?? user?.email}`);
    if (saved) {
      setSavedIds(JSON.parse(saved));
    }
  }, [user, navigate]);

  const removeSavedSalon = (salonId: string) => {
    const updated = savedIds.filter((id) => id !== salonId);
    setSavedIds(updated);
    if (user) {
      localStorage.setItem(`glamora_saved_${user?.id ?? user?.email}`, JSON.stringify(updated));
    }
  };

  const savedSalons = salons.filter(salon => savedIds.includes(salon.id));

  return (
    <main className="min-h-screen bg-ivory pt-[72px]">
      <div className="max-content page-padding py-10">
        <h1 className="font-display text-h1 text-charcoal mb-8">Saved Salons</h1>

        {savedSalons.length === 0 ? (
          <div className="bg-white rounded-card p-12 text-center">
            <Bookmark className="w-16 h-16 text-light-sage mx-auto mb-4" />
            <h3 className="font-display text-h2 text-charcoal mb-2">No saved salons</h3>
            <p className="text-sage mb-6">Save your favorite salons to view them later!</p>
            <Link
              to="/explore"
              className="inline-block px-8 py-3 rounded-pill bg-gold text-charcoal font-bold hover:scale-105 transition-transform"
            >
              Explore Salons
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedSalons.map((salon, i) => (
              <div key={salon.id}>
                <SalonCard salon={salon} index={i} onToggleSave={removeSavedSalon} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
