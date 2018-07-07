import React from 'react';

const RecentPosts = () => (
  <div className="wp-block-v8ch-in-primary-category">
    <h5 className="wp-block-v8ch-in-primary-category__title">
      {/* eslint-disable-next-line no-self-compare */}
      {1 === 0
        && <span className="primary-category-label">In Primary Category: </span>
      }
      {/* eslint-disable-next-line no-self-compare */}
      {1 === 1
        && <span className="primary-category-label">Latest Posts in Primary Category: </span>
      }
      <span className="primary-category-name">category name</span>
    </h5>
    <ul>
      <li>
        <a href="<?php echo esc_url(get_permalink()); ?>">Title</a>
      </li>
    </ul>
  </div>
);

export default RecentPosts;
