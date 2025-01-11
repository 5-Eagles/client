/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'card-bg': '#F5F6F7',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#2563eb",
          secondary: "#7c3aed",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff", 
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#2563eb",
          secondary: "#7c3aed",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#1f2937",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
