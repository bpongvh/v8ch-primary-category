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

class RegisterMeta
{
    public function register()
    {
        register_meta(
            'post',
            'v8ch-pc-post-id',
            [
                'show_in_rest' => true,
                'single'       => true,
                'type'         => 'integer',
            ]
        );
    }
}
