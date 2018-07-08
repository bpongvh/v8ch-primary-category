import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EditorControls from './EditorControls';
import EditorPlaceholder from './EditorPlaceholder';
import { updateList, updateValue } from '../store/utils/subscription';

const { apiRequest } = wp;
const {
  select,
  subscribe,
  withDispatch,
  withSelect,
} = wp.data;
const { compose } = wp.element;

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { primaryCategoryId: null };
    this.setPrimaryCategory = this.setPrimaryCategory.bind(this);
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
    this.update(null);
  }

  createAndUpdateTag(name) {
    return new Promise(async (resolve) => {
      const primaryCategory = await apiRequest({
        path: '/wp/v2/primary_category',
        method: 'POST',
        data: { name },
      });
      this.props.pushPrimaryCategory(primaryCategory);
      this.update(primaryCategory.id);
      resolve();
    });
  }

  async findAndUpdateTag(name) {
    const primaryCategory = this.props.primaryCategories
      .filter(item => item.name === name)[0];
    this.update(primaryCategory.id);
  }

  setCategoryName(categoryId) {
    const primaryCategory = this.props.categories.find(category => (
      category.id === parseInt(categoryId, 10)
    ));
    this.props.setAttributes({ categoryName: primaryCategory.name });
  }

  setPrimaryCategory(value) {
    const shouldCreateTag = !this.props.primaryCategoryNames.includes(value);
    if (shouldCreateTag) {
      this.createAndUpdateTag(value).then(() => this.setCategoryName(value));
    } else {
      this.findAndUpdateTag(value);
      this.setCategoryName(value);
    }
  }

  async setRecent(primaryCategoryId) {
    const before = !this.props.publishedAt ? new Date().toISOString()
      : this.props.publishedAt;
    const data = {
      before,
      order: 'desc',
      orderby: 'date',
      per_page: '3',
    };
    const primaryCategory = this.props.primaryCategories.find(
      category => category.id === primaryCategoryId,
    );
    if (primaryCategory) {
      Object.assign(data, { primary_category: primaryCategory.id });
    }
    const recentInPrimaryCategory = await apiRequest({
      path: '/wp/v2/posts',
      method: 'GET',
      data,
    });
    const recentPosts = recentInPrimaryCategory.map(post => ({
      publishedAt: new Date(post.date).toISOString(),
      link: post.link,
      title: post.title.rendered,
    }));
    this.props.setAttributes({ recentPosts: JSON.stringify(recentPosts) });
  }

  setShowInContent(value) {
    const showInContent = !!value;
    this.props.setAttributes({ showInContent });
  }

  update(primaryCategoryId) {
    if (primaryCategoryId) {
      this.setRecent(primaryCategoryId);
    }
    this.props.updatePrimaryCategory(primaryCategoryId);
  }

  render() {
    return ([
      <EditorControls
        categories={this.props.categories}
        isSelected={this.props.isSelected}
        key="inspector"
        onSetPrimaryCategoryId={this.setPrimaryCategory}
        onSetShowInContent={this.setShowInContent}
        primaryCategoryId={this.state.primaryCategoryId}
        selectedCategories={this.props.selectedCategories}
        showInContent={this.props.attributes.showInContent}
      />,
      <EditorPlaceholder
        categories={this.props.categories}
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
      publishedAt: getEditedPostAttribute('date'),
      selectedCategories,
    };
  }),
)(EditorContainer);

EditorContainer.propTypes = {
  attributes: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  isSelected: PropTypes.bool.isRequired,
  primaryCategories: PropTypes.array.isRequired,
  primaryCategoryNames: PropTypes.array.isRequired,
  publishedAt: PropTypes.string.isRequired,
  pushPrimaryCategory: PropTypes.func.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  setAttributes: PropTypes.func.isRequired,
  updatePrimaryCategory: PropTypes.func.isRequired,
};
