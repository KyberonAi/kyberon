import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        kyberon: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#bcdbff",
          300: "#8ec5ff",
          400: "#59a4ff",
          500: "#3b82fc",
          600: "#1b5ff2",
          700: "#1a4ddf",
          800: "#1c3fb5",
          900: "#1c398e",
          950: "#162456",
        },
        neon: {
          cyan: "#00f0ff",
          purple: "#a855f7",
          blue: "#3b82f6",
          pink: "#ec4899",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.15), transparent)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)",
      },
      boxShadow: {
        "neon-blue": "0 0 20px rgba(59,130,246,0.3), 0 0 60px rgba(59,130,246,0.1)",
        "neon-cyan": "0 0 20px rgba(0,240,255,0.3), 0 0 60px rgba(0,240,255,0.1)",
        "neon-purple": "0 0 20px rgba(168,85,247,0.3), 0 0 60px rgba(168,85,247,0.1)",
        "glass": "0 8px 32px rgba(0,0,0,0.3)",
        "glass-hover": "0 8px 32px rgba(59,130,246,0.15), 0 0 60px rgba(59,130,246,0.05)",
      },
      animation: {
        "aurora": "aurora 15s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "grid-fade": "gridFade 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.5s ease-out",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translateX(0%) translateY(0%) rotate(0deg)", opacity: "0.5" },
          "33%": { transform: "translateX(30%) translateY(-20%) rotate(120deg)", opacity: "0.7" },
          "66%": { transform: "translateX(-20%) translateY(20%) rotate(240deg)", opacity: "0.4" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gridFade: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(59,130,246,0.2)" },
          "100%": { boxShadow: "0 0 40px rgba(59,130,246,0.4), 0 0 80px rgba(59,130,246,0.1)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
