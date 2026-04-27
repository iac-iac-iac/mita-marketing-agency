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
        direct: {
          primary: '#D4A84B',
          secondary: '#1A1A1A',
          accent: '#B8892E',
          dark: '#0D0D0D',
          light: '#FFFFFF',
          gray: '#2A2A2A',
          purple: '#2A2A2A',
          gold: '#F2D07A',
          'gold-highlight': '#F5E1A4',
          muted: '#707070',
          'text-secondary': '#B0B0B0',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Arial',
          'sans-serif',
        ],
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
        shine: 'shine 2s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        shine: {
          '0%': {
            backgroundPosition: '-100% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      },
    },
  },
  plugins: [
    import('@tailwindcss/typography'),
  ],
}
