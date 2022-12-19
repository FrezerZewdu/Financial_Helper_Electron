// ./tailwind.config.js


module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
      extend: {
        colors:{
          'buttonGreen': {
            100: '#5CC401',
            200: '#007A15'
          },
          'dashboard': '#212438',

        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }