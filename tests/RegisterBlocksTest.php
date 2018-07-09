<?php
/**
 * Class SampleTest
 *
 * @package tests
 */

namespace V8CH\WordPress\PrimaryCategory\Tests;

use V8CH\WordPress\PrimaryCategory\RegisterBlocks;
use WP_Mock;
use WP_Mock\Tools\TestCase;

class RegisterBlocksTest extends TestCase
{

    public $registerBlocks;

    public function setUp()
    {
        WP_Mock::setUp();
        $this->registerBlocks = new RegisterBlocks();
    }

    public function tearDown()
    {
        WP_Mock::tearDown();
    }

    /**
     * Test that register points to correct asset files
     *
     * @test
     */
    public function registerPointsToCorrectAssetFiles()
    {
        WP_Mock::userFunction(
            'register_block_type',
            [
                'args'  => [
                    'v8ch/primary-category-recent-posts-widget',
                    [
                    'editor_script'   => 'v8ch/block-primary-category-recent-posts-widget',
                    'editor_style'    => 'v8ch-primary-category',
                    'render_callback'    => [$this->registerBlocks, 'renderRecentPosts'],
                    ]
                ],
                'times' => 1,
            ]
        );

        $this->registerBlocks->register();
    }

    /**
     * Test that renderRecentPosts does not render HTML
     *   if attribute showInContent is false
     *
     * @test
     */
    public function renderRecentPostsOuputsNoHtml()
    {
        $attributes = ['showInContent' => false];
        $output = $this->registerBlocks->renderRecentPosts($attributes);

        $this->assertEquals('', $output);
    }

    /**
     * Test that renderRecentPosts outputs corrects HTML
     *   if attribute showInContent is true
     *
     * @test
     */
    public function renderRecentPostsOuputsCorrectHtml()
    {
        $attributes = [
            'categoryName'  => 'Category Name',
            'recentPosts'   => '[]',
            'showInContent' => true,
        ];
        $output = $this->registerBlocks->renderRecentPosts($attributes);

        $this->assertRegExp('/v8ch-primary-category-recent-posts-widget-mount/', $output);
        $this->assertRegExp('/Category Name/', $output);
        $this->assertRegExp('/\[\]/', $output);
    }
}
