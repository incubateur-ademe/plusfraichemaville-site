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
      "pfmv-light-blue": "#0080C2",
      "pfmv-dark-blue": "#292A82",
      "dsfr-text-label-blue-france": "var(--text-label-blue-france)",
      "dsfr-background-yellow": "var(--background-contrast-yellow-moutarde)",
      "dsfr-background-blue-cumulus": "var(--background-action-low-blue-cumulus)",
      "dsfr-background-grey": "var(--background-default-grey-active)",
    },
  },
  plugins: [],
};
