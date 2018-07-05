<?php // phpcs:ignore
/**
 *
 * @since   0.0.2
 * @package v8ch-primary-category
 */

namespace V8CH\WordPress\PrimaryCategory;

// Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit;
}

class Plugin
{

    public $apps;
    public $assets;
    public $blocks;
    public $meta;

    public function __construct()
    {
        $this->apps = new RegisterRenderApps();
        $this->assets = new RegisterAssets();
        $this->blocks = new RegisterBlocks();
        $this->blocks = new RegisterMeta();
    }

    public function registerApps()
    {
        add_action('plugins_loaded', [$this->apps, 'register'], 100);
    }
        
    public function registerAssets()
    {
        add_action('plugins_loaded', [$this->assets, 'enqueue'], 100);
    }
        
    public function registerBlocks()
    {
        add_action('plugins_loaded', [$this->blocks, 'register'], 100);
    }
        
    public function registerMeta()
    {
        add_action('plugins_loaded', [$this->meta, 'register'], 100);
    }
        
    public function run()
    {
        $this->registerApps();
        $this->registerAssets();
        $this->registerBlocks();
        $this->registerMeta();
    }

}
