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
            'v8ch/block-v8ch-primary-category-recent-posts-widget',
            plugins_url('/dist/scripts/block-primary-category-recent-posts-widget.js', dirname(__FILE__, 2)),
            ['store-primary-category', 'wp-blocks', 'wp-components', 'wp-editor', 'wp-element'],
            false,
            true
        );

        wp_enqueue_script(
            'store-primary-category',
            plugins_url('/dist/scripts/store-primary-category.js', dirname(__FILE__, 2)),
            ['wp-data'],
            false,
            true
        );
    
        wp_enqueue_style(
            'v8ch-primary-category-widget',
            plugins_url('/dist/styles/primary-category-widget.css', dirname(__FILE__, 2)),
            ['wp-edit-blocks']
        );
    }
}
