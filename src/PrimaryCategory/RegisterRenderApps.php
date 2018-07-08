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

    public function registerRecentPosts()
    {
        wp_enqueue_script(
            'v8ch_recent_posts_widget_app',
            plugins_url('/dist/scripts/app-v8ch-recent-posts-widget.js', dirname(__FILE__, 2)),
            ['wp-element'],
            false,
            true
        );
    }
}
