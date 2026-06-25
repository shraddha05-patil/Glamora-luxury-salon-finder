import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { MessageSquareQuote, Send, Sparkles, CheckCircle2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { salons } from "@/data/salons";

type FeedbackFormState = {
  name: string;
  email: string;
  salonId: string;
  rating: string;
  message: string;
};

type FeedbackEntry = {
  id: number;
  salonId: string;
  salonName: string;
  name: string;
  email: string;
  rating: string;
  message: string;
  submittedAt: string;
};

const initialState: FeedbackFormState = {
  name: "",
  email: "",
  salonId: "",
  rating: "5",
  message: "",
};

export default function FeedbackPage() {
  const [form, setForm] = useState<FeedbackFormState>(initialState);
  const [feedbackEntries, setFeedbackEntries] = useState<FeedbackEntry[]>([]);
  const [submittedCount, setSubmittedCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    const stored = window.localStorage.getItem("glamora-feedback");
    if (!stored) return 0;
    try {
      return JSON.parse(stored).length;
    } catch {
      return 0;
    }
  });
  const { showToast } = useToast();

  useEffect(() => {
    const loadFeedback = () => {
      if (typeof window === "undefined") return;
      try {
        const stored = window.localStorage.getItem("glamora-feedback");
        const parsed = stored ? JSON.parse(stored) : [];
        setFeedbackEntries(parsed);
        setSubmittedCount(parsed.length);
      } catch {
        setFeedbackEntries([]);
        setSubmittedCount(0);
      }
    };

    loadFeedback();
    window.addEventListener("feedback-submitted", loadFeedback);
    return () => window.removeEventListener("feedback-submitted", loadFeedback);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.salonId || !form.message.trim()) {
      showToast("Please fill in your name, email, salon, and feedback.", "error");
      return;
    }

    const storedAccounts = window.localStorage.getItem("glamora_registered_users");
    const accounts = storedAccounts ? JSON.parse(storedAccounts) : [];
    const matchingAccount = accounts.find(
      (account: { name?: string; email?: string }) =>
        account.name?.toLowerCase().trim() === form.name.trim().toLowerCase() &&
        account.email?.toLowerCase().trim() === form.email.trim().toLowerCase()
    );

    if (!matchingAccount) {
      showToast("Your name and email must match an existing account before submitting feedback.", "error");
      return;
    }

    const selectedSalon = salons.find((salon) => salon.id === form.salonId);
    const stored = window.localStorage.getItem("glamora-feedback");
    const existing = stored ? JSON.parse(stored) : [];
    const updated = [
      {
        id: Date.now(),
        salonId: selectedSalon?.id || form.salonId,
        salonName: selectedSalon?.name || "Selected salon",
        name: form.name.trim(),
        email: form.email.trim(),
        rating: form.rating,
        message: form.message.trim(),
        submittedAt: new Date().toISOString(),
      },
      ...existing,
    ].slice(0, 50);

    window.localStorage.setItem("glamora-feedback", JSON.stringify(updated));
    setFeedbackEntries(updated);
    window.dispatchEvent(new Event("feedback-submitted"));
    setSubmittedCount(updated.length);
    setForm(initialState);
    showToast("Thank you! Your feedback has been shared with the salon review section.");
  };

  const handleRemoveFeedback = (id: number) => {
    const updated = feedbackEntries.filter((entry) => entry.id !== id);
    setFeedbackEntries(updated);
    window.localStorage.setItem("glamora-feedback", JSON.stringify(updated));
    setSubmittedCount(updated.length);
    window.dispatchEvent(new Event("feedback-submitted"));
    showToast("Feedback removed.", "success");
  };

  return (
    <main className="min-h-screen bg-ivory pt-[72px]">
      <section className="page-padding py-20">
        <div className="max-content grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <div className="space-y-6">
            <span className="text-label text-gold tracking-[0.2em]">YOUR VOICE MATTERS</span>
            <h1 className="text-display-xl font-display text-charcoal max-w-[650px]">
              Share feedback and help us elevate your salon experience.
            </h1>
            <p className="text-base text-sage max-w-[600px] leading-relaxed">
              Whether you loved a booking flow, want a feature added, or spotted something that could be better,
              we want to hear it. Your feedback guides our next improvements.
            </p>

            <div className="rounded-card border border-gold/20 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3 text-gold">
                <MessageSquareQuote className="h-5 w-5" />
                <h2 className="font-display text-h3 text-charcoal">What we’re listening for</h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-sage">
                <li className="flex gap-2"><Sparkles className="mt-0.5 h-4 w-4 text-gold" /> Salon discovery experience and recommendations</li>
                <li className="flex gap-2"><Sparkles className="mt-0.5 h-4 w-4 text-gold" /> App usability, design, and booking flow</li>
                <li className="flex gap-2"><Sparkles className="mt-0.5 h-4 w-4 text-gold" /> New features or services you’d love to see</li>
              </ul>
            </div>

            <div className="rounded-card bg-charcoal p-6 text-cream shadow-soft">
              <div className="flex items-center gap-2 text-gold">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-label">WE'VE RECEIVED</span>
              </div>
              <p className="mt-3 text-4xl font-display">{submittedCount}</p>
              <p className="text-sm text-cream/80">feedback submissions so far</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-card border border-charcoal/10 bg-white p-8 shadow-soft">
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="rounded-pill border border-light-sage/60 bg-cream px-4 py-3 text-sm outline-none ring-0"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="rounded-pill border border-light-sage/60 bg-cream px-4 py-3 text-sm outline-none ring-0"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                <span>Salon</span>
                <select
                  name="salonId"
                  value={form.salonId}
                  onChange={handleChange}
                  className="rounded-pill border border-light-sage/60 bg-cream px-4 py-3 text-sm outline-none ring-0"
                >
                  <option value="">Select a salon</option>
                  {salons.map((salon) => (
                    <option key={salon.id} value={salon.id}>
                      {salon.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                <span>Rating</span>
                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  className="rounded-pill border border-light-sage/60 bg-cream px-4 py-3 text-sm outline-none ring-0"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Needs work</option>
                  <option value="1">1 - Poor</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
                <span>Your feedback</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us what you liked or what should improve..."
                  className="rounded-card border border-light-sage/60 bg-cream px-4 py-3 text-sm outline-none ring-0"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-pill bg-gradient-to-r from-gold via-soft-gold to-gold px-6 py-3 text-sm font-semibold text-charcoal shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <Send className="h-4 w-4" />
              Submit feedback
            </button>

            <p className="mt-4 text-xs text-sage">
              We only use your details to follow up on your feedback and improve the Glamora experience.
            </p>
          </form>

          <section className="rounded-card border border-charcoal/10 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-h3 text-charcoal">Recent feedback</h2>
                <p className="mt-1 text-sm text-sage">Select any item and remove it whenever you need.</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {feedbackEntries.length === 0 ? (
                <div className="rounded-card border border-dashed border-light-sage/60 bg-cream p-4 text-sm text-sage">
                  No feedback submitted yet.
                </div>
              ) : (
                feedbackEntries.map((entry) => (
                  <div key={entry.id} className="rounded-card border border-light-sage/40 bg-cream p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-charcoal">{entry.name}</p>
                        <p className="text-sm text-sage">{entry.salonName}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeedback(entry.id)}
                        className="inline-flex items-center gap-2 rounded-pill border border-gold/30 px-3 py-2 text-sm font-medium text-gold transition hover:bg-gold/10"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                    <p className="mt-3 text-sm text-charcoal">{entry.message}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-sage">
                      <span>Rating: {entry.rating}/5</span>
                      <span>•</span>
                      <span>{new Date(entry.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
