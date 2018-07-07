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
    public $taxonomy;

    public function __construct()
    {
        $this->apps = new RegisterRenderApps();
        $this->assets = new EnqueueAssets();
        $this->blocks = new RegisterBlocks();
        $this->meta = new RegisterMeta();
        $this->taxonomy = new RegisterTaxonomy();
    }

    public function registerApps()
    {
        add_action('plugins_loaded', [$this->apps, 'register'], 100);
    }
        
    public function enqueueAssets()
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
        
    public function registerTaxonomy()
    {
        add_action('init', [$this->taxonomy, 'register'], 100);
    }
        
    public function run()
    {
        $this->registerApps();
        $this->enqueueAssets();
        $this->registerBlocks();
        $this->registerMeta();
        $this->registerTaxonomy();
    }
}
