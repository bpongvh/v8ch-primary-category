import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { SelectControl, ToggleControl } = wp.components;
const { subscribe, withSelect } = wp.data;
const { __ } = wp.i18n;
const { InspectorControls } = wp.editor;

class InPrimaryCategoryControls extends Component {
  constructor(props) {
    super(props);
    const { selectedCategories } = this.props;
    this.state = {
      options: [],
      selectedCategories,
    };
    this.setPrimaryCategoryId = this.setPrimaryCategoryId.bind(this);
    this.setShowInContent = this.setShowInContent.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let derivedState = prevState;
    if (nextProps.selectedCategories) {
      derivedState = {
        ...derivedState,
        selectedCategories: nextProps.selectedCategories,
      };
    }
    if (nextProps.categories) {
      const normalize = categoriesData => categoriesData.reduce((accumulator, category) => [
        ...accumulator,
        {
          label: category.name,
          value: category.id,
        },
      ], []);
      const options = normalize(nextProps.categories)
        .filter(category => prevState.selectedCategories.includes(category.value));
      const initial = { label: '-- Select --', value: null };
      derivedState = {
        ...derivedState,
        options: [initial, ...options],
      };
    }
    return derivedState;
  }

  setPrimaryCategoryId(value) {
    this.props.onSetPrimaryCategoryId(value);
  }

  setShowInContent(value) {
    this.props.onSetShowInContent(value);
  }

  synchronize(selectedCategories) {
    const shouldClear = this.props.primaryCategoryId
      && !selectedCategories.includes(this.props.primaryCategoryId);
    if (shouldClear) {
      this.props.onSetPrimaryCategoryId(null);
    }
  }

  render() {
    return (
      this.props.isSelected
      && (
      <InspectorControls key="inspector">
        <h3>{__('Set a primary category for this post.')}</h3>
        <SelectControl
          label={__('Select primary category:')}
          value={this.props.primaryCategoryId}
          onChange={this.setPrimaryCategoryId}
          options={this.state.options}
        />
        <ToggleControl
          label={__('Visibility')}
          checked={this.props.showInContent}
          help={checked => (checked ? __('Show in post content.') : __('Hide in post content.'))}
          onChange={this.setShowInContent}
        />
      </InspectorControls>
      )
    );
  }
}

export default withSelect((select) => {
  const { getEditedPostAttribute } = select('core/editor');
  const { getCategories } = select('v8ch/primary-category');
  let selectedCategories = getEditedPostAttribute('categories');
  subscribe(() => {
    const subscribedSelectedCategories = getEditedPostAttribute('categories');
    if (selectedCategories.length !== subscribedSelectedCategories.length) {
      selectedCategories = subscribedSelectedCategories;
    }
  });
  return {
    categories: getCategories(),
    selectedCategories,
  };
})(InPrimaryCategoryControls);

InPrimaryCategoryControls.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  primaryCategoryId: PropTypes.string.isRequired,
  onSetPrimaryCategoryId: PropTypes.func.isRequired,
  onSetShowInContent: PropTypes.func.isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  showInContent: PropTypes.bool.isRequired,
};
