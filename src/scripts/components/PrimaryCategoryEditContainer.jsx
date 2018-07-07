import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PrimaryCategoryControls from './PrimaryCategoryControls';
import PrimaryCategoryPlaceholder from './PrimaryCategoryPlaceholder';
import { updateList, updateValue } from '../store/utils/subscription';

const { apiRequest } = wp;
const {
  select,
  subscribe,
  withDispatch,
  withSelect,
} = wp.data;
const { compose } = wp.element;

class PrimaryCategoryEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { primaryCategoryId: null };
    this.setPrimaryCategoryId = this.setPrimaryCategoryId.bind(this);
    this.setShowInContent = this.setShowInContent.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const derivedState = { ...prevState };
    if (nextProps.primaryCategories && nextProps.primaryCategoryTagId) {
      const getPrimaryCategory = (id, list) => (
        list.find(item => item.id === id)
      );
      const primaryCategory = getPrimaryCategory(
        nextProps.primaryCategoryTagId,
        nextProps.primaryCategories,
      );
      const primaryCategoryId = !primaryCategory ? null
        : parseInt(primaryCategory.name, 10);
      if (prevState.primaryCategoryId !== primaryCategoryId) {
        Object.assign(derivedState, { primaryCategoryId });
      }
    }
    return derivedState;
  }

  componentDidUpdate() {
    const shouldClearPrimaryCategoryId = this.props.selectedCategories
      && this.state.primaryCategoryId
      && !this.props.selectedCategories.find(
        category => category === this.state.primaryCategoryId,
      );
    if (shouldClearPrimaryCategoryId) {
      this.clearPrimaryCategoryId();
    }
  }

  async clearPrimaryCategoryId() {
    this.setState({ primaryCategoryId: null });
    this.props.updatePrimaryCategory(null);
  }

  async createAndUpdate(name) {
    const primaryCategory = await apiRequest({
      path: '/wp/v2/primary_category',
      method: 'POST',
      data: { name },
    });
    this.props.pushPrimaryCategory(primaryCategory);
    this.props.updatePrimaryCategory(primaryCategory.id);
  }

  async findAndUpdate(name) {
    const primaryCategory = this.props.primaryCategories
      .filter(item => item.name === name)[0];
    this.props.updatePrimaryCategory(primaryCategory.id);
  }

  setPrimaryCategoryId(value) {
    const shouldCreate = !this.props.primaryCategoryNames.includes(value);
    if (shouldCreate) {
      this.createAndUpdate(value);
    } else {
      this.findAndUpdate(value);
    }
  }

  setShowInContent(value) {
    const showInContent = !!value;
    this.props.setAttributes({ showInContent });
  }

  render() {
    return ([
      <PrimaryCategoryControls
        categories={this.props.categories}
        isSelected={this.props.isSelected}
        key="inspector"
        onSetPrimaryCategoryId={this.setPrimaryCategoryId}
        onSetShowInContent={this.setShowInContent}
        primaryCategoryId={this.state.primaryCategoryId}
        selectedCategories={this.props.selectedCategories}
        showInContent={this.props.attributes.showInContent}
      />,
      <PrimaryCategoryPlaceholder
        key="editor"
        primaryCategoryId={this.state.primaryCategoryId}
        primaryCategoryLabel={this.props.attributes.primaryCategoryLabel}
        showInContent={this.props.attributes.showInContent}
      />,
    ]);
  }
}

export default compose(
  withDispatch(dispatch => ({
    pushPrimaryCategory(primaryCategoryId) {
      dispatch('v8ch/primary-category').pushPrimaryCategory(primaryCategoryId);
    },
    updatePrimaryCategory(primaryCategoryId) {
      const primaryCategoryTags = !primaryCategoryId ? [] : [primaryCategoryId];
      dispatch('core/editor').editPost({ primary_category: primaryCategoryTags });
    },
  })),
  withSelect((selectFn) => {
    const { getEditedPostAttribute } = select('core/editor');
    const {
      getCategories,
      getPrimaryCategories,
      getPrimaryCategoryNames,
    } = selectFn('v8ch/primary-category');
    let categories = getCategories();
    let primaryCategories = getPrimaryCategories();
    let primaryCategoryNames = getPrimaryCategoryNames();
    let primaryCategoryTagId = getEditedPostAttribute('primary_category')[0];
    let selectedCategories = getEditedPostAttribute('categories');
    subscribe(() => {
      categories = updateList(categories, getCategories());
      primaryCategories = updateList(primaryCategories, getPrimaryCategories());
      primaryCategoryNames = updateList(
        primaryCategoryNames,
        getPrimaryCategoryNames(),
      );
      primaryCategoryTagId = updateValue(
        primaryCategoryTagId,
        getEditedPostAttribute('primary_category')[0],
      );
      selectedCategories = updateList(
        selectedCategories,
        getEditedPostAttribute('categories'),
      );
    });
    return {
      categories,
      primaryCategories,
      primaryCategoryNames,
      primaryCategoryTagId,
      selectedCategories,
    };
  }),
)(PrimaryCategoryEditContainer);

PrimaryCategoryEditContainer.propTypes = {
  attributes: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  isSelected: PropTypes.bool.isRequired,
  primaryCategories: PropTypes.array.isRequired,
  primaryCategoryNames: PropTypes.array.isRequired,
  pushPrimaryCategory: PropTypes.func.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  setAttributes: PropTypes.func.isRequired,
  updatePrimaryCategory: PropTypes.func.isRequired,
};
