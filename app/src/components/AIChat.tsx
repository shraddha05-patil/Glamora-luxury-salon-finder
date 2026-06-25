import { useState } from "react";
import { Link } from "react-router-dom";
import { salons, type Salon } from "@/data/salons";

type Message = { id: number; from: "user" | "bot"; text: string };
type ChatContext = {
  intent: "" | "hair" | "makeup" | "spa" | "nails";
  step: 0 | 1 | 2 | 3;
  serviceType: string;
  budget: string;
};

export default function AIChat({ className = "" }: { className?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [context, setContext] = useState<ChatContext>({ intent: "", step: 0, serviceType: "", budget: "" });
  const [recommendedSalons, setRecommendedSalons] = useState<Salon[]>([]);

  function normalize(text: string) {
    return text.toLowerCase().trim();
  }

  function detectIntent(text: string): ChatContext["intent"] {
    if (text.includes("makeup") || text.includes("bridal")) return "makeup";
    if (text.includes("hair")) return "hair";
    if (text.includes("spa") || text.includes("massage") || text.includes("facial")) return "spa";
    if (text.includes("nail") || text.includes("manicure") || text.includes("pedicure")) return "nails";
    return "";
  }

  function getFirstQuestion(intent: ChatContext["intent"]): string {
    if (intent === "makeup") {
      return "Awesome! 💄 Makeup is a specialty. What type would you like — Everyday, Party, Bridal, or HD?";
    }
    if (intent === "hair") {
      return "Great! 💇 What hair service do you need — Haircut, Color, Treatment, or Styling?";
    }
    if (intent === "spa") {
      return "Perfect! 💆 What spa service do you want — Massage, Facial, Body Treatment, or Relaxation?";
    }
    if (intent === "nails") {
      return "Lovely! 💅 Are you looking for Manicure, Pedicure, Nail Art, or Extensions?";
    }
    return "What can I help you with today — Hair, Makeup, Spa, or Nails?";
  }

  function parseServiceType(intent: ChatContext["intent"], text: string) {
    if (intent === "makeup") {
      if (text.includes("bridal")) return "Bridal";
      if (text.includes("party")) return "Party";
      if (text.includes("hd")) return "HD";
      if (text.includes("everyday") || text.includes("daily")) return "Everyday";
    }
    if (intent === "hair") {
      if (text.includes("cut")) return "Haircut";
      if (text.includes("color") || text.includes("colour")) return "Color";
      if (text.includes("treat")) return "Treatment";
      if (text.includes("style")) return "Styling";
    }
    if (intent === "spa") {
      if (text.includes("massage")) return "Massage";
      if (text.includes("facial")) return "Facial";
      if (text.includes("body")) return "Body Treatment";
      if (text.includes("relax")) return "Relaxation";
    }
    if (intent === "nails") {
      if (text.includes("manicure")) return "Manicure";
      if (text.includes("pedicure")) return "Pedicure";
      if (text.includes("art")) return "Nail Art";
      if (text.includes("extension")) return "Extensions";
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function parseBudget(text: string) {
    const normalized = normalize(text);

    if (normalized.includes("5000+") || normalized.includes("5000 plus") || normalized.includes("5000 or more") || normalized.includes("above 5000")) {
      return "₹5000+";
    }

    if (normalized.includes("3000-4000") || normalized.includes("3000 to 4000") || normalized.includes("₹3000-₹4000")) {
      return "₹3000-₹4000";
    }

    if (normalized.includes("2000-3000") || normalized.includes("2000 to 3000") || normalized.includes("₹2000-₹3000")) {
      return "₹2000-₹3000";
    }

    if (normalized.includes("1000-2000") || normalized.includes("1000 to 2000") || normalized.includes("₹1000-₹2000")) {
      return "₹1000-₹2000";
    }

    const rangeMatch = normalized.match(/(\d{3,4})\s*(to|-|–)\s*(\d{3,4})/);
    if (rangeMatch) {
      const min = parseInt(rangeMatch[1], 10);
      const max = parseInt(rangeMatch[3], 10);
      if (max >= 5000) return "₹5000+";
      if (max >= 4000) return "₹3000-₹4000";
      if (min >= 2000) return "₹2000-₹3000";
      return "₹1000-₹2000";
    }

    const singleValueMatch = normalized.match(/\b(1000|1500|1600|2000|2500|3000|3500|4000|5000)\b/);
    if (singleValueMatch) {
      const value = parseInt(singleValueMatch[1], 10);
      if (value >= 5000) return "₹5000+";
      if (value >= 3000) return "₹3000-₹4000";
      if (value >= 2000) return "₹2000-₹3000";
      return "₹1000-₹2000";
    }

    return "₹1000-₹2000";
  }

  function parseArea(text: string) {
    const areas = [
      "indiranagar",
      "koramangala",
      "whitefield",
      "hsr layout",
      "electronic city",
      "jayanagar",
      "jp nagar",
      "mg road",
      "marathahalli",
      "bellandur"
    ];
    const normalized = normalize(text);
    const match = areas.find((area) => normalized.includes(area));
    if (match) {
      return match
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function getFollowUpReply(userText: string) {
    const text = normalize(userText);

    if (context.step === 1) {
      const serviceType = parseServiceType(context.intent, text);
      setContext((current) => ({ ...current, step: 2, serviceType }));
      return `Great choice! ${serviceType} sounds perfect. Please choose your budget range:\n1) ₹1000-₹2000\n2) ₹2000-₹3000\n3) ₹3000-₹4000\n4) ₹5000+`;
    }

    if (context.step === 2) {
      const budget = parseBudget(text);
      setContext((current) => ({ ...current, step: 3, budget }));
      return "Nice. Which area are you in or prefer? Indiranagar, Koramangala, Whitefield, HSR Layout, or another Bangalore neighborhood?";
    }

    if (context.step === 3) {
      const area = parseArea(text);
      const summary = `Great! I have noted ${context.serviceType} with a ${context.budget} budget in ${area}.`;
      const matches = salons
        .filter((salon) =>
          salon.services.some((service) => service.category.toLowerCase().includes(context.intent || "")) &&
          salon.area.toLowerCase() === area.toLowerCase()
        )
        .slice(0, 3);

      setContext({ intent: "", step: 0, serviceType: "", budget: "" });
      setRecommendedSalons(matches.length > 0 ? matches : salons.slice(0, 3));

      return `${summary} Here are recommended salons based on your makeup preferences. Tap a salon image to view details or use the AI Recommender below for exact matches.`;
    }

    return "Can you tell me what service you need? Hair, Makeup, Spa, or Nails?";
  }

  function getAIReply(userText: string): string {
    const text = normalize(userText);

    if (context.intent && context.step > 0) {
      return getFollowUpReply(userText);
    }

    if (text.match(/^(hi|hello|hey|hey there|what's up|greetings|hola|namaste)/)) {
      return "Hey there! 👋 Welcome to Glamora! I can help you find the perfect salon. What are you looking for — hair, makeup, spa, or nails?";
    }

    const intent = detectIntent(text);
    if (intent) {
      setContext({ intent, step: 1, serviceType: "", budget: "" });
      return getFirstQuestion(intent);
    }

    if (text.includes("recommend") || text.includes("suggest") || text.includes("best") || text.includes("top")) {
      return "Here are some top salon recommendations for you:\n\n• Glam Glow Studio — Makeup specialists, Whitefield\n• Bridal Beauty — Bridal and party makeup, Koramangala\n• Velvet Makeup Lounge — Premium makeup services, Indiranagar\n\nFor an exact match, use the AI Recommender below and filter by service, area, and price.";
    }

    if (text.includes("price") || text.includes("cost") || text.includes("how much") || text.includes("budget") || /\d/.test(text)) {
      const budget = parseBudget(text);
      if (budget && (text.includes("to") || text.includes("-") || text.includes("budget") || text.includes("price") || text.includes("cost") || text.includes("how much") || /\d/.test(text))) {
        return `Great, I’ve noted your budget around ${budget}. Please choose the closest range:\n1) ₹1000-₹2000\n2) ₹2000-₹3000\n3) ₹3000-₹4000\n4) ₹5000+`;
      }
      return "Typical ranges are: Hair ₹500-₹1500, Makeup ₹1500-₹3000, Spa ₹1200-₹5000, Nails ₹400-₹1200. Use the Recommender to filter by your budget.";
    }

    if (text.includes("area") || text.includes("location") || text.includes("near")) {
      return "We cover Bangalore areas like Indiranagar, Koramangala, Whitefield, HSR Layout, Electronic City, Jayanagar, JP Nagar, MG Road, Marathahalli, and Bellandur.";
    }

    return "Sorry, I can’t answer this question right now. 😊 You can ask me for salon recommendations by service, budget, or area in Bangalore.";
  }

  function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), from: "user" as const, text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    setTimeout(() => {
      const reply = getAIReply(input);
      const botMsg = { id: Date.now() + 1, from: "bot" as const, text: reply };
      setMessages((m) => [...m, botMsg]);
    }, 600);
  }

  return (
    <div className={`bg-white rounded-card p-6 shadow-subtle border border-light-sage ${className}`}>
      <h3 className="font-display text-h3 text-charcoal mb-2">Glamora AI Assistant</h3>
      <p className="text-sm text-sage mb-4">Ask me for salon recommendations, service ideas, budgets, or areas in Bangalore.</p>

      <div className="flex flex-col gap-3">
        <div className="max-h-48 overflow-y-auto p-2 bg-ivory rounded-md border">
          {messages.length === 0 && <div className="text-sm text-sage">Say hi — try: “Recommend a salon for bridal makeup”</div>}
          {messages.map((m) => (
            <div key={m.id} className={`mb-2 ${m.from === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`${m.from === 'user' ? 'inline-block bg-cream' : 'inline-block bg-ivory'} rounded-md px-3 py-2 text-sm`}>{m.text}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded-input p-3 border" placeholder="Ask the assistant..." />
          <button onClick={sendMessage} className="px-4 py-2 rounded-pill bg-gold text-charcoal font-bold">Send</button>
        </div>

        {recommendedSalons.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-charcoal mb-4">Recommended Salon Matches</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {recommendedSalons.map((salon) => (
                <Link
                  key={salon.id}
                  to={`/salon/${salon.id}`}
                  className="group block overflow-hidden rounded-[20px] border border-light-sage bg-white shadow-sm transition hover:shadow-lg"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={salon.image}
                      alt={salon.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <h5 className="font-medium text-charcoal">{salon.name}</h5>
                    <p className="text-sm text-sage">{salon.location}</p>
                    <p className="text-sm text-charcoal mt-2">Starts from ₹{salon.startingPrice.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
