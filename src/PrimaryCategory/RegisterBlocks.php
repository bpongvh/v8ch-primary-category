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
            'v8ch/primary-category',
            [
            'editor_script'   => 'v8ch/block-primary-category',
            'editor_style'    => 'v8ch-primary-category',
            'render_callback'    => [$this, 'renderRecentPosts'],
            ]
        );
    }

    public function renderRecentPosts($attributes)
    {
        if ($attributes['showInContent']) {
            $primary_category = null;
            foreach (get_categories() as $category) {
                if ($category->cat_ID === $attributes['primaryCategoryId']) {
                    $primary_category = $category;
                    break;
                }
            }
    
            $args  = array(
                'meta_key'       => 'v8ch-pc-primary-category-id',
                'meta_value'     => $attributes['primaryCategoryId'],
                'post__not_in'   => [ $attributes['postId'] ],
                'posts_per_page' => 3,
            );
            $query = new WP_Query($args);

            $recentPosts = array_map(function ($post) {
                return [
                    'permalink'   => get_the_permalink($post),
                    'publishedAt' => get_the_date('', $post),
                    'title'       => get_the_title($post),
                ];
            }, $query->posts);

            ob_start();
            ?>
        <div
            class="v8ch-recent-posts-mount"
            data-posts='<?php echo json_encode($recentPosts) ?>'
        ></div>
            <?php
            $html = ob_get_clean();
            ob_flush();

            return $html;
        }
    }
}