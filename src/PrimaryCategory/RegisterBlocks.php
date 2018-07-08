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

class RegisterBlocks
{
    public function register()
    {
        register_block_type(
            'v8ch/primary-category-recent-posts-widget',
            [
            'editor_script'   => 'v8ch/block-primary-category-recent-posts-widget',
            'editor_style'    => 'v8ch-primary-category',
            'render_callback'    => [$this, 'renderRecentPosts'],
            ]
        );
    }

    public function renderRecentPosts($attributes)
    {
        if ($attributes['showInContent']) {
            ob_start();
            ?>
        <div
            class="v8ch-primary-category-recent-posts-widget-mount widget widget_wp-block-v8ch-primary-category"
            data-category-name='<?php echo $attributes['categoryName']; ?>'
            data-posts='<?php echo $attributes['recentPosts']; ?>'
        ></div>
            <?php
            $html = ob_get_clean();
            ob_flush();

            return $html;
        }
    }
}