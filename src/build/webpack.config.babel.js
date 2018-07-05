import CleanPlugin from 'clean-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import webpack from 'webpack';
import merge from 'webpack-merge';
import config from './config';
import addHotMiddleware from './util/addHotMiddleware';
import watchConfig from './webpack.config.watch';

let configBuilder = {
  context: path.join(process.cwd(), 'src'),
  devtool: (config.enabled.sourceMaps ? '#source-map' : undefined),
  entry: config.entry,
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        include: config.paths.src,
        use: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: { path: __dirname, ctx: config },
              sourceMap: config.enabled.sourceMaps,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  output: {
    path: config.paths.dist,
    filename: 'scripts/[name].js',
  },
  plugins: [
    new CleanPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[id].css',
    }),
    new FriendlyErrorsPlugin(),
    new StyleLintPlugin({
      failOnError: !config.enabled.watcher,
      syntax: 'scss',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      config.paths.src,
      'node_modules',
    ],
  },
};

if (config.env.production) {
  configBuilder.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

if (config.enabled.watcher) {
  configBuilder.entry = addHotMiddleware(configBuilder.entry);
  configBuilder = merge(configBuilder, watchConfig);
}

const webpackConfig = configBuilder;

export default webpackConfig;
