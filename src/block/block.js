import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register the block
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string} name
 * @param  {Object} settings
 * @return {?WPBlock}
 */
registerBlockType( 'eslint-config-prettier', {
	title: __( 'V8CH Primary Category' ),
	icon: 'category',
	category: 'common',
	keywords: [ __( 'V8CH' ), __( 'category' ), __( 'primary' ) ],

	edit: function( props ) {
		// Creates a <p class='wp-block-cgb-block-v8ch-primary-category'></p>.
		return (
			<div className={ props.className }>
				<p>— Hello from the backend.</p>
				<p>
					CGB BLOCK: <code>v8ch-primary-category</code> is a new Gutenberg block
				</p>
				<p>
					It was created via{ ' ' }
					<code>
						<a href="https://github.com/ahmadawais/create-guten-block">
							create-guten-block
						</a>
					</code>.
				</p>
			</div>
		);
	},

	save: function() {
		return (
			<div>
				<div>Primary Category:</div>
				<div>Some Category Name</div>
			</div>
		);
	},
} );
