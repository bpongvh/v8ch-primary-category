import { Placeholder } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { Component } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

class InPrimaryCategoryPlaceholder extends Component {
	static getDerivedStateFromProps( nextProps, prevState ) {
		if ( nextProps.categories ) {
			const primaryCategory = nextProps.categories
				.find( category => {
					return category.id === nextProps.primaryCategoryId;
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
					<div className="placeholder__primary-category">
						<span className="placeholder__primary-cateogry-label">{ __( 'In Primary Category:  ' ) }</span>
						<span className="placeholder__primary-category-name">{ this.state.primaryCategoryName }</span>
					</div>
					<div className="placeholder__visibility">
						<span className="placeholder__visibility-label">{ __( 'Visibility:  ' ) }</span>
						{ ! this.props.showInContent ? (
							<span className="placeholder__visibility-value">{ __( 'Hidden in post content' ) }</span>
						) : (
							<span className="placeholder__visibility-value">{ __( 'Showing in post content, with three recent posts from the same primary category' ) }</span>
						)}
					</div>
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

export default withSelect( ( select ) => {
	const { getCategories } = select( 'v8ch/primary-category' );
	return {
		categories: getCategories(),
	};
} )( InPrimaryCategoryPlaceholder );
