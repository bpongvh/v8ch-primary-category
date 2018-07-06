import React from 'react';
import PrimaryCategoryControls from '../components/PrimaryCategoryControls';
import PrimaryCategoryPlaceholder from '../components/PrimaryCategoryPlaceholder';

const { registerBlockType } = wp.blocks;
const { select } = wp.data;
const { __ } = wp.i18n;

const editFn = ({ attributes, isSelected, setAttributes }) => {
  if (!attributes.postId) {
    setAttributes({ postId: select('core/editor').getEditedPostAttribute('id') });
  }
  const setPrimaryCategoryId = (value) => {
    const primaryCategoryId = (value === null) ? undefined : parseInt(value, 10);
    // Need to set both here--one to pass with attributes for dynamic rendering
    //   and one for database lookup
    setAttributes({
      primaryCategoryId,
      primaryCategoryMetaId: primaryCategoryId,
    });
  };
  const setShowInContent = (value) => {
    const showInContent = !!value;
    setAttributes({ showInContent });
  };
  return ([
    <PrimaryCategoryControls
      isSelected={isSelected}
      key="inspector"
      onSetPrimaryCategoryId={setPrimaryCategoryId}
      onSetShowInContent={setShowInContent}
      primaryCategoryId={attributes.primaryCategoryId}
      showInContent={attributes.showInContent}
    />,
    <PrimaryCategoryPlaceholder
      key="editor"
      primaryCategoryId={!attributes.primaryCategoryId ? null : attributes.primaryCategoryId}
      primaryCategoryLabel={attributes.primaryCategoryLabel}
      showInContent={attributes.showInContent}
    />,
  ]);
};

/**
 * Register the block
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string} name
 * @param  {Object} settings
 * @return {?WPBlock}
 */
registerBlockType('v8ch/primary-category', {
  attributes: {
    postId: {
      meta: 'v8ch-pc-post-id',
      type: 'integer',
    },
    // Store in block to pass with attributes for dynamic rendering
    primaryCategoryId: {
      meta: 'v8ch-pc-id',
      type: 'integer',
    },
    // Store in wp_postmeta for database lookups
    primaryCategoryMetaId: {
      meta: 'v8ch-pc-primary-category-id',
      source: 'meta',
      type: 'integer',
    },
    showInContent: {
      meta: 'v8ch-pc-show-in-content',
      type: 'boolean',
    },
  },
  category: 'common',
  icon: 'category',
  keywords: [__('category'), __('primary'), __('V8CH')],
  title: __('Primary Category'),

  edit: editFn,

  save: () => null,
});
