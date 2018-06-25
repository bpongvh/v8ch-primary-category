import { Component } from '@wordpress/element';

class InPrimaryCategoryContent extends Component {
	static getDerivedStateFromProps( nextProps, prevState ) {
		const canSetPrimaryCategoryName = ! nextProps.categories.isLoading &&
			nextProps.categories.data;
		if ( canSetPrimaryCategoryName ) {
			const primaryCategory = nextProps.categories.data
				.find( category => {
					return category.id.toString() === nextProps.primaryCategoryId;
				} );
			const primaryCategoryName = ! primaryCategory ? null : primaryCategory.name;
			console.log( `[InPrimaryCategoryContent] getDerivedStateFromProps() primaryCategoryName: ${ JSON.stringify( primaryCategoryName ) }` );
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
			!! this.state.primaryCategoryName &&
				<div className="primary-category">
					<span className="primary-category__label">{ this.props.primaryCategoryLabel }</span>
					<span className="primary-category__name">{ this.state.primaryCategoryName }</span>
				</div>
		);
	}
}

export default InPrimaryCategoryContent;
