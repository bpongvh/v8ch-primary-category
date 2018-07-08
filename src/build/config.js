import path from 'path';
import merge from 'webpack-merge';
import { argv } from 'yargs';
import desire from './util/desire';

const userConfig = merge(desire(`${__dirname}/../config`), desire(`${__dirname}/../config-local`));

const isProduction = !!((argv.env && argv.env.production) || argv.p);
const rootPath = (userConfig.paths && userConfig.paths.root)
  ? userConfig.paths.root
  : process.cwd();

const config = merge({
  // proxyUrl: 'http://localhost:3000',
  paths: {
    root: rootPath,
    src: path.join(rootPath, 'src'),
    dist: path.join(rootPath, 'dist'),
  },
  enabled: {
    styleLoader: !isProduction,
    sourceMaps: !isProduction,
    watcher: !!argv.watch,
  },
  watch: [],
}, userConfig);

module.exports = merge(config, {
  env: Object.assign({ production: isProduction, development: !isProduction }, argv.env),
  publicPath: `${config.publicPath}/${path.basename(config.paths.dist)}/`,
  manifest: {},
});

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = isProduction ? 'production' : 'development';
}
