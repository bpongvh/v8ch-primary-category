# v8ch-primary-category
WordPress plugin to create a Gutenberg block for setting and displaying primary categories assigned to posts

## Notes

This is a work-in-progress, and several issues remain unresolved:

- Certain snapshot tests fail (notably `Controls-test.js`) probably because of an issue with the way dependent libraries are included (via Jest's processing instead of Webpack bundling).
- The primary category select is capped at 100 options as this is a per-page limitation of the WordPress REST API. Ultimate fix is to read headers to see if additional pages are available and fetch accordingly.

## Tests

I spent a fair amount of time attempting to work out basic snapshot testing using Jest--without any luck. Tests fail for any of this packages components that imports any Gutenberg built-in component. Output from the failing tests is identical in every case:

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