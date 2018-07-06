import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { Placeholder } = wp.components;
const { withSelect } = wp.data;
const { __, sprintf } = wp.i18n;

class InPrimaryCategoryPlaceholder extends Component {
  constructor(props) {
    super(props);
    this.state = { primaryCategoryName: null };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.categories) {
      const primaryCategory = nextProps.categories
        .find(category => category.id === nextProps.primaryCategoryId);
      const primaryCategoryName = !primaryCategory ? null : primaryCategory.name;
      return { primaryCategoryName };
    }
    return prevState;
  }

  render() {
    return (
      this.state.primaryCategoryName ? (
        <div className="placeholder">
          <div className="placeholder__primary-category">
            <span className="placeholder__primary-cateogry-label">{__('In Primary Category:  ')}</span>
            <span className="placeholder__primary-category-name">{this.state.primaryCategoryName}</span>
          </div>
          <div className="placeholder__visibility">
            <span className="placeholder__visibility-label">{__('Visibility:  ')}</span>
            {!this.props.showInContent ? (
              <span className="placeholder__visibility-value">{__('Hidden in post content')}</span>
            ) : (
              <span className="placeholder__visibility-value">{__('Showing in post content, with three recent posts from the same primary category')}</span>
            )}
          </div>
        </div>
      ) : (
        <Placeholder
          icon="category"
          instructions={sprintf(__('Use the block controls to set a primary category for this post.'))}
          label="Primary Category"
        />
      )
    );
  }
}

export default withSelect((select) => {
  const { getCategories } = select('v8ch/primary-category');
  return {
    categories: getCategories(),
  };
})(InPrimaryCategoryPlaceholder);

InPrimaryCategoryPlaceholder.propTypes = {
  showInContent: PropTypes.bool.isRequired,
};
