import React from 'react';
import styles from './SingleComment.module.scss';

const SingleComment = ({ comment }) => (
  <p className={styles.singleComment}>{comment}</p>
);

export default SingleComment;
