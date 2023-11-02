/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
    colors: {
      "pfmv-light-blue": "#0080C2",
      "pfmv-dark-blue": "#292A82",
      "dsfr-text-label-blue-france": "var(--text-label-blue-france)",
    },
  },
  plugins: [],
};
