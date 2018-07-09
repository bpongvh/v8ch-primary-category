<?php
/**
 * Class SampleTest
 *
 * @package tests
 */

namespace V8CH\WordPress\PrimaryCategory\Tests;

use V8CH\WordPress\PrimaryCategory\RegisterTaxonomy;
use WP_Mock;
use WP_Mock\Tools\TestCase;

class RegisterTaxonomyTest extends TestCase
{

    public $registerTaxonomy;

    public function setUp()
    {
        WP_Mock::setUp();
        $this->registerTaxonomy = new RegisterTaxonomy();
    }

    public function tearDown()
    {
        WP_Mock::tearDown();
    }

    /**
     * Test that register sets correct values for custom taxonomy
     *
     * @test
     */
    public function registerSetsCorrectValuesForTaxonomy()
    {
        $args = [
            'hierarchical'      => false,
            'public'            => false,
            'rewrite'           => ['slug' => 'primary-category'],
            'show_in_rest'      => true,
        ];

        WP_Mock::userFunction(
            'register_taxonomy',
            [
                'args'  => [
                    'primary_category',
                    'post',
                    $args,
                ],
                'times' => 1,
            ]
        );

        $this->registerTaxonomy->register();
    }
}
