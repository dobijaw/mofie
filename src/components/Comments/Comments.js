import React from 'react';
import styles from './Comments.module.scss';
import SubHeadline from '../SubHeadline/SubHeadline';
import SingleComment from './SingleComment/SingleComment';

const Comments = () => (
  <section className={styles.commentsWrapper}>
    <SubHeadline headline="My comments" />
    <div>Tu raitingi</div>
    <div>
      <SingleComment comment="I really love this movie, is so nice, and I can watch it again." />
    </div>
  </section>
);

export default Comments;
