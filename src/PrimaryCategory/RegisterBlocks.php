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

class RegisterBlocks
{
    public function register()
    {
        register_block_type(
            'v8ch/v8ch-contact',
            [
            // 'editor_script'   => 'v8ch/block-v8ch-contact',
            // 'editor_style'    => 'v8ch-tractor-blocks',
            'render_callback'    => [$this, 'renderRecentInPrimaryCategory'],
            ]
        );
    }

    public function renderRecentInPrimaryCategory($attributes)
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
            'post__not_in'   => [ $attributes['postId']],
            'posts_per_page' => 3,
            );
            $query = new WP_Query($args);
  
            // -------------------------
            // HTML output for block.
            // -------------------------
            ob_start();
            ?>
        <div class="wp-block-v8ch-in-primary-category">
            <h5 class="wp-block-v8ch-in-primary-category__title">
            <?php if (0 === $query->post_count) : ?>
            <span class="primary-category-label"><?php esc_html_e('In Primary Category: '); ?></span>
            <?php else : ?>
            <span class="primary-category-label"><?php esc_html_e('Latest Posts in Primary Category: '); ?></span>
            <?php endif ?>
            <span class="primary-category-name"><?php echo esc_html($primary_category->cat_name); ?></span>
            </h5>
            <ul>
            <?php while ( $query->have_posts() ) : $query->the_post(); // phpcs:ignore ?>
            <li>
                <a href="<?php echo esc_url(get_permalink()); ?>"><?php echo esc_html(get_the_title()); ?></a>
            </li>
            <?php endwhile ?>
            </ul>
        </div>
            <?php
            $html = ob_get_clean();
            ob_flush();
  
            wp_reset_postdata();
  
            return $html;
        }
    }
}