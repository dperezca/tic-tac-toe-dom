/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        one: "#ef476f",
        two: "#ffd166",
        three: "#06d6a0",
        four: "#118ab2",
        five: "#073b4c",
      },
    },
  },
  plugins: [],
};
