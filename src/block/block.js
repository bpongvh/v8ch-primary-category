import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { select } = wp.data;
const { Spinner, withAPIData } = wp.components;

/**
 * Register the block
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string} name
 * @param  {Object} settings
 * @return {?WPBlock}
 */
registerBlockType( 'v8ch/primary-category', {
	attributes: {
		title: {
			type: 'string',
			meta: 'v8ch-primary-category',
		},
	},
	category: 'common',
	icon: 'category',
	keywords: [ __( 'V8CH' ), __( 'category' ), __( 'primary' ) ],
	title: __( 'V8CH Primary Category' ),

	edit: withAPIData( function() {
		return {
			categories: '/wp/v2/categories',
		};
	} )(
		function( props ) {
			wp.data.subscribe( function() {
				const categories = select( 'core/editor' ).getEditedPostAttribute( 'categories' );
				console.log( `[block.js] edit() categories: ${ JSON.stringify( categories ) }` );
			} );
			// const categories = select( 'core' ).getCategories();
			// const categories = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'categories' );
			// console.log( `[block.js] edit() categories: ${ JSON.stringify( categories ) }` );
			// console.log( `[block.js] edit() categories: ${ JSON.stringify( categories ) }` );
			// const categoriesData = props.categories.data.filter( category => category.id !== 2 );
			// props.setAttributes( {
			// 	'v8ch-primary-category': 'Some Category',
			// } );
			return (
				<div className={ props.className }>
					{ ! props.categories.data ? (
						<div className="flex justify-center">
							<Spinner />
						</div>
					) : (
						<ul>
							{ props.categories.data.map( ( category, index ) =>
								<li key={ index.toString() }>{ category.name }</li>
							) }
						</ul>
					) }
				</div>
			);
		}
	),

	save: function() {
		return (
			<div>
				<div>Primary Category:</div>
				<div>Some Category Name</div>
			</div>
		);
	},
} );
