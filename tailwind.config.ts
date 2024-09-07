import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'header-gray':"#AAAAAA",
        'header-white':"#F2F2F2",
        'header-blue':"#459BFF",
        'description-white':"#EEEEEE",
        'line-blue':"#5AA5FD",
        'slider-bg':"#424242",
        'slider-blue':"#6BAFFF",
        'slider-green':"#84F15E",
        "description-heading": "#FCF1B6",
      },
      fontSize:{
        'header': '2rem',
        'header-lg':'64px',
        'description': '1rem',
        'description-lg': '24px',
      },
      fontFamily:{
        'default': ['League Spartan', 'sans-serif'],
        // 'description': ['Poppins', 'sans-serif'],
      },
      keyframes: {
        fade_in_out: {
          '0%': { opacity: '0' },
          '10%': { opacity: '1' },
          '98%': { opacity: '1' },
          '100%': { opacity: '0' },
        }
      },
      animation: {
        fade_in_out: 'fade_in_out 1s ease-out infinite',
      }
    },
  },
  plugins: [],
};
export default config;
