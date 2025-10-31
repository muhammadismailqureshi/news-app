module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-nesting': {},
    '@tailwindcss/postcss': {},  // ← THIS LINE IS CRITICAL
    autoprefixer: {},
  },
};