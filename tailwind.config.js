/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],

  darkMode: 'dark',

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A5C75',
          on: '#FFFFFF',
          hover: '#084C61',
        },
        secondary: {
          DEFAULT: '#A8DF8E',
          on: '#0A3D2E',
          hover: '#8FCC72',
        },

        // 🌙 Dark Mode Colors
        dark: {
          background: '#121A1F',
          surface: '#1E2A30',
          textPrimary: '#FFFFFF',
          textSecondary: '#CFD8DC',
        },

        background: '#F3F7F8',
        surface: '#FFFFFF',

        text: {
          primary: '#102A33',
          secondary: '#37474F',
          tertiary: '#607D8B',
          disabled: '#78909C',
        },

        outline: '#D1DDE1',
        divider: '#D1DDE1',

        error: {
          DEFAULT: '#D32F2F',
          on: '#FFFFFF',
        },
      },

      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Tahoma', 'sans-serif'],
      },

      fontSize: {
        display: ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['30px', { lineHeight: '1.3', fontWeight: '600' }],
        body: ['16px', { lineHeight: '1.7', fontWeight: '400' }],
        small: ['13px', { lineHeight: '1.5', fontWeight: '500' }],
      },
    },
  },

  plugins: [],
}