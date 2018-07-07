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

Object.defineProperty( global.wp, 'apiRequest', {
	get: () => require( '../../../../gutenberg/packages/api-request' ),
} );

Object.defineProperty( global.wp, 'blocks', {
	get: () => require( '../../../../gutenberg/blocks' ),
} );

Object.defineProperty( global.wp, 'components', {
	get: () => require( '../../../../gutenberg/components' ),
} );

Object.defineProperty( global.wp, 'editor', {
	get: () => require( '../../../../gutenberg/editor' ),
} );
