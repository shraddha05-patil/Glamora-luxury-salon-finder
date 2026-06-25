import { useEffect, useRef } from "react";
import { Award, Brain, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Award,
    title: "Curated Excellence",
    description:
      "Every salon on our platform undergoes a rigorous vetting process. We personally visit, evaluate, and verify each establishment to ensure they meet our exacting standards of quality and service.",
  },
  {
    icon: Brain,
    title: "AI Intelligence",
    description:
      "Our proprietary AI engine analyzes your preferences, past bookings, and style choices to recommend salons and services perfectly tailored to your unique needs.",
  },
  {
    icon: Sparkles,
    title: "Seamless Experience",
    description:
      "From discovery to booking to post-service follow-up, every touchpoint is designed for effortless elegance. Because luxury should feel effortless.",
  },
];

const stats = [
  { number: "550+", label: "Premium Salons" },
  { number: "50K+", label: "Happy Bookings" },
  { number: "4.8\u2605", label: "Average Rating" },
];

export default function AboutPage() {
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-content",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".value-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-ivory pt-[72px]">
      {/* Hero */}
      <section className="pt-20 pb-16 page-padding">
        <div className="max-content">
          <span className="text-label text-gold tracking-[0.1em]">
            ABOUT GLAMORA
          </span>
          <h1 className="text-display-xl font-display text-charcoal mt-4 max-w-[700px]">
            Redefining Beauty Discovery
          </h1>
          <p className="mt-6 text-base text-sage max-w-[600px] leading-relaxed">
            We connect discerning clients with Bangalore's finest salons through
            intelligent AI recommendations. Our mission is to make luxury beauty
            accessible, personalized, and effortlessly bookable.
          </p>
        </div>
      </section>

      {/* Story */}
      <section ref={storyRef} className="pb-20 page-padding">
        <div className="max-content">
          <div className="flex flex-col md:flex-row gap-12 items-center max-w-[1000px] mx-auto">
            <div className="md:w-1/2">
              <div className="rounded-card overflow-hidden aspect-[4/5]">
                <img
                  src="/assets/img-about-story.jpg"
                  alt="Glamora story"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 story-content">
              <h2 className="font-display text-h1 text-charcoal mb-4">
                Our Story
              </h2>
              <p className="text-base text-sage leading-relaxed mb-6">
                Glamora was born from a simple observation: finding the right
                salon in a city as vibrant as Bangalore shouldn't feel like a
                gamble. We set out to create a platform that combines the
                precision of AI with the warmth of human curation, delivering a
                salon discovery experience worthy of the luxury services it
                promotes.
              </p>
              <p className="text-base text-sage leading-relaxed mb-8">
                Today, we partner with over 550 premium salons across Bangalore,
                each one handpicked and verified by our team. From Indiranagar's
                trendiest spots to Whitefield's serene wellness retreats, we
                bring the city's best beauty experiences to your fingertips.
              </p>

              {/* Stats */}
              <div className="flex gap-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <span className="text-h1 font-display text-gold">
                      {stat.number}
                    </span>
                    <p className="text-label text-sage mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="bg-cream section-gap page-padding">
        <div className="max-content">
          <SectionHeader
            label="OUR VALUES"
            headline="What We Stand For"
            subhead="The principles that guide everything we do"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {values.map((v) => (
              <div
                key={v.title}
                className="value-card bg-white rounded-card p-10 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center">
                  <v.icon className="w-12 h-12 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-h3 text-charcoal mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-sage leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
