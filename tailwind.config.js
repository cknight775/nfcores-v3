/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DC2626', // Red-600
          hover: '#B91C1C',   // Red-700
        },
        secondary: {
          DEFAULT: '#10B981', // Green-500
          hover: '#059669',   // Green-600
        },
        accent: {
          DEFAULT: '#3B82F6', // Blue-500
          hover: '#2563EB',   // Blue-600
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

