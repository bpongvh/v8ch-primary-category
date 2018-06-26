import { registerBlockType } from '@wordpress/blocks';
import { select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import InPrimaryCategoryControls from '../components/InPrimaryCategoryControls';
import InPrimaryCategoryPlaceholder from '../components/InPrimaryCategoryPlaceholder';

import './editor.scss';

const editFn = ( props ) => {
	if ( ! props.attributes.postId ) {
		props.setAttributes( { postId: select( 'core/editor' ).getEditedPostAttribute( 'id' ) } );
	}
	const setPrimaryCategoryId = ( value ) => {
		const primaryCategoryId = ( value === null ) ? undefined : parseInt( value, 10 );
		// Need to set both here--one to pass with attributes for dynamic rendering and one for database lookup
		props.setAttributes( {
			primaryCategoryId,
			primaryCategoryMetaId: primaryCategoryId,
		} );
	};
	const setShowInContent = ( value ) => {
		const showInContent = ! value ? false : true;
		props.setAttributes( { showInContent } );
	};
	return ( [
		<InPrimaryCategoryControls
			isSelected={ props.isSelected }
			key="inspector"
			onSetPrimaryCategoryId={ setPrimaryCategoryId }
			onSetShowInContent={ setShowInContent }
			primaryCategoryId={ props.attributes.primaryCategoryId }
			showInContent={ props.attributes.showInContent }
		/>,
		<InPrimaryCategoryPlaceholder
			key="editor"
			primaryCategoryId={ ! props.attributes.primaryCategoryId ? null : props.attributes.primaryCategoryId }
			primaryCategoryLabel={ props.attributes.primaryCategoryLabel }
			showInContent={ props.attributes.showInContent }
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
registerBlockType( 'v8ch/in-primary-category', {
	attributes: {
		postId: {
			meta: 'v8ch-pc-post-id',
			type: 'integer',
		},
		// Store in block to pass with attributes for dynamic rendering
		primaryCategoryId: {
			meta: 'v8ch-pc-id',
			type: 'integer',
		},
		// Store in wp_postmeta for database lookups
		primaryCategoryMetaId: {
			meta: 'v8ch-pc-primary-category-id',
			source: 'meta',
			type: 'integer',
		},
		showInContent: {
			meta: 'v8ch-pc-show-in-content',
			type: 'boolean',
		},
	},
	category: 'common',
	icon: 'category',
	keywords: [ __( 'category' ), __( 'primary' ), __( 'V8CH' ) ],
	title: __( 'In Primary Category' ),

	edit: editFn,

	save: () => {
		return null;
	},
} );
