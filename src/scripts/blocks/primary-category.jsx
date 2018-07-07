import React from 'react';
import PrimaryCategoryEditContainer from '../components/PrimaryCategoryEditContainer';

const { registerBlockType } = wp.blocks;
// const { subscribe, withSelect } = wp.data;
const { __ } = wp.i18n;

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
    // postId: {
    //   meta: 'v8ch-pc-post-id',
    //   type: 'integer',
    // },
    // // Store in block to pass with attributes for dynamic rendering
    // primaryCategoryId: {
    //   meta: 'v8ch-pc-id',
    //   type: 'integer',
    // },
    // // Store in wp_postmeta for database lookups
    // primaryCategoryMetaId: {
    //   meta: 'v8ch-pc-primary-category-id',
    //   source: 'meta',
    //   type: 'integer',
    // },
    showInContent: {
      meta: 'v8ch-pc-show-in-content',
      type: 'boolean',
    },
  },
  category: 'common',
  icon: 'category',
  keywords: [__('category'), __('primary'), __('V8CH')],
  title: __('Primary Category'),

  /* eslint-disable-next-line react/prop-types */
  edit: ({ attributes, isSelected, setAttributes }) => (
    <PrimaryCategoryEditContainer
      attributes={attributes}
      isSelected={isSelected}
      setAttributes={setAttributes}
    />
  ),

  save: () => null,
});
