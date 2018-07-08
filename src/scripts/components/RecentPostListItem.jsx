import PropTypes from 'prop-types';
import React from 'react';
import { __ } from '@wordpress/i18n';

const RecentPostListItem = (props) => {
  function getPublishedAtLocalized(isoString) {
    return new Date(isoString).toLocaleString();
  }
  return (
    <li>
      <span
        className="widget_wp-block-v8ch-primary-category__post-title"
      >
        <a href={props.post.link}>{`${props.post.title} `}</a>
      </span>
      <span
        className="widget_wp-block-v8ch-primary-category__post-date"
      >
        {`${__('on ')} ${getPublishedAtLocalized(props.post.publishedAt)}`}
      </span>
    </li>
  );
};

export default RecentPostListItem;

RecentPostListItem.propTypes = {
  post: PropTypes.object.isRequired,
};
