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

	/**
	* Given a string, returns a new string with dash separators converedd to
	* camel-case equivalent. This is not as aggressive as `_.camelCase` in
	* converting to uppercase, where Lodash will convert letters following
	* numbers.
	*
	* @param {string} string Input dash-delimited string.
	*
	* @return {string} Camel-cased string.
	*/
	function camelCaseDash( string ) {
		return string.replace(
			/-([a-z])/g,
			( match, letter ) => letter.toUpperCase()
		);
	}

	const entryPointNames = [
		'blocks',
		'components',
		'editor',
		'utils',
		'viewport',
		'edit-post',
		'core-blocks',
		'nux',
	];

	const gutenbergPackages = [
		'api-request',
		'core-data',
		'data',
		'plugins',
	];

	const wordPressPackages = [
		'a11y',
		'dom-ready',
		'hooks',
		'is-shallow-equal',
	];

	const externals = {
		react: 'React',
		'react-dom': 'ReactDOM',
		tinymce: 'tinymce',
		moment: 'moment',
		jquery: 'jQuery',
		lodash: 'lodash',
		'lodash-es': 'lodash',
	};

	[
		...entryPointNames,
		...gutenbergPackages,
		...wordPressPackages,
	].forEach( ( name ) => {
		externals[ `@wordpress/${ name }` ] = {
			window: [ 'wp', camelCaseDash( name ) ],
		};
	} );

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

	const developmentPlugins = [ extractTextEditorCss ];

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
