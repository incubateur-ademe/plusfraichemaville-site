/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./forms/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        xtraBold: ["var(--font-xtra-bold)"],
      },
    },
    boxShadow: {
      "pfmv-card-shadow": "0px 4px 20px 0px rgba(0, 0, 0, 0.10)",
      none: "0px 0px rgba(0, 0, 0)",
    },
    colors: {
      white: "#fff",
      "pfmv-light-blue": "#0080C2",
      "pfmv-dark-blue": "#292A82",
      "pfmv-light-grey": "#CECECE",
      "pfmv-grey-dashed": "#A6A6A6",
      "pfmv-navy": "var(--background-active-blue-france)",
      "dsfr-background-default-grey-hover": "var(--background-default-grey-hover)",
      "dsfr-background-action-high-success-hover": "var(--background-action-high-success-hover)",
      "dsfr-border-default-blue-france": "var(--border-default-blue-france)",
      "dsfr-background-flat-blue-france": "var(--background-flat-blue-france)",
      "dsfr-border-action-low-blue-france": "var(--border-action-low-blue-france)",
      "dsfr-blue-france-925": "var(--border-open-blue-france)",
      "dsfr-text-label-blue-france": "var(--text-label-blue-france)",
      "dsfr-hover-blue-sun": "var(--background-action-high-blue-france-hover)",
      "dsfr-background-alt-blue-france": "var(--background-alt-blue-france)",
      "dsfr-background-alt-grey": "var(--background-alt-grey)",
      "dsfr-background-action-low-blue-france": "var(--background-action-low-blue-france)",
      "dsfr-background-default-grey": "var(--background-default-grey)",
      "dsfr-text-mention-grey": "var(--text-mention-grey)",
      "dsfr-text-disabled-grey": "var(--text-disabled-grey)",
      "dsfr-text-title-grey": "var(--text-title-grey)",
      "dsfr-border-default-grey": "var(--border-default-grey)",
      "dsfr-text-default-grey": "var(--text-default-grey)",
      "dsfr-text-error": "var(--text-default-error)",
      "dsfr-contrast-grey": "var(--background-contrast-grey)",

      "tab-hover": "rgba(66, 17, 170, 0.10)!important",
    },
  },
  plugins: [],
};
