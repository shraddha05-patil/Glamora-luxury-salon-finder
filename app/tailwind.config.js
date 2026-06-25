/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        ivory: "#F9F7F0",
        charcoal: "#2B2B2B",
        sage: "#7A8B7A",
        gold: "#D4AF37",
        "soft-gold": "#E8C84B",
        cream: "#F5F0E6",
        taupe: "#3D3530",
        blush: "#E8D5D0",
        "light-sage": "#D4DDD4",
        "error-red": "#C45B4A",
        "success-green": "#5A8F6E",
        // Luxury colors
        "royal-purple": "#6B4C7F",
        "deep-burgundy": "#722F37",
        "champagne": "#F7E7CE",
        "pearl": "#F0EAD6",
        "bronze": "#CD7F32",
        "rose-gold": "#B76E79",
        "midnight-blue": "#191970",
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        card: "16px",
        pill: "25px",
        input: "12px",
        tag: "20px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        subtle: "0 4px 24px rgba(43,43,43,0.08)",
        card: "0 4px 12px rgba(0,0,0,0.08)",
        "card-hover": "0 12px 40px rgba(43,43,43,0.12)",
        glass: "0 8px 32px rgba(43,43,43,0.08)",
        gold: "0 10px 40px rgba(212, 175, 55, 0.4)",
        "gold-lg": "0 20px 60px rgba(212, 175, 55, 0.5)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "shimmer-btn": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        shimmer: "shimmer 1.5s infinite linear",
        "shimmer-btn": "shimmer-btn 3s infinite linear",
        pulse: "pulse 2s infinite ease-in-out",
        float: "float 3s infinite ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
