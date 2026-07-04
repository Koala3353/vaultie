/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./*.{js,jsx}"],
  darkMode: "media", // follows the device's light/dark setting automatically
  theme: {
    extend: {
      colors: {
        sapphire: {
          DEFAULT: "#3C507D",
          dark: "#112250",
          light: "#E0C58F",
        },
        royal: "#112250",
        quicksand: "#E0C58F",
        swan: "#F5F0E9",
        shell: "#D9CBC2",
        over: "#E5484D", // tomato / over-budget red
        caution: "#F5A623", // amber / nearing limit
        // New theme: blue/beige tinted neutral ramp
        gray: {
          50: "#F5F0E9", // Swan Wing: light page bg / dark primary text
          100: "#EDE7E0", // light track + toggle bg
          200: "#D9CBC2", // Shellstone: light border / disabled fill
          300: "#C6B7AE", // light stronger border
          400: "#9C928F", // muted (reads in both modes)
          500: "#706D75", // light muted text
          600: "#4D556B", // light body text
          700: "#324063", // dark input border
          800: "#223259", // dark border / raised surface
          900: "#182654", // light primary text / dark card
          950: "#112250", // Royal Blue: dark page bg
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "San Francisco",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
