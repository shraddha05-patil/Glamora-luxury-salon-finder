import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, MapPin, LogOut, Bookmark, Calendar, Settings, Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
  { label: "About", path: "/about" },
  { label: "Feedback", path: "/feedback" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("search") || "");
  }, [location.search]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setDropdownOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    navigate(`/explore${trimmed ? `?search=${encodeURIComponent(trimmed)}` : ""}`);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] h-[72px] flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-charcoal/95 backdrop-blur-xl border-b border-gold/30 shadow-lg"
            : "bg-charcoal/85 backdrop-blur-md"
        }`}
        style={{ padding: "0 clamp(20px, 5vw, 80px)" }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-[22px] font-medium shimmer-text tracking-tight hover:scale-105 transition-transform duration-300"
        >
          Glamora
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-label font-body transition-all duration-300 ${
                location.pathname === item.path
                  ? "text-gold font-bold"
                  : "text-gold hover:text-white"
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold rounded-full" />
              )}
            </Link>
          ))}
        </div>

        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center rounded-full border border-light-sage/60 bg-white/10 px-3 py-2 shadow-sm backdrop-blur-sm">
          <Search className="mr-2 h-4 w-4 text-gold" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearchSubmit(e as unknown as React.FormEvent);
              }
            }}
            placeholder="Search salons"
            className="w-40 bg-transparent text-sm text-white placeholder:text-gold/70 outline-none"
          />
        </form>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/map"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-pill border border-light-sage bg-transparent text-gold hover:text-white"
                aria-label="Open Bangalore map"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Bangalore</span>
              </Link>
              {/* Avatar Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full bg-cream border-2 border-gold flex items-center justify-center font-display text-sm text-charcoal hover:bg-gold/10 transition-all"
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gold/20 py-2 z-[1001]">
                    <div className="px-4 py-3 border-b border-light-sage">
                      <p className="font-display text-sm text-charcoal">{user.name}</p>
                      <p className="text-xs text-sage">{user.email}</p>
                    </div>
                    <button
                      onClick={() => handleNavClick("/bookings")}
                      className="w-full px-4 py-3 flex items-center gap-3 text-charcoal hover:bg-cream/50 transition-colors text-sm"
                    >
                      <Calendar className="w-4 h-4 text-gold" />
                      My Bookings
                    </button>
                    <button
                      onClick={() => handleNavClick("/saved-salons")}
                      className="w-full px-4 py-3 flex items-center gap-3 text-charcoal hover:bg-cream/50 transition-colors text-sm"
                    >
                      <Bookmark className="w-4 h-4 text-gold" />
                      Saved Salons
                    </button>
                    <button
                      onClick={() => handleNavClick("/profile")}
                      className="w-full px-4 py-3 flex items-center gap-3 text-charcoal hover:bg-cream/50 transition-colors text-sm"
                    >
                      <Settings className="w-4 h-4 text-gold" />
                      Profile Settings
                    </button>
                    <div className="border-t border-light-sage mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 flex items-center gap-3 text-error-red hover:bg-error-red/10 transition-colors text-sm"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/map"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-pill border border-light-sage bg-transparent text-gold hover:text-white"
                aria-label="Open Bangalore map"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Bangalore</span>
              </Link>
              <Link
                to="/login"
                className="px-6 py-2.5 rounded-pill bg-gradient-to-r from-gold via-soft-gold to-gold text-charcoal text-[13px] font-bold hover:scale-[1.08] transition-all duration-300 shadow-lg hover:shadow-gold border border-white/20"
                style={{
                  backgroundSize: '200% auto',
                  animation: 'shimmer-btn 3s infinite linear'
                }}
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5 text-gold" strokeWidth={2} />
          ) : (
            <Menu className="w-5 h-5 text-gold" strokeWidth={2} />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[999] bg-charcoal/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          <Link
            to="/map"
            onClick={() => setMobileOpen(false)}
            className="text-h2 font-display text-gold hover:text-white"
          >
            Bangalore Map
          </Link>
          {navItems.map((item, i) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-h1 font-display text-gold hover:text-white transition-colors"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/profile" className="text-h2 font-display text-gold hover:text-white transition-colors">
                My Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                  setMobileOpen(false);
                }}
                className="text-h2 font-display text-gold hover:text-white transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-h2 font-display text-gold hover:text-white transition-colors">
              Login / Register
            </Link>
          )}
        </div>
      )}
    </>
  );
}
