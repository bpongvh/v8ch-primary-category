<?php // phpcs:ignore
/**
 * Plugin Name: V8CH Primary Category
 * Plugin URI: https://github.com/V8CH/v8ch-primary-category
 * Description: Creates a Gutenberg block for setting and displaying primary categories assigned to posts
 * Author: Robert Pratt
 * Author URI: https://www.v8ch.com/
 * Version: 2.0.0
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 *
 * @package v8ch-primary-category
 */

// Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit;
}

use V8CH\WordPress\PrimaryCategory\Plugin;

require_once 'vendor/autoload.php';
$plugin = new Plugin();
$plugin->run();
