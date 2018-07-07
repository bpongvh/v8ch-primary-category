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

use WP_Query;

class RegisterTaxonomy
{
    public function register()
    {
        $labels = [
            'name'              => _x('Primary Categories', 'taxonomy general name', 'v8ch-primary-category'),
            'singular_name'     => _x('Primary Category', 'taxonomy singular name', 'v8ch-primary-category'),
            'search_items'      => __('Search Primary Categories', 'v8ch-primary-category'),
            'all_items'         => __('All Primary Categories', 'v8ch-primary-category'),
            'parent_item'       => __('Parent Primary Category', 'v8ch-primary-category'),
            'parent_item_colon' => __('Parent Primary Category:', 'v8ch-primary-category'),
            'edit_item'         => __('Edit Primary Category', 'v8ch-primary-category'),
            'update_item'       => __('Update Primary Category', 'v8ch-primary-category'),
            'add_new_item'      => __('Add New Primary Category', 'v8ch-primary-category'),
            'new_item_name'     => __('New Primary Category Name', 'v8ch-primary-category'),
            'menu_name'         => __('Primary Category Tags', 'v8ch-primary-category'),
        ];
     
        $args = [
            'hierarchical'      => false,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => ['slug' => 'primary-category'],
            'show_in_rest'      => true,
        ];

        register_taxonomy('primary_category', 'post', $args);
    }
}
