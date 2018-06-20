import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
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
