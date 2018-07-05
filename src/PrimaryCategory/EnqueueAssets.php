<?php // phpcs:ignore
/**
 *
 * @since   0.0.2
 * @package v8ch-primary-category
 */

namespace V8CH\WordPress\PrimaryCategory;

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

class EnqueueAssets
{

    public function enqueue()
    {
        wp_enqueue_script(
            'v8ch_primary_category-block-js',
            plugins_url('/dist/v8ch-primary-category-blocks.js', dirname(__FILE__)),
            [
              'wp-blocks',
              'wp-components',
              'wp-data',
              'wp-editor',
              'wp-element',
              'wp-i18n',
              'wp-element'
            ],
            false,
            true
        );
    
        wp_enqueue_style(
            'v8ch_primary_category-block-editor-css',
            plugins_url('dist/v8ch-primary-category-editor.css', dirname(__FILE__)),
            ['wp-edit-blocks']
        );
    }
}
