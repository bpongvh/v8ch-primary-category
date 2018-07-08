const cssnanoConfig = {
  preset: ['default', { discardComments: { removeAll: true } }],
};

module.exports = ({ options }) => ({
  parser: options.enabled.optimize ? 'postcss-safe-parser' : undefined,
  plugins: {
    cssnano: options.enabled.optimize ? cssnanoConfig : false,
    autoprefixer: true,
  },
});
