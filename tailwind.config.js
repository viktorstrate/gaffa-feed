module.exports = {
  mode: 'jit',
  purge: {
    layers: ['utilities'],
    content: ['./src/**/*.{html,njk,md}'],
  },
  theme: {
    extend: {
      colors: {},
      spacing: {},
    },
  },
  variants: {},
  plugins: [],
}
