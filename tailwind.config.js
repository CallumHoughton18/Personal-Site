const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'main-background': "url('/background.jpg')",
      }),
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
      }
    },
    colors: {
      polarNight: {
        darkest: '#2e3440',
        DEFAULT: '#3b4252',
        lighter: '#434c5e',
        lightest: '#4c566a',
      },
      snowStorm: {
        darkest: '#eceff4',
        DEFAULT: '#e5e9f0',
        lightest: '#eceff4'
      },
      frost: {
        blue: '#5e81ac',
        grayblue: '#81a1c1',
        cyan: '#88c0d0',
        lightgreen: '#8fbcbb'
      },
      aurora: {
        pink: '#b48ead',
        green: '#a3be8c',
        yellow: '#ebcb8b',
        orange: '#d08770',
        red: '#bf616a'
      },
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      blueGray: colors.blueGray,
    },
    width: {
      'overflow': '102%',
    },
    height: {
      'card': '33rem'
    },
    flex: {
      '25': "0 1 25%",
      '50': "0 1 50%"
    },
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
    },
    filter: { // defaults to {}
      'none': 'none',
      'grayscale': 'grayscale(1)',
      'invert': 'invert(1)',
      'sepia': 'sepia(1)',
    },
    backdropFilter: { // defaults to {}
      'none': 'none',
      'blur': 'blur(3px)',
    },
  },
  variants: {
    filter: ['responsive'], // defaults to ['responsive']
    backdropFilter: ['responsive'], // defaults to ['responsive']
  },
  plugins: [
    require('tailwindcss-filters'),
    require('tailwindcss-textshadow')
  ],
}
