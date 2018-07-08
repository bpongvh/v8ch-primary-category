import React from 'react';
import ReactDOM from 'react-dom';
import RecentPostsWidget from './components/RecentPostsWidget';

const mounts = document.getElementsByClassName('v8ch-primary-category-recent-posts-widget-mount');

Array.prototype.forEach.call(
  mounts,
  (mount) => {
    const posts = !mount.dataset.posts ? [] : JSON.parse(mount.dataset.posts);
    ReactDOM.render(
      <RecentPostsWidget
        categoryName={mount.dataset.categoryName}
        posts={posts}
      />,
      mount,
    );
  },
);
