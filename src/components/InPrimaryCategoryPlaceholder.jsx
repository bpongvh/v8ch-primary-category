import { Placeholder, withAPIData } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

class InPrimaryCategoryPlaceholder extends Component {
	static getDerivedStateFromProps( nextProps, prevState ) {
		const canSetPrimaryCategoryName = ! nextProps.categories.isLoading &&
			nextProps.categories.data;
		if ( canSetPrimaryCategoryName ) {
			const primaryCategory = nextProps.categories.data
				.find( category => {
					return category.id.toString() === nextProps.primaryCategoryId;
				} );
			const primaryCategoryName = ! primaryCategory ? null : primaryCategory.name;
			return { primaryCategoryName };
		}
		return prevState;
	}
	constructor() {
		super( ...arguments );
		this.state = { primaryCategoryName: null };
	}

	render() {
		return (
			this.state.primaryCategoryName ? (
				<div className="placeholder">
					{ !! this.props.primaryCategoryLabel &&
						<span className="placeholder__label">{ this.props.primaryCategoryLabel }</span>
					}
					<span className="placeholder__name">{ this.state.primaryCategoryName }</span>
				</div>
			) : (
				<Placeholder
					icon="category"
					instructions={ sprintf( __( 'Use the block controls to set a primary category for this post.' ) ) }
					label="Primary Category"
				/>
			)
		);
	}
}

export default withAPIData( () => {
	return { categories: '/wp/v2/categories?per_page=100' };
} )( InPrimaryCategoryPlaceholder );
