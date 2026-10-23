/** Theme-aware colors: values live in CSS variables (see src/index.css) and flip with the `light` class on <html>. */
const themed = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: themed("ink-950"),
          900: themed("ink-900"),
          800: themed("ink-800"),
          700: themed("ink-700"),
          600: themed("ink-600"),
        },
        zinc: {
          50: themed("zinc-50"),
          100: themed("zinc-100"),
          200: themed("zinc-200"),
          300: themed("zinc-300"),
          400: themed("zinc-400"),
          500: themed("zinc-500"),
        },
        emerald: {
          300: themed("emerald-300"),
          400: themed("emerald-400"),
        },
        line: themed("line"),
        onaccent: "#0A0A0B",
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
      },
    },
  },
  plugins: [],
}
