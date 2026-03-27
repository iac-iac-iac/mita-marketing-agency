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
          primary: '#7274B3',
          secondary: '#293349',
          accent: '#5A4D7A',
          dark: '#090909',
          light: '#EDECED',
          gray: '#323131',
          purple: '#3C3353',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
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
