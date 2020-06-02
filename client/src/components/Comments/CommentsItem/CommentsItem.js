import React from 'react';
import PropTypes from 'prop-types';
import styles from './CommentsItem.module.scss';

const CommentsItem = ({ title, children }) => (
  <section className={styles.commentsItem}>
    <h3 className={styles.commentsItem_title}>{title}</h3>
    <p
      className={[
        styles.commentsItem_data,
        !children && styles.commentsItem_data___nodata,
      ].join(' ')}
    >
      {children || 'No data yet'}
    </p>
  </section>
);

CommentsItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default CommentsItem;
