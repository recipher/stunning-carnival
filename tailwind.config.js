/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    // require("tailwindcss-font-inter"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
