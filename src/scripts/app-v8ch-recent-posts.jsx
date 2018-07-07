import React from 'react';
import ReactDOM from 'react-dom';
import RecentPosts from './components/RecentPosts';

const mounts = document.getElementsByClassName('v8ch-recent-posts-mount');

Array.prototype.forEach.call(
  mounts,
  (mount) => {
    ReactDOM.render(<RecentPosts posts={JSON.parse(mount.dataset.posts)} />, mount);
  },
);
