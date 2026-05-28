/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette: warm dark brown + cream + stone
        brand: {
          950: "#1A0F0A",
          900: "#2C1810",
          800: "#3D2218",
          700: "#5C3520",
          600: "#7A4A2E",
          500: "#9A6040",
          400: "#B8845E",
          300: "#CFA882",
          200: "#E5D0B8",
          100: "#F5EDE2",
          50:  "#FAF5EF",
        },
        stone: {
          950: "#0C0A09",
          900: "#1C1917",
          800: "#292524",
          700: "#44403C",
          600: "#57534E",
          500: "#78716C",
          400: "#A8A29E",
          300: "#D6D3D1",
          200: "#E7E5E4",
          100: "#F5F5F4",
          50:  "#FAFAF9",
        },
      },
      fontFamily: {
        // Distinctive font pairing
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      boxShadow: {
        "warm-sm": "0 1px 3px 0 rgba(92,53,32,0.08), 0 1px 2px -1px rgba(92,53,32,0.05)",
        "warm-md": "0 4px 16px -2px rgba(92,53,32,0.12), 0 2px 8px -2px rgba(92,53,32,0.06)",
        "warm-lg": "0 10px 40px -4px rgba(92,53,32,0.15), 0 4px 16px -4px rgba(92,53,32,0.08)",
        "warm-xl": "0 20px 60px -8px rgba(92,53,32,0.2), 0 8px 24px -6px rgba(92,53,32,0.1)",
        "card":    "0 2px 24px rgba(44,24,16,0.07), 0 1px 4px rgba(44,24,16,0.04)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
