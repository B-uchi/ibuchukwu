import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "josefin": ["Josefin Sans", "sans-serif"],
        "roboto": ["Roboto", "sans-serif"],
        "arrows": ["Edu AU VIC WA NT Arrows", "cursive"],
        "nova": ["Nova Flat", "system-ui"],
        "parkinsans": ["Parkinsans", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }: any) {
      addUtilities({
        '.scrollbar-thin': {
          '--scrollbar-width': '5px',
          '--scrollbar-height': '5px',
          'scrollbar-width': 'thin',
          'scrollbar-color': '#666 transparent',
          
          '&::-webkit-scrollbar': {
            width: 'var(--scrollbar-width)',
            height: 'var(--scrollbar-height)',
          },
          
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          
          '&::-webkit-scrollbar-thumb': {
            background: '#666',
            'border-radius': '10px',
          },
          
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#888',
          },
        },
        
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        
        '.scrollbar-show-hover': {
          '&::-webkit-scrollbar': {
            width: '0',
            height: '0',
          },
          '&:hover::-webkit-scrollbar': {
            width: 'var(--scrollbar-width)',
            height: 'var(--scrollbar-height)',
          },
          '&:hover::-webkit-scrollbar-thumb': {
            background: '#666',
          },
        },
      })
    }),
  ],
} satisfies Config;
