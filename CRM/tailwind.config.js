/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2563eb', // Blue-600
        'primary-hover': '#1d4ed8', // Blue-700
        'secondary': '#f3f4f6', // Gray-100
        'text-main': '#1f2937', // Gray-800
        'text-main2': '#fff',
        'text-light': '#6b7280', // Gray-500
        'border-color': '#e5e7eb', // Gray-200
        'success': '#16a34a', // Green-600
        'error': '#dc2626', // Red-600
        'warning-bg': '#fef9c3', // Yellow-100
        'warning-text': '#ca8a04', // Yellow-600
      }
    },
  },
  plugins: [],
}