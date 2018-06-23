const { Component } = wp.element;

class Placeholder extends Component {
	static getDerivedStateFromProps( nextProps, prevState ) {
		const canSetPrimaryCategoryName = nextProps.primaryCategoryId &&
			! nextProps.categories.isLoading && nextProps.categories.data;
		if ( canSetPrimaryCategoryName ) {
			const primaryCategory = nextProps.categories.data
				.find( category => {
					return category.id.toString() === nextProps.primaryCategoryId;
				} );
			return { primaryCategoryName: primaryCategory.name };
		}
		return prevState;
	}
	constructor() {
		super( ...arguments );
		this.state = { primaryCategoryName: 'Unknown' };
	}

	render() {
		return (
			<p className="placeholder">In Primary Category: { this.state.primaryCategoryName }</p>
		);
	}
}

export default Placeholder;
