import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  const handleSaveProfile = () => {
    if (user) {
      const updated = { ...user, name, email, phone };
      localStorage.setItem("glamora_user", JSON.stringify(updated));
      showToast("Profile updated successfully!");
    }
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-ivory pt-[72px]">
      <div className="max-content page-padding py-10">
        <div className="max-w-2xl mx-auto bg-white rounded-card shadow-subtle p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-cream border border-gold flex items-center justify-center">
              <User className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h1 className="font-display text-h1 text-charcoal">
                Profile Settings
              </h1>
              <p className="text-sm text-sage">
                Update your personal details here.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-label text-sage mb-2 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-input border border-light-sage text-sm focus:outline-none focus:border-gold transition-all"
              />
            </div>
            <div>
              <label className="text-label text-sage mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-input border border-light-sage text-sm focus:outline-none focus:border-gold transition-all"
              />
            </div>
            <div>
              <label className="text-label text-sage mb-2 block">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-input border border-light-sage text-sm focus:outline-none focus:border-gold transition-all"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              className="w-full py-3.5 rounded-pill bg-gold text-white text-sm font-medium hover:bg-gold/90 transition-all hover:scale-[1.01]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
