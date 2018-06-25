import { registerBlockType } from '@wordpress/blocks';
import { withAPIData } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Controls from '../components/Controls';
import PrimaryCategoryPlaceholder from '../components/Placeholder';

import './style.scss';
import './editor.scss';

const editFn = ( props ) => {
	const setPrimaryCategoryId = ( value ) => {
		const primaryCategoryId = ( value === null ) ? undefined : value;
		props.setAttributes( { primaryCategoryId } );
	};
	return ( [
		<Controls
			categories={ props.categories }
			isSelected={ props.isSelected }
			key="inspector"
			onSetPrimaryCategoryId={ setPrimaryCategoryId }
			primaryCategoryId={ props.attributes.primaryCategoryId }
		/>,
		<PrimaryCategoryPlaceholder
			categories={ props.categories }
			key="editor"
			primaryCategoryId={ props.attributes.primaryCategoryId }
		/>,
	] );
};

const saveFn = ( props ) => {
	return (
		<div>
			<p>{ __( 'Primary Category: Some Category' ) }</p>
		</div>
	);
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
			meta: 'v8ch-pc-id',
			type: 'string',
		},
		primaryCategoryLabel: {
			meta: 'v8ch-pc-label',
			type: 'string',
		},
		showInContent: {
			meta: 'v8ch-pc-show-in-content',
			type: 'boolean',
		},
	},
	category: 'common',
	icon: 'category',
	keywords: [ __( 'category' ), __( 'primary' ), __( 'V8CH' ) ],
	title: __( 'V8CH Primary Category' ),

	edit: withAPIData( () => {
		return { categories: '/wp/v2/categories?per_page=100' };
	} )( editFn ),

	save: saveFn,
} );
