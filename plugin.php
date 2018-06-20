<?php
/**
 * Plugin Name: V8CH Primary Category
 * Plugin URI: https://github.com/V8CH/v8ch-primary-category
 * Description: Creates a Gutenberg block for setting and displaying primary categories assigned to posts
 * Author: Robert Pratt
 * Author URI: https://www.v8ch.com/
 * Version: 0.0.1
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 *
 * @package v8ch-primary-category
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
