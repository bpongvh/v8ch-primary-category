/**
 * Add hot middleware to Webpack entry
 * @param  {Object} entry webpack entry
 * @return {Object} entry with hot middleware
 */
export default (entry) => {
  const results = {};

  Object.keys(entry).forEach((name) => {
    results[name] = Array.isArray(entry[name]) ? entry[name].slice(0) : [entry[name]];
    results[name].unshift(`${__dirname}/../helpers/hmr-client.js`);
  });
  return results;
};
