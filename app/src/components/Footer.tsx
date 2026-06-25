import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-gold/10 via-transparent to-gold/10 pointer-events-none" />
      <div className="max-content page-padding py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="font-display text-[20px] font-medium shimmer-text">
              Glamora
            </Link>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              Luxury salon discovery, reimagined. Find Bangalore's finest salons with AI-powered recommendations.
            </p>
            <div className="flex items-center gap-4 mt-5">
              <a href="#" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-h3 font-display text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Explore", path: "/explore" },
                { label: "About", path: "/about" },
                { label: "Feedback", path: "/feedback" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-h3 font-display text-white mb-4">Features</h3>
            <ul className="space-y-2">
              {[
                "AI Chat Assistant",
                "AI Salon Recommender",
                "Personalized salon discovery and booking flow",
                "Saved salons and booking history",
                "Interactive salon map and explore page",
              ].map((feature) => (
                <li key={feature}>
                  <span className="text-sm text-white/70 transition-all duration-300 inline-block">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-h3 font-display text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <span className="font-medium text-white">Email:</span>{" "}
                Glamora@gmail.com
              </li>
              <li>
                <span className="font-medium text-white">Location:</span>{" "}
                Gujarat
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/70">
            &copy; 2026 Glamora. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-white/70 hover:text-white transition-all duration-300 hover:scale-105"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
