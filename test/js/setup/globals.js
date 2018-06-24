/**
 * Setup globals
 */

// Setup `wp.*` aliases.
global.wp = {
	shortcode: {
		next() {},
		regexp: jest.fn().mockReturnValue( new RegExp() ),
	},
};

[
	'blocks',
	'components',
	'edit-post',
	'editor',
	'utils',
	'viewport',
].forEach( entryPointName => {
	Object.defineProperty( global.wp, entryPointName, {
		get: () => require( 'gutenberg/' + entryPointName ),
	} );
} );

[
	'api-request',
	'core-data',
	'data',
	'date',
	'deprecated',
	'dom',
	'element',
	'plugins',
].forEach( entryPointName => {
	Object.defineProperty( global.wp, entryPointName, {
		get: () => require( 'gutenberg/packages/' + entryPointName ),
	} );
} );
