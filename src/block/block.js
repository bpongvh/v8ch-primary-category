import { registerBlockType } from '@wordpress/blocks';
import { withAPIData } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Controls from '../components/Controls';
import Placeholder from '../components/Placeholder';

import './style.scss';
import './editor.scss';

const editFn = ( props ) => {
	// TODO subscribe to post categories; null out primaryCategoryId if it is unselected
	return ( [
		props.isSelected &&
			<Controls
				categories={ props.categories }
				key="inspector"
				onSetPrimaryCategoryId={ ( primaryCategoryId ) => {
					props.setAttributes( { primaryCategoryId } );
				} }
				primaryCategoryId={ props.attributes.primaryCategoryId }
			/>,
		<Placeholder
			categories={ props.categories }
			key="editor"
			primaryCategoryId={ props.attributes.primaryCategoryId }
		/>,
	] );
};

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
		primaryCategoryId: {
			type: 'string',
			meta: 'v8ch-primary-category',
		},
	},
	category: 'common',
	icon: 'category',
	keywords: [ __( 'category' ), __( 'primary' ), __( 'V8CH' ) ],
	title: __( 'V8CH Primary Category' ),

	edit: withAPIData( () => {
		return { categories: '/wp/v2/categories' };
	} )( editFn ),

	save() {
		return (
			<div>
				<p>{ __( 'Primary Category: Some Category Name' ) }</p>
			</div>
		);
	},
} );
