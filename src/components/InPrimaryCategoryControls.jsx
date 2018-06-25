import { SelectControl, TextControl, withAPIData } from '@wordpress/components';
import { select, subscribe } from '@wordpress/data';
import { InspectorControls } from '@wordpress/editor';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

class InPrimaryCategoryControls extends Component {
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
			const options = normalize( nextProps.categories.data )
				.filter( ( category ) => prevState.selectedCategories.includes( category.value ) );
			const initial = { label: '-- Select --', value: null };
			return { options: [ initial, ...options ] };
		}
		return prevState;
	}
	constructor() {
		super( ...arguments );
		this.state = {
			options: [],
			selectedCategories: select( 'core/editor' ).getEditedPostAttribute( 'categories' ),
		};
		this.setPrimaryCategoryId = this.setPrimaryCategoryId.bind( this );
		this.setPrimaryCategoryLabel = this.setPrimaryCategoryLabel.bind( this );
	}

	componentDidMount() {
		subscribe( () => {
			const selectedCategories = select( 'core/editor' ).getEditedPostAttribute( 'categories' );
			if ( this.state.selectedCategories.length !== selectedCategories.length ) {
				this.setState( { selectedCategories }, () => this.synchronize( selectedCategories ) );
			}
		} );
	}

	setPrimaryCategoryId( value ) {
		this.props.onSetPrimaryCategoryId( value );
	}

	setPrimaryCategoryLabel( value ) {
		this.props.onSetPrimaryCategoryLabel( value );
	}

	synchronize( selectedCategories ) {
		const shouldClear = this.props.primaryCategoryId &&
			! selectedCategories.includes( parseInt( this.props.primaryCategoryId, 10 ) );
		if ( shouldClear ) {
			this.props.onSetPrimaryCategoryId( null );
		}
	}

	render() {
		return (
			this.props.isSelected &&
				<InspectorControls key="inspector">
					<h3>{ __( 'Set a primary category for this post.' ) }</h3>
					<SelectControl
						label={ __( 'Select primary category:' ) }
						value={ this.props.primaryCategoryId }
						onChange={ this.setPrimaryCategoryId }
						options={ this.state.options }
					/>
					<TextControl
						label={ __( 'Enter primary category label' ) }
						value={ this.props.primaryCategoryLabel }
						onChange={ this.setPrimaryCategoryLabel }
					/>
				</InspectorControls>
		);
	}
}

export default withAPIData( () => {
	return { categories: '/wp/v2/categories?per_page=100' };
} )( InPrimaryCategoryControls );
