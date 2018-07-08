import React from 'react';
import renderer from 'react-test-renderer';
import RecentPostsWidget from '../RecentPostsWidget';

jest.mock('../RecentPostListItem', () => () => (
  <li className="mock-recent-post-list-item">
    Mock RecentPostListItem
  </li>
));

describe('RecentPostsWidget Snapshot', () => {
  it('renders correctly', () => {
    const posts = [
      {
        link: 'http://some.url.local/1',
        publishedAt: new Date('2018-07-08T12:00:00.000Z').toISOString(),
        title: 'Post Title #1',
      },
      {
        link: 'http://some.url.local/2',
        publishedAt: new Date('2018-07-08T11:00:00.000Z').toISOString(),
        title: 'Post Title #2',
      },
    ];
    const tree = renderer
      .create(<RecentPostsWidget categoryName="Category Name" posts={posts} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
