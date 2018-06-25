/**
 * @since 0.0.1
 */
import path from 'path';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';

export default ( env = {} ) => {
	// ----------------------
	// Map Externals
	// ----------------------

	const externals = {
		'@wordpress/api-request': { window: [ 'wp', 'apiRequest' ] },
		'@wordpress/data': { window: [ 'wp', 'data' ] },
		'@wordpress/blocks': { window: [ 'wp', 'blocks' ] },
		'@wordpress/components': { window: [ 'wp', 'components' ] },
		'@wordpress/editor': { window: [ 'wp', 'editor' ] },
		'@wordpress/element': { window: [ 'wp', 'element' ] },
		'@wordpress/i18n': { window: [ 'wp', 'i18n' ] },
	};

	// ----------------------
	// Loader Definitions
	// ----------------------

	const babelLoaderOptions = {
		cacheDirectory: true,
	};

	// ----------------------
	// Plugin Definitions
	// ----------------------

	const extractTextConfig = {
		use: [
			{ loader: 'raw-loader' },
			{
				loader: 'postcss-loader',
				options: {
					ident: 'postcss',
					plugins: [
						autoprefixer( {
							browsers: [
								'>1%',
								'last 4 versions',
								'Firefox ESR',
								'not ie < 9',
							],
							flexbox: 'no-2009',
						} ),
					],
				},
			},
			{
				loader: 'sass-loader',
				options: {
					data: '@import "./src/common.scss";\n',
					outputStyle: 'nested',
				},
			},
		],
	};

	const extractTextEditorCss = new ExtractTextPlugin( {
		filename: 'v8ch-primary-category-editor.css',
	} );

	const extractTextStyleCss = new ExtractTextPlugin( {
		filename: 'v8ch-primary-category-style.css',
	} );

	const uglifyJs = new webpack.optimize.UglifyJsPlugin( {
		compress: {
			warnings: false,
			comparisons: false,
		},
		mangle: {
			safari10: true,
		},
		output: {
			comments: false,
			ascii_only: true,
		},
		sourceMap: true,
	} );

	const developmentPlugins = [
		extractTextStyleCss,
		extractTextEditorCss,
	];

	const productionPlugins = [
		...developmentPlugins,
		uglifyJs,
	];

	// ----------------------
	// Config Object
	// ----------------------

	return {
		devtool: env.production ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
		entry: { 'v8ch-primary-category-blocks': './src/blocks.js' },
		externals,
		module: {
			rules: [
				{
					test: /\.(js|jsx|mjs)$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: babelLoaderOptions,
					},
				},
				{
					test: /style\.s?css$/,
					exclude: /(node_modules)/,
					use: extractTextStyleCss.extract( extractTextConfig ),
				},
				{
					test: /editor\.s?css$/,
					exclude: /(node_modules)/,
					use: extractTextEditorCss.extract( extractTextConfig ),
				},
			],
		},
		output: {
			library: [ 'wp', '[name]' ],
			libraryTarget: 'window',
			pathinfo: true,
			path: path.join( process.cwd(), 'dist' ),
			filename: '[name].js',
		},
		plugins: env.production ? productionPlugins : developmentPlugins,
		resolve: { extensions: [ '.js', '.jsx' ] },
	};
};
