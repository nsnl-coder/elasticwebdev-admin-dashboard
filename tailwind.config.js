/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(115, 103, 240, 1)',
        'primary-light': '',
        success: 'rgba(40, 199, 111, 1)',
        'success-light': '',
        danger: 'rgba(234, 84, 85, 1)',
        'danger-light': '',
        warning: 'rgba(255, 173, 95, 1)',
        'warning-light': '',
        heading: 'rgba(51, 48, 60,0.87)',
        paragraph: 'rgba(51, 48, 60,0.87)',
        'paragraph-light': 'rgba(51, 48, 60,0.38)',
      },
      fontSize: {
        h1: '20px',
        h2: '16px',
        p1: '16px',
        p2: '14px',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: false,
  },
};
