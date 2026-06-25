import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Search } from "lucide-react";
import { salons } from "@/data/salons";

type Props = { className?: string };

const areas = ["Indiranagar", "Koramangala", "Whitefield", "HSR Layout", "Electronic City", "Jayanagar", "JP Nagar", "MG Road", "Marathahalli", "Bellandur"];

export default function AIRecommender({ className = "" }: Props) {
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("any");
  const [service, setService] = useState("");
  const [occasion, setOccasion] = useState("");
  const [results, setResults] = useState<typeof salons>([]);
  const [message, setMessage] = useState("");

  function getPriceRange(priceStr: string) {
    if (!priceStr) return null;
    const match = priceStr.match(/₹?([\d,]+)\s*-\s*₹?([\d,]+)/);
    if (match) {
      return {
        min: parseInt(match[1].replace(/,/g, "")),
        max: parseInt(match[2].replace(/,/g, ""))
      };
    }
    return null;
  }

  function matchesPriceRange(salonPrice: string, selectedRange: string): boolean {
    if (selectedRange === "any") return true;
    
    const salonRange = getPriceRange(salonPrice);
    if (!salonRange) return false;

    const rangeMap: Record<string, { min: number; max: number }> = {
      "₹1,000-₹2,000": { min: 1000, max: 2000 },
      "₹2,000-₹3,000": { min: 2000, max: 3000 },
      "₹3,000-₹5,000": { min: 3000, max: 5000 },
      "₹5,000+": { min: 5000, max: Infinity }
    };

    const selectedRangeObj = rangeMap[selectedRange];
    if (!selectedRangeObj) return false;

    return salonRange.min <= selectedRangeObj.max && salonRange.max >= selectedRangeObj.min;
  }

  function mockRecommend() {
    const missingFields: string[] = [];

    if (!service) missingFields.push("service");
    if (!area) missingFields.push("area");
    if (price === "any") missingFields.push("price range");
    if (!occasion) missingFields.push("occasion");

    if (missingFields.length > 0) {
      const fieldText = missingFields.join(", ");
      setMessage(`Please fill in the missing field${missingFields.length > 1 ? "s" : ""}: ${fieldText}.`);
      setResults([]);
      return;
    }

    const filtered = salons.filter((s) => {
      if (s.area !== area) return false;
      if (!matchesPriceRange(s.priceRange, price)) return false;
      const normalized = service.toLowerCase();
      const matchesService =
        s.category.toLowerCase().includes(normalized) ||
        (s.services || []).some((svc) => svc.name.toLowerCase().includes(normalized) || svc.category.toLowerCase().includes(normalized));
      if (!matchesService) return false;
      return true;
    });

    const out = filtered.slice(0, 3);
    if (out.length === 0) {
      setResults([]);
      setMessage("No salons matched your selected service, area, and price range.");
      return;
    }

    setResults(out);
    setMessage("");
  }

  return (
    <div className={`rounded-[28px] border border-[#e5d6ad] bg-white/90 p-6 shadow-[0_20px_60px_rgba(40,31,18,0.08)] backdrop-blur-xl ${className}`}>
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-2xl bg-[#fff7d6] p-2 text-gold">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-h3 text-charcoal">Find Your Perfect Salon</h3>
          <p className="text-sm text-sage">Share your budget, area, service and occasion for a tailored match.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <select value={service} onChange={(e) => setService(e.target.value)} className="rounded-input border border-light-sage p-3 text-sm">
          <option value="">Choose a service</option>
          <option value="Hair">Hair</option>
          <option value="Makeup">Makeup</option>
          <option value="Spa">Spa</option>
          <option value="Bridal">Bridal</option>
          <option value="Facial">Facial</option>
          <option value="Nails">Nails</option>
        </select>

        <select value={area} onChange={(e) => setArea(e.target.value)} className="rounded-input border border-light-sage p-3 text-sm">
          <option value="">Select area</option>
          {areas.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <select value={price} onChange={(e) => setPrice(e.target.value)} className="rounded-input border border-light-sage p-3 text-sm">
          <option value="any">Select price range</option>
          <option value="₹1,000-₹2,000">₹1,000-₹2,000</option>
          <option value="₹2,000-₹3,000">₹2,000-₹3,000</option>
          <option value="₹3,000-₹5,000">₹3,000-₹5,000</option>
          <option value="₹5,000+">₹5,000+</option>
        </select>

        <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className="rounded-input border border-light-sage p-3 text-sm">
          <option value="">Select occasion</option>
          <option value="Bridal">Bridal</option>
          <option value="Party">Party</option>
          <option value="Date Night">Date Night</option>
          <option value="Relax & Reset">Relax & Reset</option>
        </select>

        <div className="flex items-center gap-2">
          <button onClick={mockRecommend} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-4 py-2.5 font-semibold text-charcoal transition hover:opacity-90">
            <Search className="h-4 w-4" />
            Recommend
          </button>
          <button
            onClick={() => {
              setService("");
              setArea("");
              setPrice("any");
              setOccasion("");
              setResults([]);
              setMessage("");
            }}
            className="rounded-full border border-light-sage px-4 py-2.5 text-sm text-charcoal"
          >
            Clear
          </button>
        </div>
      </div>

      {message && (
        <p className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
          {message}
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-4">
          <h4 className="mb-2 text-sm font-semibold text-charcoal">Top picks</h4>
          <ul className="space-y-3">
            {results.map((r) => (
              <li key={r.id}>
                <Link to={`/salon/${r.id}`} className="flex items-start gap-3 rounded-2xl p-2 transition hover:bg-ivory">
                  <img src={r.image} alt={r.name} className="h-14 w-14 rounded-xl object-cover" />
                  <div>
                    <div className="font-medium text-charcoal">{r.name}</div>
                    <div className="text-xs text-sage">{r.area} • {r.priceRange}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
