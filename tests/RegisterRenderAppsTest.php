<?php
/**
 * Class SampleTest
 *
 * @package tests
 */

namespace V8CH\WordPress\PrimaryCategory\Tests;

use V8CH\WordPress\PrimaryCategory\RegisterRenderApps;
use WP_Mock;
use WP_Mock\Tools\TestCase;

class RegisterRenderAppsTest extends TestCase
{

    public $apps;

    public function setUp()
    {
        WP_Mock::setUp();
        $this->apps = new RegisterRenderApps();
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
                'args'  => ['/dist/scripts/app-v8ch-recent-posts-widget.js', '*'],
                'times' => 1,
            ]
        );
        WP_Mock::userFunction('wp_enqueue_script');

        $this->apps->enqueue();
    }

    /**
     * Test that enqueue sets correct handles and dependencies
     *
     * @test
     */
    public function enqueueSetsCorrectHandlesAndDependencies()
    {
        WP_Mock::userFunction('plugins_url');
        WP_Mock::userFunction(
            'wp_enqueue_script',
            [
                'args'  => [
                    'v8ch_recent_posts_widget_app',
                    '*',
                    ['wp-element'],
                    false,
                    true
                ],
                'times' => 1,
            ]
        );

        $this->apps->enqueue();
    }
}