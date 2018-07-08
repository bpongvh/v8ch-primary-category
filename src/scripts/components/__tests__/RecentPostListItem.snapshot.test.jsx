import React from 'react';
import renderer from 'react-test-renderer';
import RecentPostListItem from '../RecentPostListItem';

describe('RecentPostListItem Snapshot', () => {
  it('renders correctly', () => {
    const post = {
      link: 'http://some.url.local',
      publishedAt: new Date('2018-07-08T12:00:00.000Z').toISOString(),
      title: 'Post Title',
    };
    const tree = renderer
      .create(<RecentPostListItem post={post} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
