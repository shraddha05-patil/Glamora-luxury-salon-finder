import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  Phone,
  ExternalLink,
  Share2,
  Check,
  Calendar,
  User,
  Mail,
  ThumbsUp,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getSalonById } from "@/data/salons";
import { useAuth } from "@/hooks/useAuth";

gsap.registerPlugin(ScrollTrigger);

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

const getLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseTimeLabelToMinutes = (time: string) => {
  const [timePart, meridiem] = time.split(" ");
  const [hourPart, minutePart] = timePart.split(":");
  let hours = Number(hourPart);
  const minutes = Number(minutePart);

  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

const isTimeSlotUnavailable = ({ time, selectedDate, now }: { time: string; selectedDate: string; now: Date }) => {
  if (!selectedDate) return false;
  if (selectedDate !== getLocalDateString(now)) return false;
  if (time === "2:00 PM" || time === "5:00 PM") return true;

  const slotMinutes = parseTimeLabelToMinutes(time);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return slotMinutes < nowMinutes;
};

/* ─── Booking Modal ─── */
type BookingService = NonNullable<ReturnType<typeof getSalonById>>["services"][number];

function BookingModal({
  salon,
  isOpen,
  onClose,
  initialSelectedServices,
  initialSelectedDate,
  initialSelectedTime,
}: {
  salon: NonNullable<ReturnType<typeof getSalonById>>;
  isOpen: boolean;
  onClose: () => void;
  initialSelectedServices?: BookingService[];
  initialSelectedDate?: string;
  initialSelectedTime?: string;
}) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<BookingService[]>(() => {
    const services = initialSelectedServices?.length ? initialSelectedServices : [salon.services[0]];
    return services.filter(Boolean);
  });
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate ?? "");
  const [selectedTime, setSelectedTime] = useState(initialSelectedTime ?? "");
  const [now, setNow] = useState(new Date());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedDate && selectedTime && isTimeSlotUnavailable({ time: selectedTime, selectedDate, now })) {
      setSelectedTime("");
    }
  }, [selectedDate, selectedTime, now]);

  useEffect(() => {
    if (isOpen) {
      const services = initialSelectedServices?.length ? initialSelectedServices : [salon.services[0]];
      setSelectedServices(services.filter(Boolean));
      setSelectedDate(initialSelectedDate ?? "");
      setSelectedTime(initialSelectedTime ?? "");
      setStep(
        initialSelectedServices && initialSelectedServices.length > 0 && initialSelectedDate && initialSelectedTime
          ? 3
          : 1
      );
      if (user) {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [isOpen, user, salon.services, initialSelectedServices, initialSelectedDate, initialSelectedTime]);

  const toggleService = (service: BookingService) => {
    setSelectedServices((prev) =>
      prev.some((item) => item.name === service.name)
        ? prev.filter((item) => item.name !== service.name)
        : [...prev, service]
    );
  };

  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);

  const handleConfirm = () => {
    const ref = "GL" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setBookingRef(ref);

    // Save booking
    const bookings = JSON.parse(localStorage.getItem("glamora_bookings") || "[]");
    bookings.push({
      id: ref,
      salonId: salon.id,
      salonName: salon.name,
      service: selectedServices.map((service) => service.name).join(", "),
      services: selectedServices.map((service) => service.name),
      date: selectedDate,
      time: selectedTime,
      price: totalPrice,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("glamora_bookings", JSON.stringify(bookings));

    setStep(4);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[20px] shadow-card-hover w-full max-w-[560px] max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream flex items-center justify-center hover:bg-light-sage transition-colors z-10"
        >
          <span className="text-charcoal text-lg">&times;</span>
        </button>

        {/* Steps */}
        {step < 4 && (
          <div className="flex items-center justify-center gap-3 pt-8 pb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full transition-colors ${
                  s <= step ? "bg-gold" : "bg-light-sage"
                }`}
              />
            ))}
          </div>
        )}

        {/* Step 1 - Service & Time */}
        {step === 1 && (
          <div className="px-8 pb-8">
            <h3 className="font-display text-h2 text-charcoal mb-6">
              Select Service & Time
            </h3>

            <div className="mb-6">
              <label className="text-label text-sage mb-2 block">Services</label>
              <div className="grid gap-2">
                {salon.services.map((service) => {
                  const isSelected = selectedServices.some((item) => item.name === service.name);
                  return (
                    <button
                      key={service.name}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`flex items-center justify-between rounded-input border px-4 py-3 text-sm transition-all ${
                        isSelected
                          ? "border-gold bg-gold/10 text-charcoal"
                          : "border-light-sage bg-white text-charcoal hover:border-gold"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${isSelected ? "border-gold bg-gold text-white" : "border-light-sage"}`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </span>
                        <span>
                          {service.name} ({service.duration})
                        </span>
                      </span>
                      <span className="font-medium">₹{service.price.toLocaleString()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-label text-sage mb-2 block">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 rounded-input border border-light-sage text-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div className="mb-8">
              <label className="text-label text-sage mb-2 block">Time</label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => {
                  const unavailable = isTimeSlotUnavailable({ time, selectedDate, now });
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      disabled={unavailable}
                      className={`py-2 rounded-pill text-xs font-medium border transition-all ${
                        selectedTime === time
                          ? "bg-gold text-white border-gold"
                          : unavailable
                          ? "bg-cream text-sage/50 border-light-sage/50 cursor-not-allowed line-through"
                          : "bg-white text-charcoal border-light-sage hover:border-gold"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!selectedDate || !selectedTime || selectedServices.length === 0}
              className="w-full py-3.5 rounded-pill bg-gold text-white text-sm font-medium hover:bg-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2 - Details */}
        {step === 2 && (
          <div className="px-8 pb-8">
            <h3 className="font-display text-h2 text-charcoal mb-6">
              Your Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-label text-sage mb-2 block">
                  Full Name <span className="text-error-red">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-input border border-light-sage text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-label text-sage mb-2 block">
                  Phone Number <span className="text-error-red">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 rounded-input border border-light-sage text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-label text-sage mb-2 block">
                  Email <span className="text-error-red">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-input border border-light-sage text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-label text-sage mb-2 block">
                  Special Requests
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requests or notes..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-input border border-light-sage text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3.5 rounded-pill border border-light-sage text-charcoal text-sm font-medium hover:bg-cream transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!name || !phone || !email}
                className="flex-1 py-3.5 rounded-pill bg-gold text-white text-sm font-medium hover:bg-gold/90 transition-all disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Review */}
        {step === 3 && (
          <div className="px-8 pb-8">
            <h3 className="font-display text-h2 text-charcoal mb-6">
              Review Booking
            </h3>

            <div className="bg-cream rounded-card p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-sage">Salon</span>
                <span className="font-medium text-charcoal">{salon.name}</span>
              </div>
              <div className="text-sm">
                <span className="text-sage">Services</span>
                <div className="mt-1 space-y-1">
                  {selectedServices.map((service) => (
                    <div key={service.name} className="font-medium text-charcoal text-right">
                      {service.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-sage">Date</span>
                <span className="font-medium text-charcoal">{selectedDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-sage">Time</span>
                <span className="font-medium text-charcoal">{selectedTime}</span>
              </div>
              <div className="border-t border-light-sage pt-3 flex justify-between">
                <span className="text-sage font-medium">Total</span>
                <span className="text-lg font-display text-gold font-medium">
                  &#x20B9;{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3.5 rounded-pill border border-light-sage text-charcoal text-sm font-medium hover:bg-cream transition-all"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3.5 rounded-pill bg-gold text-white text-sm font-medium hover:bg-gold/90 transition-all"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}

        {/* Step 4 - Success */}
        {step === 4 && (
          <div className="px-8 pb-8 text-center">
            <div className="w-20 h-20 mx-auto mt-4 rounded-full bg-gold flex items-center justify-center animate-in zoom-in duration-300">
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
            <h3 className="font-display text-display-l text-charcoal mt-6">
              Booking Confirmed!
            </h3>
            <p className="text-sm text-sage mt-2">
              Your reference number is{" "}
              <span className="font-mono font-medium text-charcoal">
                {bookingRef}
              </span>
            </p>
            <p className="text-sm text-sage mt-1">
              A confirmation has been sent to your email.
            </p>
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  onClose();
                  navigate("/bookings");
                }}
                className="flex-1 py-3.5 rounded-pill bg-gold text-white text-sm font-medium hover:bg-gold/90 transition-all"
              >
                View My Bookings
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3.5 rounded-pill border border-light-sage text-charcoal text-sm font-medium hover:bg-cream transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Salon Detail Page ─── */
export default function SalonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const salon = getSalonById(id || "");
  const [activeImage, setActiveImage] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedBookingServices, setSelectedBookingServices] = useState<BookingService[]>(() =>
    salon?.services ? [salon.services[0]] : []
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [now, setNow] = useState(new Date());
  const [submittedReviews, setSubmittedReviews] = useState<Array<{
    id: number;
    salonId: string;
    salonName: string;
    name: string;
    rating: number;
    message: string;
    submittedAt: string;
  }>>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"services" | "reviews" | "about">("services");

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedDate && selectedTime && isTimeSlotUnavailable({ time: selectedTime, selectedDate, now })) {
      setSelectedTime("");
    }
  }, [selectedDate, selectedTime, now]);

  const toggleBookingService = (service: BookingService) => {
    setSelectedBookingServices((prev) =>
      prev.some((item) => item.name === service.name)
        ? prev.filter((item) => item.name !== service.name)
        : [...prev, service]
    );
  };

  const handleSidebarBooking = () => {
    if (!selectedBookingServices.length || !selectedDate || !selectedTime) return;
    setBookingOpen(true);
  };

  useEffect(() => {
    setSelectedBookingServices(salon?.services ? [salon.services[0]] : []);
  }, [salon?.id]);

  useEffect(() => {
    const loadReviews = () => {
      if (typeof window === "undefined" || !salon?.id) {
        setSubmittedReviews([]);
        return;
      }

      try {
        const stored = window.localStorage.getItem("glamora-feedback");
        const parsed = stored ? JSON.parse(stored) : [];
        const salonReviews = parsed
          .filter((review: { salonId?: string }) => review.salonId === salon.id)
          .map((review: { salonId: string; salonName: string; name: string; rating: string; message: string; submittedAt: string }) => ({
            id: review.salonId.length + Math.random(),
            salonId: review.salonId,
            salonName: review.salonName,
            name: review.name,
            rating: Number(review.rating) || 5,
            message: review.message,
            submittedAt: review.submittedAt,
          }));
        setSubmittedReviews(salonReviews);
      } catch {
        setSubmittedReviews([]);
      }
    };

    loadReviews();
    window.addEventListener("feedback-submitted", loadReviews);
    return () => window.removeEventListener("feedback-submitted", loadReviews);
  }, [salon?.id]);

  useEffect(() => {
    if (contentRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".detail-section",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }, contentRef);
      return () => ctx.revert();
    }
  }, [salon]);

  if (!salon) {
    return (
      <div className="min-h-screen bg-ivory pt-[72px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-h1 font-display text-charcoal">Salon not found</h2>
          <Link
            to="/explore"
            className="mt-4 inline-block px-6 py-2.5 rounded-pill bg-gold text-white text-sm font-medium"
          >
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-ivory pt-[72px]">
      {/* Hero Gallery */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <img
          src={salon.images[activeImage]}
          alt={salon.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />

        {/* Salon name */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-display-l font-display text-white">
                {salon.name}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-white/80">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{salon.location}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {salon.badges.slice(0, 2).map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-tag bg-gold text-white text-xs font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="bg-white border-b border-light-sage">
        <div className="max-content page-padding py-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {salon.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  activeImage === i ? "border-gold" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`${salon.name} ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-white shadow-subtle">
        <div className="max-content page-padding py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sage" />
                <span className="text-sm text-charcoal">{salon.area}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <span className="text-sm font-medium text-charcoal">
                  {salon.rating}
                </span>
                <span className="text-sm text-sage">
                  ({salon.reviewCount} reviews)
                </span>
              </div>
              <span className="px-3 py-1 rounded-tag bg-blush text-taupe text-xs">
                {salon.category}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${salon.contact.phone}`}
                className="flex items-center gap-2 px-4 py-2 rounded-pill border border-light-sage text-sm text-charcoal hover:bg-cream transition-colors"
              >
                <Phone className="w-4 h-4" />
                Contact
              </a>
              {salon.contact.website && (
                <a
                  href={salon.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-pill border border-light-sage text-sm text-charcoal hover:bg-cream transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Website
                </a>
              )}
              <button className="flex items-center gap-2 px-4 py-2 rounded-pill border border-light-sage text-sm text-charcoal hover:bg-cream transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="max-content page-padding py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Content */}
          <div className="flex-1 min-w-0 space-y-10">
              {/* Tabs */}
              <div className="mb-6">
                <div className="inline-flex rounded-full bg-cream p-1">
                  <button
                    onClick={() => setActiveTab("services")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      activeTab === "services"
                        ? "bg-charcoal text-white"
                        : "text-charcoal/80"
                    }`}
                  >
                    Services
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      activeTab === "reviews" ? "bg-charcoal text-white" : "text-charcoal/80"
                    }`}
                  >
                    Reviews
                  </button>
                  <button
                    onClick={() => setActiveTab("about")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      activeTab === "about" ? "bg-charcoal text-white" : "text-charcoal/80"
                    }`}
                  >
                    About
                  </button>
                </div>
              </div>

              {activeTab === "about" && (
                <section className="detail-section bg-white rounded-card p-6 shadow-subtle">
                  <p className="text-base text-sage leading-relaxed">{salon.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {salon.specialties.map((s) => (
                      <span key={s} className="px-4 py-1.5 rounded-tag bg-blush text-taupe text-sm">{s}</span>
                    ))}
                  </div>
                </section>
              )}

              {activeTab === "services" && (
                <section className="detail-section bg-white rounded-card p-6 shadow-subtle">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {salon.services.map((service) => {
                      const isSelected = selectedBookingServices.some((item) => item.name === service.name);
                      return (
                        <button
                          key={service.name}
                          type="button"
                          onClick={() => toggleBookingService(service)}
                          className={`flex items-center justify-between gap-4 p-4 rounded-lg border text-left transition-all ${
                            isSelected
                              ? "border-gold bg-gold/10"
                              : "border-light-sage bg-white hover:border-gold"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${isSelected ? "border-gold bg-gold text-white" : "border-light-sage"}`}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </span>
                            <div>
                              <div className="text-sm font-medium text-charcoal">{service.name}</div>
                              <div className="text-xs text-sage">~ {service.duration}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-charcoal">Rs. {service.price.toLocaleString()}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}

              {activeTab === "reviews" && (
                <section className="detail-section bg-white rounded-card p-6 shadow-subtle">
                  <div className="rounded-card shadow-subtle p-6 mb-6">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <span className="text-display-l font-display text-charcoal">{salon.rating}</span>
                        <div className="flex items-center gap-0.5 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(salon.rating) ? "text-yellow-400 fill-yellow-400" : "text-yellow-200"}`} />
                          ))}
                        </div>
                        <p className="text-xs text-sage mt-1">Based on {salon.reviewCount} reviews</p>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[5,4,3,2,1].map((star)=> (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-xs text-sage w-3">{star}</span>
                            <Star className="w-3 h-3 text-gold fill-gold" />
                            <div className="flex-1 h-2 bg-cream rounded-full overflow-hidden">
                              <div className="h-full bg-success-green rounded-full" style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1}%` }} />
                            </div>
                            <span className="text-xs text-sage w-8 text-right">{star === 5 ? "70%" : star === 4 ? "20%" : star === 3 ? "7%" : star === 2 ? "2%" : "1%"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      ...submittedReviews.map((review) => ({
                        name: review.name,
                        rating: review.rating,
                        date: new Date(review.submittedAt).toLocaleDateString("en", { month: "short", day: "numeric" }),
                        comment: review.message,
                        helpful: 0,
                      })),
                      {
                        name: "Priya M.", rating: 5, date: "2 weeks ago", comment: "Absolutely loved my experience here! The staff was incredibly professional and the ambiance was so relaxing. My hair has never looked better.", helpful: 12,
                      },
                      {
                        name: "Rahul K.", rating: 5, date: "1 month ago", comment: "Best salon in Bangalore hands down. The attention to detail is remarkable. Will definitely be coming back!", helpful: 8,
                      },
                    ].map((review, i) => (
                      <div key={`${review.name}-${review.date}-${i}`} className="bg-white rounded-card shadow-subtle p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center font-display text-charcoal">{review.name[0]}</div>
                            <div>
                              <p className="text-sm font-medium text-charcoal">{review.name}</p>
                              <p className="text-xs text-sage">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-0.5">{[...Array(5)].map((_, j) => (<Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? "text-yellow-500 fill-yellow-500" : "text-yellow-200"}`} />))}</div>
                        </div>
                        <p className="mt-3 text-sm text-sage leading-relaxed">{review.comment}</p>
                        <button className="mt-3 flex items-center gap-1.5 text-xs text-sage hover:text-gold transition-colors"><ThumbsUp className="w-3.5 h-3.5" />Helpful ({review.helpful})</button>
                      </div>
                    ))}
                  </div>
                </section>
              )}
          </div>

          {/* Right Sidebar - Booking Card */}
          <aside className="lg:w-[340px] flex-shrink-0">
            <div className="sticky top-[100px] bg-white rounded-card shadow-subtle p-6">
              <h3 className="font-display text-h3 text-charcoal mb-5">
                Book Appointment
              </h3>

              <div className="space-y-5">
                <div className="rounded-card border border-light-sage bg-cream/60 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-label text-sage">Selected Services</span>
                    <span className="text-xs text-sage">{selectedBookingServices.length} selected</span>
                  </div>
                  {selectedBookingServices.length > 0 ? (
                    <div className="space-y-2">
                      {selectedBookingServices.map((service) => (
                        <div key={service.name} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm text-charcoal shadow-sm">
                          <span>{service.name}</span>
                          <button
                            type="button"
                            onClick={() => toggleBookingService(service)}
                            className="text-sage hover:text-error-red"
                            aria-label={`Remove ${service.name}`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-sage">Choose one or more services to continue.</p>
                  )}
                </div>

                <div>
                  <label className="text-label text-sage mb-2 block">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full rounded-input border border-light-sage bg-white px-10 py-3 text-sm text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-label text-sage mb-2 block">Time</label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => {
                      const unavailable = isTimeSlotUnavailable({ time, selectedDate, now });
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          disabled={unavailable}
                          className={`py-2 rounded-pill text-[11px] font-medium border transition-all ${
                            selectedTime === time
                              ? "bg-gold text-white border-gold"
                              : unavailable
                              ? "bg-cream text-sage/50 border-light-sage/50 cursor-not-allowed line-through"
                              : "bg-white text-charcoal border-light-sage hover:border-gold"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-light-sage pt-4">
                  <div className="flex items-center justify-between text-sm text-sage mb-3">
                    <span>Total</span>
                    <span className="text-xl font-display text-gold font-medium">
                      &#x20B9;{selectedBookingServices.reduce((sum, service) => sum + service.price, 0).toLocaleString()}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSidebarBooking}
                    disabled={!selectedDate || !selectedTime || selectedBookingServices.length === 0}
                    className="w-full rounded-pill bg-gold px-4 py-3 text-sm font-medium text-white transition-all hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Book Appointment
                  </button>
                </div>

                <div className="flex items-center gap-4 text-xs text-sage">
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-success-green" />
                    Free cancellation
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-success-green" />
                    Instant confirmation
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        salon={salon}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialSelectedServices={selectedBookingServices}
        initialSelectedDate={selectedDate}
        initialSelectedTime={selectedTime}
      />
    </main>
  );
}
