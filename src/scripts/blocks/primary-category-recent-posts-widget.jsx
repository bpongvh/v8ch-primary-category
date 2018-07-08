import React from 'react';
import EditorContainer from '../components/EditorContainer';

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

registerBlockType('v8ch/primary-category-recent-posts-widget', {
  attributes: {
    categoryName: {
      meta: 'v8ch-primary-category-name',
      type: 'string',
    },
    recentPosts: {
      meta: 'v8ch-primary-category-recent-posts',
      type: 'string',
    },
    showInContent: {
      meta: 'v8ch-primary-category-show-in-content',
      type: 'boolean',
    },
  },
  category: 'common',
  icon: 'category',
  keywords: [__('category'), __('primary'), __('V8CH')],
  title: __('Primary Category'),

  /* eslint-disable react/prop-types */
  edit: props => (
    <EditorContainer
      attributes={props.attributes}
      isSelected={props.isSelected}
      setAttributes={props.setAttributes}
    />
  ),
  /* eslint-enable react/prop-types */

  save: () => null,
});
