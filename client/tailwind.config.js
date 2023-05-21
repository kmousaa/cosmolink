/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      "ibm-plex-mono": "var(--ibm-plex-mono)",
      "ibm-plex-mono-light": "var(--ibm-plex-mono-light)",
      quicksand: "var(--quicksand)",
      "quicksand-light": "var(--quicksand-light)",
      "quicksand-bold": "var(--quicksand-bold)",
      "major-mono-display": "var(--major-mono-display)",
    },
    extend: {},
  },
  plugins: [],
}