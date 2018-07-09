<?php
/**
 * Class SampleTest
 *
 * @package tests
 */

namespace V8CH\WordPress\PrimaryCategory\Tests;

use V8CH\WordPress\PrimaryCategory\EnqueueAssets;
use WP_Mock;
use WP_Mock\Tools\TestCase;

class EnqueueAssetsTest extends TestCase
{

    public $enqueueAssets;

    public function setUp()
    {
        WP_Mock::setUp();
        $this->enqueueAssets = new EnqueueAssets();
    }

    public function tearDown()
    {
        WP_Mock::tearDown();
    }

    /**
     * Test that enqueue points to correct asset files
     *
     * @test
     */
    public function enqueuePointsToCorrectAssetFiles()
    {
        WP_Mock::userFunction(
            'plugins_url',
            [
                'args'  => ['/dist/scripts/block-primary-category-recent-posts-widget.js', '*'],
                'times' => 1,
            ]
        );
        WP_Mock::userFunction(
            'plugins_url',
            [
                'args'  => ['/dist/scripts/store-primary-category.js', '*'],
                'times' => 1,
            ]
        );
        WP_Mock::userFunction(
            'plugins_url',
            [
                'args'  => ['/dist/styles/primary-category-widget.css', '*'],
                'times' => 1,
            ]
        );
        WP_Mock::userFunction('wp_enqueue_script');
        WP_Mock::userFunction('wp_enqueue_style');

        $this->enqueueAssets->enqueue();
    }

    /**
     * Test that enqueue sets correct handles and dependencies
     *
     * @test
     */
    public function registerSetsCorrectHandlesAndDependencies()
    {
        WP_Mock::userFunction('plugins_url');
        WP_Mock::userFunction(
            'wp_enqueue_script',
            [
                'args'  => [
                    'v8ch/block-v8ch-primary-category-recent-posts-widget',
                    '*',
                    ['store-primary-category', 'wp-blocks', 'wp-components', 'wp-editor', 'wp-element'],
                    false,
                    true
                ],
                'times' => 1,
            ]
        );
        WP_Mock::userFunction(
            'wp_enqueue_script',
            [
                'args'  => [
                    'store-primary-category',
                    '*',
                    ['wp-data'],
                    false,
                    true
                ],
                'times' => 1,
            ]
        );
        WP_Mock::userFunction(
            'wp_enqueue_style',
            [
                'args'  => [
                    'v8ch-primary-category-widget',
                    '*',
                    ['wp-edit-blocks']
                ],
                'times' => 1,
            ]
        );

        $this->enqueueAssets->enqueue();
    }
}