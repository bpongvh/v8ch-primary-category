# V8CH Primary Category
WordPress plugin to create a Gutenberg editor block for setting and displaying primary categories assigned to posts. Current version is v2.0.0, which is completely rewritten for performance and to swap out PHP server-side dynamic rendering of the block for React component rendering.

Where v1.0.0 relied on post meta to set a post's primary category, this version uses a custom taxonomy, which provides performant queries via `WP_Query` when building lists of posts in a given primary category. The custom taxonomy is `primary_category`, and the names of the terms are simply stringified integer category IDs.

## Usage

Clone this repo to the `plugins` directory of a WordPress installation. Install dependencies with `composer install` and `yarn install`. Then build for production with `yarn build:prod`.

To use the block in a post, simply add "Primary Category" from the "Common Blocks" category. Assign the primary category by selecting one of the post's categories in the dropdown on the block inspector sidebar. The visibility switch controls the appearance of a primary category heading and list of three previous posts in the primary category in the post content. Block rendered output in the post content is styled with CSS classes used for widgets, so the block should have theme-appropriate styling.

## Notes

This is a work-in-progress, and several issues remain unresolved:

- The primary category select is capped at 100 options as this is a per-page limitation of the WordPress REST API. Ultimate fix is to read headers to see if additional pages are available and fetch accordingly.
- A complete implementation should address setting primary category in permalink if category is included in permalink.
- In the Gutenberg editor, should allow setting the number of recent posts in primary category, with preview in the editor.
- I spent a fair amount of time attempting to work out basic snapshot testing using Jest with only minimal luck. Coupling of dependencies within Gutenberg make snapshot and even basic smoke-testing for rendering of any components that include any Gutenberg components is extremely complex. Something todo for future versions.

## Tests

- Minimal Jest test case for snapshotting components without complex dependencies on Gutenberg modules.
- Simple PHPUnit test coverage to insure correct assets and actions are enqueued or registered. 

## License

V8CH Primary Category is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).