import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Booking {
  id: string;
  salonId: string;
  salonName: string;
  service?: string;
  services?: string[];
  date: string;
  time: string;
  price: number;
  status: "confirmed" | "cancelled" | "completed";
  createdAt: string;
}

export default function BookingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const saved = localStorage.getItem("glamora_bookings");
    if (saved) {
      setBookings(JSON.parse(saved));
    }
  }, [user, navigate]);

  const cancelBooking = (id: string) => {
    setBookings((prevBookings) => {
      const updated = prevBookings.map((booking) =>
        booking.id === id ? { ...booking, status: "cancelled" as const } : booking
      );
      localStorage.setItem("glamora_bookings", JSON.stringify(updated));
      return updated;
    });
  };

  const getStatusColor = (status: string) => {
    if (status === "confirmed") return "bg-success-green/10 text-success-green";
    if (status === "completed") return "bg-gold/10 text-gold";
    return "bg-error-red/10 text-error-red";
  };

  return (
    <main className="min-h-screen bg-ivory pt-[72px]">
      <div className="max-content page-padding py-10">
        <h1 className="font-display text-h1 text-charcoal mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-card p-12 text-center">
            <Calendar className="w-16 h-16 text-light-sage mx-auto mb-4" />
            <h3 className="font-display text-h2 text-charcoal mb-2">No bookings yet</h3>
            <p className="text-sage mb-6">Start booking your favorite salons today!</p>
            <Link
              to="/explore"
              className="inline-block px-8 py-3 rounded-pill bg-gold text-charcoal font-bold hover:scale-105 transition-transform"
            >
              Explore Salons
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className={`bg-white rounded-card p-6 border-l-4 ${
                  booking.status === "confirmed"
                    ? "border-l-success-green"
                    : booking.status === "completed"
                    ? "border-l-gold"
                    : "border-l-error-red"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-h2 text-charcoal">{booking.salonName}</h3>
                    <p className="text-sage text-sm">
                      {(booking.services && booking.services.length > 0
                        ? booking.services.join(", ")
                        : booking.service) || "No services selected"}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-pill text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>

                <div className="grid gap-3 mb-6 sm:grid-cols-3">
                  <div className="flex items-center gap-2 text-charcoal">
                    <Calendar className="w-4 h-4 text-gold" />
                    <span className="text-sm">{new Date(booking.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal">
                    <Clock className="w-4 h-4 text-gold" />
                    <span className="text-sm">{booking.time}</span>
                  </div>
                  <div className="text-charcoal font-bold">₹{booking.price.toLocaleString()}</div>
                </div>

                <div className="flex gap-3">
                  <Link
                    to={`/salon/${booking.salonId}`}
                    className="px-4 py-2 rounded-pill bg-gold text-charcoal font-medium text-sm hover:bg-gold/90 transition-colors"
                  >
                    View Salon
                  </Link>
                  {booking.status === "confirmed" && (
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      className="px-4 py-2 rounded-pill border border-error-red text-error-red text-sm hover:bg-error-red/10 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
