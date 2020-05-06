import React from 'react';
// import Select from 'components/Select/Select';
import styles from './Comments.module.scss';
import SubHeadline from '../SubHeadline/SubHeadline';
// import SingleComment from './SingleComment/SingleComment';

const Comments = ({ category, rate, comment }) => (
  <section className={styles.comments}>
    <SubHeadline>My comments</SubHeadline>
    <p>{rate}</p>
    <p>{category}</p>
    <p>{comment}</p>
  </section>
);

export default Comments;
