/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      zIndex: {
        1000: "1000",
      },
      fontFamily: {
        xtraBold: ["var(--font-xtra-bold)"],
      },
    },
    colors: {
      "pfmv-light-blue": "#0080C2",
      "pfmv-dark-blue": "#292A82",
      "dsfr-text-label-blue-france": "var(--text-label-blue-france)",
      "dsfr-text-color-green": "var(--text-label-green-emeraude)",
      "dsfr-text-color-grey": "var(--text-mention-grey)",
      "dsfr-border-grey": "var(--border-default-grey)",
    },
  },
  plugins: [],
};
