import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import RecentPostListItem from './RecentPostListItem';

const RecentPostsWidget = props => (
  <Fragment>
    {!props.posts.length ? (
      <h2 className="widget-title">{`${sprintf(__('In: %s'), props.categoryName)}`}</h2>
    ) : (
      <Fragment>
        <h2 className="widget-title">{`${sprintf(__('Previously in %s:'), props.categoryName)}`}</h2>
        <ul>
          {props.posts.map((post, index) => (
            <RecentPostListItem key={index.toString()} post={post} />
          ))}
        </ul>
      </Fragment>
    )}
  </Fragment>
);

export default RecentPostsWidget;

RecentPostsWidget.propTypes = {
  categoryName: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
};
