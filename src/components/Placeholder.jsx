import { Placeholder } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

class PrimaryCategoryPlaceholder extends Component {
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
				<p className="placeholder">In Primary Category: { this.state.primaryCategoryName }</p>
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

export default PrimaryCategoryPlaceholder;
