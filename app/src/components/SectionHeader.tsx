interface SectionHeaderProps {
  label: string;
  headline: string;
  subhead?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  label,
  headline,
  subhead,
  centered = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <span className={`text-label tracking-[0.1em] ${light ? "text-gold" : "text-charcoal"}`}>{label}</span>
      <h2
        className={`text-display-l font-display mt-3 ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {headline}
      </h2>
      {subhead && (
        <p
          className={`mt-4 text-base max-w-xl ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-sage"}`}
        >
          {subhead}
        </p>
      )}
    </div>
  );
}
