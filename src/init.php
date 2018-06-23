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
function v8ch_primary_category_block_assets() {
	wp_enqueue_style(
		'v8ch_primary_category-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-blocks' )
	);
}

add_action( 'enqueue_block_assets', 'v8ch_primary_category_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @since   0.0.1
 */
function v8ch_primary_category_editor_assets() {
	wp_enqueue_script(
		'v8ch_primary_category-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ),
		true
	);

	wp_enqueue_style(
		'v8ch_primary_category-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
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
	register_meta( 'post', 'v8ch-primary-category', array(
		'show_in_rest' => true,
		'single'       => true,
	) );
}

add_action( 'init', 'v8ch_primary_category_register_meta' );
