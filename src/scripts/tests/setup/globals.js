global.wp = {};

Object.defineProperty(global.wp, 'data', {
  get: () => require('gutenberg/packages/data'), // eslint-disable-line
});

Object.defineProperty(global.wp, 'element', {
  get: () => require('gutenberg/packages/element'), // eslint-disable-line
});
