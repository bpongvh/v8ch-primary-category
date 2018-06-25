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
		plugins_url( 'dist/v8ch-primary-category-style.css', dirname( __FILE__ ) ),
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
	register_meta( 'post', 'v8ch-pc-id', array(
		'show_in_rest' => true,
		'single'       => true,
	) );
	register_meta( 'post', 'v8ch-pc-label', array(
		'show_in_rest' => true,
		'single'       => true,
	) );
	register_meta( 'post', 'v8ch-pc-show-in-content', array(
		'show_in_rest' => true,
		'single'       => true,
		'type'         => boolean,
	) );
}

add_action( 'init', 'v8ch_primary_category_register_meta' );
