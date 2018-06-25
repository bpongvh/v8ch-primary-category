import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import InPrimaryCategoryContent from '../components/InPrimaryCategoryContent';
import InPrimaryCategoryControls from '../components/InPrimaryCategoryControls';
import InPrimaryCategoryPlaceholder from '../components/InPrimaryCategoryPlaceholder';

import './style.scss';
import './editor.scss';

const editFn = ( props ) => {
	const setPrimaryCategoryId = ( value ) => {
		const primaryCategoryId = ( value === null ) ? undefined : value;
		props.setAttributes( { primaryCategoryId } );
	};
	const setPrimaryCategoryLabel = ( value ) => {
		const primaryCategoryLabel = ( value === '' ) ? undefined : value;
		props.setAttributes( { primaryCategoryLabel } );
	};
	return ( [
		<InPrimaryCategoryControls
			isSelected={ props.isSelected }
			key="inspector"
			onSetPrimaryCategoryId={ setPrimaryCategoryId }
			onSetPrimaryCategoryLabel={ setPrimaryCategoryLabel }
			primaryCategoryId={ props.attributes.primaryCategoryId }
			primaryCategoryLabel={ props.attributes.primaryCategoryLabel }
		/>,
		<InPrimaryCategoryPlaceholder
			key="editor"
			primaryCategoryId={ props.attributes.primaryCategoryId }
			primaryCategoryLabel={ props.attributes.primaryCategoryLabel }
		/>,
	] );
};

const saveFn = ( props ) => {
	return (
		<InPrimaryCategoryContent
			primaryCategoryId={ props.attributes.primaryCategoryId }
			primaryCategoryLabel={ props.attributes.primaryCategoryLabel }
		/>
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
	title: __( 'In Primary Category' ),

	edit: editFn,

	save: saveFn,
} );
