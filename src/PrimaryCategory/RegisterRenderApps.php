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

class RegisterRenderApps
{

    public function register()
    {
        $this->registerRecentPosts();
    }

    // public function registerStyle()
    // {
    //     wp_register_style(
    //         'v8ch-tractor-blocks',
    //         plugins_url('/dist/styles/tractor-blocks.css', dirname(__FILE__, 2)),
    //         ['wp-blocks', 'wp-element']
    //     );
    // }

    public function registerRecentPosts()
    {
        wp_enqueue_script(
            'v8ch_recent_posts_app',
            plugins_url('/dist/scripts/app-v8ch-recent-posts.js', dirname(__FILE__, 2)),
            ['wp-element'],
            false,
            true
        );
    }
}
