<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   0.0.1
 * @package v8ch-primary-category
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @since   0.0.1
 */

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @since   0.0.1
 */
function v8ch_primary_category_editor_assets() {
	wp_enqueue_script(
		'v8ch_primary_category-block-js',
		plugins_url( '/dist/v8ch-primary-category-blocks.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-components', 'wp-data', 'wp-editor', 'wp-element', 'wp-i18n', 'wp-element' ),
		true
	);

	wp_enqueue_style(
		'v8ch_primary_category-block-editor-css',
		plugins_url( 'dist/v8ch-primary-category-editor.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' )
	);
}

add_action( 'enqueue_block_editor_assets', 'v8ch_primary_category_editor_assets' );

/**
 * Register meta.
 *
 * @since   0.0.1
 */
function v8ch_primary_category_register_meta() {
	register_meta(
		'post', 'v8ch-pc-post-id', array(
			'show_in_rest' => true,
			'single'       => true,
			'type'         => integer,
		)
	);
	register_meta(
		'post', 'v8ch-pc-primary-category-id', array(
			'show_in_rest' => true,
			'single'       => true,
			'type'         => integer,
		)
	);
	register_meta(
		'post', 'v8ch-pc-show-in-content', array(
			'show_in_rest' => true,
			'single'       => true,
			'type'         => boolean,
		)
	);
}

add_action( 'init', 'v8ch_primary_category_register_meta' );

/**
 * Render content output for in-primary-category block.
 *
 * @param   mixed[] $attributes Mapped block attributes.
 * @since   0.0.1
 */
function v8ch_primary_category_render_block_in_primary_category( $attributes ) {
	if ( $attributes['showInContent'] ) {

		$primary_category = null;
		foreach ( get_categories() as $category ) {
			if ( $category->cat_ID === $attributes['primaryCategoryId'] ) {
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
		$query = new WP_Query( $args );

		// -------------------------
		// HTML output for block.
		// -------------------------
		ob_start();
		?>
			<div class="wp-block-v8ch-in-primary-category">
				<h5 class="wp-block-v8ch-in-primary-category__title">
		<?php if ( 0 === $query->post_count ) : ?>
					<span class="primary-category-label"><?php esc_html_e( 'In Primary Category: ' ); ?></span>
		<?php else : ?>
					<span class="primary-category-label"><?php esc_html_e( 'Latest Posts in Primary Category: ' ); ?></span>
		<?php endif ?>
					<span class="primary-category-name"><?php echo esc_html( $primary_category->cat_name ); ?></span>
				</h5>
				<ul>
		<?php while ( $query->have_posts() ) : $query->the_post(); // phpcs:ignore ?>
					<li>
						<a href="<?php echo esc_url( get_permalink() ); ?>"><?php echo esc_html( get_the_title() ); ?></a>
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

register_block_type(
	'v8ch/in-primary-category', array(
		'render_callback' => 'v8ch_primary_category_render_block_in_primary_category',
	)
);
