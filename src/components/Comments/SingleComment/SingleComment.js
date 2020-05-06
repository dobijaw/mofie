import React from 'react';
import styles from './SingleComment.module.scss';

const SingleComment = ({ children }) => (
  <p className={styles.singleComment}>{children}</p>
);

export default SingleComment;
