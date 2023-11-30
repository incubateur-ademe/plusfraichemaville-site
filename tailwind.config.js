/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        xtraBold: ["var(--font-xtra-bold)"],
      },
    },
    colors: {
      white: "#FFF",
      "pfmv-light-blue": "#0080C2",
      "pfmv-dark-blue": "#292A82",
      "dsfr-text-label-blue-france": "var(--text-label-blue-france)",
      "dsfr-hover-blue-sun": "var(--background-action-high-blue-france-hover)",
      "dsfr-background-blue-cumulus": "var(--background-action-low-blue-cumulus)",
      "dsfr-background-grey": "var(--background-default-grey-active)",
      "dsfr-text-mention-grey": "var(--text-mention-grey)",
      "dsfr-text-little-grey": "var(--text-title-grey)",
    },
  },
  plugins: [],
};
