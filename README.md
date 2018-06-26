# V8CH Primary Category
WordPress plugin to create a Gutenberg editor block for setting and displaying primary categories assigned to posts.

## Notes

This is a work-in-progress, and several issues remain unresolved:

- The primary category select is capped at 100 options as this is a per-page limitation of the WordPress REST API. Ultimate fix is to read headers to see if additional pages are available and fetch accordingly.
- A complete implementation should address setting primary category in permalink if category is included in permalink.
- In the Gutenberg editor, should allow setting the number of recent posts in primary category, with preview in the editor.

## Tests

I spent a fair amount of time attempting to work out basic snapshot testing using Jest--without any luck. Tests fail for any of this packages components that imports any Gutenberg built-in component. Output from the failing tests is similar to this in every case:

```javascript
yarn run v1.7.0
$ jest --notify --config=jest.config.json
 FAIL  test/js/components/Placeholder-test.js
  ● Test suite failed to run

    TypeError: (0 , _domReady2.default) is not a function

    > 1 | import { Placeholder } from '@wordpress/components';
        | ^
      2 | import { Component } from '@wordpress/element';
      3 | import { __, sprintf } from '@wordpress/i18n';
      4 |

      at Object.<anonymous> (node_modules/gutenberg/node_modules/@wordpress/a11y/build/index.js:44:24)
      at Object.<anonymous> (node_modules/gutenberg/components/higher-order/with-spoken-messages/index.js:10:1)
      at Object.<anonymous> (node_modules/gutenberg/components/autocomplete/index.js:22:1)
      at Object.<anonymous> (node_modules/gutenberg/components/index.js:16:21)
      at Object.<anonymous> (src/components/Placeholder.jsx:1:1)
      at Object.<anonymous> (test/js/components/Placeholder-test.js:2:1)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        16.207s
Ran all test suites.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

This appears to be a reference error in the `@wordpress/a11y` package to an imported method in the `@wordpress/dom-ready` package that only surfaces during testing. (No errors occur during runtime after Webpack bundling.)

As Gutenberg packages and dependencies appear to be in flux at the moment, I chose (after spending several hours trying to work out issues with running Jest) to forego test setup. I expect that Jest dependencies (and, no doubt, PHPUnit dependencies) are a solved problem with the Docker configuration provided with the Gutenberg repository. I currently use a Vagrant/Homestead development environment. I wanted to finish the initial version of this project without further delaying to rebuild my development environment to use Docker.

## Using

To use the block, simply add "In Primary Category" from the "Common Blocks" category. Assign the primary category by selecting one of the post's categories in the dropdown on the block inspector sidebar. The visibility switch controls the appearance of a primary category heading and list of three other recent post in the primary category in the post content.

## License

V8CH Primary Category is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).