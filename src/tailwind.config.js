const TailWindTheme = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {},
    fontFamily: {},
    colors: {
      bgWhite: '#feffff',
      dulwichRed: '#E33939',
      white: '#FFF',
      black: '#000',
      bgGray: '#ECECEC',
      bgBlur: 'rgba(255, 255, 255, 0.5)',
      bgBlue: '#A9BEF5',
      darkGray: '#656565',
      green: '#27C049',
    },
    fontSize: {
      sm: 12,
      md: 14,
      lg: 19,
      xl: 20,
      xxl: 24,
      xxxl: 40,
    },
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    screens: {
      //dimensions are aligned to MUI breakpoints
      xs: '0px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
      //custom breakpoints for respective pages
      phone: '640px',
      laptop: '900px',
      homePhone: '450px',
      homeLaptop: '1100px',
      addRoomLaptop: '1369px',
      addRoomSmallerLaptop: '913px',
      bookingSafe: '960px',
      calendarPhone: '576px',
      calendarLaptop: '900px',
    },
  },
  variants: {
    extend: {
      dropShadow: ['hover'],
    },
  },
};

module.exports = TailWindTheme;
