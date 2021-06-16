module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
     darkMode: false, // or 'media' or 'class'
     theme: {
       extend: {
        spacing: {
          '72': '18rem',
          '84': '21rem',
          '96': '24rem',
          '192': '48rem'
        }
       },
     },
     variants: {
       extend: {},
     },
     plugins: [],
   }