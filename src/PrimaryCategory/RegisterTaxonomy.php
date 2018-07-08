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
        $args = [
            'hierarchical'      => false,
            'public'            => false,
            'rewrite'           => ['slug' => 'primary-category'],
            'show_in_rest'      => true,
        ];

        register_taxonomy('primary_category', 'post', $args);
    }
}
