import { SelectControl } from '@wordpress/components';
import { select } from '@wordpress/data';
import { InspectorControls } from '@wordpress/editor';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

class Controls extends Component {
	static getDerivedStateFromProps( nextProps, prevState ) {
		if ( nextProps.categories.data ) {
			const normalize = ( categoriesData ) => {
				return categoriesData.reduce( ( accumulator, category ) => {
					return [
						...accumulator,
						{
							label: category.name,
							value: category.id,
						},
					];
				}, [] );
			};
			const selectedCategories = select( 'core/editor' ).getEditedPostAttribute( 'categories' );
			const options = normalize( nextProps.categories.data )
				.filter( ( category ) => selectedCategories.includes( category.value ) );
			const initial = nextProps.primaryCategoryId ?
				[] :
				[ { label: '-- Select --', value: null } ];
			return { options: [ ...initial, ...options ] };
		}
		return prevState;
	}
	constructor() {
		super( ...arguments );
		this.state = { options: [] };
		this.setPrimaryCategoryId = this.setPrimaryCategoryId.bind( this );
	}

	setPrimaryCategoryId( value ) {
		if ( value ) {
			this.props.onSetPrimaryCategoryId( value );
		}
	}

	render() {
		return (
			<InspectorControls key="inspector">
				<h3>{ __( 'Set a primary category for this post.' ) }</h3>
				<SelectControl
					label={ __( 'Select primary category:' ) }
					value={ this.props.primaryCategoryId }
					onChange={ this.setPrimaryCategoryId }
					options={ this.state.options }
				/>
			</InspectorControls>
		);
	}
}

export default Controls;
